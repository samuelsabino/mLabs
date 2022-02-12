import { Parking } from '../../../application/domain/models/Parking';
import { ParkingRepositoryError } from '../../../application/errors/repositories/parking';
import { fakeParkingRepository } from '../../../application/repositories/fake/parking/repository';
import { historyUseCase } from '../../../modules/parking/history/useCase';
import { ParkingBuilder } from '../../builders/parking';

describe('PaymentUseCase', () => {
  test('Quando eu busco o historico de uma reserva.', async () => {
    const repository = fakeParkingRepository;
    const useCase = historyUseCase(repository);

    const reservation = ParkingBuilder.aReservation().getReservation();

    const created = (await repository.create(reservation)) as Parking;

    const result = await useCase.execute({ plate: created.plate });

    expect(result.success).toEqual(true);
  });

  test('[ERRO] Quando eu o historico de uma reserva que não existe.', async () => {
    const repository = fakeParkingRepository;
    const useCase = historyUseCase(repository);

    const reservation = ParkingBuilder.aReservation().getReservation();

    const created = (await repository.create(reservation)) as Parking;

    const result = await useCase.execute({ plate: created.plate });

    if (!result.success) {
      expect(result.error.message).toEqual(ParkingRepositoryError.notFound().message);
    }
  });
});
