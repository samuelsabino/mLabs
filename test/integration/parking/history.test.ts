import request from 'supertest';

import app from '../../../src/infra/config/app';
import { configRoute } from '../../../src/infra/config/route';
import { ParkingBuilder } from '../../../src/infra/helpers/builders/parking';

describe('HistoryController', () => {
  test('[POST] Quando eu busco o historico de uma reserva com sucesso via request (statusCode 200).', async () => {
    configRoute(app);

    const reservation = ParkingBuilder.aReservation().getReservation();

    await request(app).post('/parking').send({ plate: reservation?.plate });

    const result = await request(app).get(`/parking/${reservation.plate}`);

    expect(result.status).toBe(200);
  }, 5000);
});
