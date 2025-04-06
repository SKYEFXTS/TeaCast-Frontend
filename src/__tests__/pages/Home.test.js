import 'util';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../Pages/Home';
import { getTeaAuctionPrices } from '../../API/API';

// Mock the API module
jest.mock('../../API/API');

// Mock the components to simplify testing
jest.mock('../../Components/Header', () => () => <div data-testid="header">Header Component</div>);
jest.mock('../../Components/Footer', () => () => <div data-testid="footer">Footer Component</div>);
jest.mock('../../Components/TeaAuctionPrices', () => ({ auctionData }) => (
  <div data-testid="tea-auction-prices">
    {auctionData.map((item, index) => (
      <div key={index} data-testid="auction-item">{item.name}</div>
    ))}
  </div>
));

// Wrap the Home component with BrowserRouter for testing
const HomeWithRouter = () => (
  <BrowserRouter>
    <Home />
  </BrowserRouter>
);

describe('Home Page Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the header and footer components', () => {
    render(<HomeWithRouter />);
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders the hero section with title and buttons', () => {
    render(<HomeWithRouter />);
    
    // Check for the title
    expect(screen.getByText('Welcome to TeaCast')).toBeInTheDocument();
    
    // Check for the CTA buttons
    const analyticsButton = screen.getByText('Go to Analytics');
    expect(analyticsButton).toBeInTheDocument();
    expect(analyticsButton.getAttribute('href')).toBe('/analytics');
    
    const predictionsButton = screen.getByText('Go to Predictions');
    expect(predictionsButton).toBeInTheDocument();
    expect(predictionsButton.getAttribute('href')).toBe('/predictions');
  });

  it('shows loading state while fetching auction data', () => {
    // Mock the API to return a promise that doesn't resolve immediately
    getTeaAuctionPrices.mockImplementation(() => new Promise(() => {}));
    
    render(<HomeWithRouter />);
    
    expect(screen.getByText('Loading auction data...')).toBeInTheDocument();
  });

  it('displays auction data when API call is successful', async () => {
    // Mock successful API response
    const mockAuctionData = [
      { name: 'Ceylon Black Tea', date: '2023-01-15', price: '$4.50' },
      { name: 'Darjeeling Tea', date: '2023-01-16', price: '$5.75' }
    ];
    getTeaAuctionPrices.mockResolvedValue(mockAuctionData);
    
    render(<HomeWithRouter />);
    
    // Wait for the auction data to load
    await waitFor(() => {
      expect(screen.getByTestId('tea-auction-prices')).toBeInTheDocument();
    });
    
    // Check that the TeaAuctionPrices component received the correct data
    expect(screen.getAllByTestId('auction-item').length).toBe(2);
    expect(screen.getByText('Ceylon Black Tea')).toBeInTheDocument();
    expect(screen.getByText('Darjeeling Tea')).toBeInTheDocument();
  });

  it('displays error message when API call fails', async () => {
    // Mock API error
    getTeaAuctionPrices.mockRejectedValue(new Error('API Error'));
    
    render(<HomeWithRouter />);
    
    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText('Failed to load auction data')).toBeInTheDocument();
    });
  });

  it('displays no data message when API returns empty array', async () => {
    // Mock empty API response
    getTeaAuctionPrices.mockResolvedValue([]);
    
    render(<HomeWithRouter />);
    
    // Wait for the no data message to appear
    await waitFor(() => {
      // Updated to match the actual text without the period
      expect(screen.getByText('No auction data available')).toBeInTheDocument();
    });
  });
});