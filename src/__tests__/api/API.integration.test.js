import 'util';
import { loginUser, getPrediction, getTeaAuctionPrices, getDashboardData } from '../../API/API';
import axios from 'axios';

// Mock axios instead of MSW for these tests
jest.mock('axios');

describe('API Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loginUser', () => {
    it('should return success response with valid credentials', async () => {
      // Mock successful response
      axios.post.mockResolvedValueOnce({
        data: {
          success: true,
          token: 'fake-jwt-token',
          user: { id: 1, username: 'testuser' }
        }
      });
      
      const response = await loginUser('testuser', 'password');
      
      expect(response.success).toBe(true);
      expect(response.token).toBe('fake-jwt-token');
      expect(response.user).toEqual({ id: 1, username: 'testuser' });
      expect(axios.post).toHaveBeenCalledWith(
        'http://127.0.0.1:5001/login', 
        { username: 'testuser', password: 'password' }
      );
    });

    it('should return error response with invalid credentials', async () => {
      // Mock error response
      axios.post.mockRejectedValueOnce({
        response: {
          status: 401,
          data: { success: false, message: 'Invalid credentials' }
        }
      });
      
      try {
        await loginUser('wronguser', 'wrongpass');
        fail('Expected function to throw');
      } catch (error) {
        expect(error).toBeDefined();
        expect(axios.post).toHaveBeenCalledWith(
          'http://127.0.0.1:5001/login', 
          { username: 'wronguser', password: 'wrongpass' }
        );
      }
    });

    it('should handle server errors', async () => {
      // Mock server error
      axios.post.mockRejectedValueOnce({
        response: { status: 500 }
      });

      try {
        await loginUser('testuser', 'password');
        fail('Expected function to throw');
      } catch (error) {
        expect(error).toBeDefined();
        expect(axios.post).toHaveBeenCalledWith(
          'http://127.0.0.1:5001/login', 
          { username: 'testuser', password: 'password' }
        );
      }
    });
  });

  describe('getPrediction', () => {
    it('should return prediction data', async () => {
      // Mock successful prediction data
      const mockPredictions = [
        { date: '2023-01-01', price: 350 },
        { date: '2023-01-02', price: 355 },
        { date: '2023-01-03', price: 360 }
      ];
      
      axios.get.mockResolvedValueOnce({
        data: { prediction: mockPredictions }
      });
      
      const predictions = await getPrediction();
      
      expect(Array.isArray(predictions)).toBe(true);
      expect(predictions.length).toBe(3);
      expect(predictions[0]).toHaveProperty('date');
      expect(predictions[0]).toHaveProperty('price');
      expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5001/data/predict');
    });

    it('should handle server errors', async () => {
      // Mock server error
      axios.get.mockRejectedValueOnce({
        response: { status: 500 }
      });

      try {
        await getPrediction();
        fail('Expected function to throw');
      } catch (error) {
        expect(error).toBeDefined();
        expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5001/data/predict');
      }
    });

    it('should handle invalid response format', async () => {
      // Mock invalid response format
      axios.get.mockResolvedValueOnce({
        data: { invalid: 'format' }
      });

      try {
        await getPrediction();
        fail('Expected function to throw');
      } catch (error) {
        expect(error.message).toBe('Invalid API response format');
        expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5001/data/predict');
      }
    });
  });

  describe('getTeaAuctionPrices', () => {
    it('should return tea auction prices', async () => {
      // Mock successful tea auction price data
      const mockPrices = [
        { month: 'Jan', price: 320 },
        { month: 'Feb', price: 330 },
        { month: 'Mar', price: 340 }
      ];
      
      axios.get.mockResolvedValueOnce({
        data: { average_prices: mockPrices }
      });
      
      const prices = await getTeaAuctionPrices();
      
      expect(Array.isArray(prices)).toBe(true);
      expect(prices.length).toBe(3);
      expect(prices[0]).toHaveProperty('month');
      expect(prices[0]).toHaveProperty('price');
      expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5001/data/tea-auction-price');
    });

    it('should return empty array on server error', async () => {
      // Mock server error
      axios.get.mockRejectedValueOnce({
        response: { status: 500 }
      });

      const prices = await getTeaAuctionPrices();
      
      expect(prices).toEqual([]);
      expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5001/data/tea-auction-price');
    });
  });

  describe('getDashboardData', () => {
    it('should return dashboard data', async () => {
      // Mock successful dashboard data
      const mockDashboardData = {
        current_price: 350,
        price_change: 5.2,
        historical_data: [
          { date: '2023-01-01', price: 330 },
          { date: '2023-01-02', price: 340 },
          { date: '2023-01-03', price: 350 }
        ],
        market_trends: {
          upward: 65,
          stable: 25,
          downward: 10
        }
      };
      
      axios.get.mockResolvedValueOnce({
        data: mockDashboardData
      });
      
      const data = await getDashboardData();
      
      expect(data).toHaveProperty('current_price');
      expect(data).toHaveProperty('price_change');
      expect(data).toHaveProperty('historical_data');
      expect(data).toHaveProperty('market_trends');
      expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5001/data/dashboard');
    });

    it('should handle server errors', async () => {
      // Mock server error
      axios.get.mockRejectedValueOnce({
        response: { status: 500 }
      });

      try {
        await getDashboardData();
        fail('Expected function to throw');
      } catch (error) {
        expect(error).toBeDefined();
        expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5001/data/dashboard');
      }
    });
  });
});