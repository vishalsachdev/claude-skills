---
name: vps-deploy-golden-path
description: Deploy a Node app to a VPS with build ordering, health checks, and a sentinel wired in. Use when setting up deployment for a VPS-hosted app, when a deploy shipped stale code or wedged on a git conflict, when a deploy reports success but the app is down, or when auditing existing deploy scripts for missing safety steps. Includes a template and the drift checklist for scripts copied from it.
---

# VPS Deploy Golden Path

A deploy script is easy to write and easy to write dangerously. The failure that matters is
not a deploy that errors, it is a deploy that **reports success while the app is down** - or
one that quietly ships the previous build.

Copy [assets/deploy.sh.template](assets/deploy.sh.template) to `scripts/deploy.sh`, fill the
CONFIG block, and keep every step. Each one is in there because its absence caused a real
outage.

## The order is the design

1. **Discard lockfile churn** - `npm install` rewrites `package-lock.json` on the host, which
   then blocks the next pull. Deploy dies on a dirty tree for a file nobody edited.
2. **`git reset --hard origin/<branch>`, not `git pull`** - the host is a deploy target, not
   a place to author changes. A pull can hit a merge conflict and wedge with no human at the
   keyboard.
3. **`npm ci`, falling back to `npm install`** - `ci` is reproducible and honors the lockfile.
4. **Migrations before build and restart** - so new code never meets an old schema. Must be
   idempotent, since re-running a deploy is normal.
5. **Build before restart** - restarting first serves a stale `dist/` that looks perfectly
   deployed. This one has actually shipped.
6. **Restart.**
7. **Health check with retries** - a healthy app can still be booting. One attempt produces
   false failures; zero attempts produce false successes.
8. **Sentinel last, on the success path only** - see below.
9. **On failure, dump recent logs** - so the operator is not left guessing.

## The sentinel is the point

`touch "$HOME/.deploy-sentinels/$APP_NAME"` as the final line of the success path, paired
with a freshness monitor that alerts when the file goes stale.

**Logging is not alerting.** A deploy that fails silently, or a service that dies a week
later, is invisible until somebody happens to look. Redirecting output to a log file does not
change that, because nobody reads log files on a schedule. The sentinel is the only mechanism
here that turns a silent failure into a noticed one.

Placement matters: last, and only after the health check passes. A sentinel touched at the
top of the script, or on both paths, reports health that was never verified.

## Drift: check copies against the original

Hand-copied scripts decay in a specific way. **Local additions survive; safety steps get
dropped silently**, because nothing fails when you remove them - that is exactly what makes
them safety steps.

Observed across three copies of the same template:

| Step | Copy A | Copy B |
|---|---|---|
| Build before restart | yes | yes |
| `npm ci` (reproducible) | yes | no, plain `npm install` |
| `reset --hard` | yes | no, `pull --ff-only` (can fail on divergence) |
| Health check | yes, 5 retries | yes, single attempt |
| **Sentinel** | yes | **missing** |
| Migrations | not needed | yes (a legitimate local addition) |

Copy B lost the sentinel and the retry loop while correctly adding migrations. That is the
pattern: what a project needs gets added, what protects it gets trimmed.

Audit a script you inherited:

```bash
f=scripts/deploy.sh
grep -q 'reset --hard'        "$f" || echo "MISSING: reset --hard (pull can wedge on conflict)"
grep -q 'npm ci'              "$f" || echo "MISSING: npm ci (installs are not reproducible)"
grep -q 'deploy-sentinels'    "$f" || echo "MISSING: sentinel (silent failures stay invisible)"
grep -q 'curl'                "$f" || echo "MISSING: health check (deploy cannot know it worked)"
grep -Eq 'for i in|until'     "$f" || echo "WEAK: health check has no retry (false failures)"
# build must appear before restart
b=$(grep -n 'run build' "$f" | head -1 | cut -d: -f1)
r=$(grep -nE 'pm2 restart|systemctl restart' "$f" | head -1 | cut -d: -f1)
[ -n "$b" ] && [ -n "$r" ] && [ "$b" -gt "$r" ] && echo "CRITICAL: restart precedes build (ships stale dist/)"
```

## Verify it actually works

A deploy script you have not failed on purpose is untested. Once, deliberately:

- Point `HEALTH_URL` at a route that does not exist. The script must exit non-zero, print
  logs, and **leave the sentinel untouched**. If the sentinel updates anyway, the monitoring
  is decorative.
- Re-run a successful deploy immediately. It must be idempotent, migrations included.

## Related

- [../CONTRIBUTING.md](../CONTRIBUTING.md) - why this is a template rather than a shared library
- Pair the sentinel with a freshness monitor (a daily job that alerts on any sentinel older
  than its expected interval). The sentinel alone is only half the mechanism.
