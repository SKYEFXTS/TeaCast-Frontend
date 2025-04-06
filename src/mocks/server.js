// Mock MSW server implementation that doesn't require TextEncoder
// This avoids the TextEncoder not defined errors

// Simple server mock with the same interface as MSW
const serverMock = {
  listen: () => console.log('Mock server started'),
  close: () => console.log('Mock server stopped'),
  resetHandlers: () => console.log('Mock handlers reset'),
  use: () => console.log('Mock handlers added')
};

// Export the mock server
export const server = serverMock;