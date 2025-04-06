import 'util';
import { server } from '../mocks/server';
import axios from 'axios';

// Since setupTests.js is automatically loaded by Jest, we can't directly test it.
// Instead, we can test that the expected side effects have occurred.

describe('Setup Tests Configuration', () => {
  it('should have axios mocked', () => {
    // Check that axios methods are mocked
    expect(jest.isMockFunction(axios.get)).toBe(true);
    expect(jest.isMockFunction(axios.post)).toBe(true);
    expect(jest.isMockFunction(axios.put)).toBe(true);
    expect(jest.isMockFunction(axios.delete)).toBe(true);
  });

  it('should have MSW server configured', () => {
    // Check that the server object exists and has the expected methods
    expect(server).toBeDefined();
    expect(typeof server.listen).toBe('function');
    expect(typeof server.close).toBe('function');
    expect(typeof server.resetHandlers).toBe('function');
  });
});