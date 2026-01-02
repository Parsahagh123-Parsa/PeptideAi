import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import CalculatorScreen from '../screens/CalculatorScreen';
import CalendarScreen from '../screens/CalendarScreen';
import LibraryScreen from '../screens/LibraryScreen';
import RecommendationsScreen from '../screens/RecommendationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PeptideDetailScreen from '../screens/PeptideDetailScreen';
import AddInjectionScreen from '../screens/AddInjectionScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BlendCalculatorScreen from '../screens/BlendCalculatorScreen';
import OnboardingScreen from '../screens/OnboardingScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: '#757575',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Calculator"
        component={CalculatorScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calculator" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-open-variant" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Recommendations"
        component={RecommendationsScreen}
        options={{ title: 'AI Recommendations' }}
      />
      <Stack.Screen
        name="PeptideDetail"
        component={PeptideDetailScreen}
        options={{ title: 'Peptide Details' }}
      />
      <Stack.Screen
        name="AddInjection"
        component={AddInjectionScreen}
        options={{ title: 'Schedule Injection' }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
      <Stack.Screen
        name="BlendCalculator"
        component={BlendCalculatorScreen}
        options={{ title: 'Blend Calculator' }}
      />
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

