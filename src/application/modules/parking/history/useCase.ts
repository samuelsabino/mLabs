import { Result } from '../../../domain/models';
import { IParkingRepository } from '../../../domain/repositories';
import { HistoryDTO, HistoryResponse } from './dto';
import { HistoryError } from './error';

export const historyUseCase = (repository: IParkingRepository) => ({
  execute: async (data: HistoryDTO): Promise<Result<HistoryResponse, HistoryError>> => {
    const reservartion = await repository.findByPlate(data.plate);

    if ('id' in reservartion) {
      const { id, plate, time, left, paid } = reservartion;
      return {
        success: true,
        data: { id, plate, time, left, paid }
      };
    }

    return {
      success: false,
      error: reservartion
    };
  }
});
