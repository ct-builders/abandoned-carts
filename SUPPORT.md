# Support

**There is none.** This repository is reference code published `AS IS` under
[MIT](LICENSE). It is not a commercetools product, it carries no SLA, and
**commercetools Support cannot help with it** — please do not open a support
ticket about it.

Bugs and questions belong in this repository's GitHub issues. They are read on
a best-effort basis by the people who wrote the code, in whatever time they
have. Expect no response time.

## Before you install this in a production Project

This connector sends email to your shoppers. Read this part.

- **The first run on an established Project finds a backlog.** Every cart
  inside the abandonment window is a cart this connector will chase, and on a
  Project that has been trading for a while that is a large number of real
  people receiving mail because somebody installed something.
  `ABANDONED_CART_MAX_PER_RUN` caps a single run — default 10 — and what it
  held back goes to the service log rather than passing in silence. Raise it
  deliberately, once you have seen what the first run selected.
- **Run it dry first.** With `RESEND_API_KEY` unset the whole connector still
  works end to end: carts are recorded, every message is rendered and stored
  on its Custom Object, and the Merchant Center shows exactly what would have
  been sent. That is the honest way to see what a real run would do.
- **`ABANDONED_CART_REDIRECT_ALL_TO` redirects every send to one address**,
  with a line naming who it was addressed to. It is for proving delivery
  works without mailing anybody. Leave it unset in production — set, it means
  no shopper ever receives anything.
- **It writes a custom field on Carts.** A Cart carries exactly one custom
  Type and `setCustomType` replaces rather than merges, so a connector that
  sets its own Type on a cart already carrying yours drops every field yours
  defines. This one declines to do that: it sets a Type only on a cart that
  has none, sets just its field on a cart carrying the configured Type, and
  leaves a cart carrying anything else alone. Point `ABANDONED_CART_TYPE_KEY`
  at the Type your Project already puts on carts, or set
  `ABANDONED_CART_MARK_CARTS=false` and lose only the Cart Discount.
- **The mail-sender's Subscription cannot be filtered by container.** It is a
  Change Subscription on `key-value-document`, so every Custom Object write
  in the Project reaches it. One comparison rejects the ones it does not want,
  before anything is fetched — but on a Project that writes Custom Objects
  heavily, that is real traffic you are paying for.
- **`postDeploy` does not reliably run on a preview deployment**, and the
  deployment report says "Post-deployment setup succeeded" either way. Run
  `node scripts/connect.mjs ensure` after any deploy: it checks the
  Subscriptions and the Type against the Project and repoints them. A redeploy
  gets a new Pub/Sub topic, so a Subscription still aimed at the old one is
  exactly as silent as no Subscription at all.

## Not a commercetools product

This code was written by people who work at commercetools, and the copyright
is held by commercetools GmbH and the contributors to the `ct-builders` org.
That is the extent of the relationship. Publishing it here is not an
endorsement, a support commitment, or a statement that this is how
commercetools recommends you build.

For the platform itself — which *is* supported — use the official channels:

- [commercetools documentation](https://docs.commercetools.com)
- [commercetools Connect documentation](https://docs.commercetools.com/connect/)
