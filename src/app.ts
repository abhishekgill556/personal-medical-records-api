import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../config/swagger';
import rateLimit from 'express-rate-limit';

import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './api/v1/routes/auth.routes';
import patientRoutes from './api/v1/routes/patient.routes';
import doctorRoutes from './api/v1/routes/doctor.routes';
import appointmentRoutes from './api/v1/routes/appointment.routes';
import prescriptionRoutes from './api/v1/routes/prescription.routes';


const app = express();

app.use(helmet());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

app.use('/api/', apiLimiter);



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/doctors', doctorRoutes);
app.use('/api/v1/appointments', appointmentRoutes);
app.use('/api/v1/prescriptions', prescriptionRoutes);

app.get('/', (_req, res) => {
  res.send('Welcome to Personal Medical Records API');
});

export default app;
