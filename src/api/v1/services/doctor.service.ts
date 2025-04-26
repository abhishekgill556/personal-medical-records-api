import { db } from '../../../../config/firebase';
import { Doctor } from '../types/doctor.types';

const collection = db.collection('doctors');

interface DoctorQueryOptions {
  specialization?: string;
  sortBy?: 'name' | 'specialization';
  sortOrder?: 'asc' | 'desc';
}

// getAllDoctors with filtering + sorting
export const getAllDoctors = async (options: DoctorQueryOptions = {}): Promise<Doctor[]> => {
  let query: FirebaseFirestore.Query = collection;

  if (options.specialization) {
    query = query.where('specialization', '==', options.specialization);
  }

  if (options.sortBy) {
    query = query.orderBy(options.sortBy, options.sortOrder || 'asc');
  }

  const snapshot = await query.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Doctor));
};

export const getDoctorById = async (id: string): Promise<Doctor | null> => {
  const doc = await collection.doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as Doctor;
};

export const createDoctor = async (data: Doctor): Promise<Doctor> => {
  const now = new Date();
  const docRef = await collection.add({
    ...data,
    createdAt: now,
    updatedAt: now,
  });
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() } as Doctor;
};

export const updateDoctor = async (id: string, data: Partial<Doctor>): Promise<Doctor> => {
  const now = new Date();
  await collection.doc(id).update({ ...data, updatedAt: now });
  const updatedDoc = await collection.doc(id).get();
  return { id: updatedDoc.id, ...updatedDoc.data() } as Doctor;
};

export const deleteDoctor = async (id: string): Promise<void> => {
  await collection.doc(id).delete();
};
