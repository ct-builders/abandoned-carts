/*
 * SPDX-License-Identifier: MIT
 * Copyright (c) 2026 commercetools GmbH and the ct-builders contributors
 * Freely available, AS IS and UNSUPPORTED. See LICENSE.
 */

module.exports = {
  displayName: 'Tests Typescript Application - Job',
  moduleDirectories: ['node_modules', 'src'],
  testMatch: ['**/?(*.)+(spec|test).ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
};
