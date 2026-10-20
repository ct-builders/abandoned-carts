/*
 * SPDX-License-Identifier: MIT
 * Copyright (c) 2026 commercetools GmbH and the ct-builders contributors
 * Freely available, AS IS and UNSUPPORTED. See LICENSE.
 */

import { lazy } from 'react';

const Configuration = lazy(() =>
  import('./configuration' /* webpackChunkName: "configuration" */)
);

export default Configuration;
