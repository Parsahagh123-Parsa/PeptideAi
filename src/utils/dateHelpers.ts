import { format, isToday, isTomorrow, isYesterday, addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

/**
 * Format date for display with smart formatting
 */
export function formatDateSmart(date: Date): string {
  if (isToday(date)) {
    return 'Today';
  }
  if (isTomorrow(date)) {
    return 'Tomorrow';
  }
  if (isYesterday(date)) {
    return 'Yesterday';
  }
  return format(date, 'MMM d, yyyy');
}

/**
 * Format date and time together
 */
export function formatDateTime(date: Date): string {
  return format(date, 'MMM d, yyyy h:mm a');
}

/**
 * Format time only
 */
export function formatTime(date: Date): string {
  return format(date, 'h:mm a');
}

/**
 * Get date range for week
 */
export function getWeekRange(date: Date = new Date()): { start: Date; end: Date } {
  return {
    start: startOfWeek(date, { weekStartsOn: 1 }), // Monday
    end: endOfWeek(date, { weekStartsOn: 1 }),
  };
}

/**
 * Get date range for month
 */
export function getMonthRange(date: Date = new Date()): { start: Date; end: Date } {
  return {
    start: startOfMonth(date),
    end: endOfMonth(date),
  };
}

/**
 * Check if date is in the past
 */
export function isPast(date: Date): boolean {
  return date < new Date();
}

/**
 * Check if date is in the future
 */
export function isFuture(date: Date): boolean {
  return date > new Date();
}

/**
 * Get days until date
 */
export function daysUntil(date: Date): number {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/**
 * Get hours until date
 */
export function hoursUntil(date: Date): number {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60));
}

/**
 * Get relative time string (e.g., "in 2 hours", "2 days ago")
 */
export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (Math.abs(minutes) < 60) {
    if (minutes === 0) return 'now';
    if (minutes > 0) return `in ${minutes} minute${minutes !== 1 ? 's' : ''}`;
    return `${Math.abs(minutes)} minute${Math.abs(minutes) !== 1 ? 's' : ''} ago`;
  }

  if (Math.abs(hours) < 24) {
    if (hours > 0) return `in ${hours} hour${hours !== 1 ? 's' : ''}`;
    return `${Math.abs(hours)} hour${Math.abs(hours) !== 1 ? 's' : ''} ago`;
  }

  if (Math.abs(days) < 7) {
    if (days > 0) return `in ${days} day${days !== 1 ? 's' : ''}`;
    return `${Math.abs(days)} day${Math.abs(days) !== 1 ? 's' : ''} ago`;
  }

  return formatDateSmart(date);
}

/**
 * Create recurring dates based on frequency
 */
export function createRecurringDates(
  startDate: Date,
  frequency: 'daily' | 'eod' | 'weekly' | 'biweekly',
  count: number
): Date[] {
  const dates: Date[] = [];
  let currentDate = new Date(startDate);

  for (let i = 0; i < count; i++) {
    dates.push(new Date(currentDate));

    switch (frequency) {
      case 'daily':
        currentDate = addDays(currentDate, 1);
        break;
      case 'eod':
        currentDate = addDays(currentDate, 2);
        break;
      case 'weekly':
        currentDate = addDays(currentDate, 7);
        break;
      case 'biweekly':
        currentDate = addDays(currentDate, 14);
        break;
    }
  }

  return dates;
}

