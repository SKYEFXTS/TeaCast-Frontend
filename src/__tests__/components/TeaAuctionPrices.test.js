import 'util';
import React from 'react';
import { render, screen } from '@testing-library/react';
import TeaAuctionPrices from '../../Components/TeaAuctionPrices';

describe('TeaAuctionPrices Component', () => {
  const mockAuctionData = [
    { name: 'Ceylon Black Tea', date: '2023-01-15', price: '$4.50' },
    { name: 'Darjeeling Tea', date: '2023-01-16', price: '$5.75' },
    { name: 'Assam Tea', date: '2023-01-17', price: '$3.25' }
  ];

  it('renders auction cards when data is provided', () => {
    render(<TeaAuctionPrices auctionData={mockAuctionData} />);
    
    // Check for the container
    expect(screen.getByTestId('auction-grid')).toBeInTheDocument();
    
    // Check for all tea names
    expect(screen.getByText('Ceylon Black Tea')).toBeInTheDocument();
    expect(screen.getByText('Darjeeling Tea')).toBeInTheDocument();
    expect(screen.getByText('Assam Tea')).toBeInTheDocument();
    
    // Check for auction dates
    expect(screen.getByText('Auction Date: 2023-01-15')).toBeInTheDocument();
    expect(screen.getByText('Auction Date: 2023-01-16')).toBeInTheDocument();
    expect(screen.getByText('Auction Date: 2023-01-17')).toBeInTheDocument();
    
    // Check for prices
    expect(screen.getByText('Starting Price: $4.50')).toBeInTheDocument();
    expect(screen.getByText('Starting Price: $5.75')).toBeInTheDocument();
    expect(screen.getByText('Starting Price: $3.25')).toBeInTheDocument();
  });

  it('renders a message when no auction data is available', () => {
    render(<TeaAuctionPrices auctionData={[]} />);
    
    // Check for the empty state message
    expect(screen.getByText('No auction data available.')).toBeInTheDocument();
  });

  it('renders the correct number of auction cards', () => {
    render(<TeaAuctionPrices auctionData={mockAuctionData} />);
    
    // Check for the number of auction cards
    const auctionCards = screen.getAllByTestId('auction-card');
    expect(auctionCards.length).toBe(3);
  });
});