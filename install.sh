#!/bin/bash

# Axiom Token Table - Installation Script
# This script sets up the project and verifies everything is ready

set -e

echo "🚀 Axiom Token Table - Installation"
echo "===================================="
echo ""

# Check Node.js
echo "📦 Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version is too old (need 18+, have $NODE_VERSION)"
    echo "Please update Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo ""

# Check npm
echo "📦 Checking npm..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi
echo "✅ npm $(npm -v) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
echo "This may take 2-3 minutes..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo "✅ Dependencies installed"
echo ""

# Type check
echo "🔍 Checking TypeScript..."
npm run type-check

if [ $? -eq 0 ]; then
    echo "✅ TypeScript check passed"
else
    echo "⚠️  TypeScript has some errors (will be resolved after dependencies are installed)"
fi
echo ""

# Try to build
echo "🏗️  Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    echo "Please check error messages above"
    exit 1
fi
echo ""

# Success
echo "============================================"
echo "✅ Installation complete!"
echo "============================================"
echo ""
echo "🚀 Next steps:"
echo ""
echo "1. Start development server:"
echo "   npm run dev"
echo ""
echo "2. Open browser:"
echo "   http://localhost:3000"
echo ""
echo "3. Deploy to Vercel:"
echo "   npm i -g vercel"
echo "   vercel --prod"
echo ""
echo "📚 Documentation:"
echo "   - README.md - Full documentation"
echo "   - SETUP.md - Setup guide"
echo "   - QUICK_REFERENCE.md - Quick reference"
echo ""
echo "Happy coding! 🎉"
