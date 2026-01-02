import * as Notifications from 'expo-notifications';
import { Injection } from '../types';

/**
 * Configure notification behavior
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

/**
 * Request notification permissions
 */
export async function requestNotificationPermissions(): Promise<boolean> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === 'granted';
}

/**
 * Schedule a notification for an injection
 */
export async function scheduleInjectionNotification(
  injection: Injection
): Promise<string | null> {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) {
    console.warn('Notification permissions not granted');
    return null;
  }

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Injection Reminder',
      body: `Time for your ${injection.peptideName} injection (${injection.dose} ${injection.unit})`,
      data: {
        injectionId: injection.id,
        type: 'injection_reminder',
      },
      sound: true,
    },
    trigger: {
      date: injection.scheduledTime,
    },
  });

  return notificationId;
}

/**
 * Schedule a pre-reminder notification (e.g., 15 minutes before)
 */
export async function schedulePreReminder(
  injection: Injection,
  minutesBefore: number = 15
): Promise<string | null> {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) {
    return null;
  }

  const reminderTime = new Date(injection.scheduledTime);
  reminderTime.setMinutes(reminderTime.getMinutes() - minutesBefore);

  // Don't schedule if reminder time is in the past
  if (reminderTime < new Date()) {
    return null;
  }

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Injection Coming Up',
      body: `Your ${injection.peptideName} injection is in ${minutesBefore} minutes`,
      data: {
        injectionId: injection.id,
        type: 'pre_reminder',
      },
      sound: true,
    },
    trigger: {
      date: reminderTime,
    },
  });

  return notificationId;
}

/**
 * Cancel a scheduled notification
 */
export async function cancelNotification(
  notificationId: string
): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
}

/**
 * Cancel all notifications for a specific injection
 */
export async function cancelInjectionNotifications(
  injection: Injection
): Promise<void> {
  if (injection.notificationId) {
    await cancelNotification(injection.notificationId);
  }
  // Could also cancel pre-reminders if stored separately
}

/**
 * Get all scheduled notifications
 */
export async function getAllScheduledNotifications(): Promise<
  Notifications.NotificationRequest[]
> {
  return await Notifications.getAllScheduledNotificationsAsync();
}

/**
 * Cancel all scheduled notifications
 */
export async function cancelAllNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

/**
 * Set up notification channel (Android)
 */
export async function setupNotificationChannel(): Promise<void> {
  await Notifications.setNotificationChannelAsync('injections', {
    name: 'Injection Reminders',
    description: 'Notifications for scheduled peptide injections',
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#FF231F7C',
    sound: 'default',
  });
}

