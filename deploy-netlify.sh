#!/bin/bash

# TeaCast - Netlify Deployment Script
# This script automates the process of deploying the TeaCast application to Netlify
# It performs the following steps:
# 1. Runs tests to ensure everything is working
# 2. Builds the application for production
# 3. Deploys to Netlify (if netlify-cli is installed)

echo "=== TeaCast Netlify Deployment Script ==="
echo "Starting deployment process..."

# Check if on deployment branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "deployment" ]; then
    echo "⚠️  Warning: You are not on the deployment branch."
    echo "Current branch is: $CURRENT_BRANCH"
    read -p "Do you want to continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Deployment cancelled. Please switch to the deployment branch."
        exit 1
    fi
fi

# Run tests
echo "Running tests to ensure everything is working..."
npm run test:coverage

# Check if tests passed
if [ $? -ne 0 ]; then
    echo "❌ Tests failed. Please fix the issues before deploying."
    exit 1
fi

echo "✅ Tests passed successfully!"

# Build the application
echo "Building the application for production..."
npm run netlify-build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check the error messages above."
    exit 1
fi

echo "✅ Build completed successfully!"

# Check if netlify CLI is installed
if command -v netlify &> /dev/null; then
    echo "Netlify CLI detected. Do you want to deploy now?"
    read -p "Deploy to Netlify? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Deploying to Netlify..."
        netlify deploy --prod
    else
        echo "Manual deployment: To deploy manually, go to the Netlify dashboard and deploy the site."
    fi
else
    echo "Netlify CLI not found. To deploy:"
    echo "1. Install Netlify CLI: npm install -g netlify-cli"
    echo "2. Login to Netlify: netlify login"
    echo "3. Deploy: netlify deploy --prod"
    echo "Or use the Netlify web interface to deploy manually."
fi

echo "=== Deployment process completed ==="