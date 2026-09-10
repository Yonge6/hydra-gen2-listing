# Hydra Gen2 listing — current handoff

- Independent repository and GitHub Pages site: `Yonge6/hydra-gen2-listing`.
- Design source: XRF listing revision `d01dc77`. Keep its shared visual system. Only font asset paths differ in the shared CSS; Hydra additions are in `src/hydra.css`.
- Page: `src/Hydra.jsx`; official commercial data: `src/data/hydra-prices.json`.
- Sources and factual boundaries: `docs/hydra-content-sources.md`.
- Prices verified 2026-09-10. Recheck official Shopify product variants before changing prices or purchase links.
- Run `npm run verify`, inspect desktop and 390px mobile, then deploy and read the public page back.
- Do not modify the parent XRF checkout or its QA evidence while working on Hydra.
