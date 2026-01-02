// User Types
export interface User {
  id: string;
  email: string;
  profile: UserProfile;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  age?: number;
  gender?: 'male' | 'female' | 'other';
  weight?: number; // kg
  height?: number; // cm
  goals: Goal[];
  medicalHistory: string[];
  currentMedications: string[];
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  notificationSettings: NotificationSettings;
  defaultUnits: 'mcg' | 'mg';
  preferredInjectionTimes: string[];
}

export interface NotificationSettings {
  enabled: boolean;
  reminderMinutes: number; // minutes before injection
  quietHoursStart?: string;
  quietHoursEnd?: string;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

// Goal Types
export type Goal =
  | 'fat_loss'
  | 'muscle_gain'
  | 'recovery'
  | 'anti_aging'
  | 'skin_health'
  | 'metabolic_health'
  | 'cognitive'
  | 'sleep';

// Peptide Types
export interface Peptide {
  id: string;
  name: string;
  scientificName: string;
  category: PeptideCategory;
  mechanism: string;
  benefits: string[];
  dosingRange: DosingRange;
  sideEffects: SideEffect[];
  contraindications: string[];
  researchNotes: string;
  storageRequirements?: string;
  reconstitutionTips?: string;
}

export type PeptideCategory =
  | 'growth_factors'
  | 'metabolic'
  | 'cognitive'
  | 'recovery'
  | 'anti_aging'
  | 'skin'
  | 'sleep';

export interface DosingRange {
  min: number;
  max: number;
  unit: 'mcg' | 'mg';
  frequency: string; // e.g., "daily", "EOD", "weekly"
  cycleLength?: string; // e.g., "8-12 weeks"
}

export interface SideEffect {
  type: 'common' | 'rare' | 'serious';
  description: string;
  frequency?: string;
}

// Calculator Types
export interface CalculationInput {
  peptideId?: string;
  vialStrength: number;
  vialStrengthUnit: 'mg' | 'mcg';
  diluentVolume: number; // mL
  syringeType: SyringeType;
  desiredDose: number;
  desiredDoseUnit: 'mcg' | 'mg';
  dosingFrequency?: string;
}

export interface CalculationResult {
  unitsToDraw: number;
  concentration: number; // mg/mL or mcg/mL
  concentrationUnit: 'mg/mL' | 'mcg/mL';
  totalDoses: number;
  vialDuration: number; // days
  costPerDose?: number;
}

export interface SavedCalculation extends CalculationInput {
  id: string;
  result: CalculationResult;
  createdAt: Date;
  name?: string;
}

export type SyringeType =
  | 'u100' // U-100 insulin syringe (100 units = 1mL)
  | 'u40' // U-40 insulin syringe (40 units = 1mL)
  | 'tuberculin' // Tuberculin syringe (1mL = 100 units)
  | 'standard_1ml'; // Standard 1mL syringe

// Injection Types
export interface Injection {
  id: string;
  userId: string;
  peptideId: string;
  peptideName: string;
  scheduledTime: Date;
  completedTime?: Date;
  dose: number;
  unit: 'mcg' | 'mg';
  injectionSite?: InjectionSite;
  notes?: string;
  status: InjectionStatus;
  notificationId?: string;
}

export type InjectionStatus = 'scheduled' | 'completed' | 'missed' | 'skipped';

export type InjectionSite =
  | 'subcutaneous_abdomen'
  | 'subcutaneous_thigh'
  | 'subcutaneous_arm'
  | 'intramuscular_deltoid'
  | 'intramuscular_glute'
  | 'other';

// Recommendation Types
export interface Recommendation {
  id: string;
  peptideId: string;
  peptide: Peptide;
  rationale: string;
  priority: 'primary' | 'secondary' | 'optional';
  expectedTimeline: string;
  stackCompatibility: string[];
  userGoals: Goal[];
}

export interface RecommendationRequest {
  goals: Goal[];
  profile: Partial<UserProfile>;
  additionalContext?: string;
}

// Calendar Types
export interface CalendarEvent {
  id: string;
  date: Date;
  injections: Injection[];
  isCompleted: boolean;
}

