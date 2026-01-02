import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, Button, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../store/useStore';
import { format } from 'date-fns';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { injections } = useStore();

  // Get today's injections
  const today = new Date();
  const todayInjections = injections.filter((inj) => {
    const injDate = new Date(inj.scheduledTime);
    return (
      injDate.getDate() === today.getDate() &&
      injDate.getMonth() === today.getMonth() &&
      injDate.getFullYear() === today.getFullYear() &&
      inj.status !== 'completed'
    );
  });

  const upcomingInjections = todayInjections
    .sort((a, b) => a.scheduledTime.getTime() - b.scheduledTime.getTime())
    .slice(0, 3);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Welcome to PeptAI</Title>
            <Paragraph>
              Your personalized peptide assistant for safe and effective protocol management.
            </Paragraph>
          </Card.Content>
        </Card>

        {upcomingInjections.length > 0 && (
          <Card style={styles.card}>
            <Card.Content>
              <Title>Today's Injections</Title>
              {upcomingInjections.map((injection) => (
                <View key={injection.id} style={styles.injectionItem}>
                  <Paragraph style={styles.injectionText}>
                    {injection.peptideName} - {injection.dose} {injection.unit}
                  </Paragraph>
                  <Paragraph style={styles.timeText}>
                    {format(new Date(injection.scheduledTime), 'h:mm a')}
                  </Paragraph>
                </View>
              ))}
            </Card.Content>
          </Card>
        )}

        <Card style={styles.card}>
          <Card.Content>
            <Title>Quick Actions</Title>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('Calculator' as never)}
              style={styles.button}
            >
              Calculate Dose
            </Button>
            <Button
              mode="outlined"
              onPress={() => navigation.navigate('Recommendations' as never)}
              style={styles.button}
            >
              Get AI Recommendations
            </Button>
            <Button
              mode="outlined"
              onPress={() => navigation.navigate('Library' as never)}
              style={styles.button}
            >
              Browse Peptide Library
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Safety Reminder</Title>
            <Paragraph>
              This app is for informational purposes only. Always consult with a qualified
              healthcare professional before starting any peptide protocol.
            </Paragraph>
          </Card.Content>
        </Card>
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('AddInjection' as never)}
      />
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
  button: {
    marginTop: 8,
  },
  injectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  injectionText: {
    flex: 1,
  },
  timeText: {
    color: '#6200ee',
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

