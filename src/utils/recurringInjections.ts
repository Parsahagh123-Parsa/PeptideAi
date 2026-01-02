import { Injection } from '../types';
import { createRecurringDates } from './dateHelpers';
import { scheduleInjectionNotification } from '../services/notificationService';

/**
 * Create recurring injections based on frequency
 */
export async function createRecurringInjections(
  baseInjection: Omit<Injection, 'id' | 'notificationId'>,
  frequency: 'daily' | 'eod' | 'weekly' | 'biweekly',
  count: number,
  startDate: Date = new Date()
): Promise<Injection[]> {
  const dates = createRecurringDates(startDate, frequency, count);
  const injections: Injection[] = [];

  for (let i = 0; i < dates.length; i++) {
    const injection: Injection = {
      ...baseInjection,
      id: `inj_${Date.now()}_${i}`,
      scheduledTime: dates[i],
      status: 'scheduled',
    };

    // Schedule notification
    const notificationId = await scheduleInjectionNotification(injection);
    if (notificationId) {
      injection.notificationId = notificationId;
    }

    injections.push(injection);
  }

  return injections;
}

/**
 * Generate injection schedule for a cycle
 */
export interface CycleSchedule {
  startDate: Date;
  endDate: Date;
  frequency: 'daily' | 'eod' | 'weekly' | 'biweekly';
  injections: Injection[];
}

export async function generateCycleSchedule(
  baseInjection: Omit<Injection, 'id' | 'notificationId'>,
  startDate: Date,
  cycleLengthWeeks: number,
  frequency: 'daily' | 'eod' | 'weekly' | 'biweekly'
): Promise<CycleSchedule> {
  // Calculate number of injections based on frequency and cycle length
  let injectionCount: number;
  switch (frequency) {
    case 'daily':
      injectionCount = cycleLengthWeeks * 7;
      break;
    case 'eod':
      injectionCount = Math.ceil((cycleLengthWeeks * 7) / 2);
      break;
    case 'weekly':
      injectionCount = cycleLengthWeeks;
      break;
    case 'biweekly':
      injectionCount = Math.ceil(cycleLengthWeeks / 2);
      break;
  }

  const injections = await createRecurringInjections(
    baseInjection,
    frequency,
    injectionCount,
    startDate
  );

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + cycleLengthWeeks * 7);

  return {
    startDate,
    endDate,
    frequency,
    injections,
  };
}

/**
 * Calculate next injection date based on frequency
 */
export function getNextInjectionDate(
  lastInjectionDate: Date,
  frequency: 'daily' | 'eod' | 'weekly' | 'biweekly'
): Date {
  const nextDate = new Date(lastInjectionDate);

  switch (frequency) {
    case 'daily':
      nextDate.setDate(nextDate.getDate() + 1);
      break;
    case 'eod':
      nextDate.setDate(nextDate.getDate() + 2);
      break;
    case 'weekly':
      nextDate.setDate(nextDate.getDate() + 7);
      break;
    case 'biweekly':
      nextDate.setDate(nextDate.getDate() + 14);
      break;
  }

  return nextDate;
}

/**
 * Check if an injection is due (within grace period)
 */
export function isInjectionDue(
  injection: Injection,
  gracePeriodMinutes: number = 30
): boolean {
  const now = new Date();
  const scheduledTime = new Date(injection.scheduledTime);
  const gracePeriodEnd = new Date(scheduledTime.getTime() + gracePeriodMinutes * 60 * 1000);

  return now >= scheduledTime && now <= gracePeriodEnd && injection.status === 'scheduled';
}

/**
 * Check if an injection is overdue
 */
export function isInjectionOverdue(
  injection: Injection,
  gracePeriodMinutes: number = 30
): boolean {
  const now = new Date();
  const scheduledTime = new Date(injection.scheduledTime);
  const gracePeriodEnd = new Date(scheduledTime.getTime() + gracePeriodMinutes * 60 * 1000);

  return now > gracePeriodEnd && injection.status === 'scheduled';
}

