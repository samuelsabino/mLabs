import request from 'supertest';

import app from '../../../src/infra/config/app';
import { configRoute } from '../../../src/infra/config/route';
import { ParkingBuilder } from '../../../src/infra/helpers/builders/parking';

describe('MakeReservationController', () => {
  test('[POST] Quando eu efetuo uma reserva com sucesso via request (statusCode 201).', async () => {
    configRoute(app);

    const reservation = ParkingBuilder.aReservation().getReservation();

    const result = await request(app).post('/parking').send({ plate: reservation?.plate ?? `ABC-${Math.floor(Math.random() * 5000)}` });

    expect(result.status).toBe(201);
  }, 5000);
});
