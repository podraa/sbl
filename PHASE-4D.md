# Phase 4D — Trades Service + Weekly Trade Timing

## Status
**Implemented — ready for user regression testing.**

## Changes

Added:
- `js/services/trades.js`

The shared service centralises:
- accepted-trade timestamps
- Friday weekly deadline handling
- Monday 00:00 effective dates
- scheduled vs active trade status
- effective roster calculation
- Free Agency pickup timing
- trade allowance usage

## Trade timing rules

- Only **accepted** trades consume an allowance.
- Monday-Friday accepted trades become effective at the **following Monday 00:00**.
- Saturday/Sunday accepted trades become effective at the **Monday one week later**.
- Reverted trades do not consume an allowance, restoring the slot used by the original accepted trade.
- Pages overlay future-effective accepted trades out of the immediately-written roster, so the existing Supabase RPC/database structure does not need to be rewritten in this phase.
- Future Free Agency pickups remain available until their effective Monday.

## Admin revert behavior

The existing commissioner revert flow is retained. Because allowance calculations now count only `accepted` trades, a reverted team-to-team trade restores one team-trade allowance to each involved franchise. A reverted Free Agency trade restores the proposer's Free Agency allowance.

## Safety

No Supabase schema changes were made. Existing trade RPCs remain in place. Admin write flows were not replaced.

## Next phase

**Phase 4E — Replay service / remaining data-service migration**, after the Phase 4D regression checklist is confirmed.
