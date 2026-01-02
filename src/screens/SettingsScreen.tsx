import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Switch } from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  List,
  Divider,
  Button,
  RadioButton,
} from 'react-native-paper';
import { useStore } from '../store/useStore';

export default function SettingsScreen() {
  const { user, setUser } = useStore();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [reminderMinutes, setReminderMinutes] = useState(15);
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('auto');
  const [defaultUnits, setDefaultUnits] = useState<'mcg' | 'mg'>('mcg');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Notifications</Title>
          <List.Item
            title="Enable Notifications"
            description="Receive reminders for scheduled injections"
            right={() => (
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
              />
            )}
          />
          <Divider />
          <List.Item
            title="Reminder Time"
            description={`${reminderMinutes} minutes before injection`}
            onPress={() => {
              // In production, show a picker
            }}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Appearance</Title>
          <List.Item
            title="Theme"
            description="Choose your preferred theme"
            onPress={() => {
              // In production, show theme picker
            }}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Units</Title>
          <RadioButton.Group
            onValueChange={(value) => setDefaultUnits(value as 'mcg' | 'mg')}
            value={defaultUnits}
          >
            <RadioButton.Item label="Micrograms (mcg)" value="mcg" />
            <RadioButton.Item label="Milligrams (mg)" value="mg" />
          </RadioButton.Group>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Data</Title>
          <Button
            mode="outlined"
            onPress={() => {
              // Export data
            }}
            style={styles.button}
          >
            Export Data
          </Button>
          <Button
            mode="outlined"
            onPress={() => {
              // Import data
            }}
            style={styles.button}
          >
            Import Data
          </Button>
          <Button
            mode="outlined"
            textColor="#f44336"
            onPress={() => {
              // Clear all data with confirmation
            }}
            style={styles.button}
          >
            Clear All Data
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>About</Title>
          <Paragraph>PeptAI v1.0.0</Paragraph>
          <Paragraph style={styles.aboutText}>
            Your personalized peptide assistant for safe and effective protocol
            management.
          </Paragraph>
          <Button
            mode="text"
            onPress={() => {
              // Show privacy policy
            }}
            style={styles.linkButton}
          >
            Privacy Policy
          </Button>
          <Button
            mode="text"
            onPress={() => {
              // Show terms of service
            }}
            style={styles.linkButton}
          >
            Terms of Service
          </Button>
        </Card.Content>
      </Card>
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
  button: {
    marginTop: 8,
  },
  linkButton: {
    marginTop: 4,
  },
  aboutText: {
    marginTop: 8,
    color: '#666',
  },
});

