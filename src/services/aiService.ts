import { Recommendation, RecommendationRequest, Peptide } from '../types';
import { PEPTIDES } from '../constants/peptides';
import { getGoalDefinition } from '../constants/goals';

/**
 * AI Service for generating peptide recommendations
 * In production, this would call an OpenAI API or similar
 */

interface AIRecommendationResponse {
  recommendations: {
    peptideId: string;
    rationale: string;
    priority: 'primary' | 'secondary' | 'optional';
    expectedTimeline: string;
  }[];
}

/**
 * Generate AI-powered peptide recommendations based on user goals and profile
 * 
 * NOTE: This is a mock implementation. In production, replace with actual AI API call.
 */
export async function generateRecommendations(
  request: RecommendationRequest
): Promise<Recommendation[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock AI logic - in production, this would be an API call to OpenAI
  const recommendations = getMockRecommendations(request);

  return recommendations;
}

/**
 * Mock recommendation logic
 * In production, this would be replaced with actual AI API integration
 */
function getMockRecommendations(
  request: RecommendationRequest
): Recommendation[] {
  const { goals, profile } = request;
  const recommendations: Recommendation[] = [];

  // Simple rule-based matching (replace with AI in production)
  const peptideMap: Record<string, string[]> = {
    fat_loss: ['ipamorelin', 'cjc1295', 'ghrp2'],
    muscle_gain: ['ipamorelin', 'cjc1295', 'ghrp2'],
    recovery: ['bpc157', 'tb500'],
    anti_aging: ['epitalon', 'ipamorelin', 'cjc1295'],
    skin_health: ['ipamorelin', 'cjc1295'],
    metabolic_health: ['ipamorelin', 'cjc1295', 'pt141'],
    cognitive: ['epitalon'],
    sleep: ['ipamorelin', 'epitalon'],
  };

  const suggestedPeptideIds = new Set<string>();
  goals.forEach((goal) => {
    const peptides = peptideMap[goal] || [];
    peptides.forEach((id) => suggestedPeptideIds.add(id));
  });

  // Convert to recommendations
  let priority: 'primary' | 'secondary' | 'optional' = 'primary';
  suggestedPeptideIds.forEach((peptideId, index) => {
    const peptide = PEPTIDES.find((p) => p.id === peptideId);
    if (!peptide) return;

    if (index >= 3) {
      priority = 'optional';
    } else if (index >= 2) {
      priority = 'secondary';
    }

    const goalLabels = goals
      .map((g) => getGoalDefinition(g)?.label)
      .filter(Boolean) as string[];

    recommendations.push({
      id: `rec_${peptideId}_${Date.now()}`,
      peptideId: peptide.id,
      peptide,
      rationale: generateRationale(peptide, goals, profile),
      priority,
      expectedTimeline: getExpectedTimeline(peptide),
      stackCompatibility: getStackCompatibility(peptideId),
      userGoals: goals,
    });
  });

  return recommendations;
}

function generateRationale(
  peptide: Peptide,
  goals: string[],
  profile: Partial<any>
): string {
  const goalText = goals.length === 1 ? 'your goal' : 'your goals';
  return `${peptide.name} is well-suited for ${goalText} because ${peptide.mechanism.toLowerCase()}. It may help you achieve ${peptide.benefits[0].toLowerCase()} and other benefits.`;
}

function getExpectedTimeline(peptide: Peptide): string {
  if (peptide.category === 'recovery') {
    return '2-4 weeks for initial improvements, 6-8 weeks for significant results';
  }
  if (peptide.category === 'growth_factors') {
    return '4-6 weeks for initial changes, 8-12 weeks for optimal results';
  }
  if (peptide.category === 'anti_aging') {
    return '2-3 weeks for sleep improvements, longer-term for other benefits';
  }
  return '4-8 weeks for noticeable results';
}

function getStackCompatibility(peptideId: string): string[] {
  const compatibility: Record<string, string[]> = {
    bpc157: ['tb500'],
    tb500: ['bpc157'],
    ipamorelin: ['cjc1295'],
    cjc1295: ['ipamorelin'],
    ghrp2: ['cjc1295'],
  };

  return compatibility[peptideId] || [];
}

/**
 * Generate plain-language explanation of a peptide
 * In production, this would use AI to generate personalized explanations
 */
export async function generatePeptideExplanation(
  peptide: Peptide,
  userContext?: string
): Promise<string> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock explanation - in production, call AI API
  return `Here's a simple explanation of ${peptide.name}:

${peptide.mechanism}

In practical terms, this means ${peptide.benefits.join(', ')}. Most people use it ${peptide.dosingRange.frequency} at doses between ${peptide.dosingRange.min}-${peptide.dosingRange.max} ${peptide.dosingRange.unit}.

${userContext ? `Based on your situation: ${userContext}` : ''}

Remember to consult with a healthcare professional before starting any peptide protocol.`;
}

/**
 * Answer user questions about peptides
 * In production, this would use AI to answer questions
 */
export async function answerQuestion(
  question: string,
  context?: { peptideId?: string; userProfile?: any }
): Promise<string> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // Mock answer - in production, call AI API with RAG (Retrieval Augmented Generation)
  return `Based on your question about "${question}", here's what you should know:

[This is a mock response. In production, this would be generated by an AI model that has access to peptide research, safety data, and user context.]

Always consult with a qualified healthcare professional for personalized medical advice.`;
}

