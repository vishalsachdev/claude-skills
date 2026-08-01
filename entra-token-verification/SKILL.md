---
name: entra-token-verification
description: Verify a Microsoft Entra ID (Azure AD) access token server-side and derive identity from its claims. Use when adding or reviewing Entra/Azure AD JWT verification, when a verifier accepts tokens it should reject (or rejects tokens it should accept), or when binding a verified token to an identity record (GUID/oid comparison, netid derivation). Covers the v2-issuer/audience trap, the ID-token-as-access-token trap, the missing-email-claim trap, and case-folding hazards in identity comparison.
---

# Entra Token Verification

Tier: **spec anchored to live code** (second consumer adapted the original — the
invariants below are the value, not a shared package; regenerate the implementation
per consumer, per CONTRIBUTING.md).

Verifying an Entra access token server-side (via `jose` + the tenant JWKS endpoint) is
easy to get subtly, silently wrong: a misconfigured issuer/audience check passes v1
tokens that should be rejected, or a verifier that never checks for `scp`/`roles`
accepts an ID token as if it were an access token. These are the constraints that keep
recurring across consumers — freeze them, regenerate the verification code itself.

## The constraints

1. **`accessTokenAcceptedVersion` must be `2`.** The v2-issuer check
   (`https://login.microsoftonline.com/<tenant>/v2.0`) rejects every token if the app
   registration still issues v1 tokens — v1 tokens carry
   `iss https://sts.windows.net/<tenant>/`, which never matches.
   verify: `az ad app show --id <appId> --query api.requestedAccessTokenVersion`
   expect: `2`
   checked: 2026-08-01

2. **Audience must accept BOTH the bare `clientId` and `api://<clientId>`.** v2 tokens
   carry either form depending on how the scope was requested (`api://<clientId>/.default`
   vs. `<clientId>/.default`); accepting only one silently rejects the other.
   verify: decode a real token's `aud` claim (base64url-decode the JWT's middle segment)
   and confirm which form the tenant actually issues for this app.
   checked: 2026-08-01 (both quick and mykai-portal issue the bare-clientId form; accept
   both anyway — do not narrow to what's currently observed).

3. **Reject tokens carrying neither `scp` nor `roles`.** An access-token verifier that
   only checks signature/issuer/audience will also accept a valid **ID token** presented
   as an access token — ID tokens pass every one of those checks but were never scoped
   for API access. Real access tokens carry `scp` (delegated permissions) or `roles`
   (app permissions); ID tokens carry neither.
   verify: acquire an ID token deliberately (e.g. via the auth-code flow's `id_token`
   response field) and confirm the verifier throws on it.
   checked: 2026-08-01

4. **The `email` claim is frequently ABSENT from Entra v2 access tokens.** Identity must
   be derived from `preferred_username` (the UPN), not `email`. This is a live failure
   mode, not a theoretical one.
   verify: decode a real access token's payload and check for the `email` key.
   checked: 2026-06 (mindforum production failure — verifier assumed `email` present,
   broke for real users whose tokens omitted it).

5. **GUID/`oid` comparison must be case-insensitive.** GUIDs are case-insensitive per
   RFC 4122; a case-sensitive compare against an append-only identity ledger (e.g. a
   provisioning registry's `history`) permanently locks out a legitimate user the moment
   Entra or any client normalizes casing differently than the stored record.
   verify: compare a stored oid and a live token's oid with `.toLowerCase()` on both
   sides before `===`; confirm a differently-cased-but-equal pair matches.
   checked: 2026-08-01 (mykai portal review cycle, `identity.mjs`)

6. **Case-fold AFTER rejecting non-ASCII, never before.** `U+212A KELVIN SIGN` lowercases
   to ASCII `k` under `.toLowerCase()`, so a crafted non-ASCII UPN/netid can collide with
   a distinct ASCII identifier once folded. Reject any non-printable-ASCII input
   (`^[\x20-\x7E]+$`) before calling `.toLowerCase()` on anything used for identity
   comparison — this removes the whole confusable-codepoint class rather than trying to
   enumerate it.
   verify: feed `K...@illinois.edu` through the netid/identity comparison path and
   confirm it is rejected as non-ASCII, not folded and matched.
   checked: 2026-08-01 (mykai portal review cycle, `identity.mjs`)

## Failure modes if skipped

- Skip (1) or (2): the verifier throws on legitimate tokens (loud, but wastes a debugging
  session per consumer since the error is a generic issuer/audience mismatch).
- Skip (3): silent privilege escalation — an ID token grants access it was never scoped for.
- Skip (4): silent identity-resolution failure for a subset of real users (mindforum: this
  shipped to production before being caught).
- Skip (5) or (6): silent identity confusion — either locks out a legitimate user forever
  (case-sensitive GUID compare against an append-only ledger) or lets one identifier
  impersonate another (Kelvin-sign collision).

## Anchors

- `~/code/quick/src/auth/entra.ts` — original, TypeScript, `jose`-based verification
  (`verifyEntraToken`, `mapClaims`). Constraints 1-4 live here as inline comments at the
  point they matter.
- `~/code/mykai-worktrees/portal/portal/lib/entra.mjs` — second consumer, direct JS port
  of the above (same constraints 1-4, unchanged).
- `~/code/mykai-worktrees/portal/portal/lib/identity.mjs` — second consumer's hardening
  beyond the port: constraints 5-6 (`bindIdentity`, `netidFromUpn`), plus fail-closed
  handling of malformed/missing `history` and epoch-scoped oid binding (a provisioning-
  registry-specific invariant, not a general Entra constraint — read the file's own
  comments if adapting a similar ledger).

Checked: 2026-08-01.

## Related

- [../CONTRIBUTING.md](../CONTRIBUTING.md) — why this is a spec, not extracted code
