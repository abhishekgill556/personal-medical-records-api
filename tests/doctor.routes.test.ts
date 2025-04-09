jest.mock('../config/firebase', () => ({
    db: {
      collection: () => ({
        get: () => ({
          docs: [
            {
              id: 'd001',
              data: () => ({
                name: 'Dr. Raj',
                specialization: 'Cardiology',
                email: 'raj@example.com'
              })
            }
          ]
        }),
        add: () => ({
          get: () => ({
            id: 'd002',
            data: () => ({
              name: 'Dr. Kaur',
              specialization: 'Neurology',
              email: 'kaur@example.com'
            })
          })
        }),
        doc: (id: string) => ({
          get: () =>
            Promise.resolve({
              id,
              exists: id === 'd002',
              data: () =>
                id === 'd002'
                  ? {
                      name: 'Dr. Kaur Updated',
                      specialization: 'Neurology',
                      email: 'kaur.updated@example.com'
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
  
  describe('Doctor Routes', () => {
    it('GET /doctors - should return all doctors', async () => {
      const res = await request(app).get('/api/v1/doctors');
      expect(res.statusCode).toBe(200);
      expect(res.body[0].specialization).toBe('Cardiology');
    });
  
    it('GET /doctors/:id - should return a doctor by ID', async () => {
      const res = await request(app).get('/api/v1/doctors/d002');
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe('Dr. Kaur Updated');
    });
  
    it('POST /doctors - should create a new doctor', async () => {
      const res = await request(app).post('/api/v1/doctors').send({
        name: 'Dr. Kaur',
        specialization: 'Neurology',
        email: 'kaur@example.com'
      });
      expect(res.statusCode).toBe(201);
      expect(res.body.email).toBe('kaur@example.com');
    });
  
    it('PUT /doctors/:id - should update doctor info', async () => {
      const res = await request(app).put('/api/v1/doctors/d002').send({
        name: 'Dr. Kaur Updated',
        specialization: 'Neurology',
        email: 'kaur.updated@example.com'
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe('Dr. Kaur Updated');
    });
  
    it('DELETE /doctors/:id - should delete doctor', async () => {
      const res = await request(app).delete('/api/v1/doctors/d002');
      expect(res.statusCode).toBe(204);
    });
  });
  