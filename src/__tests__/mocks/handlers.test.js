import 'util';

// Create mock for MSW http module
jest.mock('msw', () => ({
  http: {
    post: (path, resolver) => ({
      info: { path, method: 'POST' },
      handler: resolver
    }),
    get: (path, resolver) => ({
      info: { path, method: 'GET' },
      handler: resolver
    })
  },
  HttpResponse: {
    json: (data, options = {}) => {
      const status = options.status || 200;
      return {
        status,
        json: async () => data
      };
    }
  }
}), { virtual: true });

// Import after mocking
import { handlers } from '../../mocks/handlers';

describe('MSW Handlers', () => {
  it('should have the correct number of handlers', () => {
    expect(handlers).toBeDefined();
    expect(handlers.length).toBeGreaterThan(0);
  });

  it('should have handlers for key API endpoints', () => {
    const endpoints = handlers.map(handler => ({
      path: handler.info.path,
      method: handler.info.method
    }));

    // Check if essential endpoints are present
    expect(endpoints).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: 'http://127.0.0.1:5000/login', method: 'POST' }),
        expect.objectContaining({ path: 'http://127.0.0.1:5000/data/predict', method: 'GET' }),
        expect.objectContaining({ path: 'http://127.0.0.1:5000/data/tea-auction-price', method: 'GET' }),
        expect.objectContaining({ path: 'http://127.0.0.1:5000/data/dashboard', method: 'GET' })
      ])
    );
  });
});