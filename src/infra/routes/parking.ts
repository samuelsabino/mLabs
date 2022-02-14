import { Router } from 'express';

import * as useCases from '../../application/modules/parking';

export const parkingRouter = (router: Router) => {
  router.post('/', useCases.makeReservation.controller.handle);
  router.get('/:plate', useCases.history.controller.handle);
  router.patch('/:id/pay', useCases.payment.controller.handle);
  router.patch('/:id/out', useCases.removeReservation.controller.handle);

  return router;
};
