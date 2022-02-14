import { Parking } from '../../../domain/models';
import { IParkingRepository } from '../../../domain/repositories';
import { ParkingRepositoryError } from '../../../errors/repositories';

const parkings: Parking[] = [];

export const fakeParkingRepository: IParkingRepository = {
  async create(data: Pick<Parking, 'plate'>) {
    const alreadyExists = parkings.find((parking) => parking.plate === data.plate);
    if (alreadyExists) return ParkingRepositoryError.alreadyExists();

    const parkingsLength = parkings.length;

    const parking: Parking = {
      ...data,
      id: parkingsLength + 1,
      time: '0',
      paid: false,
      left: false,
      created: new Date()
    };

    parkings.push(parking);

    return parking;
  },

  async findById(id: number) {
    const reservation = parkings.find((parking) => parking.id === id);
    if (reservation) return reservation;

    return ParkingRepositoryError.notFound();
  },

  async findByPlate(plate: string) {
    const parking = parkings.find((parking) => parking.plate === plate);

    if (parking) return parking;

    return ParkingRepositoryError.notFound();
  },

  async update(id: number, changes: Partial<Parking>) {
    let updadedReservation: Parking | undefined;

    parkings.forEach((reservation, i) => {
      if (reservation.id === id) {
        updadedReservation = {
          ...reservation,
          ...changes
        };

        parkings[i] = updadedReservation;
      }
    });

    return updadedReservation || ParkingRepositoryError.notFound();
  }
};
