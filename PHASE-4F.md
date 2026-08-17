# SBL Refactor — Phase 4F

## Goal
Improve page-load performance without changing the Supabase schema or league business rules.

## Changes
- Added `js/performance.js`.
- Adds a small read-through IndexedDB cache for expensive shared `replays` and `trade_requests` reads.
- Keeps an in-memory cache for repeated reads during a single page lifetime.
- Uses a short 2-minute TTL so normal navigation is faster without making the dashboard permanently stale.
- Falls back transparently to live Supabase reads if IndexedDB is unavailable or storage fails.
- No write operations are intercepted.

## Important integration note
The cache is only a read optimisation. Any write path that changes replay/trade data should call:

```js
await SBL.performance.invalidate('replays:all');
await SBL.performance.invalidate('trades:all');
```

after a successful write. The current Phase 4F files add the performance layer, but future refactors must preserve explicit invalidation after Admin replay/trade writes.

## Not changed
- Database schema
- Replay parser/business rules
- Trade effective-week rules
- Roster rules
- Season archive format
- Pokémon canonicalisation rules

## Why this is safe
If the cache misses, the original `SBL.replays.load()` / `SBL.trades.load()` functions run unchanged. If IndexedDB is unavailable, the page behaves as before.
