import { Parking } from '../../../application/domain/models';

export type PaymentDTO = Pick<Parking, 'paid'>;

export type PaymentId = Pick<Parking, 'id'>;

export type PaymentResponse = Pick<Parking, 'id' | 'paid'>;
