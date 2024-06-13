// handlers.js
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/auth/session', ({request, params}) => {
    console.log('req', request);

    console.log('params', params);

    return HttpResponse.json({ 
        id: 1, 
        name: 'Test User', 
        email: 'test@example.com' 
      }
    , {status: 200});
  }),
  // Add other handlers as needed
];
