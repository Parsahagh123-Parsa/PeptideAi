import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, Button, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../store/useStore';
import { format } from 'date-fns';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user, injections, savedCalculations } = useStore();

  const completedInjections = injections.filter(
    (inj) => inj.status === 'completed'
  );
  const scheduledInjections = injections.filter(
    (inj) => inj.status === 'scheduled'
  );

  const adherenceRate =
    injections.length > 0
      ? Math.round(
          (completedInjections.length / injections.length) * 100
        )
      : 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Profile</Title>
          {user ? (
            <View>
              <Paragraph>Email: {user.email}</Paragraph>
              {user.profile.age && (
                <Paragraph>Age: {user.profile.age}</Paragraph>
              )}
              {user.profile.goals.length > 0 && (
                <Paragraph>
                  Goals: {user.profile.goals.join(', ')}
                </Paragraph>
              )}
            </View>
          ) : (
            <Paragraph>Not logged in</Paragraph>
          )}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Statistics</Title>
          <Divider style={styles.divider} />
          <View style={styles.statRow}>
            <Paragraph style={styles.statLabel}>Total Injections:</Paragraph>
            <Paragraph style={styles.statValue}>{injections.length}</Paragraph>
          </View>
          <View style={styles.statRow}>
            <Paragraph style={styles.statLabel}>Completed:</Paragraph>
            <Paragraph style={styles.statValue}>
              {completedInjections.length}
            </Paragraph>
          </View>
          <View style={styles.statRow}>
            <Paragraph style={styles.statLabel}>Scheduled:</Paragraph>
            <Paragraph style={styles.statValue}>
              {scheduledInjections.length}
            </Paragraph>
          </View>
          <View style={styles.statRow}>
            <Paragraph style={styles.statLabel}>Adherence Rate:</Paragraph>
            <Paragraph style={styles.statValue}>{adherenceRate}%</Paragraph>
          </View>
          <View style={styles.statRow}>
            <Paragraph style={styles.statLabel}>Saved Calculations:</Paragraph>
            <Paragraph style={styles.statValue}>
              {savedCalculations.length}
            </Paragraph>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Settings</Title>
          <Button mode="outlined" style={styles.settingButton}>
            Notification Settings
          </Button>
          <Button mode="outlined" style={styles.settingButton}>
            Units Preferences
          </Button>
          <Button
            mode="outlined"
            style={styles.settingButton}
            onPress={() => navigation.navigate('Settings' as never)}
          >
            Theme Settings
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
  divider: {
    marginVertical: 12,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  statLabel: {
    fontWeight: '600',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  settingButton: {
    marginTop: 8,
  },
  aboutText: {
    marginTop: 8,
    color: '#666',
  },
});

