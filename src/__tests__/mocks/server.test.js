import 'util';
import { rest } from 'msw';
import { server } from '../../mocks/server';
import { handlers } from '../../mocks/handlers';

describe('MSW Server Setup', () => {
  it('should have the correct handlers registered', () => {
    // Check that the server has the correct number of handlers
    expect(handlers.length).toBe(4);
    
    // Check that the handlers include the expected endpoints
    const endpoints = handlers.map(handler => handler.info.path);
    expect(endpoints).toContain('http://127.0.0.1:5000/login');
    expect(endpoints).toContain('http://127.0.0.1:5000/data/predict');
    expect(endpoints).toContain('http://127.0.0.1:5000/data/tea-auction-price');
    expect(endpoints).toContain('http://127.0.0.1:5000/data/dashboard');
  });
  
  it('should have the server properly configured', () => {
    // Check that the server object exists and has the expected methods
    expect(server).toBeDefined();
    expect(typeof server.listen).toBe('function');
    expect(typeof server.close).toBe('function');
    expect(typeof server.resetHandlers).toBe('function');
  });
});