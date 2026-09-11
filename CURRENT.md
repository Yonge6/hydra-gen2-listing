# Hydra Gen2 listing — current handoff

- Independent repository and GitHub Pages site: `Yonge6/hydra-gen2-listing`.
- Design source: XRF listing revision `d01dc77`. Keep its shared visual system. Only font asset paths differ in the shared CSS; Hydra additions are in `src/hydra.css`.
- Page: `src/Hydra.jsx`; official commercial data: `src/data/hydra-prices.json`.
- Sources and factual boundaries: `docs/hydra-content-sources.md`.
- Prices verified 2026-09-10. Recheck official Shopify product variants before changing prices or purchase links.
- Run `npm run verify`, inspect desktop and 390px mobile, then deploy and read the public page back.
- Do not modify the parent XRF checkout or its QA evidence while working on Hydra.

## Template and video revision — 2026-09-11

- Rechecked the live XRF `d01dc77` layout; reordered content and restored film, split case study, creator/owner video rails, comparison and decision modules.
- Video components and verified YouTube IDs: `src/components/HydraVideos.jsx`. Original local covers: `public/assets/hydra-video-*.jpg`.
- Module mapping and generation boundaries: `docs/hydra-template-audit.md`. Do not imply earlier Hydra videos benchmark Gen2 or that the movie Supra was made with Hydra.
- Use the shared `www.youtube.com/embed` host. Chrome played the official Gen2 film successfully; the no-cookie host triggered YouTube sign-in verification during QA.
- Desktop and 390px checks: no horizontal overflow, 660px desktop gallery, mobile chapter title below the three navigation layers, video rail arrows work, visible images loaded, no console errors, no iframe before playback or after close.
