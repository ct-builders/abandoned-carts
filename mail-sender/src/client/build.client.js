/*
 * SPDX-License-Identifier: MIT
 * Copyright (c) 2026 commercetools GmbH and the ct-builders contributors
 * Freely available, AS IS and UNSUPPORTED. See LICENSE.
 */

import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { buildAuthMiddlewareOptions } from '../middleware/auth.middleware.js';
import { buildHttpMiddlewareOptions } from '../middleware/http.middleware.js';
import readConfiguration from '../utils/config.utils.js';

export const createClient = () =>
  new ClientBuilder()
    .withProjectKey(readConfiguration().projectKey)
    .withClientCredentialsFlow(buildAuthMiddlewareOptions())
    .withHttpMiddleware(buildHttpMiddlewareOptions())
    .build();
