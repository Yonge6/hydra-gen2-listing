# Hydra Gen2 listing — current handoff

- Independent repository and GitHub Pages site: `Yonge6/hydra-gen2-listing`, branch `main`.
- Source of truth for UI: exact XRF `d01dc77` components. On 2026-09-14, `src/Hydra.jsx` was rebuilt from that revision’s `src/App.jsx`, retaining its original JSX, selectors, module order and interaction handlers. Change only Hydra copy, assets and product data. Do not reimplement modules or introduce a Hydra design system.
- `src/main.jsx` intentionally does not import the old `hydra.css`. `HydraVideos.jsx` and `hydra-prices.json` are legacy files, not the active page implementation.
- Active product configurations, variant IDs, accessories and videos are in `src/Hydra.jsx`. Commercial facts reverified 2026-09-14 from official product JSON / product page. See `docs/hydra-template-audit.md` and `docs/hydra-content-sources.md`.
- All 18 main modules match the original template anatomy. Four Hydra model entries reuse the original package cards. No new selector module.
- YouTube loads on interaction through the original shared modal, using `www.youtube.com/embed`. Use real Hydra videos and distinguish Gen2, Gen1 and unspecified series footage.
- Before release run `npm run verify`, inspect desktop and 390px mobile, configuration/cart mappings, image loading and modal close. Push main and verify Pages HTML/assets and browser content.
- Do not modify the parent XRF checkout or its untracked QA evidence.

- 2026-09-15 feedback: RF advantages (three tabs), Speed & Motion (four materials), RF Precision main media, MakerBoost, Software and the Product Opportunities opening artwork reuse the exact XRF d01dc77 assets. Preserve Hydra text/specifications. Video introductions wrap within a shrinkable heading column so controls stay in bounds; confirmed Gen2 footage leads the creator rail.
- Coated Metal and Glass & Stone material tabs use the dedicated 3:2 Chrome ChatGPT images `hydra-material-coated-metal-v3.webp` and `hydra-material-glass-stone-v2.webp`, regenerated on 2026-09-15. Each image contains only its matching material category; prior assets are retained for rollback.
- Owner text-summary cards under the customer video rail are hidden per 2026-09-15 feedback; customer videos remain.
- The first decision-path card links to the official Testimonials page, with customer-story copy and matching analytics; it no longer promises a demo booking.
- Cross-brand video scope includes earlier Hydra series per user approval. Comparison module uses Make or Break Shop `y0YUu-4rx7A`, with early-model / historical facts and affiliate context identified. Do not present it as a Gen2 benchmark.
- The information selector retains native select behavior with an explicit chevron inset 14px from the right edge.
