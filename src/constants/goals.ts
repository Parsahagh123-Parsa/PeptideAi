import { Goal } from '../types';

export interface GoalDefinition {
  id: Goal;
  label: string;
  description: string;
  icon?: string;
  color?: string;
}

export const GOAL_DEFINITIONS: GoalDefinition[] = [
  {
    id: 'fat_loss',
    label: 'Fat Loss / Weight Management',
    description: 'Reduce body fat and improve body composition',
    color: '#FF6B6B',
  },
  {
    id: 'muscle_gain',
    label: 'Muscle Gain / Performance',
    description: 'Build muscle mass and enhance athletic performance',
    color: '#4ECDC4',
  },
  {
    id: 'recovery',
    label: 'Recovery / Injury Healing',
    description: 'Accelerate recovery from injuries and workouts',
    color: '#45B7D1',
  },
  {
    id: 'anti_aging',
    label: 'Anti-Aging / Longevity',
    description: 'Support healthy aging and longevity',
    color: '#96CEB4',
  },
  {
    id: 'skin_health',
    label: 'Skin Health',
    description: 'Improve skin quality and appearance',
    color: '#FFEAA7',
  },
  {
    id: 'metabolic_health',
    label: 'Metabolic Health',
    description: 'Optimize metabolism and metabolic function',
    color: '#DDA15E',
  },
  {
    id: 'cognitive',
    label: 'Cognitive Enhancement',
    description: 'Improve focus, memory, and cognitive function',
    color: '#9B59B6',
  },
  {
    id: 'sleep',
    label: 'Sleep Optimization',
    description: 'Improve sleep quality and duration',
    color: '#3498DB',
  },
];

export function getGoalDefinition(goalId: Goal): GoalDefinition | undefined {
  return GOAL_DEFINITIONS.find((g) => g.id === goalId);
}

export function getGoalLabels(goals: Goal[]): string[] {
  return goals
    .map((goalId) => getGoalDefinition(goalId)?.label)
    .filter((label): label is string => label !== undefined);
}

