import 'util';
import axios from 'axios';
import { loginUser, getPrediction, getTeaAuctionPrices, getDashboardData } from '../../API/API';

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Spy on console methods to prevent them from cluttering test output
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console methods
    console.log.mockRestore();
    console.error.mockRestore();
    console.warn.mockRestore();
  });

  describe('loginUser', () => {
    it('should call the login API with correct parameters', async () => {
      // Mock the axios post method
      const mockResponse = { data: { success: true, token: 'fake-token', user: { id: 1, username: 'testuser' } } };
      axios.post.mockResolvedValueOnce(mockResponse);

      // Call the function
      const result = await loginUser('testuser', 'password');

      // Assertions
      expect(axios.post).toHaveBeenCalledWith(
        'http://127.0.0.1:5001/login', 
        { username: 'testuser', password: 'password' }
      );
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw an error when the API call fails', async () => {
      // Mock the axios post method to throw an error
      const mockError = new Error('Network error');
      axios.post.mockRejectedValueOnce(mockError);

      // Call the function and expect it to throw
      await expect(loginUser('testuser', 'password')).rejects.toThrow('Network error');
    });

    it('should handle authentication failure correctly', async () => {
      // Mock the axios post method with authentication failure
      const mockResponse = { data: { success: false, message: 'Invalid credentials' } };
      axios.post.mockResolvedValueOnce(mockResponse);

      // Call the function
      const result = await loginUser('wronguser', 'wrongpass');

      // Assertions
      expect(result).toEqual(mockResponse.data);
      expect(result.success).toBe(false);
    });
  });

  describe('getPrediction', () => {
    it('should return prediction data when API call is successful', async () => {
      // Mock the axios get method
      const mockPredictionData = [
        { date: '2023-01-01', price: 350 },
        { date: '2023-01-02', price: 355 }
      ];
      axios.get.mockResolvedValueOnce({ 
        data: { prediction: mockPredictionData } 
      });

      // Call the function
      const result = await getPrediction();

      // Assertions
      expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5001/data/predict');
      expect(result).toEqual(mockPredictionData);
    });

    it('should throw an error when the API response is invalid', async () => {
      // Mock the axios get method with invalid response
      axios.get.mockResolvedValueOnce({ data: {} });

      // Call the function and expect it to throw
      await expect(getPrediction()).rejects.toThrow('Invalid API response format');
      expect(console.warn).toHaveBeenCalledWith('Unexpected API response structure:', {});
    });

    it('should return null when the API response has null prediction', async () => {
      // Mock the axios get method with null prediction
      axios.get.mockResolvedValueOnce({ data: { prediction: null } });

      // Call the function
      const result = await getPrediction();

      // Assertions
      expect(result).toBeNull();
    });

    it('should throw an error when the API call fails', async () => {
      // Mock the axios get method to throw an error
      const mockError = new Error('Network error');
      axios.get.mockRejectedValueOnce(mockError);

      // Call the function and expect it to throw
      await expect(getPrediction()).rejects.toThrow('Network error');
      expect(console.error).toHaveBeenCalledWith('Error fetching predictions:', mockError);
    });
  });

  describe('getTeaAuctionPrices', () => {
    it('should return tea auction prices when API call is successful', async () => {
      // Mock the axios get method
      const mockPrices = [
        { month: 'Jan', price: 320 },
        { month: 'Feb', price: 330 }
      ];
      axios.get.mockResolvedValueOnce({ 
        data: { average_prices: mockPrices } 
      });

      // Call the function
      const result = await getTeaAuctionPrices();

      // Assertions
      expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5001/data/tea-auction-price');
      expect(result).toEqual(mockPrices);
    });

    it('should return empty array when the API call fails', async () => {
      // Mock the axios get method to throw an error
      const mockError = new Error('Network error');
      axios.get.mockRejectedValueOnce(mockError);

      // Call the function
      const result = await getTeaAuctionPrices();

      // Assertions
      expect(result).toEqual([]);
      expect(console.error).toHaveBeenCalledWith('Error fetching tea auction prices:', mockError);
    });

    it('should handle empty response data correctly', async () => {
      // Mock the axios get method with empty response
      axios.get.mockResolvedValueOnce({ data: {} });

      // Call the function
      const result = await getTeaAuctionPrices();

      // Assertions
      expect(result).toBeUndefined();
    });
  });

  describe('getDashboardData', () => {
    it('should return dashboard data when API call is successful', async () => {
      // Mock the axios get method
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

      // Call the function
      const result = await getDashboardData();

      // Assertions
      expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5001/data/dashboard');
      expect(result).toEqual(mockDashboardData);
      expect(console.log).toHaveBeenCalledWith('Fetching dashboard data from:', 'http://127.0.0.1:5001/data/dashboard');
    });

    it('should throw an error when the API call fails', async () => {
      // Mock the axios get method to throw an error
      const mockError = new Error('Network error');
      axios.get.mockRejectedValueOnce(mockError);

      // Call the function and expect it to throw
      await expect(getDashboardData()).rejects.toThrow('Network error');
      expect(console.error).toHaveBeenCalledWith('Error fetching dashboard data:', mockError);
    });

    it('should handle empty response data correctly', async () => {
      // Mock the axios get method with empty response
      axios.get.mockResolvedValueOnce({ data: {} });

      // Call the function
      const result = await getDashboardData();

      // Assertions
      expect(result).toEqual({});
    });
  });
});