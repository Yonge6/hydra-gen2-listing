# Hydra Gen2 content sources

Technical / original image provenance: 2026-09-10. Commercial data reverified: 2026-09-14.

## Design

User-selected template: https://yonge6.github.io/xrf-gen2-listing/?v=d01dc77

Shared CSS is retained from that revision; font URLs are made repository-relative by Vite. Hydra-only controls and content use the existing component anatomy. The parent XRF project is not part of this deployment.

## Technical sources

- User-supplied `[Hydra G2] 卖点参数发布汇总 (KC版).xlsx`, Selling Points and Specs sheets.
- User-supplied `OneLaser_Product_Brochure_Hydra Gen2_EN_v1.pdf` and brochure reference images.
- Official Hydra Gen2 product pages for current marketed options and images.

Confirmed data includes four bed sizes, up to 2,000 mm/s raster engraving, 4G acceleration, up to 2,000 DPI, 0.07 mm focused spot, ≤0.01 mm repeat positioning, 225 mm Z travel, GT5 control, dual air assist and supported source configurations.

Conflicting fiber wattages are deliberately omitted. Fiber is optional on supported 70W configurations, subject to availability and compatibility confirmation. Standard 38W Hybrid requires a 70W upgrade first. RF is air-cooled; Hybrid glass DC CO₂ is water-cooled. Rotary work requires a compatible optional rotary. Bare metal is not presented as a standard RF CO₂ engraving application.

## Prices and official purchase paths

Active commercial data is recorded in the configuration and accessory constants in `src/Hydra.jsx`, from each official product’s `.js` endpoint. The older `src/data/hydra-prices.json` is retained as a historical snapshot. Displayed prices are machine prices in USD, not estimates for a complete installation. Current shipping, tax, delivery arrangements and optional accessories remain on the official store or an engineering quote.

| Model | Hybrid | Pro |
| --- | ---: | ---: |
| Hydra 7 | Not offered | $10,999 |
| Hydra 9 | $10,999 | $11,999 |
| Hydra 13 | $12,999 | $13,999 |
| Hydra 16 | $13,999 | $14,999 |

Official pages use `https://www.1laser.com/products/hydra-{7,9,13,16}-gen-2-70w-rf-co2-dual-laser-machine` with the exact corresponding variant IDs in `src/Hydra.jsx`. Purchase links use official Shopify cart permalinks, including selected quantity and optional accessory variants.

## Image provenance

- `hydra-*-hero.webp`, `hydra-official-*.webp`, `hydra-motion.webp` and `hydra-rf-source.webp`: official product imagery.
- `hydra-front.webp`, `hydra-workflow.webp`: user-supplied Hydra machine renders.
- `hydra-makerboost.webp`: software artwork extracted from the supplied brochure.
- `hydra-ai-projects.webp`: application assortment concept.
- `hydra-ai-detail.webp`: fine wood / slate engraving concept.
- `hydra-ai-acrylic.webp`: engraved acrylic display concept.
- `hydra-ai-leather.webp`: engraved leather product concept.

The four AI application images were generated through ChatGPT in Chrome on 2026-09-10, inspected and exported as WebP. They illustrate possible applications rather than measured machine results. No machine photograph was synthesized for this page.

The downloadable brochure is the user-supplied English product PDF.

## Coated Metal replacement — 2026-09-15

`hydra-material-coated-metal-v2.webp` was generated through ChatGPT in Chrome: https://chatgpt.com/c/6aa8f57c-b6c8-83ea-a3c7-4f104cef0d5c. It shows powder-coated tumblers, anodized metal cards, a key tag and nameplate as illustrative coating-removal / surface-marking applications. Inspected at 1536×1024; exported as WebP. Replaces only the Coated Metal tab image.

## Material regeneration and cross-brand video — 2026-09-15

- Coated Metal v3: `hydra-material-coated-metal-v3.webp`, generated in Chrome ChatGPT at https://chatgpt.com/c/6aa8fb94-307c-83ea-b0a2-bb867c95043c. Ivory/sage powder-coated drinkware and anodized tags/card with surface-removal engraving concepts. Supersedes v2 in the active gallery; v2 remains available for rollback.
- Glass & Stone v2: `hydra-material-glass-stone-v2.webp`, generated in Chrome ChatGPT at https://chatgpt.com/c/6aa8fbfa-02bc-83e9-81be-55498cddb2c0. Frosted surface-engraved glassware and plaque, slate coasters and an engraved stone keepsake. Replaces the mixed-material assortment. Both new images are 1536×1024 and retain the gallery's illustrative-concept framing.
- User expanded the cross-brand video scope to any Hydra generation. The comparison module now embeds Make or Break Shop's https://www.youtube.com/watch?v=y0YUu-4rx7A. The creator's own transcript at https://www.machinesformakers.com/products/onelaser-hydra-9/video-review confirms direct OMTech work-bed comparison and discussion of Thunder Nova 35, OMTech AF2440 and OMTech Pronto 45 alternatives. The reviewer identifies a pre-production early Hydra 9 and affiliate relationships. Page copy distinguishes this historical review from current Gen2 specifications; the table now uses the video’s models and historical figures instead of Gen2 configurations.


## Industrial material gallery and video-model table — 2026-09-15

Five independent images were generated through Chrome ChatGPT, visually inspected and encoded at 1536×1024 as WebP. Each shows a large-format hero piece and repeated finished products, with refined surface engraving. They are illustrative applications, not recorded production results; no machine imagery or measured throughput is implied.

| Active asset | Chrome ChatGPT source | Subject |
| --- | --- | --- |
| `hydra-material-leather-production.webp` | https://chatgpt.com/c/6aa90204-243c-83ea-8d54-643a13fa5bc3 | Large botanical leather panel and cover batches |
| `hydra-material-wood-production.webp` | https://chatgpt.com/c/6aa90211-8098-83ea-b4eb-04e8e7347a46 | Large landscape panel and matching wood orders |
| `hydra-material-acrylic-production.webp` | https://chatgpt.com/c/6aa9022b-7900-83ea-9189-1f778e436554 | Large botanical panel and acrylic display batches |
| `hydra-material-glass-stone-production.webp` | https://chatgpt.com/c/6aa90259-39f0-83e9-929c-628c9ed4af61 | Large frosted glass artwork and slate orders |
| `hydra-material-coated-metal-production.webp` | https://chatgpt.com/c/6aa90298-784c-83ea-b1a7-e59ecbc09ef8 | Large anodized sign, repeated plates and coated drinkware |

The comparison table uses the creator transcript linked above for historical configurations, speed discussion, RF options and indicative prices. Missing numeric Thunder specifications stay explicitly unstated. Brand correction checked against the official OMTech page: https://omtech.com/products/pronto-45-100w-co2-laser-engraver-and-cutter-upgraded-version. Current store pricing is not mixed into the historical comparison.


## Video module roles — 2026-09-15

YouTube search and each video's oEmbed title/channel were checked before separating the two rails. Existing verified films cover the requested topics; no unrelated result was added to fill a slot.

- Machine reviews/demonstrations: `y0YUu-4rx7A` (Make or Break Shop, industrial laser review), `xgY6aEGvvQQ` (Wrico Goods, Hydra 9 unboxing/features), `ZQ_VhgOepXE` (Wrico Goods, RF/glass cutting tests), `dYYZXY_FHXc` (OneLaser, touchscreen tutorial), `QnASI4XyATU` (Sechelski Creations, Print to Cut demonstration).
- Customer production: `vf5KO_kGgmU` (OneLaser, Stitchcraft automotive interiors), `Fqtlsk_NsKM` (OneLaser, pottery business), `HdP62cQVzs0` (OneLaser, map production), `godnvdc7raE` (Maker Foundry, five-foot store signs).
- Each source is `https://www.youtube.com/watch?v=<id>`. Stitchcraft is removed from the machine rail; Print to Cut is removed from customer stories. Titles and summaries identify each module's purpose; older/unspecified hardware is not relabeled Gen2. The separately requested removal of the standalone A Maker’s Perspective section remains in effect.
