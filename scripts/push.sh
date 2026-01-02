#!/bin/bash
# Quick push script for PeptAI

echo "🚀 Pushing changes to GitHub..."

# Add all changes
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "✅ No changes to commit"
    exit 0
fi

# Commit with timestamp
git commit -m "Update: $(date '+%Y-%m-%d %H:%M:%S')"

# Push to main branch
git push origin main

echo "✅ Successfully pushed to GitHub!"

