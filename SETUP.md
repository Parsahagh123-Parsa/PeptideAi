# PeptAI Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Expo CLI**: `npm install -g expo-cli`
- **iOS Development**: Xcode 14+ (macOS only)
- **Android Development**: Android Studio with Android SDK

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

or

```bash
yarn install
```

### 2. iOS Setup (macOS only)

```bash
cd ios
pod install
cd ..
```

### 3. Start the Development Server

```bash
npm start
```

This will start the Expo development server. You can then:

- Press `i` to open in iOS Simulator
- Press `a` to open in Android Emulator
- Scan the QR code with Expo Go app on your physical device
- Press `w` to open in web browser

## Project Structure

```
PeptAI/
├── App.tsx                 # Main app entry point
├── src/
│   ├── components/        # Reusable UI components
│   ├── screens/           # Screen components
│   ├── navigation/        # Navigation setup
│   ├── services/          # API, AI, notifications
│   ├── utils/             # Calculators, helpers
│   ├── store/             # State management (Zustand)
│   ├── types/             # TypeScript definitions
│   └── constants/         # App constants & data
├── assets/                # Images, fonts, etc.
└── docs/                  # Documentation
```

## Key Features Implemented

### ✅ Completed
- Project structure and TypeScript setup
- Navigation (React Navigation)
- State management (Zustand)
- Peptide dose calculator
- Calendar view for injections
- Peptide library with search
- AI recommendations (mock implementation)
- Notification service setup
- User profile screen

### 🚧 In Progress / To Do
- Connect to real AI API (OpenAI)
- Backend API integration
- User authentication
- Database persistence
- Enhanced calendar features
- Push notifications (production setup)
- Educational infographics
- Advanced scheduling features

## Environment Variables

Create a `.env` file in the root directory:

```env
# AI Service (when implemented)
OPENAI_API_KEY=your_key_here

# Backend API (when implemented)
API_BASE_URL=http://localhost:3000

# Firebase (if using)
FIREBASE_API_KEY=your_key_here
FIREBASE_AUTH_DOMAIN=your_domain
FIREBASE_PROJECT_ID=your_project_id
```

## Development Notes

### Calculator
The dose calculator supports:
- Multiple syringe types (U-100, U-40, Tuberculin)
- Unit conversions (mg ↔ mcg)
- Multi-peptide blends (to be enhanced)

### AI Recommendations
Currently uses mock data. To integrate with OpenAI:

1. Add your API key to `.env`
2. Update `src/services/aiService.ts` to make real API calls
3. Implement proper error handling and rate limiting

### Notifications
Notifications are set up using Expo Notifications. For production:
- Configure FCM for Android
- Configure APNs for iOS
- Set up notification scheduling properly

## Testing

Run tests (when implemented):

```bash
npm test
```

## Building for Production

### iOS
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

## Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `expo start -c`
2. **iOS pod issues**: Run `cd ios && pod install && cd ..`
3. **TypeScript errors**: Run `npm run type-check`
4. **Missing dependencies**: Run `npm install` again

## Next Steps

1. Set up backend API
2. Implement user authentication
3. Connect to database
4. Integrate real AI service
5. Add comprehensive testing
6. Set up CI/CD pipeline

## Support

For issues or questions, please refer to the main README.md or create an issue in the repository.

