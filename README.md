# MATTBEAR Discord Den

A bright, mobile-first front door for the MATTBEAR Discord and HiberNation network.

## What it does

- keeps every SVG icon locked to small interface sizes
- links clearly to [MATTBEAR MAIN](https://bearicide.github.io/)
- filters destinations by Music, Games, Community, and Code
- supports instant search with `/` and clear with `Esc`
- includes a restrained lighting switch saved in local storage
- includes an interactive Idea Box prompt generator
- uses accessible focus states, semantic headings, and 44px+ tap targets
- respects reduced-motion preferences

## Discord invite

Set the current invite in `js/config.js`:

```js
window.MATTBEAR_PORTAL_CONFIG = {
  discordInvite: "https://discord.gg/YOUR-CODE",
  discordLabel: "Come on in",
  discordDescription: "Join the MATTBEAR community"
};
```

Until an invite is configured, the Discord action remains visibly disabled instead of opening a broken link.

## GitHub Pages

Publish from `main` and the repository root.

Public URL:

`https://bearicide.github.io/discord-/`

## Asset library

The original SVG asset browser remains available at `preview/`.

No official Discord logo or proprietary Discord illustration is included. Discord is a trademark of Discord Inc.
