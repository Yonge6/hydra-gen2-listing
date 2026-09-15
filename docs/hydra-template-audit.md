# Hydra / XRF exact component audit — 2026-09-14

Reference: https://yonge6.github.io/xrf-gen2-listing/?v=d01dc77

## Implementation

The earlier custom Hydra composition has been replaced by the original XRF App source at d01dc77. Original component JSX, selectors, interaction logic, gallery, configurator, sticky navigation and purchase bar are retained. `hydra.css` is no longer imported. Shared styles.css, home.css and CommercialCapabilities.css are unchanged.

All 18 main sections have the same class structure and sequence: Hero → Feature Overview → Official Film → Split Case Study → Authority Video Rail → Capability Chapters → MakerBoost → Software → Product Opportunities → Materials → Specifications → Configuration Comparison → Split Video Comparison → Owner Videos and Feedback → Decision Paths → Trade-Up → Support → FAQ. Original header/footer and modal components remain.

The hero restores the inline video tile, 2×2 assurance cards, ratings, four highlights, Final Price / MSRP columns, financing row, two source cards, detailed package cards, four accessory cards, quantity, primary and secondary checkout actions. Four Hydra workspace records reuse the original package card component.

## Product-specific data boundaries

- Official Gen2 product pages currently report zero reviews: retain the rating-row anatomy with outline stars and no numeric score. Owner cards summarize public videos and are explicitly not rated reviews.
- Hydra 9 Hybrid starts at $10,999; current MSRP $11,999. All seven valid model/source prices and variant IDs reverified from official Shopify JSON. Each MSRP is $1,000 above price.
- Official Hydra 9 base page displays financing from $534/mo. with Affirm; only that base configuration uses the amount. Other configurations use generic financing eligibility wording. No unsupported 24-month offer or 0% claim.
- Optional accessories: LightBurn Pro $199, Hydra industrial chiller $699, multi-function 57-motor rotary $299, 2-inch lens $44.99. Exact official variant IDs feed cart permalinks. Chiller applicability is explained as Hybrid glass-source cooling.
- Keep the original secondary checkout button anatomy with truthful checkout text; no unverified Shop Pay endpoint.
- Configuration comparison replaces unsupported Gen1 deltas with sourced Pro / Hybrid data; video comparison replaces XRF / competitor claims with sourced RF / DC context.
- AI application imagery remains illustrative. Performance copy uses Hydra facts from the supplied workbook and brochure.

## Local verification

- Desktop 1440px: 660×660 gallery; all 18 section structures in original order. Compared 207 common element selectors against live d01dc77: none missing, 204 exact computed-style matches. Three differences are intrinsic text widths/margins, not CSS changes.
- Mobile 390×844: scrolled all 18 sections, zero horizontal overflow or broken loaded images; viewport-visible images have real natural dimensions. Screenshots are ignored under references/incoming/exact-template.
- Seven valid model/source choices return the expected price and official variant. Hydra 7 is Pro-only. Hydra 9 Hybrid + LightBurn × quantity 2 totals $22,396 and produces both corresponding cart line items.
- Official Gen2 video actually plays in the mobile modal; iframe absent before interaction, Escape removes iframe and body scroll lock and restores focus. Browser error events empty.
- One nonvisual correction: mobile chapter jump offset is 180px instead of the template’s 136px so the heading clears the 159px stacked navigation. Original rail layout is retained.

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


Additional verified video references: https://www.youtube.com/watch?v=QnASI4XyATU (Sechelski, print and cut) and https://www.youtube.com/watch?v=godnvdc7raE (Maker Foundry, Hydra 16 signs). Both are series references, not asserted Gen2 benchmarks.

## 2026-09-15 browser feedback

- Shortened the authority introduction; removed desktop nowrap only within video header paragraphs and allowed the flex heading column to shrink. Original layout, gap and arrow controls are retained.
- Promoted the confirmed Hydra 16 Gen2 / Stitchcraft film to the first creator-rail slot. YouTube searches and official-channel searches found other Hydra footage without clear Gen2 identification; those remain labeled series references. The rail heading and accessibility labels now include official Gen2 footage rather than calling every video independent.
- Restored requested original media: xrf-detail-proof.webp, rf-faster-response-v2.webp, rf-longer-lifespan.webp, speed-motion-{wood,acrylic,slate,leather}.webp, capability-precision-main.webp, software-makerboost.webp, software-compatibility.webp and xrf-profit-products-v2.webp. Hydra copy and specifications remain intact.
