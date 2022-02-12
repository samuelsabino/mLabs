import { ParkingRepositoryError } from '../../../application/errors/repositories/parking';
import { fakeParkingRepository } from '../../../application/repositories/fake/parking/repository';
import { MakeReservationError } from '../../../modules/parking/makeReservation/error';
import { makeReservationUseCase } from '../../../modules/parking/makeReservation/useCase';
import { ParkingBuilder } from '../../builders/parking';

describe('makeReservationUseCase', () => {
  test('Quando eu efetuo uma reserva com sucesso.', async () => {
    const repository = fakeParkingRepository;
    const useCase = makeReservationUseCase(repository);

    const reservation = ParkingBuilder.aReservation().getReservation();

    const result = await useCase.execute(reservation);

    expect(result.success).toEqual(true);
  });

  test('[ERRO] Quando eu efetuo uma reserva com uma placa inválida.', async () => {
    const repository = fakeParkingRepository;
    const useCase = makeReservationUseCase(repository);

    const reservation = ParkingBuilder.aReservation().withInvalidPlate();

    const result = await useCase.execute(reservation);

    expect(result.success).toEqual(false);
    if (!result.success) {
      expect(result.error.message).toEqual(MakeReservationError.invalidPlate().message);
    }
  });

  test('[ERRO] Quando eu efetuo uma reserva de uma placa já existente.', async () => {
    const repository = fakeParkingRepository;
    const useCase = makeReservationUseCase(repository);
    const reservation = ParkingBuilder.aReservation().getReservation();

    await repository.create(reservation);

    const result = await useCase.execute(reservation);

    expect(result.success).toEqual(false);

    if (!result.success) {
      expect(result.error.message).toEqual(ParkingRepositoryError.alreadyExists().message);
    }
  });
});
