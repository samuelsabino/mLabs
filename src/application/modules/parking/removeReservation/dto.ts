import { AtNumberToString, Parking } from '../../../domain/models';

export type RemoveReservationDTO = AtNumberToString<Pick<Parking, 'id'>>;

export type RemoveReservationResponse = Pick<Parking, 'id' | 'plate' | 'time' | 'left'>;
