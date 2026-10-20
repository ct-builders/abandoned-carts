/*
 * SPDX-License-Identifier: MIT
 * Copyright (c) 2026 commercetools GmbH and the ct-builders contributors
 * Freely available, AS IS and UNSUPPORTED. See LICENSE.
 */

import { type AuthMiddlewareOptions } from '@commercetools/sdk-client-v2'; // Required for auth

import { readConfiguration } from '../utils/config.utils';
/**
 * Configure Middleware. Example only. Adapt on your own
 */
export const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: `https://auth.${readConfiguration().region}.commercetools.com`,
  projectKey: readConfiguration().projectKey,
  credentials: {
    clientId: readConfiguration().clientId,
    clientSecret: readConfiguration().clientSecret,
  },
  scopes: readConfiguration().scope
    ? [readConfiguration().scope as string]
    : undefined,
};
