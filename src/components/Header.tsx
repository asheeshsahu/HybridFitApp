import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { getGreeting } from '../utils/helpers';
import { styles } from '../styles';

interface HeaderProps {
  remindersEnabled: boolean;
  onTurnOn: () => Promise<void>;
  onTurnOff: () => Promise<void>;
}

export const Header: React.FC<HeaderProps> = ({ remindersEnabled, onTurnOn, onTurnOff }) => {
  const handleBellPress = () => {
    if (remindersEnabled) {
      Alert.alert(
        'Turn off reminders?',
        "You won't receive any meal or hydration notifications until you turn them back on.",
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Turn Off', style: 'destructive', onPress: () => onTurnOff() },
        ]
      );
    } else {
      Alert.alert(
        'Turn on reminders?',
        "You'll receive daily meal and hydration notifications at your scheduled times.",
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Turn On', onPress: () => onTurnOn() },
        ]
      );
    }
  };

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>{getGreeting()}</Text>
        <Text style={styles.appTitle}>HybridFit</Text>
      </View>
      <TouchableOpacity style={styles.notifButton} onPress={handleBellPress}>
        <Text style={styles.notifIcon}>{remindersEnabled ? '🔔' : '🔕'}</Text>
      </TouchableOpacity>
    </View>
  );
};
