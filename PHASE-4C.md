# Phase 4C — Free Agency Service

## Completed

Added `js/services/free-agency.js` as the read-only Free Agency data service.

It abstracts the existing Free Agency data stored inside `__dashboard_state__` and preserves the existing database/schema.

### Service API

- `SBL.freeAgency.load(client, requestedSeason)`
- `SBL.freeAgency.getPool(settingsOrState)`
- `SBL.freeAgency.getPointValues(pool)`
- `SBL.freeAgency.normalizePool(pool)`
- `SBL.freeAgency.normalizeRosters(rosters)`

### Migrated

`free-agency.html` now gets its dashboard state, Free Agency pool, and roster snapshot through the shared League + Free Agency services instead of querying `replays` directly.

### Deliberately untouched

- Admin Free Agency publishing/import logic
- Database/schema
- Free Agency rendering and filters
- Trade submission/business rules
- Index trade UI
- Draft logic

The service is read-only and preserves the existing data shape.
