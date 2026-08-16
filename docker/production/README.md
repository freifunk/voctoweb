# Production Docker (Compose)

Postgres, Redis, Elasticsearch and the Rails app run in Compose. **TLS stays on the host** (Caddy or nginx) and proxies to `127.0.0.1:3000`.

## Why host TLS (not Traefik in Compose)?

For a single public hostname (`media.freifunk.net`) this is simpler and more robust:

- Certificates survive `compose down` / app rebuilds
- Ports 80/443 are not tied to the app stack
- Fewer moving parts than Traefik + ACME inside Compose
- Same pattern as most Freifunk boxes (Caddy or nginx + certbot)

Use Traefik only if you already run many Compose apps and want one dynamic router.

Examples: [Caddyfile.example](Caddyfile.example), [nginx-host.example.conf](nginx-host.example.conf).

## One-time setup on the server

```bash
git clone git@github.com:freifunk/voctoweb.git /srv/voctoweb
cd /srv/voctoweb
git checkout main

cp docker/production/env.example docker/production/.env
cp docker/production/database.yml.example docker/production/database.yml
cp docker/production/settings.yml.example docker/production/settings.yml
# edit .env (strong POSTGRES_PASSWORD, rails secrets)
# generate secrets: docker compose -f docker-compose.production.yml run --rm --no-deps voctoweb \
#   bundle exec rails secret

# Host TLS (pick one)
# sudo cp docker/production/Caddyfile.example /etc/caddy/Caddyfile && sudo systemctl reload caddy
```

## Bring the stack up

Always pass the env file so Compose can interpolate Postgres vars:

```bash
export COMPOSE="docker compose --env-file docker/production/.env -f docker-compose.production.yml"

$COMPOSE build
$COMPOSE up -d postgres redis elasticsearch
# wait until healthy: $COMPOSE ps
```

### Import an old Freifunk dump (cutover)

Restore **before** migrations, into the empty DB created by Postgres:

```bash
$COMPOSE exec -T postgres pg_restore -U voctoweb -d voctoweb --no-owner --no-acl < /path/to/dump
# exit 1 from pg_restore is often OK (warnings)

$COMPOSE run --rm voctoweb bundle exec rails db:migrate

# Size MB→bytes only if max(size) still looks like MB — see migration/STAGING.md
$COMPOSE exec -T postgres psql -U voctoweb -d voctoweb -c \
  "SELECT MIN(size), MAX(size), COUNT(*) FILTER (WHERE size < 1048576) FROM recordings WHERE size IS NOT NULL;"

$COMPOSE run --rm voctoweb bundle exec rails runner \
  'Event.__elasticsearch__.create_index! force: true; Event.import'

$COMPOSE up -d voctoweb sidekiq
```

### Empty fresh DB (no dump)

```bash
$COMPOSE run --rm voctoweb bundle exec rails db:prepare
$COMPOSE up -d
```

## Updates / deploy

```bash
# as user voctoweb, from the checkout:
bin/docker-prod-deploy
# SKIP_PULL=1 bin/docker-prod-deploy          # rebuild current tree only
# SKIP_MIGRATE=1 bin/docker-prod-deploy       # code-only, no migrations
```

Flow: `git pull --ff-only` → `build` → `db:migrate` → `up -d`. Renovate / `sync-upstream` only open PRs — merge on GitHub, then run deploy on the server (do not auto-deploy every PR).

Compose services use `restart: unless-stopped`; with `docker.service` enabled that is enough for reboot. An extra systemd unit is optional.

## Backups (Duply + Postgres dump)

Postgres is the source of truth. Dump before Duply runs:

```bash
# writes /var/backups/voctoweb/voctoweb-latest.dump (+ dated copy)
bin/docker-prod-backup-db
```

Wire into Duply via [duply-pre.example](duply-pre.example) (`PRE=…`, include `BACKUP_DIR` in `SOURCE`). Do not rely on volume-level copies of `postgres_data` alone.

## Notes

- App listens only on localhost:3000; do not publish 5432/9200/6379 to the internet.
- CORS for ES is configured in repo-root `elasticsearch.yml` (not via unquoted `*` env vars).
- Capistrano is optional when using this stack.
- Local cutover checklist: `migration/CUTOVER.md` (gitignored runbook).
