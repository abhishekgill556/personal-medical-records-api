import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../config/swagger';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();

// Routes
import authRoutes from './api/v1/routes/auth.routes';
import patientRoutes from './api/v1/routes/patient.routes';
import doctorRoutes from './api/v1/routes/doctor.routes';
import appointmentRoutes from './api/v1/routes/appointment.routes';
import prescriptionRoutes from './api/v1/routes/prescription.routes';

// Middleware
import { verifyToken } from './api/v1/middleware/verifyToken'; // Import the token verification middleware

const app = express();

// Basic security
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api/', apiLimiter);

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Public route (no token needed)
app.use('/api/v1/auth', authRoutes);

// Protected routes (token required )
app.use('/api/v1/patients', verifyToken, patientRoutes);
app.use('/api/v1/doctors', verifyToken, doctorRoutes);
app.use('/api/v1/appointments', verifyToken, appointmentRoutes);
app.use('/api/v1/prescriptions', verifyToken, prescriptionRoutes);

// Home route
app.get('/', (_req, res) => {
  res.send('Welcome to Personal Medical Records API');
});

export default app;
