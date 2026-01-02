# PeptAI — Complete Feature Specification

## 📋 Table of Contents
1. [Overview](#overview)
2. [Core Features](#core-features)
3. [User Interface](#user-interface)
4. [Technical Architecture](#technical-architecture)
5. [Data Models](#data-models)
6. [API Specifications](#api-specifications)
7. [AI Integration](#ai-integration)
8. [Security & Compliance](#security--compliance)

---

## Overview

PeptAI is a comprehensive peptide management application designed to help users safely and effectively manage peptide protocols through AI-powered recommendations, precise calculations, and intelligent scheduling.

### Target Users
- Individuals using peptides for health optimization
- Fitness enthusiasts
- Anti-aging practitioners
- Healthcare professionals (reference tool)

### Platform Support
- iOS (Native)
- Android (Native)
- Web (Progressive Web App)

---

## Core Features

### 1. Goal-Based Peptide Recommendation

#### User Flow
1. User selects primary goals from predefined categories:
   - Fat Loss / Weight Management
   - Muscle Gain / Performance
   - Recovery / Injury Healing
   - Anti-Aging / Longevity
   - Skin Health
   - Metabolic Health
   - Cognitive Enhancement
   - Sleep Optimization

2. User provides additional context:
   - Age range
   - Current health status
   - Previous peptide experience
   - Specific concerns or preferences

3. AI generates personalized recommendations:
   - Primary peptide suggestions
   - Stack combinations (if applicable)
   - Rationale for each recommendation
   - Expected timeline for results

#### Recommendation Display
Each recommendation includes:
- **Peptide Name** (common + scientific)
- **What It Does**: Plain-language explanation
- **Typical Dosing Range**: Min/max with units
- **Side Effects & Safety**: Comprehensive safety profile
- **Mechanism Visual**: Interactive graphic showing how it works
- **Research Notes**: Brief summary of supporting evidence
- **Stack Compatibility**: Which peptides work well together

#### AI Capabilities
- Natural language processing for goal interpretation
- Personalized recommendations based on user profile
- Context-aware suggestions considering user history
- Safety-first filtering (contraindications, interactions)

---

### 2. Peptide Dose Calculator

#### Input Fields
- **Peptide Vial Strength**: mg or µg (e.g., 5mg, 2mg)
- **Diluent Volume**: mL (e.g., 2mL, 5mL)
- **Syringe Type**: 
  - U-100 insulin syringe (100 units = 1mL)
  - Standard insulin syringe
  - Tuberculin syringe
  - Custom unit conversion
- **Desired Dose**: mcg or mg per injection
- **Dosing Frequency**: Daily, EOD, Weekly, Custom

#### Calculations
- **Units to Draw**: Exact units on syringe for desired dose
- **Concentration**: mg/mL or µg/mL after reconstitution
- **Total Doses**: Number of injections per vial
- **Vial Duration**: How long the vial will last
- **Cost per Dose**: If user inputs vial cost

#### Multi-Peptide Blends
- Support for calculating blends (e.g., BPC-157 + TB-500)
- Individual peptide ratios
- Combined dosing recommendations

#### Features
- Unit conversion (mg ↔ µg, mL ↔ units)
- Save calculation presets
- History of previous calculations
- Export/share results

---

### 3. Calendar & Scheduling

#### Views
- **Daily View**: Hour-by-hour injection schedule
- **Weekly View**: Week-at-a-glance with color coding
- **Monthly View**: Calendar grid with injection markers

#### Scheduling Features
- Add peptide to calendar with:
  - Peptide name
  - Dose amount
  - Injection time
  - Frequency (daily, EOD, weekly, custom)
  - Injection site rotation (optional)
- Auto-generate schedule based on:
  - Dosing frequency
  - User preferences (morning/evening)
  - Cycle duration
- Mark injections as completed
- Track missed doses
- Injection site rotation tracking
- Cycle management (on/off periods)

#### Data Tracking
- Injection history
- Adherence rate (% of doses taken)
- Visual progress charts
- Export data (CSV, PDF)

---

### 4. Notifications & Reminders

#### Notification Types
- **Pre-Injection Reminder**: 15-30 minutes before scheduled time
- **Injection Due**: At scheduled time
- **Missed Dose Alert**: If not marked complete within grace period
- **Refill Reminder**: When vial is running low
- **Cycle Reminder**: When to start/stop cycles

#### Customization
- Notification timing preferences
- Snooze options (5min, 15min, 30min, 1hr)
- Quiet hours
- Sound/vibration preferences
- Wearable device integration (Apple Watch, Wear OS)

#### Smart Features
- Learn from user behavior (adjust timing)
- Batch notifications for multiple peptides
- Calendar integration (iCal, Google Calendar)

---

### 5. Peptide Reference Library

#### Library Structure
Searchable database of common peptides organized by:
- Category (Growth Factors, Metabolic, Cognitive, etc.)
- Popularity
- Research status

#### Entry Information
Each peptide entry includes:

**Basic Info**
- Common names
- Scientific name
- CAS number
- Molecular weight

**Description**
- What it is
- Natural occurrence
- Synthetic production method

**Mechanism of Action**
- How it works (plain language)
- Target receptors/pathways
- Visual mechanism diagram
- Interactive infographic

**Benefits & Outcomes**
- Primary benefits
- Secondary benefits
- Expected timeline
- Typical user experiences

**Dosing Information**
- Typical range (mcg/mg)
- Frequency recommendations
- Cycle length
- Loading vs maintenance doses

**Safety Profile**
- Side effects (common, rare)
- Contraindications
- Drug interactions
- Pregnancy/lactation warnings

**Research**
- Key studies (summarized)
- Evidence level
- Links to PubMed (if applicable)

**Practical Info**
- Storage requirements
- Reconstitution tips
- Injection best practices
- Where to inject

#### Visual Elements
- 3D molecular structure (interactive)
- Mechanism flowcharts
- Comparison charts (vs other peptides)
- Infographics explaining benefits

---

### 6. User Profiles & History

#### Profile Information
- Basic demographics (age, gender, weight, height)
- Health goals (primary + secondary)
- Medical history (relevant conditions)
- Current medications/supplements
- Peptide experience level
- Preferences (injection times, sites)

#### Current Protocol
- Active peptides
- Current doses
- Start dates
- Cycle information
- Next injection times

#### History Tracking
- Past peptides used
- Dosing history
- Results/outcomes
- Side effects experienced
- Adherence metrics
- Progress photos (optional, user-uploaded)

#### Dashboard
- Visual progress charts
- Goal tracking
- Adherence statistics
- Timeline view of protocol history
- Exportable reports

---

### 7. Educational Content

#### AI-Generated Explanations
- Plain-language peptide explanations
- Personalized learning paths
- Q&A based on user questions
- Safety education

#### Glossary
- Comprehensive peptide terminology
- Medical terms explained
- Abbreviations dictionary

#### FAQs
- Common questions
- Safety FAQs
- Dosing FAQs
- Storage & handling

#### Safety Instructions
- Injection technique guides
- Sterile technique
- Site rotation
- Disposal procedures
- Emergency procedures

#### Interactive Tutorials
- First-time user guide
- Calculator tutorial
- Scheduling walkthrough
- Library navigation

---

## User Interface

### Design Principles
- **Clean & Intuitive**: Minimal cognitive load
- **Accessibility**: WCAG 2.1 AA compliance
- **Responsive**: Works on all screen sizes
- **Fast**: Smooth animations, quick load times

### Color Scheme
- **Light Mode**: Clean whites, subtle grays, accent colors for peptides
- **Dark Mode**: Deep blacks, muted grays, vibrant accents
- **Color Coding**: Different colors for different peptide categories

### Key Screens

1. **Dashboard/Home**
   - Quick access to calculator
   - Today's injections
   - Recent recommendations
   - Quick stats

2. **Calculator**
   - Input form
   - Real-time results
   - History panel
   - Presets

3. **Calendar**
   - Multiple view options
   - Add/edit injections
   - Completion tracking

4. **Library**
   - Search/filter interface
   - Category browsing
   - Detail views

5. **Recommendations**
   - Goal selection
   - AI results
   - Comparison view

6. **Profile**
   - User info
   - Current protocol
   - History & stats

---

## Technical Architecture

### Frontend Architecture
- **Framework**: React Native (Expo or bare)
- **Language**: TypeScript
- **State Management**: Redux Toolkit or Zustand
- **Navigation**: React Navigation v6
- **UI Library**: React Native Paper or NativeBase
- **Charts**: Victory Native or Recharts
- **Animations**: React Native Reanimated

### Backend Architecture
- **Runtime**: Node.js
- **Framework**: Express.js or Fastify
- **Database**: 
  - Primary: PostgreSQL (Supabase)
  - Cache: Redis
  - File Storage: AWS S3 or Cloudinary
- **Authentication**: Firebase Auth or Supabase Auth
- **API**: RESTful + GraphQL (optional)

### AI Integration
- **Primary**: OpenAI GPT-4 API
- **Fallback**: Anthropic Claude API
- **Embeddings**: For semantic search in library
- **Caching**: Cache common queries to reduce API costs

### Notifications
- **Push**: Firebase Cloud Messaging (FCM)
- **Local**: React Native Local Notifications
- **Scheduling**: Background task scheduling

---

## Data Models

### User
```typescript
{
  id: string;
  email: string;
  profile: UserProfile;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}
```

### UserProfile
```typescript
{
  age: number;
  gender: 'male' | 'female' | 'other';
  weight: number; // kg
  height: number; // cm
  goals: Goal[];
  medicalHistory: string[];
  currentMedications: string[];
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
}
```

### Peptide
```typescript
{
  id: string;
  name: string;
  scientificName: string;
  category: PeptideCategory;
  mechanism: string;
  benefits: string[];
  dosingRange: {
    min: number;
    max: number;
    unit: 'mcg' | 'mg';
    frequency: string;
  };
  sideEffects: SideEffect[];
  contraindications: string[];
  researchNotes: string;
}
```

### Injection
```typescript
{
  id: string;
  userId: string;
  peptideId: string;
  scheduledTime: Date;
  completedTime?: Date;
  dose: number;
  unit: 'mcg' | 'mg';
  injectionSite?: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'missed' | 'skipped';
}
```

### Calculation
```typescript
{
  id: string;
  userId: string;
  peptideId: string;
  vialStrength: number;
  diluentVolume: number;
  syringeType: string;
  desiredDose: number;
  result: {
    unitsToDraw: number;
    concentration: number;
    totalDoses: number;
    vialDuration: number;
  };
  createdAt: Date;
}
```

---

## API Specifications

### Endpoints

#### User Management
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile

#### Recommendations
- `POST /api/recommendations/generate` - Generate AI recommendations
- `GET /api/recommendations/history` - Get recommendation history

#### Calculator
- `POST /api/calculator/calculate` - Calculate dose
- `GET /api/calculator/history` - Get calculation history

#### Scheduling
- `GET /api/injections` - Get injections (with filters)
- `POST /api/injections` - Create injection
- `PUT /api/injections/:id` - Update injection
- `DELETE /api/injections/:id` - Delete injection
- `POST /api/injections/:id/complete` - Mark as completed

#### Library
- `GET /api/peptides` - List all peptides
- `GET /api/peptides/:id` - Get peptide details
- `GET /api/peptides/search` - Search peptides

#### Notifications
- `POST /api/notifications/register` - Register device token
- `GET /api/notifications/settings` - Get notification settings
- `PUT /api/notifications/settings` - Update settings

---

## AI Integration

### Recommendation Engine
1. **Input Processing**: Parse user goals and profile
2. **Context Building**: Gather relevant peptide data
3. **AI Query**: Send to GPT-4 with structured prompt
4. **Response Parsing**: Extract recommendations
5. **Safety Filtering**: Check contraindications
6. **Response Formatting**: Structure for UI

### Prompt Template
```
You are a peptide expert assistant. Based on the following user profile and goals, recommend appropriate peptides.

User Profile:
- Age: {age}
- Goals: {goals}
- Experience: {experience}
- Medical History: {history}

Provide recommendations with:
1. Primary peptide suggestions
2. Rationale for each
3. Typical dosing ranges
4. Safety considerations
5. Expected timeline

Format as JSON.
```

---

## Security & Compliance

### Data Security
- End-to-end encryption for sensitive data
- Secure authentication (JWT tokens)
- API rate limiting
- Input validation and sanitization

### Privacy
- GDPR compliance
- User data anonymization options
- Data export capability
- Account deletion

### Medical Disclaimer
- Prominent disclaimers on all recommendation screens
- Required acknowledgment before first use
- Links to professional consultation resources
- No medical advice claims

### HIPAA Considerations
- If storing PHI, implement HIPAA compliance
- Business Associate Agreements (BAAs) with vendors
- Audit logs
- Access controls

---

## Future Enhancements

- Community features (forums, experiences)
- Integration with lab testing services
- Telemedicine consultation booking
- Barcode scanning for peptide vials
- AR injection site guidance
- Machine learning for personalized dosing optimization

---

**Document Version**: 1.0  
**Last Updated**: 2024

