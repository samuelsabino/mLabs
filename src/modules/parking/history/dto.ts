import { Parking } from '../../../application/domain/models';

export type HistoryDTO = Pick<Parking, 'id'>;

export type HistoryResponse = Omit<Parking, 'created' | 'updated'>;
