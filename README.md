# PeptAI — Personalized Peptide Assistant & Dosing Scheduler

PeptAI is a comprehensive cross-platform mobile and web application that combines AI-powered recommendations, precise dose calculators, intelligent scheduling, and educational content to help users manage peptide protocols safely and effectively.

## 🚀 Features

### Core Functionality
- **AI Goal-Based Recommendations**: Get personalized peptide suggestions based on your health and fitness goals
- **Precise Dose Calculator**: Calculate accurate injection volumes with support for multiple peptide blends
- **Smart Scheduling**: Calendar-based injection tracking with automated reminders
- **Push Notifications**: Never miss a dose with intelligent reminder system
- **Peptide Library**: Comprehensive reference database with visual explanations
- **User Profiles**: Track your progress and maintain personal dosing history
- **Educational Content**: AI-generated explanations and interactive infographics

## 🛠 Tech Stack

- **Frontend**: React Native (iOS + Android) + React (Web)
- **Language**: TypeScript
- **State Management**: Redux Toolkit / Zustand
- **Navigation**: React Navigation
- **Backend**: Node.js / Express (or Firebase Functions)
- **Database**: Firebase / Supabase / PostgreSQL
- **AI Integration**: OpenAI API / Custom models
- **Notifications**: Firebase Cloud Messaging (FCM)
- **Styling**: React Native Paper / NativeBase

## 📦 Project Structure

```
PeptAI/
├── src/
│   ├── components/       # Reusable UI components
│   ├── screens/          # Screen components
│   ├── navigation/       # Navigation setup
│   ├── services/         # API, AI, notifications
│   ├── utils/            # Calculators, helpers
│   ├── store/            # State management
│   ├── types/            # TypeScript definitions
│   └── constants/        # App constants & data
├── assets/               # Images, fonts, etc.
├── docs/                 # Documentation
└── tests/                # Test files
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- React Native CLI
- iOS: Xcode 14+
- Android: Android Studio
- Expo CLI (optional, for Expo workflow)

### Installation

```bash
# Install dependencies
npm install

# iOS
cd ios && pod install && cd ..
npm run ios

# Android
npm run android

# Web
npm run web
```

## 📅 Development Milestones

- [x] **M1**: Basic peptide calculator UI
- [ ] **M2**: Calendar + dosing schedule
- [ ] **M3**: AI goal recommendations + library
- [ ] **M4**: Push notifications & reminders
- [ ] **M5**: Infographics + educational content
- [ ] **M6**: User profiles & history

## ⚠️ Legal & Safety Disclaimer

**IMPORTANT**: This application is for informational and educational purposes only. It does not provide medical advice, diagnosis, or treatment. Users must consult with qualified healthcare professionals before starting any peptide protocol. The app developers are not responsible for any adverse effects or outcomes resulting from the use of information provided by this application.

## 📝 License

[Specify your license]

## 🤝 Contributing

[Contributing guidelines]

## 📧 Contact

[Contact information]

---

**Status**: 🚧 In active development

