import { Parking } from '../../../../application/domain/models';
import { IParkingRepository } from '../../../../application/domain/repositories';
import { RepositoryError } from '../../../../application/errors/repositories';

export class FakeParkingRepository implements IParkingRepository {
  private parkings: Parking[] = [];

  constructor() {
    console.log(this.parkings);
  }
  async create(data: Pick<Parking, 'plate'>) {
    const alreadyExists = this.parkings.find((parking) => parking.plate === data.plate);
    if (alreadyExists) return RepositoryError.alreadyExists();

    const parkingsLength = this.parkings.length;

    const parking: Parking = {
      ...data,
      id: parkingsLength + 1,
      time: '0',
      paid: false,
      left: false,
      created: new Date(),
      updated: new Date()
    };

    this.parkings.push(parking);

    return parking;
  }

  async findById(id: number) {
    const parking = this.parkings.find((parking) => parking.id === id);

    if (parking) return parking;

    return RepositoryError.notFound();
  }

  async update(id: number, changes: Partial<Parking>) {
    let updadedReservation: Parking | undefined;

    for (let parking of this.parkings) {
      if (parking.id === id) {
        updadedReservation = {
          ...parking,
          ...changes,
          updated: new Date()
        };

        parking = updadedReservation;

        return updadedReservation;
      }
    }

    return RepositoryError.notFound();
  }
}
