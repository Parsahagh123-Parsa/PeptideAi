import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Chip, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Injection } from '../types';
import { format } from 'date-fns';

interface InjectionCardProps {
  injection: Injection;
  onPress?: () => void;
  onComplete?: () => void;
  showActions?: boolean;
}

export default function InjectionCard({
  injection,
  onPress,
  onComplete,
  showActions = true,
}: InjectionCardProps) {
  const getStatusColor = (status: Injection['status']) => {
    switch (status) {
      case 'completed':
        return '#4caf50';
      case 'missed':
        return '#f44336';
      case 'skipped':
        return '#9e9e9e';
      default:
        return '#ff9800';
    }
  };

  const getStatusIcon = (status: Injection['status']) => {
    switch (status) {
      case 'completed':
        return 'check-circle';
      case 'missed':
        return 'alert-circle';
      case 'skipped':
        return 'cancel';
      default:
        return 'clock-outline';
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} disabled={!onPress}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Title style={styles.title}>{injection.peptideName}</Title>
              <Paragraph style={styles.time}>
                {format(new Date(injection.scheduledTime), 'h:mm a')}
              </Paragraph>
            </View>
            <Chip
              icon={() => (
                <MaterialCommunityIcons
                  name={getStatusIcon(injection.status)}
                  size={16}
                  color="#fff"
                />
              )}
              style={[
                styles.statusChip,
                { backgroundColor: getStatusColor(injection.status) },
              ]}
              textStyle={styles.statusText}
            >
              {injection.status}
            </Chip>
          </View>

          <View style={styles.details}>
            <Paragraph style={styles.dose}>
              <MaterialCommunityIcons name="needle" size={16} color="#666" />{' '}
              {injection.dose} {injection.unit}
            </Paragraph>
            {injection.injectionSite && (
              <Paragraph style={styles.site}>
                <MaterialCommunityIcons name="map-marker" size={16} color="#666" />{' '}
                {injection.injectionSite.replace('_', ' ')}
              </Paragraph>
            )}
          </View>

          {injection.notes && (
            <Paragraph style={styles.notes}>{injection.notes}</Paragraph>
          )}

          {showActions && injection.status === 'scheduled' && onComplete && (
            <Button
              mode="contained"
              onPress={onComplete}
              style={styles.completeButton}
              icon="check"
            >
              Mark Complete
            </Button>
          )}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    marginBottom: 4,
  },
  time: {
    color: '#6200ee',
    fontWeight: '600',
    fontSize: 14,
  },
  statusChip: {
    marginLeft: 8,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    textTransform: 'capitalize',
  },
  details: {
    marginBottom: 8,
  },
  dose: {
    marginBottom: 4,
    color: '#666',
  },
  site: {
    color: '#666',
  },
  notes: {
    marginTop: 8,
    fontStyle: 'italic',
    color: '#999',
    fontSize: 12,
  },
  completeButton: {
    marginTop: 12,
  },
});

