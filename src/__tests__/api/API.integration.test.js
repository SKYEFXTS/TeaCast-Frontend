import 'util';
import { loginUser, getPrediction, getTeaAuctionPrices, getDashboardData } from '../../API/API';
import { server } from '../../mocks/server';
import { http, HttpResponse } from 'msw';

// These tests verify that our API functions work correctly with the MSW mock server

describe('API Integration with MSW', () => {
  beforeAll(() => {
    // Establish API mocking before all tests
    server.listen();
  });

  afterEach(() => {
    // Reset any request handlers that we may add during the tests
    server.resetHandlers();
  });

  afterAll(() => {
    // Clean up after the tests are finished
    server.close();
  });

  describe('loginUser', () => {
    it('should return success response with valid credentials', async () => {
      const response = await loginUser('testuser', 'password');
      
      expect(response.success).toBe(true);
      expect(response.token).toBe('fake-jwt-token');
      expect(response.user).toEqual({ id: 1, username: 'testuser' });
    });

    it('should return error response with invalid credentials', async () => {
      const response = await loginUser('wronguser', 'wrongpass');
      expect(response.success).toBe(false);
      expect(response.message).toBe('Invalid credentials');
    });

    it('should handle server errors', async () => {
      // Override the default handler for this test only
      server.use(
        http.post('http://127.0.0.1:5000/login', () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      try {
        await loginUser('testuser', 'password');
        // If we get here, the test should fail
        expect(true).toBe(false); // This should not execute
      } catch (error) {
        expect(error.response.status).toBe(500);
      }
    });
  });

  describe('getPrediction', () => {
    it('should return prediction data', async () => {
      const predictions = await getPrediction();
      
      expect(Array.isArray(predictions)).toBe(true);
      expect(predictions.length).toBe(3);
      expect(predictions[0]).toHaveProperty('date');
      expect(predictions[0]).toHaveProperty('price');
    });

    it('should handle server errors', async () => {
      // Override the default handler for this test only
      server.use(
        http.get('http://127.0.0.1:5000/data/predict', () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      try {
        await getPrediction();
        // If we get here, the test should fail
        expect(true).toBe(false); // This should not execute
      } catch (error) {
        expect(error.response.status).toBe(500);
      }
    });

    it('should handle invalid response format', async () => {
      // Override the default handler for this test only
      server.use(
        http.get('http://127.0.0.1:5000/data/predict', () => {
          return HttpResponse.json({ invalid: 'format' });
        })
      );

      try {
        await getPrediction();
        // If we get here, the test should fail
        expect(true).toBe(false); // This should not execute
      } catch (error) {
        expect(error.message).toBe('Invalid API response format');
      }
    });
  });

  describe('getTeaAuctionPrices', () => {
    it('should return tea auction prices', async () => {
      const prices = await getTeaAuctionPrices();
      
      expect(Array.isArray(prices)).toBe(true);
      expect(prices.length).toBe(3);
      expect(prices[0]).toHaveProperty('month');
      expect(prices[0]).toHaveProperty('price');
    });

    it('should return empty array on server error', async () => {
      // Override the default handler for this test only
      server.use(
        http.get('http://127.0.0.1:5000/data/tea-auction-price', () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      const prices = await getTeaAuctionPrices();
      expect(prices).toEqual([]);
    });
  });

  describe('getDashboardData', () => {
    it('should return dashboard data', async () => {
      const data = await getDashboardData();
      
      expect(data).toHaveProperty('current_price');
      expect(data).toHaveProperty('price_change');
      expect(data).toHaveProperty('historical_data');
      expect(data).toHaveProperty('market_trends');
    });

    it('should handle server errors', async () => {
      // Override the default handler for this test only
      server.use(
        http.get('http://127.0.0.1:5000/data/dashboard', () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      try {
        await getDashboardData();
        // If we get here, the test should fail
        expect(true).toBe(false); // This should not execute
      } catch (error) {
        expect(error.response.status).toBe(500);
      }
    });
  });
});