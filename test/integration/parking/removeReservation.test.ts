import request from 'supertest';

import app from '../../../src/infra/config/app';
import { configRoute } from '../../../src/infra/config/route';
import { ParkingBuilder } from '../../../src/infra/helpers/builders/parking';

describe('RemoveReservationController', () => {
  test('[PATCH] Quando eu efetuo a saída do estacionamento com sucesso via request (statusCode 200).', async () => {
    configRoute(app);

    const reservation = ParkingBuilder.aReservation().getReservation();

    const reservationData = await request(app).post('/parking').send({ plate: reservation?.plate });

    await request(app).patch(`/parking/${reservationData.body.data.id}/pay`).send();

    const result = await request(app).patch(`/parking/${reservationData.body.data.id}/out`).send();

    expect(result.status).toBe(200);
  }, 5000);
});
