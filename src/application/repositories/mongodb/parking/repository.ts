/* eslint-disable new-cap */
import { Parking } from '../../../domain/models';
import { IParkingRepository } from '../../../domain/repositories';
import { ParkingRepositoryError } from '../../../errors/repositories';
import { parkingModel } from './model';

export const mongodbParkingRepository: IParkingRepository = {
  async create(data: Pick<Parking, 'plate'>) {
    const alreadyExists = await parkingModel.findOne(data);

    if (alreadyExists) return ParkingRepositoryError.alreadyExists();

    const reservation = new parkingModel({
      ...data,
      id: Date.now(),
      time: '0',
      paid: false,
      left: false,
      created: new Date(),
      updated: new Date()
    });

    const newReservation = await reservation.save().catch(() => null);

    return newReservation || ParkingRepositoryError.alreadyExists();
  },

  async findById(id: number) {
    const reservation = await parkingModel.findOne({ id }).catch(() => null);

    if (reservation) return reservation;

    return ParkingRepositoryError.notFound();
  },

  async findByPlate(plate: string) {
    const reservation = await parkingModel.findOne({ plate }).catch(() => null);

    if (reservation) return reservation;

    return ParkingRepositoryError.notFound();
  },

  async update(id: number, changes: Partial<Parking>) {
    const updadedReservation = await parkingModel.findOneAndUpdate({ id }, changes, { new: true }).catch(() => null);

    return updadedReservation || ParkingRepositoryError.notFound();
  }
};
