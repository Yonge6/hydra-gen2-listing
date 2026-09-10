# Hydra Gen2 Listing

A responsive OneLaser Hydra Gen2 product page built from the XRF Gen2 listing template at revision `d01dc77`.

Live preview: https://yonge6.github.io/hydra-gen2-listing/

## Development

```sh
npm ci
npm run dev
npm run verify
```

The Vite base path follows the GitHub repository name. Push `main` to deploy through GitHub Actions / Pages.

## UI and content

- Retains the XRF Certia typography, colors, spacing, navigation, purchase gallery, material carousel, RF tabs, product cards, specifications, support and footer styles.
- Adds Hydra 7 / 9 / 13 / 16 model selection and supported Pro / Hybrid configurations.
- Uses official product variants for prices and official-store links. This preview does not operate a separate checkout.
- Uses supplied and official machine images. Four application concept images were generated in ChatGPT through Chrome and exported as WebP.
- Source notes: [docs/hydra-content-sources.md](docs/hydra-content-sources.md).
- Optional analytics use environment-provided `VITE_GA4_ID` and `VITE_META_PIXEL_ID`.
