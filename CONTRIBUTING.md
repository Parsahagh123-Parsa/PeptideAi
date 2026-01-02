# Contributing to PeptAI

Thank you for your interest in contributing to PeptAI! This document provides guidelines and instructions for contributing.

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/PeptAI.git`
3. Install dependencies: `npm install`
4. Create a new branch: `git checkout -b feature/your-feature-name`
5. Make your changes
6. Test your changes
7. Commit your changes: `git commit -m "Add your feature"`
8. Push to your fork: `git push origin feature/your-feature-name`
9. Create a Pull Request

## Code Style

- Use TypeScript for all new code
- Follow the existing code style and formatting
- Run `npm run lint` before committing
- Run `npm run type-check` to ensure TypeScript is happy

## Commit Messages

Use clear, descriptive commit messages:
- `feat: Add peptide search functionality`
- `fix: Correct dose calculation for U-40 syringes`
- `docs: Update README with setup instructions`

## Pull Request Process

1. Ensure your code follows the project's style guidelines
2. Update documentation if needed
3. Add tests for new features (when test suite is set up)
4. Ensure all tests pass
5. Request review from maintainers

## Feature Guidelines

### Adding New Peptides

To add a new peptide to the library:

1. Add entry to `src/constants/peptides.ts`
2. Include all required fields (name, mechanism, benefits, dosing, etc.)
3. Ensure safety information is accurate
4. Update any relevant documentation

### Adding New Features

1. Create feature branch
2. Implement feature following existing patterns
3. Update types in `src/types/index.ts` if needed
4. Add to navigation if it's a new screen
5. Update documentation

## Testing

When adding new features:
- Test on both iOS and Android if possible
- Test edge cases (empty inputs, invalid data, etc.)
- Ensure calculations are accurate
- Verify UI works in both light and dark modes

## Questions?

If you have questions, please open an issue or contact the maintainers.

