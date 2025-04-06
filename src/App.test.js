import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the components to avoid unnecessary rendering
jest.mock('./Pages/Home', () => () => <div data-testid="home-page">Home Page</div>);
jest.mock('./Pages/Login', () => () => <div data-testid="login-page">Login Page</div>);
jest.mock('./Pages/Dashboard', () => () => <div data-testid="dashboard-page">Dashboard Page</div>);
jest.mock('./Pages/Prediction', () => () => <div data-testid="prediction-page">Prediction Page</div>);
jest.mock('./Pages/About', () => () => <div data-testid="about-page">About Page</div>);

// Mock useLocation to control the current route
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }) => children,
  Routes: ({ children }) => children,
  Route: ({ element }) => element,
}));

test('renders the app with routes', () => {
  render(<App />);
  // Since we're mocking the router, all routes will render their elements
  expect(screen.getByTestId('home-page')).toBeInTheDocument();
});
