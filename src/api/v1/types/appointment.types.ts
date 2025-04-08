export interface Appointment {
    id?: string;
    patientId: string;
    doctorId: string;
    date: string; // ISO string
    reason: string;
    status: 'Booked' | 'Completed' | 'Cancelled';
    createdAt?: FirebaseFirestore.Timestamp;
    updatedAt?: FirebaseFirestore.Timestamp;
  }
  