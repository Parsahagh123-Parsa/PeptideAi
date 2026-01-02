import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, Chip, Divider, Button } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getPeptideById } from '../constants/peptides';

export default function PeptideDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { peptideId } = route.params as { peptideId: string };

  const peptide = getPeptideById(peptideId);

  if (!peptide) {
    return (
      <View style={styles.container}>
        <Paragraph>Peptide not found</Paragraph>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.name}>{peptide.name}</Title>
          <Paragraph style={styles.scientificName}>
            {peptide.scientificName}
          </Paragraph>
          <Chip style={styles.categoryChip}>{peptide.category}</Chip>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>What It Does</Title>
          <Paragraph style={styles.text}>{peptide.mechanism}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Benefits</Title>
          {peptide.benefits.map((benefit, index) => (
            <View key={index} style={styles.benefitItem}>
              <Paragraph style={styles.bullet}>•</Paragraph>
              <Paragraph style={styles.benefitText}>{benefit}</Paragraph>
            </View>
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Dosing Information</Title>
          <Paragraph style={styles.dosingText}>
            Typical range: {peptide.dosingRange.min}-{peptide.dosingRange.max}{' '}
            {peptide.dosingRange.unit}
          </Paragraph>
          <Paragraph style={styles.dosingText}>
            Frequency: {peptide.dosingRange.frequency}
          </Paragraph>
          {peptide.dosingRange.cycleLength && (
            <Paragraph style={styles.dosingText}>
              Cycle length: {peptide.dosingRange.cycleLength}
            </Paragraph>
          )}
        </Card.Content>
      </Card>

      {peptide.sideEffects.length > 0 && (
        <Card style={styles.card}>
          <Card.Content>
            <Title>Side Effects</Title>
            {peptide.sideEffects.map((effect, index) => (
              <View key={index} style={styles.sideEffectItem}>
                <Chip
                  style={[
                    styles.sideEffectChip,
                    {
                      backgroundColor:
                        effect.type === 'serious'
                          ? '#ffebee'
                          : effect.type === 'common'
                          ? '#fff3e0'
                          : '#f3e5f5',
                    },
                  ]}
                >
                  {effect.type}
                </Chip>
                <Paragraph style={styles.sideEffectText}>
                  {effect.description}
                </Paragraph>
                {effect.frequency && (
                  <Paragraph style={styles.frequencyText}>
                    Frequency: {effect.frequency}
                  </Paragraph>
                )}
              </View>
            ))}
          </Card.Content>
        </Card>
      )}

      {peptide.contraindications.length > 0 && (
        <Card style={styles.card}>
          <Card.Content>
            <Title>Contraindications</Title>
            {peptide.contraindications.map((contra, index) => (
              <Paragraph key={index} style={styles.contraindication}>
                • {contra}
              </Paragraph>
            ))}
          </Card.Content>
        </Card>
      )}

      {peptide.researchNotes && (
        <Card style={styles.card}>
          <Card.Content>
            <Title>Research Notes</Title>
            <Paragraph style={styles.text}>{peptide.researchNotes}</Paragraph>
          </Card.Content>
        </Card>
      )}

      {peptide.storageRequirements && (
        <Card style={styles.card}>
          <Card.Content>
            <Title>Storage</Title>
            <Paragraph style={styles.text}>
              {peptide.storageRequirements}
            </Paragraph>
          </Card.Content>
        </Card>
      )}

      {peptide.reconstitutionTips && (
        <Card style={styles.card}>
          <Card.Content>
            <Title>Reconstitution Tips</Title>
            <Paragraph style={styles.text}>
              {peptide.reconstitutionTips}
            </Paragraph>
          </Card.Content>
        </Card>
      )}

      <Card style={styles.disclaimerCard}>
        <Card.Content>
          <Title style={styles.disclaimerTitle}>⚠️ Medical Disclaimer</Title>
          <Paragraph style={styles.disclaimerText}>
            This information is for educational purposes only and does not
            constitute medical advice. Always consult with a qualified healthcare
            professional before starting any peptide protocol.
          </Paragraph>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('AddInjection' as never, { peptideId } as never)}
        style={styles.button}
      >
        Schedule Injection
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
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scientificName: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 4,
  },
  categoryChip: {
    marginTop: 8,
    backgroundColor: '#e3f2fd',
  },
  text: {
    marginTop: 8,
    lineHeight: 22,
  },
  benefitItem: {
    flexDirection: 'row',
    marginTop: 8,
  },
  bullet: {
    marginRight: 8,
    fontSize: 18,
  },
  benefitText: {
    flex: 1,
    lineHeight: 22,
  },
  dosingText: {
    marginTop: 8,
    fontWeight: '600',
  },
  sideEffectItem: {
    marginTop: 12,
  },
  sideEffectChip: {
    marginBottom: 4,
  },
  sideEffectText: {
    marginTop: 4,
  },
  frequencyText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  contraindication: {
    marginTop: 8,
    color: '#d32f2f',
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
    marginTop: 8,
  },
  button: {
    marginTop: 16,
    marginBottom: 32,
  },
});

