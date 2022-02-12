import { PaymentError } from './../../../modules/parking/payment/error';
import { paymentUseCase } from './../../../modules/parking/payment/useCase';
import { Parking } from '../../../application/domain/models/Parking';
import { ParkingRepositoryError } from '../../../application/errors/repositories/parking';
import { fakeParkingRepository } from '../../../application/repositories/fake/parking/repository';
import { ParkingBuilder } from '../../builders/parking';

describe('PaymentUseCase', () => {
  test('Quando eu efetuo o pagamento de uma reserva.', async () => {
    const repository = fakeParkingRepository;
    const useCase = paymentUseCase(repository);

    const reservation = ParkingBuilder.aReservation().getReservation();

    const created = (await repository.create(reservation)) as Parking;

    const stringId = `${created.id}`;

    const result = await useCase.execute({ paid: true, id: stringId });

    expect(result.success).toEqual(true);
  });

  test('[ERRO] Quando eu efetuo o pagamento numa reserva não existente.', async () => {
    const repository = fakeParkingRepository;
    const useCase = paymentUseCase(repository);

    const result = await useCase.execute({ paid: true, id: '50' });

    expect(result.success).toEqual(false);

    if (!result.success) {
      expect(result.error.message).toEqual(ParkingRepositoryError.notFound().message);
    }
  });

  test('[ERRO] Quando eu efetuo o pagamento numa reserva já paga.', async () => {
    const repository = fakeParkingRepository;
    const useCase = paymentUseCase(repository);

    const reservation = ParkingBuilder.aReservation().withFieldPaidEqualToTrue();

    const created = (await repository.create(reservation)) as Parking;

    const stringId = `${created.id}`;

    const result = await useCase.execute({ paid: true, id: stringId });
    console.log(reservation);
    console.log(created);
    console.log(result);
    if (!result.success) {
      expect(result.success).toEqual(false);
      expect(result.error.message).toEqual(PaymentError.paymentAlreadyMade().message);
    }
  });
});
