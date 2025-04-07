import 'util';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../../Pages/Login';
import axios from 'axios';

// Mock axios
jest.mock('axios');

// Mock react-router-dom's useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Wrap the LoginPage component with BrowserRouter for testing
const LoginWithRouter = () => (
  <BrowserRouter>
    <LoginPage />
  </BrowserRouter>
);

describe('Login Page Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders the login form with username and password inputs', () => {
    render(<LoginWithRouter />);
    
    // Check for the title - using heading role to be more specific
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
    
    // Check for the form inputs
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    
    // Check for the submit button
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('updates input values when user types', () => {
    render(<LoginWithRouter />);
    
    // Get the input elements
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    
    // Simulate user typing
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // Check that the input values were updated
    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('password123');
  });

  it('submits the form and navigates to dashboard on successful login', async () => {
    // Mock successful API response
    axios.post.mockResolvedValueOnce({ 
      data: { role: 'admin' } 
    });
    
    render(<LoginWithRouter />);
    
    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('Username'), { 
      target: { value: 'testuser' } 
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), { 
      target: { value: 'password123' } 
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    
    // Wait for the API call to complete
    await waitFor(() => {
      // Check that axios.post was called with the correct arguments
      expect(axios.post).toHaveBeenCalledWith(
        'http://127.0.0.1:5001/login', 
        { username: 'testuser', password: 'password123' }
      );
      
      // Check that the role was saved to localStorage
      expect(localStorage.getItem('role')).toBe('admin');
      
      // Check that the user was redirected to the dashboard
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('displays an error message on failed login', async () => {
    // Mock failed API response
    axios.post.mockRejectedValueOnce(new Error('Invalid credentials'));
    
    render(<LoginWithRouter />);
    
    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('Username'), { 
      target: { value: 'wronguser' } 
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), { 
      target: { value: 'wrongpassword' } 
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    
    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText('Invalid credentials, please try again')).toBeInTheDocument();
    });
    
    // Check that localStorage was not updated
    expect(localStorage.getItem('role')).toBeNull();
    
    // Check that the user was not redirected
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});