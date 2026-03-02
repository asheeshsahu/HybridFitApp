import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { getCurrentTime } from '../utils/time';
import { styles } from '../styles';

interface TimePickerModalProps {
  visible: boolean;
  reminderLabel?: string;
  onConfirm: (time: string) => void;
  onClose: () => void;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
const MINUTES = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));

const ITEM_HEIGHT = 44;

export const TimePickerModal: React.FC<TimePickerModalProps> = ({
  visible, reminderLabel, onConfirm, onClose,
}) => {
  const getInitialMinute = () => {
    const m = parseInt(getCurrentTime().split(':')[1], 10);
    return Math.min(55, Math.round(m / 5) * 5);
  };
  const [selectedHour, setSelectedHour] = useState(() => parseInt(getCurrentTime().split(':')[0], 10));
  const [selectedMinute, setSelectedMinute] = useState(getInitialMinute());
  useEffect(() => {
    if (visible) {
      const [h, m] = getCurrentTime().split(':').map(Number);
      setSelectedHour(h);
      setSelectedMinute(Math.min(55, Math.floor(m / 5) * 5));
    }
  }, [visible]);

  const handleUseNow = () => {
    onConfirm(getCurrentTime());
    onClose();
  };

  const [currentHour, currentMinute] = getCurrentTime().split(':').map(Number);
  const maxValidMinute = Math.floor(currentMinute / 5) * 5;

  const isFutureTime = (hour: number, minute: number) => {
    if (hour > currentHour) return true;
    if (hour === currentHour && minute > currentMinute) return true;
    return false;
  };

  const isHourDisabled = (hour: number) => hour > currentHour;
  const isMinuteDisabled = (minute: number) =>
    selectedHour === currentHour && minute > maxValidMinute;

  const handleConfirm = () => {
    if (isFutureTime(selectedHour, selectedMinute)) return;
    const time = `${selectedHour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`;
    onConfirm(time);
    onClose();
  };

  const renderPickerColumn = (
    items: string[],
    selected: number,
    onSelect: (val: number) => void,
    isHour: boolean,
    isDisabled: (val: number) => boolean
  ) => (
    <ScrollView
      style={[styles.timePickerScroll, { height: ITEM_HEIGHT * 5 }]}
      contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * 2 }}
      showsVerticalScrollIndicator={true}
    >
      {items.map((item, i) => {
        const val = isHour ? i : i * 5;
        const isSelected = selected === val;
        const disabled = isDisabled(val);
        return (
          <TouchableOpacity
            key={item}
            style={[styles.timePickerItem, { height: ITEM_HEIGHT }]}
            onPress={() => !disabled && onSelect(val)}
            disabled={disabled}
          >
            <Text
              style={[
                styles.timePickerItemText,
                isSelected && styles.timePickerItemSelected,
                disabled && styles.timePickerItemDisabled,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>What time did you complete this?</Text>
          {reminderLabel && (
            <Text style={styles.mealPickerSubtitle}>{reminderLabel}</Text>
          )}
          <View style={styles.modalDivider} />

          <View style={styles.timePickerRow}>
            <View style={styles.timePickerColumn}>
              <Text style={styles.timePickerLabel}>Hour</Text>
              {renderPickerColumn(HOURS, selectedHour, setSelectedHour, true, isHourDisabled)}
            </View>
            <Text style={styles.timePickerSeparator}>:</Text>
            <View style={styles.timePickerColumn}>
              <Text style={styles.timePickerLabel}>Min</Text>
              {renderPickerColumn(MINUTES, selectedMinute, setSelectedMinute, false, isMinuteDisabled)}
            </View>
          </View>

          <Text style={[styles.customMealLabel, { marginTop: 8, textAlign: 'center' }]}>
            {selectedHour.toString().padStart(2, '0')}:{selectedMinute.toString().padStart(2, '0')}
          </Text>

          <TouchableOpacity style={[styles.modalCompleteBtn, { marginTop: 16 }]} onPress={handleUseNow}>
            <Text style={styles.modalCompleteBtnText}>Use current time</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modalCompleteBtn, { marginTop: 8, backgroundColor: '#7c3aed' }]}
            onPress={handleConfirm}
            disabled={isFutureTime(selectedHour, selectedMinute)}
          >
            <Text style={[styles.modalCompleteBtnText, isFutureTime(selectedHour, selectedMinute) && { opacity: 0.5 }]}>
              Confirm
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.modalCloseBtn} onPress={onClose}>
            <Text style={styles.modalCloseBtnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
