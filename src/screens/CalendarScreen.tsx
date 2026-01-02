import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { Card, Title, Paragraph, Button, Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../store/useStore';
import { format } from 'date-fns';
import { Injection } from '../types';

export default function CalendarScreen() {
  const navigation = useNavigation();
  const { injections } = useStore();
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd')
  );

  // Get injections for selected date
  const selectedDateInjections = injections.filter((inj) => {
    const injDate = format(new Date(inj.scheduledTime), 'yyyy-MM-dd');
    return injDate === selectedDate;
  });

  // Mark dates with injections
  const markedDates: any = {};
  injections.forEach((inj) => {
    const dateKey = format(new Date(inj.scheduledTime), 'yyyy-MM-dd');
    if (!markedDates[dateKey]) {
      markedDates[dateKey] = {
        marked: true,
        dotColor: inj.status === 'completed' ? '#4caf50' : '#ff9800',
      };
    }
  });

  // Mark selected date
  if (selectedDate) {
    markedDates[selectedDate] = {
      ...markedDates[selectedDate],
      selected: true,
      selectedColor: '#6200ee',
    };
  }

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

  return (
    <View style={styles.container}>
      <Calendar
        current={selectedDate}
        onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
        markedDates={markedDates}
        theme={{
          selectedDayBackgroundColor: '#6200ee',
          todayTextColor: '#6200ee',
          arrowColor: '#6200ee',
        }}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Title>
              {format(new Date(selectedDate), 'EEEE, MMMM d, yyyy')}
            </Title>
            {selectedDateInjections.length === 0 ? (
              <Paragraph style={styles.noInjections}>
                No injections scheduled for this date
              </Paragraph>
            ) : (
              selectedDateInjections.map((injection) => (
                <View key={injection.id} style={styles.injectionCard}>
                  <View style={styles.injectionHeader}>
                    <Title style={styles.peptideName}>
                      {injection.peptideName}
                    </Title>
                    <Chip
                      style={[
                        styles.statusChip,
                        { backgroundColor: getStatusColor(injection.status) },
                      ]}
                      textStyle={styles.statusText}
                    >
                      {injection.status}
                    </Chip>
                  </View>
                  <Paragraph>
                    Dose: {injection.dose} {injection.unit}
                  </Paragraph>
                  <Paragraph>
                    Time: {format(new Date(injection.scheduledTime), 'h:mm a')}
                  </Paragraph>
                  {injection.injectionSite && (
                    <Paragraph>Site: {injection.injectionSite}</Paragraph>
                  )}
                  {injection.status === 'scheduled' && (
                    <Button
                      mode="contained"
                      onPress={() => {
                        // Mark as completed
                        // This would update the injection status
                      }}
                      style={styles.completeButton}
                    >
                      Mark Complete
                    </Button>
                  )}
                </View>
              ))
            )}
          </Card.Content>
        </Card>
      </ScrollView>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('AddInjection' as never)}
        style={styles.addButton}
      >
        Add Injection
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  noInjections: {
    marginTop: 16,
    fontStyle: 'italic',
    color: '#666',
  },
  injectionCard: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  injectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  peptideName: {
    fontSize: 18,
    flex: 1,
  },
  statusChip: {
    marginLeft: 8,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
  },
  completeButton: {
    marginTop: 8,
  },
  addButton: {
    margin: 16,
  },
});

