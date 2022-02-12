import { AtNumberToString, Parking } from '../../../application/domain/models';

export type RemoveReservationDTO = AtNumberToString<Pick<Parking, 'id'>>;

export type RemoveReservationResponse = Pick<Parking, 'id' | 'left' | 'plate'>;
