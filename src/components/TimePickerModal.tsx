import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native';
import { getCurrentTime } from '../utils/time';
import { styles } from '../styles';

interface TimePickerModalProps {
  visible: boolean;
  reminderLabel?: string;
  onConfirm: (time: string) => void;
  onClose: () => void;
}

const isValidTime = (s: string): boolean => {
  const match = s.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return false;
  const h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  return h >= 0 && h <= 23 && m >= 0 && m <= 59;
};

const formatTimeInput = (s: string): string => {
  const digits = s.replace(/\D/g, '');
  if (digits.length <= 2) return digits;
  const h = digits.slice(0, 2);
  const m = digits.slice(2, 4).padEnd(2, '0');
  return `${h}:${m}`;
};

export const TimePickerModal: React.FC<TimePickerModalProps> = ({
  visible, reminderLabel, onConfirm, onClose,
}) => {
  const [timeInput, setTimeInput] = useState('');

  useEffect(() => {
    if (visible) setTimeInput(getCurrentTime());
  }, [visible]);

  const handleUseNow = () => {
    onConfirm(getCurrentTime());
    onClose();
  };

  const handleConfirm = () => {
    const trimmed = timeInput.trim();
    if (isValidTime(trimmed)) {
      const [h, m] = trimmed.split(':').map(Number);
      const normalized = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
      onConfirm(normalized);
      onClose();
    }
  };

  const handleTimeChange = (text: string) => {
    const formatted = formatTimeInput(text);
    if (formatted.length <= 5) setTimeInput(formatted);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>What time did you complete this?</Text>
          {reminderLabel && (
            <Text style={styles.mealPickerSubtitle}>{reminderLabel}</Text>
          )}
          <View style={styles.modalDivider} />

          <Text style={[styles.customMealLabel, { marginBottom: 8 }]}>Completion time (HH:MM)</Text>
          <TextInput
            style={styles.customMealInput}
            placeholder="e.g. 13:30"
            placeholderTextColor="#64748b"
            value={timeInput}
            onChangeText={handleTimeChange}
            keyboardType="numeric"
            maxLength={5}
          />

          <TouchableOpacity style={[styles.modalCompleteBtn, { marginTop: 8 }]} onPress={handleUseNow}>
            <Text style={styles.modalCompleteBtnText}>Use current time</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modalCloseBtn, { marginTop: 8 }]}
            onPress={handleConfirm}
            disabled={!isValidTime(timeInput.trim())}
          >
            <Text style={[styles.modalCloseBtnText, !isValidTime(timeInput.trim()) && { opacity: 0.5 }]}>
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
