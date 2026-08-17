# Phase 4B — League / Dashboard State Service

## Goal

Introduce a shared read-only JavaScript abstraction over the existing Supabase `__dashboard_state__` / `replays` data without changing the database schema or Admin write behavior.

## Added

`js/services/league.js`

The service currently provides:

- `SBL.league.loadRows(client)` — loads the existing replay/state rows through one shared query abstraction.
- `SBL.league.loadState(client)` / `SBL.league.getState()` — loads only `__dashboard_state__`.
- `SBL.league.getTeamMap(state)`
- `SBL.league.getSettings(state)`
- `SBL.league.getTeams(state)`
- `SBL.league.getActiveSeason(state)`
- `SBL.league.getSeasonArchives(state)`
- `SBL.league.getLeagueUpdates(state)`
- `SBL.league.getFixture(state)`
- `SBL.league.getRosters(state)`

## Migrated in this phase

The following read-only pages now use `SBL.league.loadRows()` for their existing dashboard/replay query:

- `index.html`
- `stats.html`
- `season.html`
- `team-analysis.html`

The existing row interpretation remains inside those pages for now. This is intentional: Phase 4B first centralises the data-access boundary without changing the page-specific business logic.

## Deliberately not migrated

- `admin.html` — all writes remain untouched.
- `rosters.html` — recently repaired and therefore deliberately left stable.
- `free-agency.html` — recently repaired and therefore deliberately left stable.
- `draft.html` — no unnecessary changes.

## Database

No schema changes were made.

The existing records remain:

- `__dashboard_state__`
- `__rosters__`
- `__free_agency__`
- normal replay rows

## Next

Phase 4C should centralise Free Agency data access, but only after the current Phase 4B build is verified.
