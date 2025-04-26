import { Request, Response } from 'express';
import * as appointmentService from '../services/appointment.service';

export const getAllAppointments = async (_req: Request, res: Response): Promise<void> => {
  const appointments = await appointmentService.getAllAppointments();
  res.status(200).json(appointments);
};

export const getAppointmentById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const appointment = await appointmentService.getAppointmentById(id);
  if (!appointment) {
    res.status(404).json({ message: 'Appointment not found' });
    return;
  }
  res.status(200).json(appointment);
};

export const createAppointment = async (req: Request, res: Response): Promise<void> => {
  const newAppointment = await appointmentService.createAppointment(req.body);
  res.status(201).json(newAppointment);
};

export const updateAppointment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const appointment = await appointmentService.getAppointmentById(id);
  if (!appointment) {
    res.status(404).json({ message: 'Appointment not found' });
    return;
  }
  const updatedAppointment = await appointmentService.updateAppointment(id, req.body);
  res.status(200).json(updatedAppointment);
};

export const deleteAppointment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const appointment = await appointmentService.getAppointmentById(id);
  if (!appointment) {
    res.status(404).json({ message: 'Appointment not found' });
    return;
  }
  await appointmentService.deleteAppointment(id);
  res.status(204).send();
};
