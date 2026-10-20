/*
 * SPDX-License-Identifier: MIT
 * Copyright (c) 2026 commercetools GmbH and the ct-builders contributors
 * Freely available, AS IS and UNSUPPORTED. See LICENSE.
 */

import { type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { readConfiguration } from '../utils/config.utils';

export const buildHttpMiddlewareOptions = (): HttpMiddlewareOptions => ({
  host: `https://api.${readConfiguration().region}.commercetools.com`,
});
