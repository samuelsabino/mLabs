import { Result } from '../../../application/domain/models';
import { IParkingRepository } from '../../../application/domain/repositories';
import { HistoryDTO, HistoryResponse } from './dto';
import { HistoryError } from './error';

export const historyUseCase = (repository: IParkingRepository) => ({
  execute: async (data: HistoryDTO): Promise<Result<HistoryResponse, HistoryError>> => {
    const reservartion = await repository.findByPlate(data.plate);

    if ('id' in reservartion) {
      return {
        success: true,
        data: reservartion
      };
    }

    return {
      success: false,
      error: reservartion
    };
  }
});
