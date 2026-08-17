/*
 * SBL REPLAY SERVICE
 *
 * Phase 4E: read-only abstraction over the existing replays table.
 *
 * The database schema is intentionally unchanged. The table currently stores
 * both normal replay rows and several special records. This service keeps that
 * knowledge in one place so pages do not each implement their own filtering.
 */
(function () {
  'use strict';

  window.SBL = window.SBL || {};
  const SBL = window.SBL;

  const SPECIAL_IDS = new Set([
    '__dashboard_state__',
    '__rosters__',
    '__free_agency__'
  ]);

  const STATE_ID = '__dashboard_state__';
  const ROSTERS_ID = '__rosters__';
  const FREE_AGENCY_ID = '__free_agency__';

  async function load(client) {
    const db = client || (SBL.getSupabase ? SBL.getSupabase() : null);
    if (!db) throw new Error('Supabase client is not available.');

    const { data, error } = await db
      .from('replays')
      .select('replay_id,replay_data');

    if (error) throw error;
    return { data: data || [], error: null };
  }

  function partition(rows) {
    const list = Array.isArray(rows) ? rows : [];
    let sharedState = null;
    let publishedRosters = {};
    let publishedFreeAgency = null;
    const replays = {};

    for (const row of list) {
      if (!row || !row.replay_id) continue;

      if (row.replay_id === STATE_ID) {
        sharedState = row.replay_data || {};
        continue;
      }

      if (row.replay_id === ROSTERS_ID) {
        publishedRosters = row.replay_data?.rosters || {};
        continue;
      }

      if (row.replay_id === FREE_AGENCY_ID) {
        publishedFreeAgency = row.replay_data || null;
        continue;
      }

      if (!SPECIAL_IDS.has(row.replay_id)) {
        replays[row.replay_id] = row.replay_data || {};
      }
    }

    // Older dashboard snapshots could contain replay rows inside the shared
    // state blob. Preserve that compatibility behavior here rather than on
    // every page.
    if (sharedState?.replays && typeof sharedState.replays === 'object') {
      for (const [id, replay] of Object.entries(sharedState.replays)) {
        if (id && replay && typeof replay === 'object') {
          replays[id] = replay;
        }
      }
    }

    return {
      sharedState,
      replays,
      publishedRosters,
      publishedFreeAgency
    };
  }

  function isReplayId(id) {
    return !!id && !SPECIAL_IDS.has(id);
  }

  function getSpecialIds() {
    return {
      state: STATE_ID,
      rosters: ROSTERS_ID,
      freeAgency: FREE_AGENCY_ID
    };
  }

  SBL.replays = {
    STATE_ID,
    ROSTERS_ID,
    FREE_AGENCY_ID,
    load,
    partition,
    isReplayId,
    getSpecialIds
  };
})();
