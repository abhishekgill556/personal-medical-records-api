export interface Doctor {
    id?: string;
    name: string;
    specialization: string;
    email: string;
    phone?: string;
    createdAt?: FirebaseFirestore.Timestamp;
    updatedAt?: FirebaseFirestore.Timestamp;
  }
  