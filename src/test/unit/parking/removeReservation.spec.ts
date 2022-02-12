import { Parking } from '../../../application/domain/models/Parking';
import { ParkingRepositoryError } from '../../../application/errors/repositories';
import { fakeParkingRepository } from '../../../application/repositories/fake/parking/repository';
import { RemoveReservationError } from '../../../modules/parking/removeReservation/error';
import { removeReservationUseCase } from '../../../modules/parking/removeReservation/useCase';
import { ParkingBuilder } from '../../builders/parking';

describe('removeReservationUseCase', () => {
  test('Quando eu efetuo a retirada de uma reserva com sucesso.', async () => {
    const repository = fakeParkingRepository;
    const useCase = removeReservationUseCase(repository);

    const reservation = ParkingBuilder.aReservation().withFieldPaidEqualToTrue();

    const created = (await repository.create(reservation)) as Parking;
    await repository.update(created.id, { paid: true });

    const stringId = `${created.id}`;

    const result = await useCase.execute({ id: stringId });

    expect(result.success).toEqual(true);
  });

  test('[ERRO] Quando eu efetuo a retirada de uma reserva não existente.', async () => {
    const repository = fakeParkingRepository;
    const useCase = removeReservationUseCase(repository);

    const result = await useCase.execute({ id: '100' });

    expect(result.success).toEqual(false);

    if (!result.success) {
      expect(result.error.message).toEqual(ParkingRepositoryError.notFound().message);
    }
  });

  test('[ERRO] Quando eu efetuo a retirada de uma reserva que já foi retirada.', async () => {
    const repository = fakeParkingRepository;
    const useCase = removeReservationUseCase(repository);

    const reservation = ParkingBuilder.aReservation().withFieldPaidEqualToTrue();

    const created = (await repository.create(reservation)) as Parking;
    await repository.update(created.id, { paid: true });
    const stringId = `${created.id}`;

    const result = await useCase.execute({ id: stringId });

    if (!result.success) {
      expect(result.success).toEqual(false);
      expect(result.error.message).toEqual(RemoveReservationError.alreadyLeft().message);
    }
  });

  test('[ERRO] Quando eu efetuo a retirada de uma reserva que não foi paga.', async () => {
    const repository = fakeParkingRepository;
    const useCase = removeReservationUseCase(repository);

    const reservation = ParkingBuilder.aReservation().getReservation();

    const created = (await repository.create(reservation)) as Parking;
    const stringId = `${created.id}`;

    const result = await useCase.execute({ id: stringId });

    if (!result.success) {
      expect(result.success).toEqual(false);
      expect(result.error.message).toEqual(RemoveReservationError.paymentNotMade().message);
    }
  });
});
