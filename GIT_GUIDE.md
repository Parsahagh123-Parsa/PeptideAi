# Git Quick Reference Guide

## Repository
- **GitHub**: https://github.com/Parsahagh123-Parsa/PeptideAi.git
- **Branch**: `main`

## Quick Commands

### Easy Push (Recommended)
```bash
npm run push
```
This will automatically:
- Add all changes
- Commit with timestamp
- Push to GitHub

### Manual Git Commands

#### Check Status
```bash
npm run status
# or
git status
```

#### Add and Commit
```bash
npm run commit
# or manually:
git add .
git commit -m "Your commit message"
```

#### Push Changes
```bash
git push origin main
```

#### Pull Latest Changes
```bash
git pull origin main
```

#### View Commit History
```bash
git log --oneline
```

## Workflow

1. **Make your changes** to the code
2. **Push easily**: `npm run push`
3. **Or manually**:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```

## Auto-Push (Optional)

If you want automatic pushes after each commit, you can enable the post-commit hook:

```bash
chmod +x .git/hooks/post-commit
# Then edit .git/hooks/post-commit and uncomment the push line
```

**Note**: Auto-push is generally not recommended for security reasons, but the option is available.

## Troubleshooting

### If push fails due to authentication:
```bash
# Use personal access token or SSH key
git remote set-url origin https://YOUR_TOKEN@github.com/Parsahagh123-Parsa/PeptideAi.git
```

### If you need to force push (use with caution):
```bash
git push origin main --force
```

### Reset to last commit:
```bash
git reset --hard HEAD
```

## Branch Management

### Create a new branch:
```bash
git checkout -b feature/your-feature-name
```

### Switch branches:
```bash
git checkout main
```

### Merge branch:
```bash
git checkout main
git merge feature/your-feature-name
```

