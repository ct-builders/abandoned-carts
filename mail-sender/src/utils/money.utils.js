/*
 * SPDX-License-Identifier: MIT
 * Copyright (c) 2026 commercetools GmbH and the ct-builders contributors
 * Freely available, AS IS and UNSUPPORTED. See LICENSE.
 */

export function convertMoneyToText(money) {
  if (
    money.type === 'centPrecision' &&
    money.centAmount &&
    money.fractionDigits
  ) {
    let amount = money.centAmount / Math.pow(10, money.fractionDigits);
    return money.currencyCode + ' ' + amount;
  }
  return '';
}
