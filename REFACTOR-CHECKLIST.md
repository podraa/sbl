# SBL Refactor Verification Checklist

Use this checklist after **every refactor ZIP** before moving to the next phase. The goal is to verify that refactoring did not silently change existing functionality.

## A. Basic site-wide checks

- [ ] ZIP opens/extracts normally.
- [ ] Every expected HTML page is present.
- [ ] Every expected shared JS file is present.
- [ ] No unexpected files were deleted.
- [ ] No page shows a JavaScript error in the browser console on initial load.
- [ ] Shared navigation still appears correctly.
- [ ] Current-page navigation highlighting still works.
- [ ] Theme/accent settings still apply site-wide.
- [ ] Desktop layout is intact.
- [ ] Mobile/narrow layout is intact.

## B. Authentication / permissions

- [ ] Logged-out behaviour is correct.
- [ ] Logged-in user is identified correctly.
- [ ] Correct team is identified for the logged-in user.
- [ ] Normal users cannot access commissioner/admin-only actions.
- [ ] Commissioner/admin permissions still work.
- [ ] Logout still works.

## C. Pokémon / sprites

- [ ] Normal Pokémon sprites load.
- [ ] Chi-Yu loads.
- [ ] Scovillain loads.
- [ ] Paradox Pokémon sprites load (Great Tusk, Scream Tail, Flutter Mane, Iron Treads, Roaring Moon, Iron Valiant, etc.).
- [ ] Tapu sprites load (Tapu Koko, Tapu Lele, Tapu Bulu, Tapu Fini).
- [ ] Pokémon with hyphens load (e.g. Ho-Oh, Porygon-Z).
- [ ] Regional forms load.
- [ ] Mega forms load where used.
- [ ] Alternate formes load.
- [ ] Pokémon search/display does not show battle-only variants as separate names (e.g. Aegislash Blade should display as Aegislash).
- [ ] Female/male forms load where used.
- [ ] Pokémon dynamically added after page load still receive sprite fallback handling.
- [ ] A broken sprite does not create a broken-image UI or break the page.
- [ ] Initial page load is not blocked by eager-loading a large number of sprites.
- [ ] Sprite aliases are handled by the shared Pokémon service rather than page-specific patches.

## D. Rosters

- [ ] All teams load.
- [ ] The current user's roster loads.
- [ ] Pokémon ownership is correct.
- [ ] Roster ordering is unchanged.
- [ ] Roster counts are unchanged.
- [ ] Roster edits still work where applicable.
- [ ] Free Agency correctly reflects roster ownership.
- [ ] No Pokémon unexpectedly appears available/owned.

## E. Seasons

- [ ] Active season is correct.
- [ ] Current-season data loads.
- [ ] Season picker still works.
- [ ] Archived seasons can still be selected.
- [ ] Archived data does not leak into the active season.
- [ ] Team Analysis uses the same season interpretation as Stats/Rosters.
- [ ] Admin season controls still work.

## F. Free Agency

- [ ] Free Agency loads.
- [ ] Available Pokémon list is correct.
- [ ] Drafted/owned Pokémon are not incorrectly shown as available.
- [ ] Point values are correct.
- [ ] Filters still work.
- [ ] Points filter dropdown is visible and selectable.
- [ ] Pokémon details still open correctly.
- [ ] Team ownership text is correct.
- [ ] Any add/remove/signing behaviour still works.

## G. My Team / budgets

- [ ] Current roster is correct.
- [ ] Budget is correct.
- [ ] Spent amount is correct.
- [ ] Remaining budget is correct.
- [ ] Budget updates after relevant actions.
- [ ] Team-specific controls still work.

## H. Team Analysis

- [ ] Team selection works.
- [ ] Pokémon selection works.
- [ ] Offensive matchup works.
- [ ] Defensive/type information is unchanged.
- [ ] Speed tiers still work and remain correctly ordered.
- [ ] Sprites load in every analysis view.
- [ ] Alternate forms do not break calculations.

## I. Stats / replays

- [ ] Stats page loads.
- [ ] Replay data loads.
- [ ] Team filters work.
- [ ] Player/Pokémon filters work.
- [ ] Season filters work.
- [ ] Statistics match the previous build.
- [ ] Special state records are not accidentally treated as normal replays.

## J. Trades

When a phase touches trades:

- [ ] Trade creation works.
- [ ] Trade validation is unchanged.
- [ ] Budget validation is unchanged.
- [ ] Roster minimum rules are unchanged.
- [ ] Pending trades display correctly.
- [ ] Accept/reject/cancel works.
- [ ] Completed trades update rosters correctly.
- [ ] Trade history remains intact.

## K. Admin

When a phase touches Admin:

- [ ] Admin loads without console errors.
- [ ] Commissioner/admin controls appear correctly.
- [ ] Roster management works.
- [ ] Free Agency management works.
- [ ] Season management works.
- [ ] Draft management works.
- [ ] Trade management works.
- [ ] Replay/stat management works.
- [ ] Existing data is not overwritten unexpectedly.

## L. Data integrity

- [ ] No Supabase tables/records were unintentionally changed.
- [ ] No roster data was changed by a read-only refactor.
- [ ] No season data was changed by a read-only refactor.
- [ ] No Free Agency data was changed by a read-only refactor.
- [ ] No replay data was changed by a read-only refactor.
- [ ] Existing special records remain intact until an explicit database migration phase.

## M. Refactor-specific checks

- [ ] New shared service is actually loaded before code that uses it.
- [ ] Pages use the shared service where the phase says they should.
- [ ] Old duplicate code is retained only where explicitly marked as a safety fallback.
- [ ] No new duplicate implementation was introduced.
- [ ] No unrelated functionality was redesigned.
- [ ] No database schema was changed unless the phase explicitly calls for it.
- [ ] JavaScript syntax checks pass.
- [ ] The ZIP contains an updated `AI-REFACTOR-HANDOFF.md`.
- [ ] The handoff file says exactly what phase is complete and what the next phase is.

## Current phase: 4A — corrected build

For this ZIP specifically, verify the Pokémon/sprite section especially thoroughly. Phase 3C is complete only after all pages use the shared Pokémon sprite resolver for their normal sprite rendering and the known problematic Pokémon load correctly.

## Phase 4A checks — Seasons service

- [ ] `js/services/seasons.js` is present in the ZIP.
- [ ] All intended read-only pages load `js/services/seasons.js` before code that calls it.
- [ ] Active season remains unchanged.
- [ ] Current-season data remains unchanged.
- [ ] Archived season selection still resolves the same snapshot.
- [ ] Archived team maps/settings/replays remain isolated from the active season.
- [ ] Season keys are generated identically to the previous implementation.
- [ ] `index.html`, `rosters.html`, `free-agency.html`, `season.html`, `stats.html`, and `team-analysis.html` use `SBL.seasons`.
- [ ] No migrated page retains its old `seasonKey`, `selectedSeasonSnapshot`, or `installSeasonPicker` implementation.
- [ ] `admin.html` season write logic remains untouched.
- [ ] No database/schema changes were made.
- [ ] No new duplicate season implementation was introduced.

## Rule for approving a phase

Do not proceed just because the code looks correct. If a checklist item fails, record the failure and fix it before starting the next refactor unless it is explicitly documented as a known pre-existing issue.


## Phase 3C regression checks — latest fixes
- [ ] Stats Pokémon Search shows Aegislash once, not Aegislash + Aegislash Blade.
- [ ] Season Pokémon Search shows Aegislash once, not Aegislash + Aegislash Blade.
- [ ] Search for `Aegislash` still finds the canonical Aegislash row.
- [ ] Free Agency Points dropdown opens and contains the actual point values after the pool loads.
- [ ] Selecting a point value filters the Free Agency cards correctly.
- [ ] Refreshing Free Agency does not remove the point options.

## Phase 4A corrective regression checks

- [ ] Rosters page loads past the loading state.
- [ ] Rosters page shows all roster teams and Pokémon.
- [ ] Rosters budget/points display still works.
- [ ] Stats Pokémon Search tab is present and opens.
- [ ] Stats Pokémon Search renders results without a JavaScript error.
- [ ] Aegislash remains canonicalised to one displayed row.
- [ ] Normal sprites do not visibly wait for a failed hyphenated URL before loading.
- [ ] Paradox Pokémon sprites load.
- [ ] Tapu Pokémon sprites load.
- [ ] Season page still works after the correction.
- [ ] No Phase 4B work has been started in this corrective build.

## Phase 4B — League / Dashboard State

- [ ] `js/services/league.js` loads without syntax errors.
- [ ] Index/My Team loads normally.
- [ ] Stats loads normally.
- [ ] Season loads normally.
- [ ] Team Analysis loads normally.
- [ ] League Overview cards and popup still work.
- [ ] Replay/stat data still loads.
- [ ] Active season remains correct.
- [ ] Archived season selection remains correct.
- [ ] Rosters page still loads and navigation works.
- [ ] Free Agency still loads and Points dropdown works.
- [ ] Pokémon Search still appears and Aegislash is canonicalised correctly.
- [ ] Paradox Pokémon sprites load.
- [ ] Tapu Pokémon sprites load.
- [ ] Sprite loading remains reasonably fast.
- [ ] Admin has not had its write logic changed.
- [ ] No database/schema changes were made.
- [ ] Only intended files changed.
- [ ] Handoff file identifies the current phase and exact next task.


## Phase 4B working build regression check
- [ ] All Pokémon data appears on Index/Dashboard.
- [ ] Season page loads its Pokémon/replay data.
- [ ] Stats loads Pokémon search and League Overview cards.
- [ ] Team Analysis loads Pokémon and replay data.
- [ ] Rosters still loads.
- [ ] Free Agency still loads.
- [ ] Pokémon sprites still load, including Chi-Yu, Scovillain, Paradox and Tapu Pokémon.
- [ ] Normal site navigation works.

## Phase 4C — Free Agency Service checks

- [ ] Free Agency page loads for an authenticated team user
- [ ] Free Agency pool appears
- [ ] Points dropdown contains actual point values
- [ ] Type/name/move/ability/base-stat filters still work
- [ ] Drafted Pokémon show their franchise correctly
- [ ] Available Pokémon remain available
- [ ] Archived-season Free Agency data resolves correctly
- [ ] Roster ownership checks still work
- [ ] 5-second refresh does not reset filters or blank the page
- [ ] Admin Free Agency import/publish remains unchanged
- [ ] No direct `replays` Free Agency/dashboard query remains in `free-agency.html`

## Phase 4D — Trades service + weekly timing

### Trade timing
- [ ] Pending trades do not change the roster or consume an allowance.
- [ ] Accepted Monday-Friday trade is shown as scheduled until the following Monday 00:00.
- [ ] Accepted Friday trade is included in the next Monday roster.
- [ ] Accepted Saturday trade is NOT included in the immediately following Monday roster.
- [ ] Accepted Saturday trade becomes active on the second following Monday.
- [ ] Accepted Sunday trade follows the same delayed rule.
- [ ] Trade card clearly shows Scheduled/Active and the effective date.

### Roster behavior
- [ ] Current roster does not show a future-effective team trade.
- [ ] Current roster does not show a future-effective Free Agency pickup.
- [ ] On/after the effective Monday, the trade appears in the roster normally.
- [ ] Roster page reflects the same effective roster as My Team.
- [ ] Season/Stats/Team Analysis use the same effective roster.
- [ ] Archived seasons are not altered by current-season scheduled trades.

### Allowances
- [ ] Accepted team trade consumes one allowance for each team.
- [ ] Accepted Free Agency trade consumes one Free Agency allowance for the acquiring team.
- [ ] Reverted team trade no longer counts as used for either team.
- [ ] Reverted Free Agency trade no longer counts as used for the acquiring team.
- [ ] Reverting the same trade cannot restore an allowance twice.
- [ ] Commissioner bonus credits remain separate from refunded normal allowances.

### Free Agency
- [ ] Future-effective Free Agency pickup remains visible as available.
- [ ] Future-effective Free Agency pickup becomes drafted on its effective Monday.
- [ ] Existing Points/type/move/ability/stat filters still work.

### Regression
- [ ] Index/My Team loads.
- [ ] Rosters loads.
- [ ] Free Agency loads.
- [ ] Stats loads.
- [ ] Season loads.
- [ ] Team Analysis loads.
- [ ] League Overview popup works.
- [ ] Pokémon Search still appears.
- [ ] Aegislash remains canonicalised.
- [ ] Paradox and Tapu sprites load.
- [ ] Navigation/auth behavior is unchanged.
- [ ] Admin trade manager still loads.
- [ ] Admin can still credit, reject, revoke, and revert trades.
- [ ] No Supabase schema changes were made.

## Phase 4E — Replay Service Checklist

- [ ] Dashboard loads normally and replay-derived Pokémon data is present.
- [ ] Stats loads replay data and franchise/player statistics correctly.
- [ ] Season page loads current-season and archived replay data correctly.
- [ ] Team Analysis loads replay data and team selection correctly.
- [ ] Rosters loads published rosters and still applies effective trade timing.
- [ ] `__dashboard_state__` is not displayed as a normal replay.
- [ ] `__rosters__` is not displayed as a normal replay.
- [ ] `__free_agency__` is not displayed as a normal replay.
- [ ] Older snapshots with `sharedState.replays` still load correctly.
- [ ] Pokémon sprites still load normally on all affected pages.
- [ ] Free Agency and Trades still work after navigation from affected pages.
- [ ] Accepted/reverted trade timing remains unchanged.
- [ ] Admin replay publishing/deleting still works.
- [ ] Draft page still loads its shared state and can perform its existing writes.

## Replay parser edge-case regression checklist

- [ ] Reparse a Zoroark / Zoroark-Hisui Illusion replay and verify damage stays with the real Zoroark, not its disguise.
- [ ] Verify damage dealt by the real disguised species is not credited to Zoroark.
- [ ] Verify Ditto/Imposter/Transform damage remains credited to Ditto.
- [ ] Verify Terapagos remains one Pokémon across Terastal/Stellar form changes.
- [ ] Verify Mimikyu-Busted is shown/aggregated as Mimikyu.
- [ ] Verify Aegislash Blade/Shield remains one Pokémon.
- [ ] Verify Mega/Tera/Dynamax/Gigantamax form changes do not create separate league Pokémon.
- [ ] Verify a Pokémon switching out and another Pokémon entering the same slot does not inherit the previous Pokémon's attacker/kill credit.
- [ ] Verify residual/hazard damage does not inherit stale direct-hit attribution.
- [ ] Verify Stats and Season agree with Admin after reparsing the same replay.
- [ ] Verify existing stored replays remain readable before reparsing.

## Phase 4F — Performance regression checklist

- [ ] First load of each page still shows the correct data.
- [ ] Navigating between Stats / Season / other pages is faster after the first load.
- [ ] Refreshing a page within two minutes still shows current cached data.
- [ ] After an admin changes shared data and refreshes, the change is not hidden by the client cache (writes must invalidate the cache where the write path uses the performance service).
- [ ] Trades remain current after acceptance/reversion and are not stale from cache.
- [ ] Archived seasons still resolve correctly and do not reuse the active-season payload.
- [ ] Replay Browser still shows every replay and special rows remain excluded from replay aggregation.
- [ ] Pokémon sprites still render; no new sprite-loading regressions.
- [ ] Zoroark/Illusion attribution remains correct after replay reparsing.
- [ ] Terapagos/form-change attribution remains correct after replay reparsing.
- [ ] No console errors related to IndexedDB, cache, SBL.replays, or SBL.trades.


## Phase 4F.2 Sprite checks
- [ ] Ordinary Pokémon sprites load immediately.
- [ ] Chi-Yu and Scovillain load.
- [ ] Paradox Pokémon load.
- [ ] Tapu Koko/Lele/Bulu/Fini load.
- [ ] Terapagos and Mimikyu load.
- [ ] The same sprites load inside dynamically-created popups/modals.
- [ ] No page introduces its own sprite URL resolver.
- [ ] Navigation remains functional.


## Phase 4F.3 — Sprite checklist
- [ ] Normal roster cards show Pokémon sprites immediately.
- [ ] Free Agency sprites load immediately.
- [ ] Draft sprites load immediately.
- [ ] Match summary sprites load.
- [ ] League Overview popup sprites load.
- [ ] Team Analysis popup sprites load.
- [ ] Stats/Season popup sprites load.
- [ ] Chi-Yu loads.
- [ ] Scovillain loads.
- [ ] Paradox Pokémon load.
- [ ] Tapu Pokémon load.
- [ ] Terapagos loads.
- [ ] Mimikyu loads.
- [ ] No individual requests to `play.pokemonshowdown.com/sprites/...` occur for normal Pokémon cards.
- [ ] The local sheet exists at `assets/sprites/pokemon-sheet.png`.

### Phase 4F.3 — Sprite regression checklist
- [ ] Gen 9 SV sprite appears for ordinary Pokémon (Pikachu, Charizard, etc.).
- [ ] Chi-Yu loads correctly.
- [ ] Scovillain loads correctly.
- [ ] Paradox Pokémon load correctly.
- [ ] Tapu Koko, Tapu Lele, Tapu Bulu and Tapu Fini load correctly.
- [ ] Terapagos loads correctly.
- [ ] Mimikyu and Aegislash display the intended canonical sprite.
- [ ] Sprites load in normal cards and dynamically-created popups.
- [ ] No sprite request waterfall/fallback sequence occurs.
- [ ] Browser DevTools shows deterministic Gen 9 SV URLs rather than old Showdown gen5/gen9 URLs or local sheet URLs.
- [ ] Navigating between pages does not reintroduce a sprite-specific loader.


## Phase 4F.4 — Sprite full-sweep checklist
- [ ] Ordinary Pokémon sprites load.
- [ ] Paradox Pokémon sprites load.
- [ ] Chi-Yu and Scovillain load.
- [ ] Tapu Koko/Lele/Bulu/Fini load.
- [ ] Deoxys base/Attack/Defense/Speed load.
- [ ] Aegislash base/Blade/Shield load.
- [ ] Terapagos base/Terastal/Stellar load.
- [ ] Ogerpon masks load.
- [ ] Palafin base/Hero load.
- [ ] Mimikyu base/Busted load.
- [ ] Tauros Paldea forms load.
- [ ] Gender forms load.
- [ ] Hyphenated species such as Great Tusk, Iron Valiant, Mr. Mime, Porygon-Z and Jangmo-o load.
- [ ] The same sprites load inside dynamically-created popups.
- [ ] No sprite causes a visible neighbouring/incorrect sprite bleed.
- [ ] Browser Network tab shows one deterministic sprite request per uncached Pokémon, not a fallback chain.
- [ ] Navigation remains functional and no unrelated page functionality changed.
