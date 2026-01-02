import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';
import {
  Card,
  Title,
  TextInput,
  Button,
  SegmentedButtons,
  Paragraph,
  Divider,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { calculateDose, validateCalculationInput } from '../utils/calculator';
import { CalculationInput, CalculationResult } from '../types';
import { useStore } from '../store/useStore';

export default function CalculatorScreen() {
  const navigation = useNavigation();
  const [input, setInput] = useState<CalculationInput>({
    vialStrength: 5,
    vialStrengthUnit: 'mg',
    diluentVolume: 2,
    syringeType: 'u100',
    desiredDose: 250,
    desiredDoseUnit: 'mcg',
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const { addCalculation } = useStore();

  const handleCalculate = () => {
    const validation = validateCalculationInput(input);
    if (!validation.valid) {
      Alert.alert('Invalid Input', validation.error);
      return;
    }

    try {
      const calculationResult = calculateDose(input);
      setResult(calculationResult);

      // Save to history
      addCalculation({
        ...input,
        id: `calc_${Date.now()}`,
        result: calculationResult,
        createdAt: new Date(),
      });
    } catch (error) {
      Alert.alert('Calculation Error', 'An error occurred during calculation.');
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Peptide Dose Calculator</Title>
          <Paragraph style={styles.subtitle}>
            Calculate the exact units to draw for your desired dose
          </Paragraph>

          <TextInput
            label="Vial Strength"
            value={input.vialStrength.toString()}
            onChangeText={(text) =>
              setInput({ ...input, vialStrength: parseFloat(text) || 0 })
            }
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
          />

          <SegmentedButtons
            value={input.vialStrengthUnit}
            onValueChange={(value) =>
              setInput({ ...input, vialStrengthUnit: value as 'mg' | 'mcg' })
            }
            buttons={[
              { value: 'mg', label: 'mg' },
              { value: 'mcg', label: 'mcg' },
            ]}
            style={styles.segmented}
          />

          <TextInput
            label="Diluent Volume (mL)"
            value={input.diluentVolume.toString()}
            onChangeText={(text) =>
              setInput({ ...input, diluentVolume: parseFloat(text) || 0 })
            }
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Desired Dose"
            value={input.desiredDose.toString()}
            onChangeText={(text) =>
              setInput({ ...input, desiredDose: parseFloat(text) || 0 })
            }
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
          />

          <SegmentedButtons
            value={input.desiredDoseUnit}
            onValueChange={(value) =>
              setInput({ ...input, desiredDoseUnit: value as 'mcg' | 'mg' })
            }
            buttons={[
              { value: 'mcg', label: 'mcg' },
              { value: 'mg', label: 'mg' },
            ]}
            style={styles.segmented}
          />

          <TextInput
            label="Syringe Type"
            value={input.syringeType}
            onChangeText={(text) =>
              setInput({ ...input, syringeType: text as any })
            }
            mode="outlined"
            style={styles.input}
            editable={false}
            right={
              <TextInput.Icon
                icon="chevron-down"
                onPress={() => {
                  // In a full implementation, show a picker
                  Alert.alert('Syringe Type', 'U-100 insulin syringe selected');
                }}
              />
            }
          />

          <Button
            mode="contained"
            onPress={handleCalculate}
            style={styles.calculateButton}
          >
            Calculate
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('BlendCalculator' as never)}
            style={styles.blendButton}
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
              <Paragraph style={styles.resultLabel}>Units to Draw:</Paragraph>
              <Paragraph style={styles.resultValue}>
                {result.unitsToDraw.toFixed(2)} units
              </Paragraph>
            </View>
            <View style={styles.resultRow}>
              <Paragraph style={styles.resultLabel}>Concentration:</Paragraph>
              <Paragraph style={styles.resultValue}>
                {result.concentration.toFixed(2)} {result.concentrationUnit}
              </Paragraph>
            </View>
            <View style={styles.resultRow}>
              <Paragraph style={styles.resultLabel}>Total Doses:</Paragraph>
              <Paragraph style={styles.resultValue}>{result.totalDoses}</Paragraph>
            </View>
            {result.vialDuration > 0 && (
              <View style={styles.resultRow}>
                <Paragraph style={styles.resultLabel}>Vial Duration:</Paragraph>
                <Paragraph style={styles.resultValue}>
                  ~{result.vialDuration} days
                </Paragraph>
              </View>
            )}
          </Card.Content>
        </Card>
      )}

      <Card style={styles.infoCard}>
        <Card.Content>
          <Title>How to Use</Title>
          <Paragraph>
            1. Enter your peptide vial strength (e.g., 5mg){'\n'}
            2. Enter the volume of diluent you'll add (e.g., 2mL){'\n'}
            3. Enter your desired dose per injection{'\n'}
            4. Select your syringe type{'\n'}
            5. Tap Calculate to see the exact units to draw
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
  input: {
    marginBottom: 12,
  },
  segmented: {
    marginBottom: 16,
  },
  calculateButton: {
    marginTop: 8,
  },
  blendButton: {
    marginTop: 8,
  },
  resultCard: {
    marginBottom: 16,
    backgroundColor: '#e8f5e9',
  },
  divider: {
    marginVertical: 12,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  infoCard: {
    marginBottom: 16,
  },
});

