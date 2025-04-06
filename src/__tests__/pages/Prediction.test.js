import 'util';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Prediction from '../../Pages/Prediction';
import { getPrediction } from '../../API/API';

// Mock the API module
jest.mock('../../API/API');

// Mock the recharts library
jest.mock('recharts', () => {
  const OriginalModule = jest.requireActual('recharts');
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }) => <div data-testid="responsive-container">{children}</div>,
    LineChart: ({ children }) => <div data-testid="line-chart">{children}</div>,
    Line: () => <div data-testid="chart-line"></div>,
    XAxis: () => <div data-testid="x-axis"></div>,
    YAxis: () => <div data-testid="y-axis"></div>,
    CartesianGrid: () => <div data-testid="cartesian-grid"></div>,
    Tooltip: () => <div data-testid="tooltip"></div>
  };
});

// Mock the components to simplify testing
jest.mock('../../Components/Header', () => () => <div data-testid="header">Header Component</div>);
jest.mock('../../Components/Footer', () => () => <div data-testid="footer">Footer Component</div>);

// Wrap the Prediction component with BrowserRouter for testing
const PredictionWithRouter = () => (
  <BrowserRouter>
    <Prediction />
  </BrowserRouter>
);

describe('Prediction Page Component', () => {
  // Mock prediction data for testing
  const mockPredictionData = [
    { Auction_Number: 1, Final_Prediction: 1250.75 },
    { Auction_Number: 2, Final_Prediction: 1275.50 },
    { Auction_Number: 3, Final_Prediction: 1300.25 }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state while fetching data', () => {
    // Mock the API to return a promise that doesn't resolve immediately
    getPrediction.mockImplementation(() => new Promise(() => {}));
    
    render(<PredictionWithRouter />);
    
    expect(screen.getByText('Loading predictions...')).toBeInTheDocument();
  });

  it('displays error message when API call fails', async () => {
    // Mock API error
    getPrediction.mockRejectedValue(new Error('API Error'));
    
    render(<PredictionWithRouter />);
    
    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Error loading predictions/)).toBeInTheDocument();
    });
  });

  it('renders prediction content when data is loaded successfully', async () => {
    // Mock successful API response
    getPrediction.mockResolvedValue(mockPredictionData);
    
    render(<PredictionWithRouter />);
    
    // Wait for the prediction content to load
    await waitFor(() => {
      expect(screen.getByText('Tea Price Predictions')).toBeInTheDocument();
    });
    
    // Check for chart title
    expect(screen.getByText('Price Prediction Trend')).toBeInTheDocument();
    expect(screen.getByText('(Western High - BOPF/BOPFSp)')).toBeInTheDocument();
    
    // Check for table title
    expect(screen.getByText('Detailed Predictions')).toBeInTheDocument();
    
    // Check for table headers
    expect(screen.getByText('Auction Number')).toBeInTheDocument();
    expect(screen.getByText('Predicted Price (LKR)')).toBeInTheDocument();
    
    // Check for chart components
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
  });

  it('renders the prediction table with correct data', async () => {
    // Mock successful API response
    getPrediction.mockResolvedValue(mockPredictionData);
    
    render(<PredictionWithRouter />);
    
    // Wait for the prediction content to load
    await waitFor(() => {
      // Check for auction numbers in the table
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      
      // Check for formatted prediction prices in the table
      expect(screen.getByText('1250.75')).toBeInTheDocument();
      expect(screen.getByText('1275.50')).toBeInTheDocument();
      expect(screen.getByText('1300.25')).toBeInTheDocument();
    });
  });

  it('throws an error when prediction data format is invalid', async () => {
    // Mock invalid API response (not an array)
    getPrediction.mockResolvedValue({ data: 'invalid format' });
    
    render(<PredictionWithRouter />);
    
    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Error loading predictions/)).toBeInTheDocument();
    });
  });
});