/*
 * SPDX-License-Identifier: MIT
 * Copyright (c) 2026 commercetools GmbH and the ct-builders contributors
 * Freely available, AS IS and UNSUPPORTED. See LICENSE.
 */

import { Router } from 'express';

import { messageHandler } from '../controllers/mail-sending.controller.js';
const eventRouter = Router();

eventRouter.post(
  '/mailSender',

  messageHandler
);

export default eventRouter;
