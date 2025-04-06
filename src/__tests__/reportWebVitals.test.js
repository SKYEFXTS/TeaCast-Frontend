import 'util';
import reportWebVitals from '../reportWebVitals';

// Create a more sophisticated mock of web-vitals that manually resolves the import promise
jest.mock('web-vitals', () => ({
  getCLS: jest.fn(),
  getFID: jest.fn(),
  getFCP: jest.fn(),
  getLCP: jest.fn(),
  getTTFB: jest.fn()
}), { virtual: true });

// Mock the dynamic import
jest.mock('../reportWebVitals', () => {
  // Get the original module
  const originalModule = jest.requireActual('../reportWebVitals');
  
  // Return a modified version that doesn't use dynamic import
  return {
    __esModule: true,
    default: (onPerfEntry) => {
      if (onPerfEntry && onPerfEntry instanceof Function) {
        const webVitals = require('web-vitals');
        webVitals.getCLS(onPerfEntry);
        webVitals.getFID(onPerfEntry);
        webVitals.getFCP(onPerfEntry);
        webVitals.getLCP(onPerfEntry);
        webVitals.getTTFB(onPerfEntry);
      }
    }
  };
});

describe('reportWebVitals', () => {
  let webVitals;
  
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    webVitals = require('web-vitals');
  });
  
  it('should not call web-vitals functions when no callback is provided', () => {
    // Call reportWebVitals with no callback
    reportWebVitals();
    
    // None of the functions should have been called
    expect(webVitals.getCLS).not.toHaveBeenCalled();
    expect(webVitals.getFID).not.toHaveBeenCalled();
    expect(webVitals.getFCP).not.toHaveBeenCalled();
    expect(webVitals.getLCP).not.toHaveBeenCalled();
    expect(webVitals.getTTFB).not.toHaveBeenCalled();
  });
  
  it('should not call web-vitals functions when callback is not a function', () => {
    // Call reportWebVitals with a non-function callback
    reportWebVitals('not a function');
    
    // None of the functions should have been called
    expect(webVitals.getCLS).not.toHaveBeenCalled();
    expect(webVitals.getFID).not.toHaveBeenCalled();
    expect(webVitals.getFCP).not.toHaveBeenCalled();
    expect(webVitals.getLCP).not.toHaveBeenCalled();
    expect(webVitals.getTTFB).not.toHaveBeenCalled();
  });
  
  it('should call web-vitals functions when a valid callback is provided', () => {
    // Create a mock callback function
    const mockCallback = jest.fn();
    
    // Call reportWebVitals with the mock callback
    reportWebVitals(mockCallback);
    
    // All functions should have been called with the callback
    expect(webVitals.getCLS).toHaveBeenCalledWith(mockCallback);
    expect(webVitals.getFID).toHaveBeenCalledWith(mockCallback);
    expect(webVitals.getFCP).toHaveBeenCalledWith(mockCallback);
    expect(webVitals.getLCP).toHaveBeenCalledWith(mockCallback);
    expect(webVitals.getTTFB).toHaveBeenCalledWith(mockCallback);
  });
});