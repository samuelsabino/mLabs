import { PaymentError } from './../../../modules/parking/payment/error';
import { PaymentUseCase } from './../../../modules/parking/payment/useCase';
import { Parking } from '../../../application/domain/models/Parking';
import { RepositoryError } from '../../../application/errors/repositories/parking';
import { FakeParkingRepository } from '../../../application/repositories/fake/parking/repository';
import { ParkingBuilder } from '../../builders/parking';

describe('PaymentUseCase', () => {
  test('Quando eu efetuo o pagamento de uma reserva.', async () => {
    const repository = new FakeParkingRepository();
    const useCase = new PaymentUseCase(repository);

    const reservation = ParkingBuilder.aReservation().getReservation();

    const created = (await repository.create(reservation)) as Parking;

    const result = await useCase.execute({ paid: true, id: created.id });

    expect(result.success).toEqual(true);
  });

  test('[ERRO] Quando eu efetuo o pagamento numa reserva não existente.', async () => {
    const repository = new FakeParkingRepository();
    const useCase = new PaymentUseCase(repository);

    const result = await useCase.execute({ paid: true, id: 50 });

    expect(result.success).toEqual(false);

    if (!result.success) {
      expect(result.error.message).toEqual(RepositoryError.notFound().message);
    }
  });

  test('[ERRO] Quando eu efetuo o pagamento numa reserva já paga.', async () => {
    const repository = new FakeParkingRepository();
    const useCase = new PaymentUseCase(repository);

    const reservation = ParkingBuilder.aReservation().withFieldPaidEqualToTrue();

    const created = (await repository.create(reservation)) as Parking;

    const result = await useCase.execute({ paid: true, id: created.id });

    if (!result.success) {
      expect(result.success).toEqual(false);
      expect(result.error.message).toEqual(PaymentError.paymentAlreadyMade().message);
    }
  });
});
