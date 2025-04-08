// src/api/v1/services/patient.service.ts
import { firestore } from '../../../../config/firebase';
import { Patient } from '../types/patient.types';

const collection = firestore.collection('patients');

export const getAllPatients = async (): Promise<Patient[]> => {
  const snapshot = await collection.get();
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
