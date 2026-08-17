# Phase 4F.4 — Sprite Full Sweep

## Purpose
Fix the failed Phase 4F.3 Gen 9/PokeAPI sprite implementation. The failure was structural: PokeAPI's Scarlet/Violet directory is keyed by Pokémon/form IDs, so using the base National Dex number for every form cannot reliably resolve forms such as Deoxys-Attack, Aegislash-Blade, Terapagos-Stellar, etc.

## New sprite source
The shared sprite service now uses Pokémon Showdown's `home` sprite directory. This source uses deterministic, human-readable sprite filenames and includes alternate forms. There is exactly one URL generated per displayed Pokémon; no probing, fallback waterfall, MutationObserver, preload queue, or custom image cache is used.

## Canonicalisation rules
- Ordinary species use Showdown-style IDs (`Great Tusk` -> `greattusk`, `Chi-Yu` -> `chiyu`).
- Known battle/form variants preserve the form suffix (`Deoxys-Attack` -> `deoxys-attack`).
- Forms whose Showdown filename differs from the internal form name are explicitly mapped in `FORM_FILES`.
- Human aliases (`Nidoran♀`, `Landorus-T`, `Zoroark-Hisui`, etc.) are normalised centrally.
- Popups and normal cards use the same `SBL.pokemon.spriteMarkup()` function.

## Regression targets
Test at minimum:
- Pikachu / Charizard / ordinary species
- Great Tusk / Iron Valiant / Chi-Yu / Scovillain
- Tapu Koko / Lele / Bulu / Fini
- Deoxys / Attack / Defense / Speed
- Aegislash / Blade / Shield
- Landorus / Therian
- Tornadus / Thundurus / Enamorus Therian
- Giratina Origin
- Kyurem Black / White
- Necrozma Dusk Mane / Dawn Wings / Ultra
- Terapagos / Terastal / Stellar
- Ogerpon masks
- Palafin / Hero
- Mimikyu / Busted
- Tauros Paldea forms
- Squawkabilly plumage forms
- Alcremie forms
- Nidoran male/female
- Mr. Mime / Mr. Rime / Mime Jr. / Porygon-Z / Jangmo-o / Hakamo-o / Kommo-o

## Performance rule
Do not reintroduce sprite URL probing or per-page sprite loaders. If a sprite fails, correct the deterministic filename mapping rather than adding a network fallback chain.
