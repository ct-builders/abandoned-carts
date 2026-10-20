/*
 * SPDX-License-Identifier: MIT
 * Copyright (c) 2026 commercetools GmbH and the ct-builders contributors
 * Freely available, AS IS and UNSUPPORTED. See LICENSE.
 */

const decodeToString = (encodedMessageBody) => {
  const buff = Buffer.from(encodedMessageBody, 'base64');
  return buff.toString().trim();
};

export const decodeToJson = (encodedMessageBody) => {
  const decodedString = decodeToString(encodedMessageBody);
  return JSON.parse(decodedString);
};
