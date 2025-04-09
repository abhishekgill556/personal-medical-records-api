jest.mock('../config/firebase', () => ({
    db: {
      collection: () => ({
        where: () => ({
          get: () => ({
            docs: [
              {
                id: 'rx001',
                data: () => ({
                  doctorId: 'd001',
                  patientId: 'p001',
                  medicines: ['Paracetamol'],
                  instructions: 'Take after food'
                })
              }
            ]
          })
        }),
        add: () => ({
          get: () => ({
            id: 'rx002',
            data: () => ({
              doctorId: 'd001',
              patientId: 'p001',
              medicines: ['Ibuprofen'],
              instructions: 'After meal'
            })
          })
        })
      })
    }
  }));
  
  import request from 'supertest';
  import app from '../src/app';
  
  describe('Prescription Routes', () => {
    it('GET /prescriptions/:patientId - should return prescriptions for a patient', async () => {
      const res = await request(app).get('/api/v1/prescriptions/p001');
      expect(res.statusCode).toBe(200);
      expect(res.body[0].medicines).toContain('Paracetamol');
    });
  
    it('POST /prescriptions - should add a new prescription', async () => {
      const res = await request(app).post('/api/v1/prescriptions').send({
        doctorId: 'd001',
        patientId: 'p001',
        medicines: ['Ibuprofen'],
        instructions: 'After meal'
      });
      expect(res.statusCode).toBe(201);
      expect(res.body.medicines).toContain('Ibuprofen');
    });
  });
  