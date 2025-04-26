import { db } from '../../../../config/firebase';
import { Patient } from '../types/patient.types';

const collection = db.collection('patients');

interface QueryOptions {
  age?: number;
  sortBy?: 'name' | 'age';
  sortOrder?: 'asc' | 'desc';
}

// Updated getAllPatients with filtering + sorting
export const getAllPatients = async (options: QueryOptions = {}): Promise<Patient[]> => {
  let query: FirebaseFirestore.Query = collection;

  // Filter by age if provided
  if (options.age !== undefined) {
    query = query.where('age', '==', options.age);
  }

  // Sorting if provided
  if (options.sortBy) {
    query = query.orderBy(options.sortBy, options.sortOrder || 'asc');
  }

  const snapshot = await query.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Patient));
};

export const getPatientById = async (id: string): Promise<Patient | null> => {
  const doc = await collection.doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as Patient;
};

export const createPatient = async (data: Patient): Promise<Patient> => {
  const now = new Date();
  const docRef = await collection.add({
    ...data,
    createdAt: now,
    updatedAt: now,
  });
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() } as Patient;
};

export const updatePatient = async (id: string, data: Partial<Patient>): Promise<Patient> => {
  const now = new Date();
  await collection.doc(id).update({ ...data, updatedAt: now });
  const updatedDoc = await collection.doc(id).get();
  return { id: updatedDoc.id, ...updatedDoc.data() } as Patient;
};

export const deletePatient = async (id: string): Promise<void> => {
  await collection.doc(id).delete();
};
