import { Parking } from '../../../src/application/domain/models/Parking';
import { ParkingRepositoryError } from '../../../src/application/errors/repositories/parking';
import { PaymentError } from '../../../src/application/modules/parking/payment/error';
import { paymentUseCase } from '../../../src/application/modules/parking/payment/useCase';
import { fakeParkingRepository } from '../../../src/application/repositories/fake/parking/repository';
import { ParkingBuilder } from '../../../src/infra/helpers/builders/parking';

describe('PaymentUseCase', () => {
  test('Quando eu efetuo o pagamento de uma reserva.', async () => {
    const repository = fakeParkingRepository;
    const useCase = paymentUseCase(repository);

    const reservation = ParkingBuilder.aReservation().getReservation();

    const created = (await repository.create(reservation)) as Parking;

    const stringId = `${created.id}`;

    const result = await useCase.execute({ id: stringId });

    expect(result.success).toEqual(true);
  }, 5000);

  test('[ERRO] Quando eu efetuo o pagamento numa reserva não existente.', async () => {
    const repository = fakeParkingRepository;
    const useCase = paymentUseCase(repository);

    const result = await useCase.execute({ id: '50' });

    expect(result.success).toEqual(false);

    if (result.success === false) {
      expect(result.error.message).toEqual(ParkingRepositoryError.notFound().message);
    }
  }, 5000);

  test('[ERRO] Quando eu efetuo o pagamento numa reserva já paga.', async () => {
    const repository = fakeParkingRepository;
    const useCase = paymentUseCase(repository);

    const reservation = ParkingBuilder.aReservation().withFieldPaidEqualToTrue();

    const created = (await repository.create(reservation)) as Parking;

    const stringId = `${created.id}`;

    const result = await useCase.execute({ id: stringId });

    if (result.success === false) {
      expect(result.success).toEqual(false);
      expect(result.error.message).toEqual(PaymentError.paymentAlreadyMade().message);
    }
  }, 5000);
});
