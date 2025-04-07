import { firestore } from '../../../../config/firebase';
import { Prescription } from '../types/prescription.types';

const collection = firestore.collection('prescriptions');

export const getPrescriptionsByPatientId = async (patientId: string): Promise<Prescription[]> => {
  const snapshot = await collection.where('patientId', '==', patientId).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Prescription));
};

export const createPrescription = async (data: Prescription): Promise<Prescription> => {
  const now = new Date();
  const docRef = await collection.add({
    ...data,
    createdAt: now,
  });
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() } as Prescription;
};
