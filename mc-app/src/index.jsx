/*
 * SPDX-License-Identifier: MIT
 * Copyright (c) 2026 commercetools GmbH and the ct-builders contributors
 * Freely available, AS IS and UNSUPPORTED. See LICENSE.
 */

import { createRoot } from 'react-dom/client';
import EntryPoint from './components/entry-point';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<EntryPoint />);
