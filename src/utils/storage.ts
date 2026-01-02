import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Storage keys
 */
export const StorageKeys = {
  USER: 'user',
  INJECTIONS: 'injections',
  CALCULATIONS: 'calculations',
  PREFERENCES: 'preferences',
  ONBOARDING_COMPLETE: 'onboarding_complete',
} as const;

/**
 * Save data to AsyncStorage
 */
export async function saveData<T>(key: string, data: T): Promise<void> {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
    throw error;
  }
}

/**
 * Load data from AsyncStorage
 */
export async function loadData<T>(key: string): Promise<T | null> {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Error loading ${key}:`, error);
    return null;
  }
}

/**
 * Remove data from AsyncStorage
 */
export async function removeData(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key}:`, error);
    throw error;
  }
}

/**
 * Clear all data
 */
export async function clearAllData(): Promise<void> {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing storage:', error);
    throw error;
  }
}

/**
 * Get all keys
 */
export async function getAllKeys(): Promise<string[]> {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (error) {
    console.error('Error getting keys:', error);
    return [];
  }
}

/**
 * Save multiple items at once
 */
export async function saveMultiple(items: Array<{ key: string; value: any }>): Promise<void> {
  try {
    const pairs = items.map(({ key, value }) => [
      key,
      JSON.stringify(value),
    ]);
    await AsyncStorage.multiSet(pairs);
  } catch (error) {
    console.error('Error saving multiple items:', error);
    throw error;
  }
}

/**
 * Load multiple items at once
 */
export async function loadMultiple<T>(
  keys: string[]
): Promise<Array<{ key: string; value: T | null }>> {
  try {
    const values = await AsyncStorage.multiGet(keys);
    return values.map(([key, value]) => ({
      key,
      value: value != null ? JSON.parse(value) : null,
    }));
  } catch (error) {
    console.error('Error loading multiple items:', error);
    return keys.map((key) => ({ key, value: null }));
  }
}

