import 'util';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../Components/Button';

describe('Button Component', () => {
  it('renders with the correct text', () => {
    render(<Button text="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls the onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button text="Click me" onClick={handleClick} />);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies the primary class by default', () => {
    render(<Button text="Click me" />);
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('primary');
  });

  it('applies the secondary class when type is secondary', () => {
    render(<Button text="Click me" type="secondary" />);
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('secondary');
  });

  it('applies the disabled class and attribute when disabled', () => {
    render(<Button text="Click me" disabled={true} />);
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('disabled');
    expect(button).toBeDisabled();
  });

  it('shows a spinner and disables the button when loading', () => {
    render(<Button text="Click me" loading={true} />);
    
    // Check for spinner
    expect(screen.getByRole('button').getElementsByClassName('spinner')[0]).toBeInTheDocument();
    
    // Button should be disabled when loading
    const button = screen.getByRole('button');
    expect(button).toHaveClass('loading');
    expect(button).toBeDisabled();
    
    // Text should not be visible when loading
    expect(screen.queryByText('Click me')).not.toBeInTheDocument();
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Button text="Click me" onClick={handleClick} disabled={true} />);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('does not call onClick when loading', () => {
    const handleClick = jest.fn();
    render(<Button text="Click me" onClick={handleClick} loading={true} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});