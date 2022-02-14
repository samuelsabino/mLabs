import { AtNumberToString, Parking } from '../../../domain/models';

export type PaymentDTO = AtNumberToString<Pick<Parking, 'id'>>;

export type PaymentResponse = Pick<Parking, 'id' | 'plate' | 'time' | 'paid'>;
