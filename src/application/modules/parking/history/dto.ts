import { Parking } from '../../../domain/models';

export type HistoryDTO = Pick<Parking, 'plate'>;

export type HistoryResponse = Pick<Parking, 'id' | 'plate' | 'time' | 'left' | 'paid'>;
