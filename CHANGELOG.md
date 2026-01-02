# Changelog

All notable changes to PeptAI will be documented in this file.

## [1.0.0] - Initial Release

### Added

#### Core Features
- ✅ Peptide dose calculator with support for multiple syringe types
- ✅ Calendar view for injection scheduling
- ✅ AI-powered goal-based peptide recommendations
- ✅ Comprehensive peptide library with search and filtering
- ✅ Injection scheduling and tracking
- ✅ Push notification system setup
- ✅ User profile and statistics

#### New Features in This Session
- ✅ **Theme System**: Light and dark theme support with Material Design 3
- ✅ **Reusable Components**: 
  - `LoadingSpinner` - Loading states
  - `EmptyState` - Empty state displays
  - `PeptideCard` - Reusable peptide display card
  - `InjectionCard` - Injection display with status indicators
- ✅ **Multi-Peptide Blend Calculator**: Calculate doses for peptide blends
- ✅ **Settings Screen**: User preferences and app settings
- ✅ **Onboarding Flow**: First-time user experience
- ✅ **Data Persistence**: AsyncStorage utilities for local data storage
- ✅ **Date Helpers**: Comprehensive date/time utility functions
- ✅ **Expanded Peptide Database**: Added 5 more peptides:
  - Semax (Cognitive)
  - Selank (Cognitive)
  - GHK-Cu (Skin Health)
  - DSIP (Sleep)
  - Hexarelin (Growth Factors)

#### Utilities
- `dateHelpers.ts` - Smart date formatting, relative time, recurring date generation
- `storage.ts` - AsyncStorage wrapper for data persistence
- `blendCalculator.ts` - Multi-peptide blend dose calculations

#### Navigation
- Settings screen integration
- Blend calculator screen
- Onboarding flow integration

### Technical Improvements
- TypeScript type safety throughout
- Zustand state management
- React Navigation v6
- React Native Paper UI components
- Expo integration for cross-platform support

### Documentation
- Comprehensive README.md
- Detailed SPECIFICATION.md
- SETUP.md with installation instructions
- CONTRIBUTING.md for contributors
- This CHANGELOG.md

### Known Limitations
- AI recommendations use mock data (ready for OpenAI integration)
- No backend API (local storage only)
- No user authentication
- Calendar recurring injections not yet implemented
- Some UI components need production-ready pickers

### Next Steps
- [ ] Integrate real OpenAI API for recommendations
- [ ] Add recurring injection scheduling
- [ ] Implement user authentication
- [ ] Add backend API integration
- [ ] Enhanced calendar features
- [ ] Production notification setup
- [ ] Add unit tests
- [ ] Add E2E tests

