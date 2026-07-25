# MATTBEAR Discord Portal

A fast, mobile-first landing page for the MATTBEAR community, public projects, and Discord access. The repository also contains the reusable Discord-style UI asset pack.

## Portal features

- direct access to Discord, the MATTBEAR network, GitHub, and the asset library
- searchable project links
- keyboard shortcuts: `/` searches and `Esc` clears
- fixed four-action mobile navigation
- semantic HTML, visible focus states, 44px tap targets, and reduced-motion support
- SEO metadata, Open Graph metadata, canonical URL, and basic structured data
- no framework, build step, remote font, or runtime dependency

## Required setup

Add the current Discord invite URL in `js/config.js`:

```js
window.MATTBEAR_PORTAL_CONFIG = {
  discordInvite: "https://discord.gg/REPLACE-ME",
  discordLabel: "Open Discord",
  discordDescription: "Join the MATTBEAR community"
};
```

Until configured, the Discord control remains disabled and explains exactly where the link belongs.

## Asset pack

- 33 original SVG icons
- dark backgrounds and subtle patterns
- UI fragments
- CSS design tokens and utilities
- searchable gallery at `preview/index.html`

## GitHub Pages

Publish from the root of the `main` branch after merging the portal pull request. The expected public URL is:

`https://bearicide.github.io/discord-/`

No official Discord logo or proprietary illustration is included. Discord is a trademark of Discord Inc.
