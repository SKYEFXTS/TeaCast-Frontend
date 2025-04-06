import 'util';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../../Components/Header';

// Wrap the Header component with BrowserRouter for testing
const HeaderWithRouter = () => (
  <BrowserRouter>
    <Header />
  </BrowserRouter>
);

describe('Header Component', () => {
  it('renders the TeaCast logo and text', () => {
    render(<HeaderWithRouter />);
    
    // Check for the logo image
    const logoImage = screen.getByAltText('TeaCast Logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveClass('logo-image');
    
    // Check for the TeaCast text
    expect(screen.getByText('TeaCast')).toBeInTheDocument();
  });

  it('renders all navigation links with correct hrefs', () => {
    render(<HeaderWithRouter />);
    
    // Check for Home link
    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    
    // Check for Prediction link
    const predictionLink = screen.getByText('Prediction');
    expect(predictionLink).toBeInTheDocument();
    expect(predictionLink.closest('a')).toHaveAttribute('href', '/predictions');
    
    // Check for Analytics link
    const analyticsLink = screen.getByText('Analytics');
    expect(analyticsLink).toBeInTheDocument();
    expect(analyticsLink.closest('a')).toHaveAttribute('href', '/analytics');
    
    // Check for Login link
    const loginLink = screen.getByText('Login');
    expect(loginLink).toBeInTheDocument();
    expect(loginLink.closest('a')).toHaveAttribute('href', '/login');
    
    // Check for About link
    const aboutLink = screen.getByText('About');
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink.closest('a')).toHaveAttribute('href', '/about');
  });

  it('has the correct structure with header, logo and nav elements', () => {
    render(<HeaderWithRouter />);
    
    // Check for header element
    expect(screen.getByRole('banner')).toHaveClass('header');
    
    // Check for logo div
    expect(screen.getByText('TeaCast').closest('div')).toHaveClass('logo');
    
    // Check for nav element
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});