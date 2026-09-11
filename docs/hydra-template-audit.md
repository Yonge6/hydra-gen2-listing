# Hydra / XRF template parity audit — 2026-09-11

Reference: https://yonge6.github.io/xrf-gen2-listing/?v=d01dc77

## Implemented module mapping

| XRF template | Hydra adaptation |
| --- | --- |
| Square gallery + purchase panel | Same shared styles; four Hydra sizes and Pro / Hybrid choices; added separate official-film entry |
| Feature overview | Hydra application artwork and workbook-backed metrics |
| Official film | Verified Hydra 16 Gen2 / Stitchcraft Interiors film |
| Split TV feature | Same split layout, verified Hydra 13 owner story; no unsupported FOX endorsement |
| Reviewer video rail | Same cards, arrow controls, keyboard navigation and touch scroll; four creator/tutorial videos |
| Scroll-linked engineering chapters | RF / power guide inside the chapter system, then five Hydra engineering chapters |
| MakerBoost, Software | Same separate template modules |
| Opportunities, Materials | Moved after Software to match the live template sequence |
| Specifications | Same model-aware accordion anatomy |
| Gen2 / Gen1 comparison | Same table anatomy, sourced Pro / Hybrid comparison; no unsupported generation deltas |
| Competitor video comparison | Same split video anatomy; RF / glass-tube cutting reference, no XRF / P2 claims |
| Owner video rail | Three real owner films; no invented star ratings or testimonial quotes |
| Decision paths, Trade-Up | Three template decision cards and official Trade-Up link; no unverified Gen2 credit promise |
| Support, FAQ, footer, sticky bars | Existing template styles retained |

Shared `styles.css` and `home.css` are unchanged by this revision. New rules are scoped to Hydra video controls, modal and six-item chapter navigation.

## YouTube sources

All titles and channels verified via YouTube oEmbed on 2026-09-11. Covers are original 1280 × 720 YouTube thumbnails stored locally. Embeds load only on user interaction.

- https://www.youtube.com/watch?v=vf5KO_kGgmU — OneLaser. Description explicitly identifies Hydra 16 Gen2 at Stitchcraft Interiors. The original Supra interior predates the shop's use of OneLaser; the page does not imply Hydra made the film car.
- https://www.youtube.com/watch?v=Fqtlsk_NsKM — OneLaser. Heather Dorian / The Stamp House / Hydra 13. Generation unspecified; labeled as a Hydra series reference.
- https://www.youtube.com/watch?v=HdP62cQVzs0 — OneLaser. Hydra 16 Gen1 testimonial; explicitly labeled Gen1.
- https://www.youtube.com/watch?v=y0YUu-4rx7A — Make or Break Shop. Industrial Hydra hands-on overview; series reference.
- https://www.youtube.com/watch?v=xgY6aEGvvQQ — Wrico Goods. Hydra 9 unboxing; series reference.
- https://www.youtube.com/watch?v=ZQ_VhgOepXE — Wrico Goods. Hydra 9 RF / glass-tube cut tests; not represented as a Gen2 benchmark.
- https://www.youtube.com/watch?v=dYYZXY_FHXc — OneLaser. Hydra touchscreen tutorial; series reference.

The first three videos are also embedded by the current official Hydra 9 Gen2 product page:
https://www.1laser.com/products/hydra-9-gen-2-70w-rf-co2-dual-laser-machine

Trade-Up eligibility is linked to https://www.1laser.com/pages/trade-up. Its current table still includes earlier Hydra hardware, so no credit amount is promised for Gen2.

## Local acceptance

- Desktop viewport: 1818px; gallery 660 × 660; shared video-card and split-section layouts visually checked.
- Mobile viewport: 390 × 844; document overflow 0px; chapter rail bottom 159px and Speed heading top 179.9px after navigation.
- Video rail advances 345.5px on mobile. Visible video covers loaded at 1280px natural width.
- Verified the Gen2 film actually plays in the mobile modal using the standard YouTube embed host. Escape restores focus; close removes the iframe and body scroll lock.
- Page-owned text checked at 12px or above; browser error log empty.
