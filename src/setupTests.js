// jest-dom adds custom jest matchers for asserting on DOM nodes.
import '@testing-library/jest-dom';
import { server } from './mocks/server';

// Mock axios
jest.mock('axios');

// Establish API mocking before all tests
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests
afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});

// Clean up after the tests are finished
afterAll(() => server.close());