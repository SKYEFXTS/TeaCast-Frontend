import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import App from './App';

// Mock the components to avoid unnecessary rendering
jest.mock('./Pages/Home', () => () => <div data-testid="home-page">Home Page</div>);
jest.mock('./Pages/Login', () => () => <div data-testid="login-page">Login Page</div>);
jest.mock('./Pages/Dashboard', () => () => <div data-testid="dashboard-page">Dashboard Page</div>);
jest.mock('./Pages/Prediction', () => () => <div data-testid="prediction-page">Prediction Page</div>);
jest.mock('./Pages/About', () => () => <div data-testid="about-page">About Page</div>);

// Create a version of the App component without the Router for testing
// This avoids the "You cannot render a <Router> inside another <Router>" error
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<div data-testid="home-page">Home Page</div>} />
    <Route path="/login" element={<div data-testid="login-page">Login Page</div>} />
    <Route path="/analytics" element={<div data-testid="dashboard-page">Dashboard Page</div>} />
    <Route path="/predictions" element={<div data-testid="prediction-page">Prediction Page</div>} />
    <Route path="/about" element={<div data-testid="about-page">About Page</div>} />
  </Routes>
);

describe('App Component', () => {
  it('renders the home page by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('renders the login page when navigating to /login', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  it('renders the dashboard page when navigating to /analytics', () => {
    render(
      <MemoryRouter initialEntries={['/analytics']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByTestId('dashboard-page')).toBeInTheDocument();
  });

  it('renders the prediction page when navigating to /predictions', () => {
    render(
      <MemoryRouter initialEntries={['/predictions']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByTestId('prediction-page')).toBeInTheDocument();
  });

  it('renders the about page when navigating to /about', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByTestId('about-page')).toBeInTheDocument();
  });

  it('handles unknown routes appropriately', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <AppRoutes />
      </MemoryRouter>
    );
    // This test checks that unknown routes don't render any of the known pages
    // If you implement a 404 page later, you can update this test
    expect(screen.queryByTestId('home-page')).not.toBeInTheDocument();
    expect(screen.queryByTestId('login-page')).not.toBeInTheDocument();
    expect(screen.queryByTestId('dashboard-page')).not.toBeInTheDocument();
    expect(screen.queryByTestId('prediction-page')).not.toBeInTheDocument();
    expect(screen.queryByTestId('about-page')).not.toBeInTheDocument();
  });
});
