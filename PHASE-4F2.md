# Phase 4F.2 — Sprite rollback + simplification

## Goal
Restore the known-good Phase 4F sprite architecture and make only narrow performance/reliability changes.

## Changes
- Removed `loading="lazy"` from site sprite generators so small sprites requested for visible cards/popups are not deferred.
- Admin now uses the shared `SBL.pokemon.spriteUrl()` path instead of its duplicate local Gen 5 sprite resolver.
- Kept the existing shared fallback/alias system from Phase 4F.
- Put compact Showdown IDs first in the existing candidate list to avoid predictable 404s for Paradox/Tapu/other hyphenated names.
- Kept MutationObserver only as a safety net for dynamically-created popup sprites; no new preload/cache layer was added.

## Intentionally NOT changed
- Replay parser
- Trade logic
- Roster/season logic
- Supabase schema
- Phase 4F performance cache

## Regression focus
Test normal cards and dynamically-created popups for: Chi-Yu, Scovillain, all Paradox Pokémon, Tapu Koko/Lele/Bulu/Fini, Terapagos, Mimikyu, Aegislash, and ordinary Pokémon.
