/*
 * SPDX-License-Identifier: MIT
 * Copyright (c) 2026 commercetools GmbH and the ct-builders contributors
 * Freely available, AS IS and UNSUPPORTED. See LICENSE.
 */

export function getTimeDiffInMinute(startDateString, endDateString) {
  let startDate = new Date(startDateString);
  let endDate = new Date(endDateString);
  startDate.setMilliseconds(0);
  endDate.setMilliseconds(0);

  const timeDiffInMinute =
    (endDate.getTime() - startDate.getTime()) / 1000 / 60;
  return timeDiffInMinute;
}
