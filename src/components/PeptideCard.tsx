import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Chip } from 'react-native-paper';
import { Peptide } from '../types';

interface PeptideCardProps {
  peptide: Peptide;
  onPress: () => void;
  showCategory?: boolean;
}

export default function PeptideCard({
  peptide,
  onPress,
  showCategory = true,
}: PeptideCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <Title style={styles.title}>{peptide.name}</Title>
            {showCategory && (
              <Chip style={styles.categoryChip} textStyle={styles.categoryText}>
                {peptide.category.replace('_', ' ')}
              </Chip>
            )}
          </View>
          <Paragraph numberOfLines={2} style={styles.description}>
            {peptide.mechanism}
          </Paragraph>
          <View style={styles.benefitsContainer}>
            {peptide.benefits.slice(0, 3).map((benefit, index) => (
              <Chip key={index} style={styles.benefitChip} textStyle={styles.benefitText}>
                {benefit}
              </Chip>
            ))}
          </View>
          <Paragraph style={styles.dosingInfo}>
            {peptide.dosingRange.min}-{peptide.dosingRange.max}{' '}
            {peptide.dosingRange.unit} {peptide.dosingRange.frequency}
          </Paragraph>
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
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: 18,
  },
  categoryChip: {
    backgroundColor: '#e3f2fd',
    marginLeft: 8,
  },
  categoryText: {
    fontSize: 10,
    textTransform: 'capitalize',
  },
  description: {
    marginBottom: 12,
    color: '#666',
    lineHeight: 20,
  },
  benefitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  benefitChip: {
    marginRight: 4,
    marginBottom: 4,
    backgroundColor: '#f3e5f5',
  },
  benefitText: {
    fontSize: 11,
  },
  dosingInfo: {
    marginTop: 4,
    fontWeight: '600',
    color: '#6200ee',
  },
});

