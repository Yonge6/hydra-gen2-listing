# Hydra Gen2 listing — current handoff

- Independent repository and GitHub Pages site: `Yonge6/hydra-gen2-listing`, branch `main`.
- Source of truth for UI: exact XRF `d01dc77` components. On 2026-09-14, `src/Hydra.jsx` was rebuilt from that revision’s `src/App.jsx`, retaining its original JSX, selectors, module order and interaction handlers. Change only Hydra copy, assets and product data. Do not reimplement modules or introduce a Hydra design system.
- `src/main.jsx` intentionally does not import the old `hydra.css`. `HydraVideos.jsx` and `hydra-prices.json` are legacy files, not the active page implementation.
- Active product configurations, variant IDs, accessories and videos are in `src/Hydra.jsx`. Commercial facts reverified 2026-09-14 from official product JSON / product page. See `docs/hydra-template-audit.md` and `docs/hydra-content-sources.md`.
- The remaining main modules retain the original template anatomy. The standalone A Maker’s Perspective / Heather Dorian section was removed per user feedback on 2026-09-15; the creator and customer video rails remain. Four Hydra model entries reuse the original package cards. No new selector module.
- YouTube loads on interaction through the original shared modal, using `www.youtube.com/embed`. Use real Hydra videos and distinguish Gen2, Gen1 and unspecified series footage.
- Before release run `npm run verify`, inspect desktop and 390px mobile, configuration/cart mappings, image loading and modal close. Push main and verify Pages HTML/assets and browser content.
- Do not modify the parent XRF checkout or its untracked QA evidence.

- 2026-09-15 feedback: RF advantages (three tabs), Speed & Motion (four materials), RF Precision main media, MakerBoost, Software and the Product Opportunities opening artwork reuse the exact XRF d01dc77 assets. Preserve Hydra text/specifications. Video introductions wrap within a shrinkable heading column so controls stay in bounds; confirmed Gen2 footage leads the creator rail.
- All five Materials tabs use `hydra-material-{acrylic,wood,leather,glass-stone,coated-metal}-production.webp`: Chrome ChatGPT 3:2 images created 2026-09-15 showing large-format hero pieces, batch orders and fine surface engraving. Matching copy and illustrative-concept framing are retained. Prior assets remain for rollback.
- Owner text-summary cards under the customer video rail are hidden per 2026-09-15 feedback; customer videos remain.
- The first decision-path card links to the official Testimonials page, with customer-story copy and matching analytics; it no longer promises a demo booking.
- Cross-brand video scope includes earlier Hydra series per user approval. Comparison module uses Make or Break Shop `y0YUu-4rx7A`, with early-model / historical facts and affiliate context identified. Its table compares the video’s early Hydra 9, Thunder Nova 35, OMTech AF2440 and OMTech Pronto 45 with historical figures from the creator transcript. Pronto 45 belongs to OMTech. Do not present it as a Gen2 benchmark.
- The information selector retains native select behavior with an explicit chevron inset 14px from the right edge.
