/*
 * SPDX-License-Identifier: MIT
 * Copyright (c) 2026 commercetools GmbH and the ct-builders contributors
 * Freely available, AS IS and UNSUPPORTED. See LICENSE.
 */

export function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

export function assertError(value, message) {
  assert(value instanceof Error, message ?? 'Invalid error value');
}

export function assertString(value, message) {
  assert(typeof value === 'string', message ?? 'Invalid string value');
}
