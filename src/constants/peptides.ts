import { Peptide } from '../types';

/**
 * Common peptides database
 * This is a starter dataset - can be expanded or loaded from API
 */
export const PEPTIDES: Peptide[] = [
  {
    id: 'bpc157',
    name: 'BPC-157',
    scientificName: 'Body Protection Compound-157',
    category: 'recovery',
    mechanism:
      'BPC-157 is a synthetic peptide derived from a protein found in gastric juice. It promotes healing by increasing blood flow to damaged tissues, stimulating the formation of new blood vessels, and accelerating the repair of tendons, ligaments, and muscles.',
    benefits: [
      'Accelerates healing of injuries',
      'Reduces inflammation',
      'Protects and heals gut lining',
      'Improves joint health',
      'Enhances recovery from workouts',
    ],
    dosingRange: {
      min: 200,
      max: 500,
      unit: 'mcg',
      frequency: 'daily or twice daily',
      cycleLength: '4-8 weeks',
    },
    sideEffects: [
      {
        type: 'common',
        description: 'Mild injection site redness',
        frequency: 'Rare',
      },
    ],
    contraindications: ['Pregnancy', 'Lactation'],
    researchNotes:
      'Extensive research in animal models shows strong healing properties. Human research is limited but promising.',
    storageRequirements: 'Store reconstituted solution in refrigerator (2-8°C)',
    reconstitutionTips: 'Reconstitute with bacteriostatic water. Use within 30 days of reconstitution.',
  },
  {
    id: 'tb500',
    name: 'TB-500',
    scientificName: 'Thymosin Beta-4 Fragment',
    category: 'recovery',
    mechanism:
      'TB-500 is a synthetic version of a naturally occurring peptide that plays a key role in cell development, migration, and healing. It promotes healing by regulating actin (a protein important for cell movement and structure) and stimulating new blood vessel formation.',
    benefits: [
      'Accelerates wound healing',
      'Reduces inflammation',
      'Improves flexibility and range of motion',
      'Enhances muscle recovery',
      'Promotes hair growth',
    ],
    dosingRange: {
      min: 2,
      max: 5,
      unit: 'mg',
      frequency: 'twice weekly',
      cycleLength: '6-12 weeks',
    },
    sideEffects: [
      {
        type: 'common',
        description: 'Mild injection site discomfort',
        frequency: 'Rare',
      },
    ],
    contraindications: ['Pregnancy', 'Lactation', 'Active cancer'],
    researchNotes:
      'Well-studied peptide with strong evidence for healing properties. Often stacked with BPC-157.',
    storageRequirements: 'Store reconstituted solution in refrigerator (2-8°C)',
    reconstitutionTips: 'Reconstitute with bacteriostatic water. Stable for 30 days after reconstitution.',
  },
  {
    id: 'ipamorelin',
    name: 'Ipamorelin',
    scientificName: 'Growth Hormone Releasing Peptide',
    category: 'growth_factors',
    mechanism:
      'Ipamorelin is a growth hormone secretagogue that stimulates the pituitary gland to release growth hormone. Unlike other GHRPs, it does not significantly increase cortisol or prolactin, making it a "clean" growth hormone releaser.',
    benefits: [
      'Increases growth hormone levels',
      'Promotes fat loss',
      'Improves sleep quality',
      'Enhances muscle recovery',
      'May improve skin quality',
    ],
    dosingRange: {
      min: 200,
      max: 500,
      unit: 'mcg',
      frequency: 'daily (typically before bed)',
      cycleLength: '8-16 weeks',
    },
    sideEffects: [
      {
        type: 'common',
        description: 'Mild hunger increase',
        frequency: 'Common',
      },
      {
        type: 'rare',
        description: 'Water retention',
        frequency: 'Rare',
      },
    ],
    contraindications: ['Pregnancy', 'Lactation', 'Active cancer'],
    researchNotes:
      'Well-tolerated GHRP with minimal side effects. Often stacked with CJC-1295.',
    storageRequirements: 'Store reconstituted solution in refrigerator (2-8°C)',
    reconstitutionTips: 'Reconstitute with bacteriostatic water. Best taken on empty stomach.',
  },
  {
    id: 'cjc1295',
    name: 'CJC-1295',
    scientificName: 'Growth Hormone Releasing Hormone Analog',
    category: 'growth_factors',
    mechanism:
      'CJC-1295 is a modified version of growth hormone releasing hormone (GHRH) that increases the release of growth hormone and IGF-1. It works by binding to GHRH receptors in the pituitary gland.',
    benefits: [
      'Increases growth hormone and IGF-1',
      'Promotes muscle growth',
      'Enhances fat loss',
      'Improves recovery',
      'May improve sleep',
    ],
    dosingRange: {
      min: 1,
      max: 2,
      unit: 'mg',
      frequency: 'daily or twice weekly',
      cycleLength: '8-16 weeks',
    },
    sideEffects: [
      {
        type: 'common',
        description: 'Injection site redness',
        frequency: 'Common',
      },
      {
        type: 'rare',
        description: 'Mild water retention',
        frequency: 'Rare',
      },
    ],
    contraindications: ['Pregnancy', 'Lactation', 'Active cancer'],
    researchNotes:
      'Effective GHRH analog. Commonly stacked with Ipamorelin for synergistic effects.',
    storageRequirements: 'Store reconstituted solution in refrigerator (2-8°C)',
    reconstitutionTips: 'Reconstitute with bacteriostatic water. Can be taken with or without Ipamorelin.',
  },
  {
    id: 'epitalon',
    name: 'Epitalon',
    scientificName: 'Epithalamin / Tetrapeptide',
    category: 'anti_aging',
    mechanism:
      'Epitalon is a synthetic version of epithalamin, a peptide found in the pineal gland. It is believed to help regulate circadian rhythms, support telomere health, and may have anti-aging properties.',
    benefits: [
      'May support healthy aging',
      'Improves sleep quality',
      'Regulates circadian rhythms',
      'May support telomere health',
      'Potential antioxidant effects',
    ],
    dosingRange: {
      min: 5,
      max: 10,
      unit: 'mg',
      frequency: 'daily (typically before bed)',
      cycleLength: '10-20 days, repeated 2-3 times per year',
    },
    sideEffects: [
      {
        type: 'rare',
        description: 'Very well tolerated, minimal side effects',
        frequency: 'Very rare',
      },
    ],
    contraindications: ['Pregnancy', 'Lactation'],
    researchNotes:
      'Research primarily in animal models and some human studies. Promising for longevity research.',
    storageRequirements: 'Store reconstituted solution in refrigerator (2-8°C)',
    reconstitutionTips: 'Reconstitute with bacteriostatic water. Best taken before bedtime.',
  },
  {
    id: 'ghrp2',
    name: 'GHRP-2',
    scientificName: 'Growth Hormone Releasing Peptide-2',
    category: 'growth_factors',
    mechanism:
      'GHRP-2 is a growth hormone secretagogue that stimulates GH release. It is more potent than Ipamorelin but may cause more hunger and slight increases in cortisol/prolactin.',
    benefits: [
      'Increases growth hormone',
      'Promotes fat loss',
      'Enhances muscle recovery',
      'May improve sleep',
    ],
    dosingRange: {
      min: 100,
      max: 300,
      unit: 'mcg',
      frequency: '2-3 times daily',
      cycleLength: '8-16 weeks',
    },
    sideEffects: [
      {
        type: 'common',
        description: 'Increased hunger',
        frequency: 'Very common',
      },
      {
        type: 'common',
        description: 'Mild water retention',
        frequency: 'Common',
      },
    ],
    contraindications: ['Pregnancy', 'Lactation', 'Active cancer'],
    researchNotes:
      'Effective but may cause more side effects than Ipamorelin. Good for those who want stronger effects.',
    storageRequirements: 'Store reconstituted solution in refrigerator (2-8°C)',
    reconstitutionTips: 'Reconstitute with bacteriostatic water. Take on empty stomach.',
  },
  {
    id: 'pt141',
    name: 'PT-141 (Bremelanotide)',
    scientificName: 'Melanotan II Fragment',
    category: 'metabolic',
    mechanism:
      'PT-141 is a synthetic peptide that activates melanocortin receptors, particularly MC4R. It is FDA-approved for treating certain sexual dysfunctions and may have metabolic benefits.',
    benefits: [
      'May support metabolic health',
      'FDA-approved for certain conditions',
      'Well-researched',
    ],
    dosingRange: {
      min: 1,
      max: 2,
      unit: 'mg',
      frequency: 'as needed or weekly',
      cycleLength: 'Varies',
    },
    sideEffects: [
      {
        type: 'common',
        description: 'Nausea',
        frequency: 'Common',
      },
      {
        type: 'common',
        description: 'Flushing',
        frequency: 'Common',
      },
    ],
    contraindications: ['Pregnancy', 'Lactation', 'Cardiovascular disease'],
    researchNotes: 'FDA-approved peptide with extensive research.',
    storageRequirements: 'Store reconstituted solution in refrigerator (2-8°C)',
    reconstitutionTips: 'Reconstitute with bacteriostatic water. Follow medical guidance.',
  },
  {
    id: 'semax',
    name: 'Semax',
    scientificName: 'ACTH(4-10) Analog',
    category: 'cognitive',
    mechanism:
      'Semax is a synthetic peptide derived from ACTH that enhances cognitive function by increasing brain-derived neurotrophic factor (BDNF) and improving neurotransmitter activity. It may also have neuroprotective properties.',
    benefits: [
      'Enhances cognitive function',
      'Improves memory and focus',
      'May have neuroprotective effects',
      'Increases mental clarity',
      'Supports brain health',
    ],
    dosingRange: {
      min: 200,
      max: 600,
      unit: 'mcg',
      frequency: 'daily (intranasal or injection)',
      cycleLength: '4-12 weeks',
    },
    sideEffects: [
      {
        type: 'rare',
        description: 'Very well tolerated, minimal side effects',
        frequency: 'Very rare',
      },
    ],
    contraindications: ['Pregnancy', 'Lactation'],
    researchNotes:
      'Extensively researched in Russia. Shows promise for cognitive enhancement and neuroprotection.',
    storageRequirements: 'Store in refrigerator (2-8°C). Protect from light.',
    reconstitutionTips: 'Can be used intranasally or via injection. Follow manufacturer instructions.',
  },
  {
    id: 'selank',
    name: 'Selank',
    scientificName: 'Thymus-Derived Peptide',
    category: 'cognitive',
    mechanism:
      'Selank is a synthetic peptide that modulates the immune system and may have anxiolytic and cognitive-enhancing effects. It works by influencing neurotransmitter systems and immune function.',
    benefits: [
      'Reduces anxiety',
      'Improves mood',
      'Enhances cognitive function',
      'May improve sleep',
      'Supports immune function',
    ],
    dosingRange: {
      min: 200,
      max: 400,
      unit: 'mcg',
      frequency: 'daily (intranasal or injection)',
      cycleLength: '4-8 weeks',
    },
    sideEffects: [
      {
        type: 'rare',
        description: 'Very well tolerated',
        frequency: 'Very rare',
      },
    ],
    contraindications: ['Pregnancy', 'Lactation'],
    researchNotes:
      'Research primarily in Russia. Often used alongside Semax for synergistic effects.',
    storageRequirements: 'Store in refrigerator (2-8°C)',
    reconstitutionTips: 'Commonly used intranasally. Can also be injected subcutaneously.',
  },
  {
    id: 'ghkcu',
    name: 'GHK-Cu',
    scientificName: 'Copper Peptide',
    category: 'skin',
    mechanism:
      'GHK-Cu is a naturally occurring copper-binding peptide that promotes wound healing, collagen production, and skin health. It has anti-inflammatory and antioxidant properties.',
    benefits: [
      'Improves skin quality',
      'Promotes collagen production',
      'Reduces wrinkles',
      'Enhances wound healing',
      'Has antioxidant effects',
    ],
    dosingRange: {
      min: 1,
      max: 2,
      unit: 'mg',
      frequency: 'daily or EOD',
      cycleLength: '8-16 weeks',
    },
    sideEffects: [
      {
        type: 'rare',
        description: 'Mild injection site irritation',
        frequency: 'Rare',
      },
    ],
    contraindications: ['Pregnancy', 'Lactation', 'Copper sensitivity'],
    researchNotes:
      'Well-researched peptide for skin health. Commonly used in topical formulations as well.',
    storageRequirements: 'Store reconstituted solution in refrigerator (2-8°C)',
    reconstitutionTips: 'Reconstitute with bacteriostatic water. Can be used topically or injected.',
  },
  {
    id: 'dsip',
    name: 'DSIP',
    scientificName: 'Delta Sleep-Inducing Peptide',
    category: 'sleep',
    mechanism:
      'DSIP is a naturally occurring peptide that promotes deep sleep by influencing sleep-wake cycles and neurotransmitter activity. It may help normalize sleep patterns.',
    benefits: [
      'Improves sleep quality',
      'Promotes deep sleep',
      'May help with insomnia',
      'Supports circadian rhythm',
      'May reduce stress',
    ],
    dosingRange: {
      min: 100,
      max: 200,
      unit: 'mcg',
      frequency: 'daily (before bed)',
      cycleLength: '4-8 weeks',
    },
    sideEffects: [
      {
        type: 'rare',
        description: 'Very well tolerated',
        frequency: 'Very rare',
      },
    ],
    contraindications: ['Pregnancy', 'Lactation'],
    researchNotes:
      'Research shows promise for sleep improvement. Best taken before bedtime.',
    storageRequirements: 'Store reconstituted solution in refrigerator (2-8°C)',
    reconstitutionTips: 'Reconstitute with bacteriostatic water. Take 30-60 minutes before bed.',
  },
  {
    id: 'hexarelin',
    name: 'Hexarelin',
    scientificName: 'Growth Hormone Releasing Hexapeptide',
    category: 'growth_factors',
    mechanism:
      'Hexarelin is a growth hormone secretagogue that strongly stimulates GH release. It is more potent than GHRP-2 but may cause more side effects including increased hunger and cortisol.',
    benefits: [
      'Strongly increases growth hormone',
      'Promotes muscle growth',
      'Enhances fat loss',
      'Improves recovery',
    ],
    dosingRange: {
      min: 100,
      max: 200,
      unit: 'mcg',
      frequency: '2-3 times daily',
      cycleLength: '8-16 weeks',
    },
    sideEffects: [
      {
        type: 'common',
        description: 'Increased hunger',
        frequency: 'Very common',
      },
      {
        type: 'common',
        description: 'May increase cortisol',
        frequency: 'Common',
      },
    ],
    contraindications: ['Pregnancy', 'Lactation', 'Active cancer'],
    researchNotes:
      'Very potent GHRP. May cause more side effects than Ipamorelin or GHRP-2.',
    storageRequirements: 'Store reconstituted solution in refrigerator (2-8°C)',
    reconstitutionTips: 'Reconstitute with bacteriostatic water. Take on empty stomach.',
  },
];

/**
 * Get peptide by ID
 */
export function getPeptideById(id: string): Peptide | undefined {
  return PEPTIDES.find((p) => p.id === id);
}

/**
 * Get peptides by category
 */
export function getPeptidesByCategory(
  category: Peptide['category']
): Peptide[] {
  return PEPTIDES.filter((p) => p.category === category);
}

/**
 * Search peptides by name
 */
export function searchPeptides(query: string): Peptide[] {
  const lowerQuery = query.toLowerCase();
  return PEPTIDES.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.scientificName.toLowerCase().includes(lowerQuery)
  );
}

