import { useEffect, useState } from 'react';
import { loadData, saveData } from '../utils/storage';
import { StorageKeys } from '../utils/storage';

/**
 * Hook to check if onboarding is complete
 */
export function useOnboarding() {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const completed = await loadData<boolean>(StorageKeys.ONBOARDING_COMPLETE);
      setIsOnboardingComplete(completed === true);
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setIsOnboardingComplete(false);
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = async () => {
    try {
      await saveData(StorageKeys.ONBOARDING_COMPLETE, true);
      setIsOnboardingComplete(true);
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  return {
    isOnboardingComplete,
    isLoading,
    completeOnboarding,
  };
}

