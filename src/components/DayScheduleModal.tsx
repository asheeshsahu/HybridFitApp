import React from 'react';
import { View, Text, Modal, Pressable, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { WeekDay, Reminder, ReminderCompletionData, DailyMacros, HydrationData } from '../types';
import { formatTime, formatDateLong } from '../utils/time';
import { getReminderColor } from '../utils/helpers';
import { styles } from '../styles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MODAL_HEIGHT = Math.min(SCREEN_HEIGHT * 0.85, 600);

export type WorkoutShift = 'morning' | 'evening';

interface DayData {
  completionData: ReminderCompletionData | null;
  dailyMacros: DailyMacros | null;
  hydration: HydrationData | null;
}

interface DayScheduleModalProps {
  visible: boolean;
  day: WeekDay | null;
  reminders: Reminder[];
  shift?: WorkoutShift;
  onShiftChange?: (shift: WorkoutShift) => void;
  onClose: () => void;
  onToggleComplete?: (dateKey: string) => void;
  isPastOrToday?: boolean;
  dayData?: DayData;
}

export const DayScheduleModal: React.FC<DayScheduleModalProps> = ({
  visible,
  day,
  reminders,
  shift = 'morning',
  onShiftChange,
  onClose,
  onToggleComplete,
  isPastOrToday = false,
  dayData,
}) => {
  if (!day) return null;

  const dateLabel = formatDateLong(day.dateKey);
  const isToday = day.isToday;
  const completionData = dayData?.completionData;
  const dailyMacros = dayData?.dailyMacros;
  const hydration = dayData?.hydration;
  const hasLoggedData = completionData || dailyMacros?.meals?.length || (hydration && hydration.glasses > 0);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <Pressable style={{ flex: 1 }} onPress={onClose} />
        <View style={[styles.modalContent, { maxHeight: MODAL_HEIGHT }]}>
          <ScrollView
            style={{ maxHeight: MODAL_HEIGHT - 48 }}
            contentContainerStyle={{ paddingBottom: 32 }}
            showsVerticalScrollIndicator={true}
            bounces={true}
          >
            <View style={styles.modalHeader}>
              <View style={[styles.modalIconBadge, { backgroundColor: day.isRest ? '#64748b' : '#7c3aed' }]}>
                <Text style={styles.modalIcon}>
                  {day.isRest ? '🛋️' : day.workout.type === 'gym' ? '🏋️' : '⚡'}
                </Text>
              </View>
              <View style={styles.modalHeaderText}>
                <Text style={styles.modalTitle}>
                  {dateLabel}{isToday ? ' (Today)' : ''}
                </Text>
                <Text style={styles.modalTime}>
                  {day.isRest ? 'Rest Day' : `${day.workout.type === 'gym' ? 'Gym' : 'Athletic'} — ${day.workout.name}`}
                </Text>
              </View>
            </View>

            {onShiftChange && (
              <View style={[styles.shiftToggleContainer, { marginBottom: 16, marginTop: -4 }]}>
                <Text style={styles.shiftToggleLabel}>Plan</Text>
                <View style={styles.shiftToggleRow}>
                  <TouchableOpacity
                    style={[styles.shiftToggleButton, shift === 'morning' && styles.shiftToggleActive]}
                    onPress={() => onShiftChange('morning')}
                  >
                    <Text style={[styles.shiftToggleText, shift === 'morning' && styles.shiftToggleTextActive]}>
                      🌅 Morning
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.shiftToggleButton, shift === 'evening' && styles.shiftToggleActive]}
                    onPress={() => onShiftChange('evening')}
                  >
                    <Text style={[styles.shiftToggleText, shift === 'evening' && styles.shiftToggleTextActive]}>
                      🌙 Evening
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {!day.isRest && day.workout.exercises.length > 0 && (
              <>
                <Text style={styles.modalSectionLabel}>EXERCISES</Text>
                {day.workout.exercises.map((ex, i) => (
                  <View key={i} style={styles.modalItem}>
                    <Text style={styles.modalBullet}>•</Text>
                    <Text style={styles.modalItemText}>{ex}</Text>
                  </View>
                ))}
              </>
            )}

            {hasLoggedData && (
              <>
                <Text style={styles.modalSectionLabel}>LOGGED</Text>
                {hydration && hydration.glasses > 0 && (
                  <View style={[styles.reminderCard, { marginBottom: 8, borderColor: '#3b82f6', backgroundColor: 'rgba(30,58,95,0.5)' }]}>
                    <View style={[styles.reminderIcon, { backgroundColor: '#3b82f6' }]}>
                      <Text style={styles.reminderIconText}>💧</Text>
                    </View>
                    <View style={styles.reminderContent}>
                      <Text style={styles.reminderTitle}>Hydration</Text>
                      <Text style={styles.reminderTime}>{hydration.glasses} glasses</Text>
                    </View>
                    <View style={[styles.completionCircle, styles.completionCircleDone]}>
                      <Text style={styles.completionCheck}>✓</Text>
                    </View>
                  </View>
                )}
                {dailyMacros && dailyMacros.consumed.calories > 0 && (
                  <View style={[styles.reminderCard, { marginBottom: 8 }]}>
                    <View style={[styles.reminderIcon, { backgroundColor: '#f97316' }]}>
                      <Text style={styles.reminderIconText}>📊</Text>
                    </View>
                    <View style={styles.reminderContent}>
                      <Text style={styles.reminderTitle}>Macros</Text>
                      <Text style={styles.reminderTime}>
                        {dailyMacros.consumed.calories} cal | {dailyMacros.consumed.protein}g P | {dailyMacros.consumed.carbs}g C | {dailyMacros.consumed.fats}g F
                      </Text>
                    </View>
                  </View>
                )}
              </>
            )}

            <Text style={styles.modalSectionLabel}>SCHEDULE</Text>
            {reminders.map((reminder) => {
              const completed = !!completionData?.completions[reminder.id];
              const doneTime = completionData?.completions[reminder.id];
              const mealEntry = dailyMacros?.meals?.find(m => m.reminderId === reminder.id);
              return (
                <View key={reminder.id} style={[styles.reminderCard, { marginBottom: 8 }, completed && styles.reminderCardCompleted]}>
                  <View style={[styles.reminderIcon, { backgroundColor: getReminderColor(reminder.id), opacity: completed ? 0.5 : 1 }]}>
                    <Text style={styles.reminderIconText}>{reminder.icon}</Text>
                  </View>
                  <View style={styles.reminderContent}>
                    <Text style={[styles.reminderTitle, completed && styles.reminderTitleCompleted]}>{reminder.title}</Text>
                    <Text style={styles.reminderTime}>{formatTime(reminder.time)}</Text>
                    {completed && doneTime && (
                      <Text style={styles.reminderDoneAt}>
                        {mealEntry ? `✓ ${mealEntry.option} at ${formatTime(doneTime)}` : `Done at ${formatTime(doneTime)}`}
                      </Text>
                    )}
                  </View>
                  {completed && (
                    <View style={[styles.completionCircle, styles.completionCircleDone]}>
                      <Text style={styles.completionCheck}>✓</Text>
                    </View>
                  )}
                </View>
              );
            })}

            {isPastOrToday && onToggleComplete && !day.isRest && (
              <TouchableOpacity
                style={[styles.modalCompleteBtn, day.isCompleted && styles.modalCompletedBadge]}
                onPress={() => onToggleComplete(day.dateKey)}
              >
                <Text style={day.isCompleted ? styles.modalCompletedText : styles.modalCompleteBtnText}>
                  {day.isCompleted ? 'Undo Completion' : 'Mark Workout Complete'}
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.modalCloseBtn} onPress={onClose}>
              <Text style={styles.modalCloseBtnText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
