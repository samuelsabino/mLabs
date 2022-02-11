import { Parking } from '../../../application/domain/models';

export type MakeReservationDTO = Pick<Parking, 'plate'>;

export type MakeReservationResponse = Pick<Parking, 'id'>;
