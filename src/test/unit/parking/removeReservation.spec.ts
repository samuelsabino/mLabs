import { RemoveReservationError } from './../../../modules/parking/removeReservation/error';
import { RepositoryError } from '../../../application/errors/repositories';
import { Parking } from '../../../application/domain/models/Parking';
import { FakeParkingRepository } from '../../../application/repositories/fake/parking/repository';
import { RemoveReservationUseCase } from '../../../modules/parking/removeReservation/useCase';
import { ParkingBuilder } from '../../builders/parking';

describe('removeReservationUseCase', () => {
  test('Quando eu efetuo a retirada de uma reserva com sucesso.', async () => {
    const repository = new FakeParkingRepository();
    const useCase = new RemoveReservationUseCase(repository);

    const reservation = ParkingBuilder.aReservation().withFieldPaidEqualToTrue();

    const created = (await repository.create(reservation)) as Parking;

    const result = await useCase.execute({ id: created.id });

    expect(result.success).toEqual(true);
  });

  test('[ERRO] Quando eu efetuo a retirada de uma reserva não existente.', async () => {
    const repository = new FakeParkingRepository();
    const useCase = new RemoveReservationUseCase(repository);

    const result = await useCase.execute({ id: 100 });

    expect(result.success).toEqual(false);

    if (!result.success) {
      expect(result.error.message).toEqual(RepositoryError.notFound().message);
    }
  });

  test('[ERRO] Quando eu efetuo a retirada de uma reserva que já foi retirada.', async () => {
    const repository = new FakeParkingRepository();
    const useCase = new RemoveReservationUseCase(repository);

    const reservation = ParkingBuilder.aReservation().withFieldPaidEqualToTrue();
    reservation.left = true;

    const created = (await repository.create(reservation)) as Parking;

    const result = await useCase.execute({ id: created.id });

    if (!result.success) {
      expect(result.success).toEqual(false);
      expect(result.error.message).toEqual(RemoveReservationError.alreadyLeft().message);
    }
  });
});
