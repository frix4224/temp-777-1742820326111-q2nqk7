import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createPayment } from './src/api/create-payment';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'configure-server',
      configureServer(server) {
        server.middlewares.use('/api/create-payment', async (req, res) => {
          try {
            // Handle CORS preflight
            if (req.method === 'OPTIONS') {
              res.writeHead(204, {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
              });
              res.end();
              return;
            }

            if (req.method !== 'POST') {
              res.writeHead(405, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Method not allowed' }));
              return;
            }

            // Handle payment creation
            const response = await createPayment(req as unknown as Request);
            const data = await response.json();
            const headers = Object.fromEntries(response.headers.entries());

            res.writeHead(response.status, {
              'Content-Type': 'application/json',
              ...headers
            });
            res.end(JSON.stringify(data));
          } catch (error) {
            console.error('Server error:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 
              error: error instanceof Error ? error.message : 'Internal server error' 
            }));
          }
        });
      }
    }
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  }
});