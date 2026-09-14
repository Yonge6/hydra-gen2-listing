# Hydra Gen2 listing — current handoff

- Independent repository and GitHub Pages site: `Yonge6/hydra-gen2-listing`, branch `main`.
- Source of truth for UI: exact XRF `d01dc77` components. On 2026-09-14, `src/Hydra.jsx` was rebuilt from that revision’s `src/App.jsx`, retaining its original JSX, selectors, module order and interaction handlers. Change only Hydra copy, assets and product data. Do not reimplement modules or introduce a Hydra design system.
- `src/main.jsx` intentionally does not import the old `hydra.css`. `HydraVideos.jsx` and `hydra-prices.json` are legacy files, not the active page implementation.
- Active product configurations, variant IDs, accessories and videos are in `src/Hydra.jsx`. Commercial facts reverified 2026-09-14 from official product JSON / product page. See `docs/hydra-template-audit.md` and `docs/hydra-content-sources.md`.
- All 18 main modules match the original template anatomy. Four Hydra model entries reuse the original package cards. No new selector module.
- YouTube loads on interaction through the original shared modal, using `www.youtube.com/embed`. Use real Hydra videos and distinguish Gen2, Gen1 and unspecified series footage.
- Before release run `npm run verify`, inspect desktop and 390px mobile, configuration/cart mappings, image loading and modal close. Push main and verify Pages HTML/assets and browser content.
- Do not modify the parent XRF checkout or its untracked QA evidence.
