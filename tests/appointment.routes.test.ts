jest.mock('../config/firebase', () => ({
    db: {
      collection: () => ({
        get: () => ({
          docs: [
            {
              id: 'a001',
              data: () => ({
                patientId: 'p001',
                doctorId: 'd001',
                date: '2025-04-15T10:00:00Z',
                reason: 'Follow-up',
                status: 'Booked'
              })
            }
          ]
        }),
        add: () => ({
          get: () => ({
            id: 'a002',
            data: () => ({
              patientId: 'p001',
              doctorId: 'd001',
              date: '2025-04-20T10:00:00Z',
              reason: 'Follow-up',
              status: 'Booked'
            })
          })
        }),
        doc: (id: string) => ({
            get: () =>
              Promise.resolve({
                id,
                exists: id === 'a002',
                data: () =>
                  id === 'a002'
                    ? {
                        patientId: 'p001',
                        doctorId: 'd001',
                        date: '2025-04-21T09:00:00Z', 
                        reason: 'Follow-up (updated)', 
                        status: 'Booked'
                      }
                    : null
              }),
            update: () => Promise.resolve(),
            delete: () => Promise.resolve()
          })          
      })
    }
  }));  
  
  import request from 'supertest';
  import app from '../src/app';
  
  describe('Appointment Routes', () => {
    it('GET /appointments - should return all appointments', async () => {
      const res = await request(app).get('/api/v1/appointments');
      expect(res.statusCode).toBe(200);
      expect(res.body[0].status).toBe('Booked');
    });
  
    it('GET /appointments/:id - should return a specific appointment', async () => {
      const res = await request(app).get('/api/v1/appointments/a002');
      expect(res.statusCode).toBe(200);
      expect(res.body.reason).toContain('Follow-up');
    });
  
    it('POST /appointments - should book an appointment', async () => {
      const res = await request(app).post('/api/v1/appointments').send({
        patientId: 'p001',
        doctorId: 'd001',
        date: '2025-04-20T10:00:00Z',
        reason: 'Follow-up'
      });
      expect(res.statusCode).toBe(201);
      expect(res.body.reason).toBe('Follow-up');
    });
  
    it('PUT /appointments/:id - should update appointment details', async () => {
        const res = await request(app).put('/api/v1/appointments/a002').send({
          patientId: 'p001',
          doctorId: 'd001',
          date: '2025-04-21T09:00:00Z',
          reason: 'Follow-up (updated)',
          status: 'Booked'
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.reason).toContain('updated');
      });
  
    it('DELETE /appointments/:id - should cancel appointment', async () => {
      const res = await request(app).delete('/api/v1/appointments/a002');
      expect(res.statusCode).toBe(204);
    });
  });
  