# Phase 4F.3 — Deterministic Gen 9 Remote Sprite Engine

## Purpose
Replace the failed local sprite-sheet experiment with a simple deterministic Gen 9 Scarlet/Violet sprite loader.

## Architecture
- `js/pokemon-dex-ids.js` maps canonical Pokémon IDs to National Dex numbers.
- `js/services/pokemon.js` turns the Dex number into exactly one Gen 9 SV sprite URL.
- Source is the PokeAPI `sprites` repository, delivered through jsDelivr CDN.
- All normal cards and dynamically-created popups use `SBL.pokemon.spriteMarkup()`.
- No MutationObserver, probing waterfall, preload queue, custom sprite cache, or local sprite sheet.
- Browser/CDN caching handles repeated images.

## Important behaviour
- Gen 9 Scarlet/Violet front sprites are the default.
- Form names resolve to a deterministic base National Dex ID when no dedicated form ID is available in the shared manifest. This is intentionally a display choice, not a network fallback.
- Known aliases such as `chiyu`, `scovillain`, and `scovillain` canonicalise before URL generation.
- The sprite system makes one request per unique image URL, not a sequence of fallback requests.
- Popups use the same function as normal cards, so there is no popup-specific sprite loader.

## Performance goal
The previous implementations were slow because they added fallback/probing/observer machinery or used a local sheet incorrectly. This version keeps sprite resolution synchronous and cheap and delegates caching to the browser and CDN.

## Source / attribution
Gen 9 front sprites are provided by the PokeAPI sprites project. PokeAPI's repository README states that Gen 9 front_default sprites are provided by KingOfThe-X-Roads and that the repository hosts the sprite images for application use.

## Do not reintroduce
- remote URL fallback chains
- per-generation probing
- MutationObserver sprite scanning
- custom failed-URL caches
- per-page sprite implementations
- local icon-sheet rendering for full-size Pokémon sprites
