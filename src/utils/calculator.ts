import { CalculationInput, CalculationResult, SyringeType } from '../types';

/**
 * Calculate peptide dose and syringe units
 */
export function calculateDose(input: CalculationInput): CalculationResult {
  const {
    vialStrength,
    vialStrengthUnit,
    diluentVolume,
    syringeType,
    desiredDose,
    desiredDoseUnit,
  } = input;

  // Convert everything to mcg for consistency
  let vialStrengthMcg: number;
  if (vialStrengthUnit === 'mg') {
    vialStrengthMcg = vialStrength * 1000;
  } else {
    vialStrengthMcg = vialStrength;
  }

  let desiredDoseMcg: number;
  if (desiredDoseUnit === 'mg') {
    desiredDoseMcg = desiredDose * 1000;
  } else {
    desiredDoseMcg = desiredDose;
  }

  // Calculate concentration (mcg/mL)
  const concentrationMcgPerMl = vialStrengthMcg / diluentVolume;
  const concentrationMgPerMl = concentrationMcgPerMl / 1000;

  // Calculate volume needed for desired dose (mL)
  const volumeNeededMl = desiredDoseMcg / concentrationMcgPerMl;

  // Convert to syringe units based on syringe type
  let unitsToDraw: number;
  switch (syringeType) {
    case 'u100':
      // U-100: 100 units = 1mL
      unitsToDraw = volumeNeededMl * 100;
      break;
    case 'u40':
      // U-40: 40 units = 1mL
      unitsToDraw = volumeNeededMl * 40;
      break;
    case 'tuberculin':
      // Tuberculin: 1mL = 100 units (same as U-100)
      unitsToDraw = volumeNeededMl * 100;
      break;
    case 'standard_1ml':
      // Standard 1mL syringe: typically marked in 0.01mL increments
      unitsToDraw = volumeNeededMl * 100; // Treat as 100 units = 1mL
      break;
    default:
      unitsToDraw = volumeNeededMl * 100;
  }

  // Calculate total doses in vial
  const totalDoses = Math.floor(vialStrengthMcg / desiredDoseMcg);

  // Calculate vial duration (days) - requires frequency
  let vialDuration = 0;
  if (input.dosingFrequency) {
    const daysPerDose = getDaysPerDose(input.dosingFrequency);
    vialDuration = totalDoses * daysPerDose;
  }

  // Determine which concentration unit to display
  const useMg = concentrationMgPerMl >= 1;
  const concentration = useMg ? concentrationMgPerMl : concentrationMcgPerMl;
  const concentrationUnit = useMg ? 'mg/mL' : 'mcg/mL';

  return {
    unitsToDraw: Math.round(unitsToDraw * 100) / 100, // Round to 2 decimals
    concentration: Math.round(concentration * 100) / 100,
    concentrationUnit,
    totalDoses,
    vialDuration,
  };
}

/**
 * Get days per dose based on frequency string
 */
function getDaysPerDose(frequency: string): number {
  const freq = frequency.toLowerCase();
  if (freq.includes('daily') || freq === 'qd') {
    return 1;
  }
  if (freq.includes('eod') || freq.includes('every other day')) {
    return 2;
  }
  if (freq.includes('weekly') || freq === 'qw') {
    return 7;
  }
  if (freq.includes('twice weekly') || freq === 'biw') {
    return 3.5;
  }
  // Default to daily
  return 1;
}

/**
 * Convert units to mL based on syringe type
 */
export function unitsToMl(units: number, syringeType: SyringeType): number {
  switch (syringeType) {
    case 'u100':
    case 'tuberculin':
    case 'standard_1ml':
      return units / 100;
    case 'u40':
      return units / 40;
    default:
      return units / 100;
  }
}

/**
 * Convert mL to units based on syringe type
 */
export function mlToUnits(ml: number, syringeType: SyringeType): number {
  switch (syringeType) {
    case 'u100':
    case 'tuberculin':
    case 'standard_1ml':
      return ml * 100;
    case 'u40':
      return ml * 40;
    default:
      return ml * 100;
  }
}

/**
 * Format dose for display
 */
export function formatDose(value: number, unit: 'mcg' | 'mg'): string {
  if (unit === 'mg' && value < 1) {
    // Convert to mcg if less than 1mg
    return `${value * 1000} mcg`;
  }
  return `${value} ${unit}`;
}

/**
 * Validate calculation input
 */
export function validateCalculationInput(
  input: CalculationInput
): { valid: boolean; error?: string } {
  if (input.vialStrength <= 0) {
    return { valid: false, error: 'Vial strength must be greater than 0' };
  }
  if (input.diluentVolume <= 0) {
    return { valid: false, error: 'Diluent volume must be greater than 0' };
  }
  if (input.desiredDose <= 0) {
    return { valid: false, error: 'Desired dose must be greater than 0' };
  }
  if (input.desiredDose > input.vialStrength) {
    return {
      valid: false,
      error: 'Desired dose cannot exceed vial strength',
    };
  }
  return { valid: true };
}

