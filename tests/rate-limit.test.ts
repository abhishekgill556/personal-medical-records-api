import request from 'supertest';
import app from '../src/app';

describe('Rate Limiting', () => {
    it('should block after 100 requests', async () => {
      for (let i = 0; i < 101; i++) {
        await request(app).get('/api/v1/patients');
      }
  
      const res = await request(app).get('/api/v1/patients');
      expect(res.status).toBe(429);
      expect(res.text).toContain('Too many requests');
    }, 20000); // <-- timeout set to 20 seconds
  });
