# Contributing

Pull requests are welcome. This is unsupported reference code maintained in
spare time, so a small, self-contained change has a much better chance of
landing than a large one.

Please read the [support policy](SUPPORT.md) before you invest much effort:
pull requests are read on a best-effort basis, and there is no response-time
commitment.

## Before you open a PR

```bash
./scripts/predeploy.sh
```

Audit, typecheck, lint, build and unit tests for all five applications. One
at a time with `./scripts/predeploy.sh mc-app`.

`predeploy` must pass. It is the only gate — there is no CI on this
repository, so a change that breaks it breaks it for the next person who
clones.

`npm audit` runs first because Connect's SCA scan is what rejects a
Connector, and its report names only the stage that failed. It gates at
**critical**, the threshold Connect enforces, and it keeps **development
dependencies** in scope, because Connect scans those too — `--omit=dev`
would go green here and still be rejected there.

## Two hard requirements

**1. Every source file carries the SPDX license header.**

```ts
/*
 * SPDX-License-Identifier: MIT
 * Copyright (c) 2026 commercetools GmbH and the ct-builders contributors
 * Freely available, AS IS and UNSUPPORTED. See LICENSE.
 */
```

No exceptions, including files you only edited. The header is what makes the
terms survive a single file being copied out of context — which is how most
of this code will actually be consumed. A PR that adds a source file without
it will be asked to add it.

**2. You may only contribute code you have the right to license under MIT.**

Do not paste in code from another project, a vendor's repository, or a Stack
Overflow answer unless its license permits redistribution under MIT *and* you
preserve the original copyright notice.

## What a good change looks like here

This connector's hard parts are the ones where a mistake is silent — a
Subscription pointed at a dead topic, a Type replaced rather than extended, a
cart skipped for want of an email address. Changes in that territory are worth
making, and they are worth a test.

`service/src/tests/abandoned-cart.service.spec.ts` is where the selection and
cart-marking rules are pinned, and
`mail-sender/tests/unit/generic.handler.spec.js` covers the send path
including the dry run. A behaviour that can fail quietly should leave a
failing test when it does.
