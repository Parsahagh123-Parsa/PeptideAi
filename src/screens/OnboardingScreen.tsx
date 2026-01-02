import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button, Text, ProgressBar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { saveData } from '../utils/storage';
import { StorageKeys } from '../utils/storage';

const { width } = Dimensions.get('window');

const onboardingSteps = [
  {
    icon: 'calculator',
    title: 'Precise Dose Calculator',
    description:
      'Calculate exact injection volumes with support for multiple syringe types and unit conversions.',
  },
  {
    icon: 'calendar-clock',
    title: 'Smart Scheduling',
    description:
      'Schedule your injections and never miss a dose with intelligent reminders and calendar integration.',
  },
  {
    icon: 'robot',
    title: 'AI Recommendations',
    description:
      'Get personalized peptide suggestions based on your health and fitness goals.',
  },
  {
    icon: 'book-open-variant',
    title: 'Comprehensive Library',
    description:
      'Access detailed information about peptides, their mechanisms, dosing, and safety profiles.',
  },
];

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = async () => {
    await saveData(StorageKeys.ONBOARDING_COMPLETE, true);
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' as never }],
    });
  };

  const step = onboardingSteps[currentStep];
  const progress = (currentStep + 1) / onboardingSteps.length;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name={step.icon} size={80} color="#6200ee" />
        </View>

        <Text variant="headlineMedium" style={styles.title}>
          {step.title}
        </Text>

        <Text variant="bodyLarge" style={styles.description}>
          {step.description}
        </Text>

        <ProgressBar progress={progress} color="#6200ee" style={styles.progress} />
      </View>

      <View style={styles.footer}>
        {currentStep < onboardingSteps.length - 1 ? (
          <>
            <Button mode="text" onPress={handleSkip} style={styles.skipButton}>
              Skip
            </Button>
            <Button mode="contained" onPress={handleNext} style={styles.nextButton}>
              Next
            </Button>
          </>
        ) : (
          <Button mode="contained" onPress={handleComplete} style={styles.getStartedButton}>
            Get Started
          </Button>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  iconContainer: {
    marginBottom: 32,
  },
  title: {
    marginTop: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  description: {
    marginTop: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
    maxWidth: width - 64,
  },
  progress: {
    width: width - 64,
    height: 4,
    marginTop: 32,
    borderRadius: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
    paddingBottom: 48,
  },
  skipButton: {
    flex: 1,
  },
  nextButton: {
    flex: 1,
    marginLeft: 16,
  },
  getStartedButton: {
    width: '100%',
  },
});

