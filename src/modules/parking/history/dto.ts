import { Parking } from '../../../application/domain/models';

export type HistoryDTO = Pick<Parking, 'plate'>;

export type HistoryResponse = Omit<Parking, 'created' | 'updated'>;
