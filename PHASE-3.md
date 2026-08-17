# Phase 3 — Rosters

The Rosters page now exposes the shared roster service as `window.SBL.rosters`.

This phase is intentionally conservative:
- UI and rendering code were not rewritten.
- Roster publishing/upload behavior was not moved.
- Existing page-specific fallback behavior remains intact.
- The shared service is now available for incremental replacement of read paths.

Next migration target:
1. Replace the page's initial roster fetch with `SBL.rosters.getAll()`.
2. Verify team selection and rendering.
3. Replace duplicated roster normalization.
4. Remove the old read-only query only after verification.
5. Keep roster publishing as a separate write service until its behavior is audited.


## Phase 3B — Universal Pokémon sprites

The next shared layer is now in place:

1. `js/services/pokemon.js` is the single shared Pokémon/sprite utility.
2. Every HTML page loads it.
3. Existing page-level sprite code remains untouched so the migration is non-destructive.
4. Failed Showdown sprite requests are retried against aliases and multiple sprite generations.
5. Known league naming problems such as `Chiyu` and `Scovillain` are normalized centrally.

The next step can migrate individual pages from their local `sprite()`/`spriteUrl()` helpers to `SBL.pokemon.spriteUrl()` and then remove those helpers once each page is verified.
