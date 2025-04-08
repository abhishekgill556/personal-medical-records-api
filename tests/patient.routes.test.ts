jest.mock('../config/firebase', () => ({
    firestore: {
      collection: () => ({
        get: () => ({
          docs: [
            {
              id: 'p001',
              data: () => ({
                name: 'John Doe',
                age: 45,
                medicalHistory: ['Diabetes']
              })
            }
          ]
        }),
        add: () => ({
          get: () => ({
            id: 'p002',
            data: () => ({
              name: 'Jane Smith',
              age: 30,
              medicalHistory: ['Asthma']
            })
          })
        }),
        doc: () => ({
          update: () => Promise.resolve(),
          delete: () => Promise.resolve(),
          get: () => ({
            id: 'p002',
            data: () => ({
              name: 'Jane Smith Updated',
              age: 31,
              medicalHistory: ['Asthma', 'Migraine']
            })
          })
        })
      })
    }
  }));
  
  import request from 'supertest';
  import app from '../src/app';
  
  describe('Patient Routes', () => {
    it('GET /patients - should return all patients', async () => {
      const res = await request(app).get('/api/v1/patients');
      expect(res.statusCode).toBe(200);
      expect(res.body[0].name).toBe('John Doe');
    });
  
    it('POST /patients - should create a new patient', async () => {
      const res = await request(app).post('/api/v1/patients').send({
        name: 'Jane Smith',
        age: 30,
        medicalHistory: ['Asthma']
      });
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe('Jane Smith');
    });
  
    it('PUT /patients/:id - should update patient info', async () => {
      const res = await request(app).put('/api/v1/patients/p002').send({
        name: 'Jane Smith Updated',
        age: 31,
        medicalHistory: ['Asthma', 'Migraine']
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe('Jane Smith Updated');
    });
  
    it('DELETE /patients/:id - should delete patient', async () => {
      const res = await request(app).delete('/api/v1/patients/p002');
      expect(res.statusCode).toBe(204);
    });
  });
  