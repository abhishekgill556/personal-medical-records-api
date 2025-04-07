import { firestore } from '../../../../config/firebase';
import { Doctor } from '../types/doctor.types';

const collection = firestore.collection('doctors');

export const getAllDoctors = async (): Promise<Doctor[]> => {
  const snapshot = await collection.get();
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
