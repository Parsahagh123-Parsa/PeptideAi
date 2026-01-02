import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Card,
  Title,
  TextInput,
  Button,
  Paragraph,
  SegmentedButtons,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useStore } from '../store/useStore';
import { scheduleInjectionNotification } from '../services/notificationService';
import { Injection } from '../types';
import { getPeptideById } from '../constants/peptides';

export default function AddInjectionScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { addInjection } = useStore();
  const { peptideId } = (route.params as { peptideId?: string }) || {};

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [dose, setDose] = useState('250');
  const [doseUnit, setDoseUnit] = useState<'mcg' | 'mg'>('mcg');
  const [injectionSite, setInjectionSite] = useState('');
  const [notes, setNotes] = useState('');

  const peptide = peptideId ? getPeptideById(peptideId) : null;

  const handleSave = async () => {
    const injection: Injection = {
      id: `inj_${Date.now()}`,
      userId: 'current_user', // In production, get from auth
      peptideId: peptide?.id || '',
      peptideName: peptide?.name || 'Unknown Peptide',
      scheduledTime: selectedDate,
      dose: parseFloat(dose) || 0,
      unit: doseUnit,
      injectionSite: injectionSite || undefined,
      notes: notes || undefined,
      status: 'scheduled',
    };

    // Schedule notification
    const notificationId = await scheduleInjectionNotification(injection);
    if (notificationId) {
      injection.notificationId = notificationId;
    }

    addInjection(injection);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {peptide && (
        <Card style={styles.card}>
          <Card.Content>
            <Title>Peptide: {peptide.name}</Title>
            <Paragraph>
              Recommended: {peptide.dosingRange.min}-{peptide.dosingRange.max}{' '}
              {peptide.dosingRange.unit} {peptide.dosingRange.frequency}
            </Paragraph>
          </Card.Content>
        </Card>
      )}

      <Card style={styles.card}>
        <Card.Content>
          <Title>Dose</Title>
          <TextInput
            label="Dose Amount"
            value={dose}
            onChangeText={setDose}
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
          />
          <SegmentedButtons
            value={doseUnit}
            onValueChange={(value) => setDoseUnit(value as 'mcg' | 'mg')}
            buttons={[
              { value: 'mcg', label: 'mcg' },
              { value: 'mg', label: 'mg' },
            ]}
            style={styles.segmented}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Schedule</Title>
          <Button
            mode="outlined"
            onPress={() => setShowDatePicker(true)}
            style={styles.button}
          >
            Date: {selectedDate.toLocaleDateString()}
          </Button>
          <Button
            mode="outlined"
            onPress={() => setShowTimePicker(true)}
            style={styles.button}
          >
            Time: {selectedDate.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Button>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, date) => {
                setShowDatePicker(Platform.OS === 'ios');
                if (date) {
                  setSelectedDate(date);
                }
              }}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, date) => {
                setShowTimePicker(Platform.OS === 'ios');
                if (date) {
                  setSelectedDate(date);
                }
              }}
            />
          )}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Additional Information (Optional)</Title>
          <TextInput
            label="Injection Site"
            value={injectionSite}
            onChangeText={setInjectionSite}
            mode="outlined"
            style={styles.input}
            placeholder="e.g., Subcutaneous abdomen"
          />
          <TextInput
            label="Notes"
            value={notes}
            onChangeText={setNotes}
            mode="outlined"
            multiline
            numberOfLines={3}
            style={styles.input}
            placeholder="Any additional notes..."
          />
        </Card.Content>
      </Card>

      <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
        Save Injection
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  segmented: {
    marginTop: 8,
  },
  button: {
    marginTop: 8,
  },
  saveButton: {
    marginTop: 16,
    marginBottom: 32,
  },
});

