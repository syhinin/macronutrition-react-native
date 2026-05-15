import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Switch, Text, View } from 'react-native';

import { APP_COLORS } from '@/styles/global';
import {
  cancelMealReminders,
  requestPermissions,
  scheduleMealReminders,
} from '@/utils/notifications';

const REMINDERS_KEY = 'remindersEnabled';

export default function ReminderToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
       const val = await AsyncStorage.getItem(REMINDERS_KEY);
        setEnabled(val === 'true');
      } catch {
        setEnabled(false);
      }
    };
    load();
  }, []);

  const toggle = async (value: boolean) => {
    try {
      if (value) {
        const granted = await requestPermissions();
        
        if (!granted) return;
        await scheduleMealReminders();
      } else {
        await cancelMealReminders();
      }
      setEnabled(value);
     await AsyncStorage.setItem(REMINDERS_KEY, value.toString());
    } catch {
      Alert.alert('Error', 'Could not update reminders. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Meal Reminders</Text>
      <Switch
        value={enabled}
        onValueChange={toggle}
        trackColor={{ false: APP_COLORS.surface, true: APP_COLORS.primary }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  label: {
    color: APP_COLORS.text,
    fontSize: 16,
  },
});