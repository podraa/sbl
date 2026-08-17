# Phase 4F.5 — Sprite filename + Scovillain canonicalisation

## Fixes
- Showdown HOME filenames are now resolved using the actual naming convention: compact IDs for species whose human names contain hyphens (for example `hooh`, `mrmime`, `porygonz`, `chiyu`, `greattusk`, `ironvaliant`) while retaining hyphens for true form suffixes such as `deoxys-attack` and `landorus-therian`.
- Tapu and other compact-name exceptions are explicitly mapped.
- `Scovillalian`, `Scovillain`, and `Scovillain` are canonicalised to `Scovillain` throughout shared roster/free-agency/draft/admin display paths.
- Normal page sprites and popup sprites continue to use the same shared `SBL.pokemon.spriteMarkup()` implementation.

## Regression checks
- Ho-Oh, Mr. Mime, Mr. Rime, Mime Jr., Porygon-Z, Jangmo-o, Hakamo-o, Kommo-o.
- Chi-Yu, Chien-Pao, Ting-Lu, Wo-Chien.
- Great Tusk, Flutter Mane, Iron Valiant, Iron Crown, Raging Bolt, Walking Wake.
- Deoxys-Attack/Defense/Speed.
- Landorus-Therian, Tornadus-Therian, Thundurus-Therian, Enamorus-Therian.
- Tapu Koko/Lele/Bulu/Fini.
- Scovillain must display exactly as `Scovillain` in roster, draft, free agency, admin, stats/season and popup contexts.
