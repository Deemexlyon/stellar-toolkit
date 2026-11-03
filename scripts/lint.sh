#!/bin/bash
set -e

echo "🔍 Linting Stellar Toolkit..."

# Run ESLint
echo "Running ESLint..."
npm run lint

# Run TypeScript type checking
echo "Running TypeScript type check..."
npm run type-check || tsc --noEmit

# Run Prettier check
echo "Checking code formatting..."
npx prettier --check "src/**/*.ts"

echo "✅ Linting complete!"
