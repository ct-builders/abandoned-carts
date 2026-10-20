/*
 * SPDX-License-Identifier: MIT
 * Copyright (c) 2026 commercetools GmbH and the ct-builders contributors
 * Freely available, AS IS and UNSUPPORTED. See LICENSE.
 */

import * as dotenv from 'dotenv';
dotenv.config();

import express, { Express } from 'express';

// Import routes
import JobRoutes from './routes/job.route';

import { errorMiddleware } from './middleware/error.middleware';
import CustomError from './errors/custom.error';

// Create the express app
const app: Express = express();
app.disable('x-powered-by');

// Define routes
app.use('/job', JobRoutes);
app.use('*', () => {
  throw new CustomError(404, 'Path not found.');
});

// Global error handler
app.use(errorMiddleware);

export default app;
