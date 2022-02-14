import { Parking } from '../../../src/application/domain/models/Parking';
import { ParkingRepositoryError } from '../../../src/application/errors/repositories/parking';
import { historyUseCase } from '../../../src/application/modules/parking/history/useCase';
import { fakeParkingRepository } from '../../../src/application/repositories/fake/parking/repository';
import { ParkingBuilder } from '../../../src/infra/helpers/builders/parking';

describe('PaymentUseCase', () => {
  test('Quando eu busco o historico de uma reserva.', async () => {
    const repository = fakeParkingRepository;
    const useCase = historyUseCase(repository);

    const reservation = ParkingBuilder.aReservation().getReservation();

    const created = (await repository.create(reservation)) as Parking;

    const result = await useCase.execute({ plate: created.plate });

    expect(result.success).toEqual(true);
  }, 5000);

  test('[ERRO] Quando eu o historico de uma reserva que não existe.', async () => {
    const repository = fakeParkingRepository;
    const useCase = historyUseCase(repository);

    const reservation = ParkingBuilder.aReservation().getReservation();

    const created = (await repository.create(reservation)) as Parking;

    const result = await useCase.execute({ plate: created.plate });

    if (!result.success) {
      expect(result.error.message).toEqual(ParkingRepositoryError.notFound().message);
    }
  }, 5000);
});
