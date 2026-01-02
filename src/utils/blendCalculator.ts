import { CalculationInput, CalculationResult } from '../types';
import { calculateDose } from './calculator';

/**
 * Peptide blend component
 */
export interface BlendComponent {
  peptideId: string;
  peptideName: string;
  amount: number; // mg or mcg
  unit: 'mg' | 'mcg';
  ratio?: number; // Optional ratio in the blend
}

/**
 * Blend calculation input
 */
export interface BlendCalculationInput {
  components: BlendComponent[];
  totalVialStrength: number; // Total mg or mcg in vial
  vialStrengthUnit: 'mg' | 'mcg';
  diluentVolume: number; // mL
  syringeType: CalculationInput['syringeType'];
  desiredDose: number; // Total desired dose
  desiredDoseUnit: 'mcg' | 'mg';
}

/**
 * Blend calculation result
 */
export interface BlendCalculationResult {
  totalUnitsToDraw: number;
  componentResults: Array<{
    peptideName: string;
    amountInDose: number;
    unitsToDraw: number;
    percentage: number;
  }>;
  totalConcentration: number;
  concentrationUnit: 'mg/mL' | 'mcg/mL';
  totalDoses: number;
}

/**
 * Calculate dose for a multi-peptide blend
 */
export function calculateBlendDose(
  input: BlendCalculationInput
): BlendCalculationResult {
  const { components, totalVialStrength, vialStrengthUnit, diluentVolume, syringeType, desiredDose, desiredDoseUnit } = input;

  // Convert everything to mcg for consistency
  let totalVialStrengthMcg: number;
  if (vialStrengthUnit === 'mg') {
    totalVialStrengthMcg = totalVialStrength * 1000;
  } else {
    totalVialStrengthMcg = totalVialStrength;
  }

  let desiredDoseMcg: number;
  if (desiredDoseUnit === 'mg') {
    desiredDoseMcg = desiredDose * 1000;
  } else {
    desiredDoseMcg = desiredDose;
  }

  // Calculate total concentration
  const totalConcentrationMcgPerMl = totalVialStrengthMcg / diluentVolume;
  const totalConcentrationMgPerMl = totalConcentrationMcgPerMl / 1000;

  // Calculate volume needed for desired total dose
  const volumeNeededMl = desiredDoseMcg / totalConcentrationMcgPerMl;

  // Convert to syringe units
  let totalUnitsToDraw: number;
  switch (syringeType) {
    case 'u100':
    case 'tuberculin':
    case 'standard_1ml':
      totalUnitsToDraw = volumeNeededMl * 100;
      break;
    case 'u40':
      totalUnitsToDraw = volumeNeededMl * 40;
      break;
    default:
      totalUnitsToDraw = volumeNeededMl * 100;
  }

  // Calculate individual component amounts
  const componentResults = components.map((component) => {
    // Convert component amount to mcg
    let componentAmountMcg: number;
    if (component.unit === 'mg') {
      componentAmountMcg = component.amount * 1000;
    } else {
      componentAmountMcg = component.amount;
    }

    // Calculate percentage of this component in the blend
    const percentage = (componentAmountMcg / totalVialStrengthMcg) * 100;

    // Calculate amount of this component in the desired dose
    const amountInDoseMcg = (desiredDoseMcg * percentage) / 100;

    // Calculate units to draw for this component (proportional)
    const componentUnitsToDraw = (totalUnitsToDraw * percentage) / 100;

    return {
      peptideName: component.peptideName,
      amountInDose: component.unit === 'mg' ? amountInDoseMcg / 1000 : amountInDoseMcg,
      unitsToDraw: Math.round(componentUnitsToDraw * 100) / 100,
      percentage: Math.round(percentage * 100) / 100,
    };
  });

  // Calculate total doses
  const totalDoses = Math.floor(totalVialStrengthMcg / desiredDoseMcg);

  // Determine concentration unit
  const useMg = totalConcentrationMgPerMl >= 1;
  const totalConcentration = useMg ? totalConcentrationMgPerMl : totalConcentrationMcgPerMl;
  const concentrationUnit = useMg ? 'mg/mL' : 'mcg/mL';

  return {
    totalUnitsToDraw: Math.round(totalUnitsToDraw * 100) / 100,
    componentResults,
    totalConcentration: Math.round(totalConcentration * 100) / 100,
    concentrationUnit,
    totalDoses,
  };
}

/**
 * Validate blend calculation input
 */
export function validateBlendInput(
  input: BlendCalculationInput
): { valid: boolean; error?: string } {
  if (input.components.length < 2) {
    return { valid: false, error: 'Blend must contain at least 2 peptides' };
  }

  if (input.totalVialStrength <= 0) {
    return { valid: false, error: 'Total vial strength must be greater than 0' };
  }

  if (input.diluentVolume <= 0) {
    return { valid: false, error: 'Diluent volume must be greater than 0' };
  }

  if (input.desiredDose <= 0) {
    return { valid: false, error: 'Desired dose must be greater than 0' };
  }

  // Check that component amounts don't exceed total
  const totalComponentAmount = input.components.reduce((sum, comp) => {
    const amountMcg = comp.unit === 'mg' ? comp.amount * 1000 : comp.amount;
    return sum + amountMcg;
  }, 0);

  const totalVialMcg =
    input.vialStrengthUnit === 'mg' ? input.totalVialStrength * 1000 : input.totalVialStrength;

  if (totalComponentAmount > totalVialMcg * 1.01) {
    // Allow 1% tolerance for rounding
    return {
      valid: false,
      error: 'Component amounts exceed total vial strength',
    };
  }

  return { valid: true };
}

