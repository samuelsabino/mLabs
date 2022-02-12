import { Result } from '../../../application/domain/models';
import { IParkingRepository } from '../../../application/domain/repositories';
import { IUseCase } from '../../../application/interfaces';
import { FakeParkingRepository } from '../../../application/repositories/fake/parking/repository';
import { HistoryDTO, HistoryResponse } from './dto';
import { HistoryError } from './error';

export class HistoryUseCase implements IUseCase<HistoryDTO, HistoryResponse> {
  constructor(private repository: IParkingRepository = new FakeParkingRepository()) {
    /** */
  }
  async execute(data: HistoryDTO): Promise<Result<HistoryResponse, HistoryError>> {
    const reservartion = await this.repository.findById(data.id);

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
}