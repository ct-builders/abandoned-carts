/*
 * SPDX-License-Identifier: MIT
 * Copyright (c) 2026 commercetools GmbH and the ct-builders contributors
 * Freely available, AS IS and UNSUPPORTED. See LICENSE.
 */

import { Router } from 'express';

import { logger } from '../utils/logger.utils';
import { post } from '../controllers/event.controller';

const eventRouter: Router = Router();

eventRouter.post('/', async (req, res, next) => {
  logger.info('Event message received');
  try {
    await post(req, res);
  } catch (error) {
    next(error);
  }
});

export default eventRouter;
