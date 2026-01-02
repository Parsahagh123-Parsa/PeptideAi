import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

import MainNavigator from './src/navigation/MainNavigator';
import OnboardingScreen from './src/screens/OnboardingScreen';
import { setupNotificationChannel } from './src/services/notificationService';
import { useOnboarding } from './src/hooks/useOnboarding';
import { lightTheme, darkTheme } from './src/theme';

function AppContent() {
  const { isOnboardingComplete, isLoading } = useOnboarding();
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    // Set up notification channel on app start
    setupNotificationChannel();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  if (isOnboardingComplete === false) {
    return <OnboardingScreen />;
  }

  return (
    <NavigationContainer>
      <MainNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <PaperProvider theme={lightTheme}>
          <AppContent />
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

