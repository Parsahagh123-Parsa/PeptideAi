import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface EmptyStateProps {
  icon?: string;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon = 'inbox',
  title,
  message,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={icon} size={64} color="#ccc" />
      <Text variant="titleLarge" style={styles.title}>
        {title}
      </Text>
      <Text variant="bodyMedium" style={styles.message}>
        {message}
      </Text>
      {actionLabel && onAction && (
        <Button mode="contained" onPress={onAction} style={styles.button}>
          {actionLabel}
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    marginTop: 16,
    textAlign: 'center',
  },
  message: {
    marginTop: 8,
    textAlign: 'center',
    color: '#666',
  },
  button: {
    marginTop: 24,
  },
});

