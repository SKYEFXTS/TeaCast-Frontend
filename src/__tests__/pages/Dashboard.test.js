import 'util';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../../Pages/Dashboard';
import { getDashboardData } from '../../API/API';

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

// Wrap the Dashboard component with BrowserRouter for testing
const DashboardWithRouter = () => (
  <BrowserRouter>
    <Dashboard />
  </BrowserRouter>
);

describe('Dashboard Page Component', () => {
  // Mock dashboard data for testing
  const mockDashboardData = {
    tea_price_data: {
      tea_prices: [
        { date: '2023-01-01', price: 1200 },
        { date: '2023-01-15', price: 1250 }
      ],
      usd_rates: [
        { date: '2023-01-01', rate: 320 },
        { date: '2023-01-15', rate: 325 }
      ],
      crude_oil_prices: [
        { date: '2023-01-01', price: 85 },
        { date: '2023-01-15', price: 87 }
      ]
    },
    all_average_price_data: {
      'WESTERN HIGH': { average_price: 1250.50, date: '2023-01-15' },
      'WESTERN MEDIUM': { average_price: 1150.75, date: '2023-01-15' },
      'LOW GROWNS': { average_price: 950.25, date: '2023-01-15' },
      'OTHER CATEGORY': { average_price: 850.00, date: '2023-01-15' }
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state while fetching data', () => {
    // Mock the API to return a promise that doesn't resolve immediately
    getDashboardData.mockImplementation(() => new Promise(() => {}));
    
    render(<DashboardWithRouter />);
    
    expect(screen.getByText('Loading dashboard data...')).toBeInTheDocument();
  });

  it('displays error message when API call fails', async () => {
    // Mock API error
    getDashboardData.mockRejectedValue(new Error('API Error'));
    
    render(<DashboardWithRouter />);
    
    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Error loading dashboard data/)).toBeInTheDocument();
    });
  });

  it('renders dashboard content when data is loaded successfully', async () => {
    // Mock successful API response
    getDashboardData.mockResolvedValue(mockDashboardData);
    
    render(<DashboardWithRouter />);
    
    // Wait for the dashboard content to load
    await waitFor(() => {
      expect(screen.getByText('Tea Market Analytics Dashboard')).toBeInTheDocument();
    });
    
    // Check for chart titles
    expect(screen.getByText(/Tea Price Trends/)).toBeInTheDocument();
    expect(screen.getByText('USD-LKR Exchange Rate')).toBeInTheDocument();
    expect(screen.getByText('Crude Oil Price Trends')).toBeInTheDocument();
    
    // Check for priority tea categories
    expect(screen.getByText('WESTERN HIGH')).toBeInTheDocument();
    expect(screen.getByText('WESTERN MEDIUM')).toBeInTheDocument();
    expect(screen.getByText('LOW GROWNS')).toBeInTheDocument();
    
    // Check for other categories section
    expect(screen.getByText('Other Tea Categories')).toBeInTheDocument();
    expect(screen.getByText('OTHER CATEGORY')).toBeInTheDocument();
    
    // Check for charts
    expect(screen.getAllByTestId('responsive-container').length).toBeGreaterThan(0);
    expect(screen.getAllByTestId('line-chart').length).toBeGreaterThan(0);
  });

  it('formats prices correctly in the price tiles', async () => {
    // Mock successful API response
    getDashboardData.mockResolvedValue(mockDashboardData);
    
    render(<DashboardWithRouter />);
    
    // Wait for the dashboard content to load
    await waitFor(() => {
      // Check for formatted prices
      expect(screen.getByText('LKR 1250.50')).toBeInTheDocument();
      expect(screen.getByText('LKR 1150.75')).toBeInTheDocument();
      expect(screen.getByText('LKR 950.25')).toBeInTheDocument();
      expect(screen.getByText('LKR 850.00')).toBeInTheDocument();
    });
  });
});