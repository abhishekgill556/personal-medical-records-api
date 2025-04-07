export interface Patient {
    id?: string; 
    name: string;
    age: number;
    medicalHistory: string[];
    createdAt?: FirebaseFirestore.Timestamp;
    updatedAt?: FirebaseFirestore.Timestamp;
  }
  