# Phase 4E — Replay Service

## Status
**Implemented — awaiting user regression testing.**

## Purpose
Centralise read-only access to the existing `replays` table without changing the database schema or Admin write behavior.

## Added
- `js/services/replays.js`

## Service responsibilities
- Load replay rows from Supabase.
- Separate normal replay rows from special records.
- Expose `__dashboard_state__`, `__rosters__`, and `__free_agency__` as special records rather than replays.
- Preserve compatibility with older dashboard snapshots that embedded replays under `__dashboard_state__.replays`.

## Migrated pages
- `index.html`
- `season.html`
- `stats.html`
- `team-analysis.html`
- `rosters.html`

## Deliberately not migrated
- Admin replay/state writes.
- Draft write paths.

These remain direct because they are privileged write operations and should not be changed during a read-only service refactor.

## Safety
- No Supabase schema changes.
- No trade logic changes.
- No Free Agency business-rule changes.
- No Pokémon normalization/sprite changes.

## Parser edge-case hardening update — 2026-08-17

Replay parsing was hardened after Phase 4E to prevent battle-state identity collisions.

### Affected functionality
- Admin replay import/reparse: parser now tracks each switch-in as a unique battle stint and aggregates only after parsing.
- Stats replay parsing/audit: uses the same stint identity model and canonicalises battle-only forms before league aggregation.
- Season replay parsing/audit: same changes as Stats.
- Shared Pokémon service: expanded battle-form canonicalisation.

### Behavioural changes
- Zoroark/Illusion and Ditto/Transform/Imposter no longer merge with the displayed/disguised species.
- Terapagos, Mimikyu, Aegislash and other battle-form transitions aggregate into the base league Pokémon.
- Repeated switch-ins are kept separate while parsing, preventing stale attacker/damage attribution from following a slot to a new Pokémon.
- Multi-form statistics remain one league-facing Pokémon row.

### Required action
Existing stored parsed replay rows are not rewritten automatically. Historical replays should be reparsed after installing this update. Stats/Season may still display old stored data until those replays are reparsed.
