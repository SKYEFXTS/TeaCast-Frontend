import { http, HttpResponse } from 'msw';

const apiUrl = 'http://127.0.0.1:5001';

export const handlers = [
  // Mock login endpoint
  http.post(`${apiUrl}/login`, async ({ request }) => {
    const { username, password } = await request.json();
    
    if (username === 'testuser' && password === 'password') {
      return HttpResponse.json({
        success: true,
        token: 'fake-jwt-token',
        user: { id: 1, username: 'testuser' }
      });
    } else {
      return new HttpResponse(
        JSON.stringify({ success: false, message: 'Invalid credentials' }),
        { status: 401 }
      );
    }
  }),

  // Mock prediction data endpoint
  http.get(`${apiUrl}/data/predict`, () => {
    return HttpResponse.json({
      prediction: [
        { date: '2023-01-01', price: 350 },
        { date: '2023-01-02', price: 355 },
        { date: '2023-01-03', price: 360 }
      ]
    });
  }),

  // Mock tea auction prices endpoint
  http.get(`${apiUrl}/data/tea-auction-price`, () => {
    return HttpResponse.json({
      average_prices: [
        { month: 'Jan', price: 320 },
        { month: 'Feb', price: 330 },
        { month: 'Mar', price: 340 }
      ]
    });
  }),

  // Mock dashboard data endpoint
  http.get(`${apiUrl}/data/dashboard`, () => {
    return HttpResponse.json({
      current_price: 350,
      price_change: 5.2,
      historical_data: [
        { date: '2023-01-01', price: 330 },
        { date: '2023-01-02', price: 340 },
        { date: '2023-01-03', price: 350 }
      ],
      market_trends: {
        upward: 65,
        stable: 25,
        downward: 10
      }
    });
  })
];