import { db } from '../../../../config/firebase';
import { Appointment } from '../types/appointment.types';

const collection = db.collection('appointments');

interface AppointmentQueryOptions {
  status?: 'Booked' | 'Completed' | 'Cancelled';
  doctorId?: string;
  patientId?: string;
  sortBy?: 'date';
  sortOrder?: 'asc' | 'desc';
}

export const getAllAppointments = async (options: AppointmentQueryOptions = {}): Promise<Appointment[]> => {
  let query: FirebaseFirestore.Query = collection;

  if (options.status) {
    query = query.where('status', '==', options.status);
  }

  if (options.doctorId) {
    query = query.where('doctorId', '==', options.doctorId);
  }

  if (options.patientId) {
    query = query.where('patientId', '==', options.patientId);
  }

  if (options.sortBy) {
    query = query.orderBy(options.sortBy, options.sortOrder || 'asc');
  }

  const snapshot = await query.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
};

export const getAppointmentById = async (id: string): Promise<Appointment | null> => {
  const doc = await collection.doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as Appointment;
};

export const createAppointment = async (data: Appointment): Promise<Appointment> => {
  const now = new Date();
  const docRef = await collection.add({
    ...data,
    status: 'Booked', // default if not provided
    createdAt: now,
    updatedAt: now,
  });
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() } as Appointment;
};

export const updateAppointment = async (id: string, data: Partial<Appointment>): Promise<Appointment> => {
  const now = new Date();
  await collection.doc(id).update({ ...data, updatedAt: now });
  const updatedDoc = await collection.doc(id).get();
  return { id: updatedDoc.id, ...updatedDoc.data() } as Appointment;
};

export const deleteAppointment = async (id: string): Promise<void> => {
  await collection.doc(id).delete();
};
