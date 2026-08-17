# Phase 4A — Seasons Service

## Status

**Complete.**

Phase 4A centralises the read-only interpretation of seasons without changing the Supabase schema or Admin season-write operations.

## Added

- `js/services/seasons.js`

## Shared API

- `SBL.seasons.getActive(shared)`
- `SBL.seasons.getCurrentData(shared)`
- `SBL.seasons.getArchive(shared, key)`
- `SBL.seasons.getSnapshot(shared, options)`
- `SBL.seasons.getAvailableSeasons(shared)`
- `SBL.seasons.getSeasonKey(name)`
- `SBL.seasons.loadState()` for future pages that need to retrieve the dashboard state directly

## Migrated pages

Read-only season interpretation was migrated in:

- `index.html`
- `rosters.html`
- `free-agency.html`
- `season.html`
- `stats.html`
- `team-analysis.html`

Each now loads `js/services/seasons.js` and uses `SBL.seasons.getSnapshot(...)` rather than maintaining its own season snapshot implementation.

## Deliberately not migrated

`admin.html` still contains its existing season logic and write operations. Admin is intentionally deferred because it is the highest-risk consumer of season data.

## Database

No database or Supabase schema changes were made.

The existing `__dashboard_state__` and `seasonArchives` structure remains intact.

## Verification

- Shared seasons service syntax-checked successfully.
- Confirmed all six migrated pages load the service before their application code.
- Confirmed the duplicated season helper declarations were removed from migrated pages.
- Confirmed Admin's season implementation remains untouched.
- Full browser regression checklist remains required before approving the phase.

## Next

**Phase 4B — League/dashboard state service.**

Create `js/services/league.js` to abstract `__dashboard_state__`, starting with read-only access to league settings, team maps, active season and shared state. Do not change the database schema or Admin writes yet.
