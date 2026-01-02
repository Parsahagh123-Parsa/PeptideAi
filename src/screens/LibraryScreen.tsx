import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, FlatList } from 'react-native';
import { Searchbar, Card, Title, Paragraph, Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { PEPTIDES, searchPeptides, getPeptidesByCategory } from '../constants/peptides';
import { Peptide } from '../types';

export default function LibraryScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPeptides = React.useMemo(() => {
    let peptides = PEPTIDES;

    if (selectedCategory) {
      peptides = getPeptidesByCategory(selectedCategory as any);
    }

    if (searchQuery) {
      peptides = searchPeptides(searchQuery);
    }

    return peptides;
  }, [searchQuery, selectedCategory]);

  const categories = [
    'All',
    'growth_factors',
    'metabolic',
    'cognitive',
    'recovery',
    'anti_aging',
    'skin',
    'sleep',
  ];

  const renderPeptide = ({ item }: { item: Peptide }) => (
    <Card
      style={styles.card}
      onPress={() =>
        navigation.navigate('PeptideDetail' as never, { peptideId: item.id } as never)
      }
    >
      <Card.Content>
        <View style={styles.cardHeader}>
          <Title>{item.name}</Title>
          <Chip style={styles.categoryChip}>{item.category}</Chip>
        </View>
        <Paragraph numberOfLines={2} style={styles.description}>
          {item.mechanism}
        </Paragraph>
        <View style={styles.benefitsContainer}>
          {item.benefits.slice(0, 3).map((benefit, index) => (
            <Chip key={index} style={styles.benefitChip} textStyle={styles.benefitText}>
              {benefit}
            </Chip>
          ))}
        </View>
        <Paragraph style={styles.dosingInfo}>
          Typical dose: {item.dosingRange.min}-{item.dosingRange.max}{' '}
          {item.dosingRange.unit} {item.dosingRange.frequency}
        </Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search peptides..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContent}
      >
        {categories.map((category) => (
          <Chip
            key={category}
            selected={selectedCategory === category || (category === 'All' && !selectedCategory)}
            onPress={() =>
              setSelectedCategory(category === 'All' ? null : category)
            }
            style={styles.categoryFilter}
          >
            {category === 'All' ? 'All' : category.replace('_', ' ')}
          </Chip>
        ))}
      </ScrollView>

      <FlatList
        data={filteredPeptides}
        renderItem={renderPeptide}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Card style={styles.emptyCard}>
            <Card.Content>
              <Paragraph>No peptides found matching your search.</Paragraph>
            </Card.Content>
          </Card>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbar: {
    margin: 16,
  },
  categoryScroll: {
    maxHeight: 50,
  },
  categoryContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryFilter: {
    marginRight: 8,
  },
  listContent: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryChip: {
    backgroundColor: '#e3f2fd',
  },
  description: {
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
    backgroundColor: '#f3e5f5',
  },
  benefitText: {
    fontSize: 11,
  },
  dosingInfo: {
    marginTop: 8,
    fontWeight: '600',
    color: '#6200ee',
  },
  emptyCard: {
    marginTop: 32,
  },
});

