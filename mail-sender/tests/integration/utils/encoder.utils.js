/*
 * SPDX-License-Identifier: MIT
 * Copyright (c) 2026 commercetools GmbH and the ct-builders contributors
 * Freely available, AS IS and UNSUPPORTED. See LICENSE.
 */

const encodeString = (message) => {
  const buff = Buffer.from(message);
  return buff.toString('base64').trim();
};

export const encodeJsonObject = (messageBody) => {
  const message = JSON.stringify(messageBody);
  return encodeString(message);
};
