import { ParkingRepositoryError } from '../../../application/errors/repositories';
import { AtNumberToString, Parking } from '../models';

export interface IParkingRepository {
  create(data: Pick<Parking, 'plate'>): Promise<Parking | ParkingRepositoryError>;

  findById(id: Exclude<Parking['id'], Parking>): Promise<Parking | ParkingRepositoryError>;

  findByPlate(id: AtNumberToString<Exclude<Parking['plate'], Parking>>): Promise<Parking | ParkingRepositoryError>;

  update(
    id: AtNumberToString<Exclude<Parking['id'], Parking>>,
    changes: Partial<Parking>
  ): Promise<Parking | ParkingRepositoryError>;
}
