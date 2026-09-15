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
