module.exports = {
  setupFiles: ['<rootDir>/src/setupPolyfills.js'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js', '<rootDir>/src/setupTests.js'],
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/reportWebVitals.js',
    '!src/setupTests.js',
    '!src/mocks/**',
    '!src/__tests__/**',
    '!src/__mocks__/**',
    '!**/node_modules/**'
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 70,
      functions: 80,
      lines: 80
    }
  },
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)': '<rootDir>/src/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)': '<rootDir>/src/__mocks__/fileMock.js'
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)': ['babel-jest', { configFile: './babel.config.js' }]
  }
};