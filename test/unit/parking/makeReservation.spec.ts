import { ParkingRepositoryError } from '../../../src/application/errors/repositories/parking';
import { MakeReservationError } from '../../../src/application/modules/parking/makeReservation/error';
import { makeReservationUseCase } from '../../../src/application/modules/parking/makeReservation/useCase';
import { fakeParkingRepository } from '../../../src/application/repositories/fake/parking/repository';
import { ParkingBuilder } from '../../../src/infra/helpers/builders/parking';

describe('makeReservationUseCase', () => {
  test('Quando eu efetuo uma reserva com sucesso.', async () => {
    const repository = fakeParkingRepository;
    const useCase = makeReservationUseCase(repository);

    const reservation = ParkingBuilder.aReservation().getReservation();

    const result = await useCase.execute({ plate: reservation.plate });

    expect(result.success).toEqual(true);
  }, 5000);

  test('[ERRO] Quando eu efetuo uma reserva com uma placa inválida.', async () => {
    const repository = fakeParkingRepository;
    const useCase = makeReservationUseCase(repository);

    const reservation = ParkingBuilder.aReservation().withInvalidPlate();

    const result = await useCase.execute({ plate: reservation.plate });

    expect(result.success).toEqual(false);
    if (result.success === false) {
      expect(result.error.message).toEqual(MakeReservationError.invalidPlate().message);
    }
  }, 5000);

  test('[ERRO] Quando eu efetuo uma reserva de uma placa já existente.', async () => {
    const repository = fakeParkingRepository;
    const useCase = makeReservationUseCase(repository);

    const reservation = ParkingBuilder.aReservation().getReservation();

    await useCase.execute({ plate: reservation.plate });
    const result = await useCase.execute({ plate: reservation.plate });

    expect(result.success).toEqual(false);

    if (result.success === false) {
      expect(result.error.message).toEqual(ParkingRepositoryError.alreadyExists().message);
    }
  }, 5000);
});
