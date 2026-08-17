# SBL Refactor AI Handoff

## Current phase
**Phase 4F.3 — Performance / data-loading optimisation**

## Previous completed work
- Phase 2: shared infrastructure, auth, roster/season/Pokémon services.
- Phase 3A–3C: shared site/theme/sprite/canonicalisation work.
- Phase 4A–4D: roster/trade refactors and trade scheduling/reversion rules.
- Phase 4E: replay read service migration.
- Replay parser hardening: individual battle-stint identity, Zoroark Illusion, Transform/Imposter, Terapagos and other form changes, indirect damage and related edge cases.

## Phase 4F changes
`js/performance.js` adds a short-lived IndexedDB read cache for:
- `SBL.replays.load()` → `replays:all`
- `SBL.trades.load()` → `trades:all`

The cache is intentionally read-only and falls back to Supabase.

## Critical rules for the next AI
1. Do not remove the replay-parser identity model.
2. Do not replace the trade effective-week/reversion logic.
3. Do not make the client cache the source of truth.
4. Every successful Admin write affecting replay/trade data should invalidate the relevant cache key.
5. Archived-season reads must never accidentally reuse the active-season cached interpretation.
6. Keep Pokémon canonicalisation centralized in `js/services/pokemon.js`.

## Next step
Before starting Phase 4G, test the Phase 4F checklist and measure whether page navigation is materially faster. If performance is still poor, profile the remaining page-specific work before adding more caching.


## Phase 4F.2 — Sprite simplification
The previous 4F.1 sprite resolver was reverted. Do not add another resolver/cache/preload system without profiling first. Sprite infrastructure is shared through `js/services/pokemon.js`; dynamically-created popups should use the same `spriteImg()` helpers.


## Phase 4F.3 / 4F.4 — Sprite architecture

The previous local sprite-sheet and PokeAPI numeric-ID experiments were retired after causing incorrect sprites and missing form sprites. The current shared sprite implementation is in `js/services/pokemon.js` and uses Pokémon Showdown's `home` sprite directory with deterministic filename mapping.

### Critical sprite rules
1. Do not use National Dex numbers as sprite URLs for forms.
2. Do not build a fallback/probing waterfall.
3. Do not add a MutationObserver or per-page sprite loader.
4. All cards, tables and dynamically generated popups must use `SBL.pokemon.spriteMarkup()` / `SBL.pokemon.spriteUrl()`.
5. Keep form filename exceptions in the central `FORM_FILES` map in `js/services/pokemon.js`.
6. Preserve Showdown's filename conventions: ordinary hyphenated species generally use `toID` (`greattusk`, `ironvaliant`, `chiyu`), while many battle forms retain a hyphen (`deoxys-attack`, `landorus-therian`, `terapagos-stellar`).
7. If a sprite is missing, fix the deterministic mapping rather than adding network retries.

### Current phase
**Phase 4F.4 — Sprite full sweep.** Regression-test normal cards and dynamically-created popups with ordinary species, Paradox Pokémon, Tapus, Deoxys forms, Aegislash, Terapagos forms, Ogerpon masks, Palafin, Mimikyu, Tauros Paldea forms, gender forms, Alcremie forms, and other hyphenated names before moving on.


### Sprite naming rule (Phase 4F.5)
Showdown HOME uses compact filenames for several species whose human names contain hyphens (for example `chiyu`, `tapukoko`, `greattusk`, `ironvaliant`, `mrmime`, `porygonz`) but preserves hyphens for actual form suffixes such as `deoxys-attack`. Do not globally strip or preserve hyphens; use `SBL.pokemon.spriteFilename()`. `Scovillalian`, `Scovillain`, and `Scovillain` are canonicalised to `Scovillain`.
