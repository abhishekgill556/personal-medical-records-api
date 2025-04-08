export interface Prescription {
    id?: string;
    doctorId: string;
    patientId: string;
    medicines: string[];
    instructions: string;
    createdAt?: FirebaseFirestore.Timestamp;
  }
  