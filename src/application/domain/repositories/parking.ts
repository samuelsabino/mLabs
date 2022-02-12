import { RepositoryError } from '../../../application/errors/repositories';

import { Parking } from '../models';

export interface IParkingRepository {
  create(data: Pick<Parking, 'plate'>): Promise<Parking | RepositoryError>;

  findById(id: Exclude<Parking['id'], Parking>): Promise<Parking | RepositoryError>;

  update(id: Exclude<Parking['id'], Parking>, changes: Partial<Parking>): Promise<Parking | RepositoryError>;
}
