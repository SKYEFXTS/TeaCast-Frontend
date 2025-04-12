#!/usr/bin/env node

/**
 * TeaCast - Netlify Build Script
 * 
 * Custom build script for optimizing the TeaCast application before deployment.
 * This script:
 * 1. Ensures environment variables are set
 * 2. Runs a production build
 * 3. Copies necessary files to the build directory
 * 4. Reports build status
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

// Logging helper functions
const log = {
  info: (msg) => console.log(`${colors.cyan}${colors.bright}INFO:${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}${colors.bright}SUCCESS:${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}${colors.bright}WARNING:${colors.reset} ${msg}`),
  error: (msg) => console.error(`${colors.red}${colors.bright}ERROR:${colors.reset} ${msg}`)
};

// Build steps
async function build() {
  try {
    log.info('Starting TeaCast build process for Netlify deployment...');
    
    // Check for API URL environment variable
    if (!process.env.REACT_APP_API_URL) {
      log.warning('REACT_APP_API_URL environment variable not set. Using default API URL.');
    }
    
    // Run the production build
    log.info('Running production build...');
    execSync('npm run build', { stdio: 'inherit' });
    
    // Ensure _redirects file is in the build directory
    const redirectsPath = path.join(process.cwd(), 'public', '_redirects');
    const buildRedirectsPath = path.join(process.cwd(), 'build', '_redirects');
    
    if (fs.existsSync(redirectsPath) && !fs.existsSync(buildRedirectsPath)) {
      log.info('Copying _redirects file to build directory...');
      fs.copyFileSync(redirectsPath, buildRedirectsPath);
    }
    
    // Report success
    log.success('Build completed successfully!');
    log.info('Your TeaCast application is ready for deployment to Netlify.');
    
  } catch (error) {
    log.error(`Build failed: ${error.message}`);
    process.exit(1);
  }
}

// Execute the build process
build();