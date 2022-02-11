import { Parking } from '../../../application/domain/models';

export type RemoveReservationDTO = Pick<Parking, 'id'>;

export type RemoveReservationResponse = Pick<Parking, 'id' | 'left'>;
