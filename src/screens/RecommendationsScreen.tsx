import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  Chip,
  Checkbox,
  Text,
} from 'react-native-paper';
import { generateRecommendations } from '../services/aiService';
import { useStore } from '../store/useStore';
import { Goal, Recommendation } from '../types';
import { GOAL_DEFINITIONS } from '../constants/goals';
import { useNavigation } from '@react-navigation/native';

export default function RecommendationsScreen() {
  const navigation = useNavigation();
  const { recommendations, setRecommendations } = useStore();
  const [selectedGoals, setSelectedGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleGoal = (goal: Goal) => {
    setSelectedGoals((prev) =>
      prev.includes(goal)
        ? prev.filter((g) => g !== goal)
        : [...prev, goal]
    );
  };

  const handleGetRecommendations = async () => {
    if (selectedGoals.length === 0) {
      return;
    }

    setLoading(true);
    try {
      const recs = await generateRecommendations({
        goals: selectedGoals,
        profile: {},
      });
      setRecommendations(recs);
    } catch (error) {
      console.error('Error generating recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Select Your Goals</Title>
          <Paragraph style={styles.subtitle}>
            Choose one or more goals to get personalized peptide recommendations
          </Paragraph>

          <View style={styles.goalsContainer}>
            {GOAL_DEFINITIONS.map((goal) => (
              <View key={goal.id} style={styles.goalItem}>
                <Checkbox
                  status={selectedGoals.includes(goal.id) ? 'checked' : 'unchecked'}
                  onPress={() => toggleGoal(goal.id)}
                />
                <View style={styles.goalText}>
                  <Text style={styles.goalLabel}>{goal.label}</Text>
                  <Text style={styles.goalDescription}>{goal.description}</Text>
                </View>
              </View>
            ))}
          </View>

          <Button
            mode="contained"
            onPress={handleGetRecommendations}
            disabled={selectedGoals.length === 0 || loading}
            style={styles.button}
          >
            {loading ? 'Generating...' : 'Get Recommendations'}
          </Button>
        </Card.Content>
      </Card>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6200ee" />
          <Paragraph style={styles.loadingText}>
            AI is analyzing your goals...
          </Paragraph>
        </View>
      )}

      {recommendations.length > 0 && (
        <View style={styles.recommendationsContainer}>
          <Title style={styles.recommendationsTitle}>Your Recommendations</Title>
          {recommendations.map((rec) => (
            <Card
              key={rec.id}
              style={styles.recommendationCard}
              onPress={() =>
                navigation.navigate('PeptideDetail' as never, {
                  peptideId: rec.peptideId,
                } as never)
              }
            >
              <Card.Content>
                <View style={styles.recommendationHeader}>
                  <Title>{rec.peptide.name}</Title>
                  <Chip
                    style={[
                      styles.priorityChip,
                      {
                        backgroundColor:
                          rec.priority === 'primary'
                            ? '#4caf50'
                            : rec.priority === 'secondary'
                            ? '#ff9800'
                            : '#9e9e9e',
                      },
                    ]}
                  >
                    {rec.priority}
                  </Chip>
                </View>
                <Paragraph style={styles.rationale}>{rec.rationale}</Paragraph>
                <View style={styles.benefitsContainer}>
                  {rec.peptide.benefits.slice(0, 3).map((benefit, index) => (
                    <Chip key={index} style={styles.benefitChip}>
                      {benefit}
                    </Chip>
                  ))}
                </View>
                <Paragraph style={styles.timeline}>
                  Expected timeline: {rec.expectedTimeline}
                </Paragraph>
                <Paragraph style={styles.dosing}>
                  Typical dose: {rec.peptide.dosingRange.min}-
                  {rec.peptide.dosingRange.max} {rec.peptide.dosingRange.unit}{' '}
                  {rec.peptide.dosingRange.frequency}
                </Paragraph>
              </Card.Content>
            </Card>
          ))}
        </View>
      )}

      <Card style={styles.disclaimerCard}>
        <Card.Content>
          <Title style={styles.disclaimerTitle}>⚠️ Important Disclaimer</Title>
          <Paragraph style={styles.disclaimerText}>
            These recommendations are generated by AI and are for informational
            purposes only. They do not constitute medical advice. Always consult
            with a qualified healthcare professional before starting any peptide
            protocol.
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
  subtitle: {
    marginBottom: 16,
    color: '#666',
  },
  goalsContainer: {
    marginBottom: 16,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalText: {
    flex: 1,
    marginLeft: 8,
  },
  goalLabel: {
    fontWeight: '600',
    fontSize: 16,
  },
  goalDescription: {
    color: '#666',
    fontSize: 12,
  },
  button: {
    marginTop: 8,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    marginTop: 16,
    color: '#666',
  },
  recommendationsContainer: {
    marginTop: 16,
  },
  recommendationsTitle: {
    marginBottom: 16,
  },
  recommendationCard: {
    marginBottom: 16,
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priorityChip: {
    marginLeft: 8,
  },
  rationale: {
    marginBottom: 12,
    color: '#666',
  },
  benefitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  benefitChip: {
    marginRight: 4,
    marginBottom: 4,
    backgroundColor: '#e3f2fd',
  },
  timeline: {
    marginTop: 8,
    fontWeight: '600',
    color: '#6200ee',
  },
  dosing: {
    marginTop: 4,
    color: '#666',
  },
  disclaimerCard: {
    marginTop: 16,
    backgroundColor: '#fff3cd',
  },
  disclaimerTitle: {
    color: '#856404',
  },
  disclaimerText: {
    color: '#856404',
  },
});

