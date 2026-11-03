#!/bin/bash
set -e

echo "🔨 Building Stellar Toolkit..."

# Clean previous build
echo "Cleaning previous build..."
rm -rf dist/

# Run TypeScript compiler
echo "Running TypeScript compiler..."
npm run build

# Verify build output
if [ -f "dist/index.js" ]; then
    echo "✅ Build successful!"
    echo "Output files:"
    ls -lh dist/
else
    echo "❌ Build failed - output files not found"
    exit 1
fi

echo "🎉 Build complete!"
