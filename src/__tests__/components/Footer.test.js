import 'util';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../Components/Footer';

describe('Footer Component', () => {
  it('renders the contact email correctly', () => {
    render(<Footer />);
    const emailLink = screen.getByText('oshan.20191284@iit.ac.lk');
    expect(emailLink).toBeInTheDocument();
    expect(emailLink.getAttribute('href')).toBe('mailto:oshan.20191284@iit.ac.lk');
  });

  it('renders the phone number correctly', () => {
    render(<Footer />);
    expect(screen.getByText(/\+94 776 006 687/)).toBeInTheDocument();
  });

  it('renders the privacy policy link', () => {
    render(<Footer />);
    const privacyLink = screen.getByText('Privacy Policy');
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink.getAttribute('href')).toBe('/privacy-policy');
  });

  it('renders the terms of service link', () => {
    render(<Footer />);
    const termsLink = screen.getByText('Terms of Service');
    expect(termsLink).toBeInTheDocument();
    expect(termsLink.getAttribute('href')).toBe('/terms-of-service');
  });

  it('renders the separator characters', () => {
    render(<Footer />);
    const separators = screen.getAllByText('|');
    expect(separators.length).toBe(2);
  });
});