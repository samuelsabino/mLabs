import { Parking } from '../../../application/domain/models/Parking';
import { RepositoryError } from '../../../application/errors/repositories/parking';
import { FakeParkingRepository } from '../../../application/repositories/fake/parking/repository';
import { HistoryUseCase } from '../../../modules/parking/history/useCase';
import { ParkingBuilder } from '../../builders/parking';

describe('PaymentUseCase', () => {
  test('Quando eu busco o historico de uma reserva.', async () => {
    const repository = new FakeParkingRepository();
    const useCase = new HistoryUseCase(repository);

    const reservation = ParkingBuilder.aReservation().getReservation();

    const created = (await repository.create(reservation)) as Parking;

    const result = await useCase.execute({ id: created.id });

    expect(result.success).toEqual(true);
  });

  test('[ERRO] Quando eu o historico de uma reserva que não existe.', async () => {
    const repository = new FakeParkingRepository();
    const useCase = new HistoryUseCase(repository);

    const reservation = ParkingBuilder.aReservation().getReservation();

    const created = (await repository.create(reservation)) as Parking;

    const result = await useCase.execute({ id: created.id });

    if (!result.success) {
      expect(result.error.message).toEqual(RepositoryError.notFound().message);
    }
  });
});
