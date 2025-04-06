import 'util';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import About from '../../Pages/About';

// Mock the components to simplify testing
jest.mock('../../Components/Header', () => () => <div data-testid="header">Header Component</div>);
jest.mock('../../Components/Footer', () => () => <div data-testid="footer">Footer Component</div>);

// Mock the image imports
jest.mock('../../Assets/Images/TeaCast Logo.png', () => 'teacast-logo.png');
jest.mock('../../Assets/Images/Logos/Python.png', () => 'python-logo.png');
jest.mock('../../Assets/Images/Logos/Flask.png', () => 'flask-logo.png');
jest.mock('../../Assets/Images/Logos/React.png', () => 'react-logo.png');
jest.mock('../../Assets/Images/Logos/Pandas.png', () => 'pandas-logo.png');
jest.mock('../../Assets/Images/Logos/NumPy.png', () => 'numpy-logo.png');
jest.mock('../../Assets/Images/Logos/statsmodels.png', () => 'statsmodels-logo.png');
jest.mock('../../Assets/Images/Logos/Scikit-learn.png', () => 'scikit-learn-logo.png');
jest.mock('../../Assets/Images/Logos/TensorFlow.png', () => 'tensorflow-logo.png');
jest.mock('../../Assets/Images/Logos/Keras.png', () => 'keras-logo.png');
jest.mock('../../Assets/Images/Logos/Github.png', () => 'github-logo.png');
jest.mock('../../Assets/Images/Logos/LinkedIn.png', () => 'linkedin-logo.png');

// Wrap the About component with BrowserRouter for testing
const AboutWithRouter = () => (
  <BrowserRouter>
    <About />
  </BrowserRouter>
);

describe('About Page Component', () => {
  beforeEach(() => {
    render(<AboutWithRouter />);
  });

  it('renders the header and footer components', () => {
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders the page title and logo', () => {
    expect(screen.getByText('TeaCast')).toBeInTheDocument();
    expect(screen.getByText('Project Overview & Core Technologies')).toBeInTheDocument();
    expect(screen.getByAltText('TeaCast Logo')).toBeInTheDocument();
  });

  it('renders the introduction section', () => {
    expect(screen.getByText('What is TeaCast?')).toBeInTheDocument();
    expect(screen.getByText(/TeaCast is a powerful web application/)).toBeInTheDocument();
  });

  it('renders all core technologies', () => {
    expect(screen.getByText('Core Technologies Used')).toBeInTheDocument();
    
    // Check for all technology names
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('Flask')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Pandas')).toBeInTheDocument();
    expect(screen.getByText('NumPy')).toBeInTheDocument();
    expect(screen.getByText('Statsmodels')).toBeInTheDocument();
    expect(screen.getByText('Scikit-learn')).toBeInTheDocument();
    expect(screen.getByText('TensorFlow')).toBeInTheDocument();
    expect(screen.getByText('Keras')).toBeInTheDocument();
    
    // Check for technology logos
    expect(screen.getByAltText('Python logo')).toBeInTheDocument();
    expect(screen.getByAltText('Flask logo')).toBeInTheDocument();
    expect(screen.getByAltText('React logo')).toBeInTheDocument();
  });

  it('renders the workflow section', () => {
    expect(screen.getByText('How TeaCast Works')).toBeInTheDocument();
    
    // Check for workflow steps
    expect(screen.getByText('Data Collection')).toBeInTheDocument();
    expect(screen.getByText('Data Analysis')).toBeInTheDocument();
    expect(screen.getByText('Prediction')).toBeInTheDocument();
    expect(screen.getByText('User Interface')).toBeInTheDocument();
  });

  it('renders the future plans section', () => {
    expect(screen.getByText('What\'s Next?')).toBeInTheDocument();
    
    // Check for future plans
    expect(screen.getByText('Better Machine Learning Models')).toBeInTheDocument();
    expect(screen.getByText('User Authentication')).toBeInTheDocument();
    expect(screen.getByText('New Data Sources')).toBeInTheDocument();
  });

  it('renders the contact section with links', () => {
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    
    // Check for email
    const emailLink = screen.getByText('oshan.20191284@iit.ac.lk');
    expect(emailLink).toBeInTheDocument();
    expect(emailLink.getAttribute('href')).toBe('mailto:oshan.20191284@iit.ac.lk');
    
    // Check for GitHub repositories
    expect(screen.getByText('GitHub Repositories')).toBeInTheDocument();
    
    const backendRepoLink = screen.getByText('Back-end Repository');
    expect(backendRepoLink).toBeInTheDocument();
    expect(backendRepoLink.getAttribute('href')).toBe('https://github.com/SKYEFXTS/TeaCast-Backend');
    
    const frontendRepoLink = screen.getByText('Front-end Repository');
    expect(frontendRepoLink).toBeInTheDocument();
    expect(frontendRepoLink.getAttribute('href')).toBe('https://github.com/SKYEFXTS/TeaCast-Frontend');
    
    // Check for social media links
    expect(screen.getByAltText('GitHub')).toBeInTheDocument();
    expect(screen.getByAltText('LinkedIn')).toBeInTheDocument();
  });
});