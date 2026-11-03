#!/bin/bash
set -e

echo "🧪 Running Stellar Toolkit Tests..."

# Run tests with coverage
echo "Running Jest tests..."
npm test -- --coverage

# Check test results
if [ $? -eq 0 ]; then
    echo "✅ All tests passed!"
else
    echo "❌ Tests failed"
    exit 1
fi

echo "🎉 Testing complete!"
