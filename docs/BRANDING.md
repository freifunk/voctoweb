# Freifunk branding overlay

This fork tracks [voc/voctoweb](https://github.com/voc/voctoweb) `main` and applies a thin Freifunk overlay.

## In Git (prefix commits with `branding:`)

| Path | Purpose |
|------|---------|
| `config/locales/custom.en.yml` | Titles, meta, RSS feed names (`header.publisher`) |
| `config/settings.yml.template` | Example hosts / CDN / feed channel texts |
| `docker/settings.yml` | Local Docker Freifunk settings |
| `app/views/frontend/shared/_footer.haml` | Webteam / imprint links |
| `app/views/frontend/shared/_short_about.haml` | Short about blurb |
| `app/views/frontend/home/about.haml` | Full about page |
| `app/views/public/oembed.*` | `provider_name` |
| `app/views/frontend/events/show.html.haml` | JSON-LD publisher + oEmbed link title |
| `app/assets/stylesheets/frontend/base/_theme.scss` | Freifunk pink CSS vars (links, headings, buttons) |
| `app/assets/stylesheets/frontend/base/_navbar.scss` | Pink navbar bar + white brand |
| `app/assets/stylesheets/frontend/base/_footer.scss` | Pink footer |
| `app/assets/stylesheets/frontend/base/_base.scss` | `btn-secondary` pink |
| `app/assets/stylesheets/frontend/pages/_start.scss` | Search icon pink |
| `app/assets/stylesheets/frontend/lib/_variables.scss` | `$brand-primary: #df3a6c` (Bootstrap leftovers) |
| `app/views/frontend/shared/_navbar.haml` | Logo + `media.freifunk.net` text |
| `app/models/site_settings.rb` | Default logo/banner via local assets; override in Admin |
| `lib/feeds/news_feed_generator.rb` | Feed item/channel IDs |
| `lib/feeds/podcast_generator.rb` | Generator string + iTunes owner email |
| `app/views/frontend/shared/_player_playlist_*.haml` | CDN host check for mirrorbrain |
| `UPSTREAM` | Pin of last synced voc/main SHA (informational) |

## Not in Git (production / staging secrets)

- `config/settings.yml` — copy from template, set real hosts
- `config/database.yml`, `.env.production`
- Prefer setting logo and banners in **Admin → Misc → Site settings** so assets can change without a deploy

## Upstream sync

- Weekly GitHub Action: `.github/workflows/sync-upstream.yml`
- Renovate: gems, Docker images, Actions (`renovate.json`)
- Do not mix branding edits into VOC sync or dependency PRs
