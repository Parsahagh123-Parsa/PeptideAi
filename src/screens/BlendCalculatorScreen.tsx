import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';
import {
  Card,
  Title,
  TextInput,
  Button,
  Paragraph,
  Divider,
  Chip,
  IconButton,
} from 'react-native-paper';
import { PEPTIDES } from '../constants/peptides';
import { calculateBlendDose, validateBlendInput, BlendCalculationInput, BlendComponent } from '../utils/blendCalculator';

export default function BlendCalculatorScreen() {
  const [components, setComponents] = useState<BlendComponent[]>([
    { peptideId: '', peptideName: '', amount: 0, unit: 'mcg' },
  ]);
  const [totalVialStrength, setTotalVialStrength] = useState('5');
  const [vialStrengthUnit, setVialStrengthUnit] = useState<'mg' | 'mcg'>('mg');
  const [diluentVolume, setDiluentVolume] = useState('2');
  const [syringeType, setSyringeType] = useState<'u100' | 'u40' | 'tuberculin' | 'standard_1ml'>('u100');
  const [desiredDose, setDesiredDose] = useState('250');
  const [desiredDoseUnit, setDesiredDoseUnit] = useState<'mcg' | 'mg'>('mcg');
  const [result, setResult] = useState<ReturnType<typeof calculateBlendDose> | null>(null);

  const addComponent = () => {
    setComponents([...components, { peptideId: '', peptideName: '', amount: 0, unit: 'mcg' }]);
  };

  const removeComponent = (index: number) => {
    setComponents(components.filter((_, i) => i !== index));
  };

  const updateComponent = (index: number, updates: Partial<BlendComponent>) => {
    const newComponents = [...components];
    newComponents[index] = { ...newComponents[index], ...updates };
    
    // If peptide selected, update name
    if (updates.peptideId) {
      const peptide = PEPTIDES.find(p => p.id === updates.peptideId);
      if (peptide) {
        newComponents[index].peptideName = peptide.name;
      }
    }
    
    setComponents(newComponents);
  };

  const handleCalculate = () => {
    // Validate components
    if (components.some(c => !c.peptideId || c.amount <= 0)) {
      Alert.alert('Invalid Input', 'Please fill in all peptide components');
      return;
    }

    const input: BlendCalculationInput = {
      components: components.filter(c => c.peptideId),
      totalVialStrength: parseFloat(totalVialStrength) || 0,
      vialStrengthUnit,
      diluentVolume: parseFloat(diluentVolume) || 0,
      syringeType,
      desiredDose: parseFloat(desiredDose) || 0,
      desiredDoseUnit,
    };

    const validation = validateBlendInput(input);
    if (!validation.valid) {
      Alert.alert('Invalid Input', validation.error);
      return;
    }

    try {
      const calculationResult = calculateBlendDose(input);
      setResult(calculationResult);
    } catch (error) {
      Alert.alert('Calculation Error', 'An error occurred during calculation.');
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Multi-Peptide Blend Calculator</Title>
          <Paragraph style={styles.subtitle}>
            Calculate doses for peptide blends
          </Paragraph>

          {components.map((component, index) => (
            <Card key={index} style={styles.componentCard}>
              <Card.Content>
                <View style={styles.componentHeader}>
                  <Title style={styles.componentTitle}>Peptide {index + 1}</Title>
                  {components.length > 1 && (
                    <IconButton
                      icon="delete"
                      size={20}
                      onPress={() => removeComponent(index)}
                    />
                  )}
                </View>
                <TextInput
                  label="Peptide"
                  value={component.peptideName}
                  mode="outlined"
                  style={styles.input}
                  editable={false}
                  right={
                    <TextInput.Icon
                      icon="chevron-down"
                      onPress={() => {
                        // In production, show peptide picker
                        Alert.alert('Select Peptide', 'Peptide picker coming soon');
                      }}
                    />
                  }
                />
                <View style={styles.amountRow}>
                  <TextInput
                    label="Amount"
                    value={component.amount.toString()}
                    onChangeText={(text) =>
                      updateComponent(index, { amount: parseFloat(text) || 0 })
                    }
                    keyboardType="numeric"
                    mode="outlined"
                    style={[styles.input, styles.amountInput]}
                  />
                  <Chip
                    selected={component.unit === 'mcg'}
                    onPress={() => updateComponent(index, { unit: 'mcg' })}
                    style={styles.unitChip}
                  >
                    mcg
                  </Chip>
                  <Chip
                    selected={component.unit === 'mg'}
                    onPress={() => updateComponent(index, { unit: 'mg' })}
                    style={styles.unitChip}
                  >
                    mg
                  </Chip>
                </View>
              </Card.Content>
            </Card>
          ))}

          <Button mode="outlined" onPress={addComponent} style={styles.addButton}>
            Add Peptide
          </Button>

          <Divider style={styles.divider} />

          <TextInput
            label="Total Vial Strength"
            value={totalVialStrength}
            onChangeText={setTotalVialStrength}
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
          />
          <View style={styles.unitRow}>
            <Chip
              selected={vialStrengthUnit === 'mg'}
              onPress={() => setVialStrengthUnit('mg')}
            >
              mg
            </Chip>
            <Chip
              selected={vialStrengthUnit === 'mcg'}
              onPress={() => setVialStrengthUnit('mcg')}
            >
              mcg
            </Chip>
          </View>

          <TextInput
            label="Diluent Volume (mL)"
            value={diluentVolume}
            onChangeText={setDiluentVolume}
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Desired Total Dose"
            value={desiredDose}
            onChangeText={setDesiredDose}
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
          />
          <View style={styles.unitRow}>
            <Chip
              selected={desiredDoseUnit === 'mcg'}
              onPress={() => setDesiredDoseUnit('mcg')}
            >
              mcg
            </Chip>
            <Chip
              selected={desiredDoseUnit === 'mg'}
              onPress={() => setDesiredDoseUnit('mg')}
            >
              mg
            </Chip>
          </View>

          <Button
            mode="contained"
            onPress={handleCalculate}
            style={styles.calculateButton}
          >
            Calculate Blend
          </Button>
        </Card.Content>
      </Card>

      {result && (
        <Card style={styles.resultCard}>
          <Card.Content>
            <Title>Results</Title>
            <Divider style={styles.divider} />
            <View style={styles.resultRow}>
              <Paragraph style={styles.resultLabel}>Total Units to Draw:</Paragraph>
              <Paragraph style={styles.resultValue}>
                {result.totalUnitsToDraw.toFixed(2)} units
              </Paragraph>
            </View>
            <View style={styles.resultRow}>
              <Paragraph style={styles.resultLabel}>Total Concentration:</Paragraph>
              <Paragraph style={styles.resultValue}>
                {result.totalConcentration.toFixed(2)} {result.concentrationUnit}
              </Paragraph>
            </View>
            <View style={styles.resultRow}>
              <Paragraph style={styles.resultLabel}>Total Doses:</Paragraph>
              <Paragraph style={styles.resultValue}>{result.totalDoses}</Paragraph>
            </View>

            <Divider style={styles.divider} />
            <Title style={styles.componentResultsTitle}>Per Component:</Title>
            {result.componentResults.map((comp, index) => (
              <View key={index} style={styles.componentResult}>
                <Paragraph style={styles.componentName}>{comp.peptideName}</Paragraph>
                <View style={styles.componentResultDetails}>
                  <Paragraph>
                    {comp.amountInDose.toFixed(2)} {desiredDoseUnit} ({comp.percentage}%)
                  </Paragraph>
                  <Paragraph style={styles.unitsText}>
                    {comp.unitsToDraw.toFixed(2)} units
                  </Paragraph>
                </View>
              </View>
            ))}
          </Card.Content>
        </Card>
      )}
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
  componentCard: {
    marginBottom: 12,
    backgroundColor: '#f5f5f5',
  },
  componentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  componentTitle: {
    fontSize: 16,
  },
  input: {
    marginBottom: 12,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  amountInput: {
    flex: 1,
    marginRight: 8,
  },
  unitChip: {
    marginRight: 4,
  },
  unitRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  addButton: {
    marginTop: 8,
  },
  divider: {
    marginVertical: 16,
  },
  calculateButton: {
    marginTop: 8,
  },
  resultCard: {
    marginBottom: 16,
    backgroundColor: '#e8f5e9',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  resultLabel: {
    fontWeight: '600',
  },
  resultValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  componentResultsTitle: {
    marginTop: 16,
    fontSize: 18,
  },
  componentResult: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  componentName: {
    fontWeight: '600',
    marginBottom: 8,
  },
  componentResultDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  unitsText: {
    color: '#2e7d32',
    fontWeight: '600',
  },
});

