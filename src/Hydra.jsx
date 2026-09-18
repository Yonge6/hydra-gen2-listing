import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowClockwise,
  Camera,
  CaretLeft,
  CaretRight,
  CaretUp,
  Check,
  CubeFocus,
  CubeTransparent,
  DownloadSimple,
  EnvelopeSimple,
  Fire,
  Handbag,
  Headset,
  LockKey,
  MapPin,
  Minus,
  Phone,
  Play,
  Plus,
  ShieldCheck,
  Star,
  Tag,
  Target,
  Thermometer,
  Trash,
  Tree,
  WifiHigh,
  Wine,
  X,
} from "@phosphor-icons/react";
import { CommercialCapabilities } from "./components/CommercialCapabilities.jsx";
import { HomeFooter, HomeNavigation, HomePage } from "./Home.jsx";
import { initializeAnalytics, trackEvent } from "./analytics.js";
import { useAutoplayCarousel } from "./hooks/useAutoplayCarousel.js";

const assetMap = {
  "feature-overview-hero.webp": "home-banner-hydra-education.png",
  "feature-overview-capabilities-v4.webp": "hydra-ai-projects.webp",
  "material-acrylic.webp": "hydra-material-acrylic-production.webp",
  "material-wood.webp": "hydra-material-wood-production.webp",
  "material-leather.webp": "hydra-material-leather-production.webp",
  "material-glass-stone.webp": "hydra-material-glass-stone-production.webp",
  "material-coated-metal.webp": "hydra-material-coated-metal-production.webp"
};
const asset = (name) => `${import.meta.env.BASE_URL}assets/${assetMap[name] || name}`;
const MATERIAL_AUTOPLAY_DELAY = 6000;
const SALES_CALL_URL = "https://www.1laser.com/products/sales-consultation-call";
const BROCHURE_URL = `${import.meta.env.BASE_URL}downloads/onelaser-hydra-gen2-brochure.pdf`;
const SUPPORT_URL = "https://www.1laser.com/pages/contact-us";

const media = ['home-product-hydra-gen2-scene.webp', ...Array.from({length:15},(_,i)=>`hydra-official-${String(i+1).padStart(2,'0')}.webp`), 'hydra-ai-detail.webp','hydra-ai-acrylic.webp','hydra-ai-leather.webp','hydra-workflow.webp'].map((name,index)=>({src:asset(name),alt:`OneLaser Hydra Gen2 product view ${index+1}`,label:`Product ${index+1}`}));

const officialFilm = {
  "youtubeId": "vf5KO_kGgmU",
  "title": "Inside a Hydra Gen2 workshop."
};

const materialCategories = [
  {
    id: "acrylic",
    label: "Acrylic",
    title: "Big displays. Fine detail.",
    copy: "Create large engraved acrylic panels and coordinated display batches, with delicate frosted linework and crisp, consistent details.",
    proof: "Large panels · signage · display batches",
    image: "material-acrylic.webp",
    icon: CubeTransparent,
  },
  {
    id: "wood",
    label: "Wood",
    title: "From photo detail to repeatable batches.",
    copy: "Turn large wood panels into detailed landscape art, then carry that fine engraving into coordinated batches of smaller pieces.",
    proof: "Large wall art · fine textures · panel batches",
    image: "material-wood.webp",
    icon: Tree,
  },
  {
    id: "leather",
    label: "Leather",
    title: "Large panels. Precise repeats.",
    copy: "Bring intricate botanical detail to large leather panels and batches of notebook covers, with natural texture and rich tonal contrast.",
    proof: "Decorative panels · cover batches · fine linework",
    image: "material-leather.webp",
    icon: Handbag,
  },
  {
    id: "glass-stone",
    label: "Glass & Stone",
    title: "Fine marks on hard, high-value surfaces.",
    copy: "Pair large frosted-glass artwork with coordinated slate plaques and coaster batches. Fine surface engraving brings each detail into focus.",
    proof: "Large glass panels · slate plaques · batch sets",
    image: "material-glass-stone.webp",
    icon: Wine,
  },
  {
    id: "coated-metal",
    label: "Coated Metal",
    title: "High contrast for everyday production.",
    copy: "Create large anodized signs and batches of identification plates with fine surface detail. Cylindrical drinkware requires a compatible optional rotary.",
    proof: "Large signs · plate batches · coated drinkware",
    image: "material-coated-metal.webp",
    icon: Tag,
  },
];

const powerProofs = [
  {
    "id": "38W",
    "tab": "38W RF + DC",
    "eyebrow": "HYDRA HYBRID · ENGRAVE & CUT",
    "title": "RF detail. Dedicated cutting power.",
    "copy": "Pair precise 38W RF engraving with a glass DC CO₂ source for mixed engraving-and-cutting jobs. Hydra 9, 13 and 16 offer 100W, 130W and 150W DC respectively.",
    "proof": "RF engraving · Glass DC cutting · Separate source control",
    "image": "hydra-ai-acrylic.webp",
    "alt": "Hydra acrylic application concept"
  },
  {
    "id": "70W",
    "tab": "70W RF Pro",
    "eyebrow": "HYDRA PRO · DEDICATED RF",
    "title": "Premium detail. Production focus.",
    "copy": "Choose a dedicated 70W air-cooled RF source for fine grayscale, textures and professional batch engraving. Available in all four Hydra workspaces.",
    "proof": "70W RF · Air-cooled · 7 / 9 / 13 / 16",
    "image": "hydra-ai-detail.webp",
    "alt": "Hydra detailed engraving application concept"
  }
];

const generationComparisons = [
  {
    "feature": "RF source",
    "gen2": "70W RF",
    "gen1": "38W RF"
  },
  {
    "feature": "Glass DC cutting",
    "gen2": "RF-only configuration",
    "gen1": "100W / 130W / 150W"
  },
  {
    "feature": "Workspace options",
    "gen2": "Hydra 7 / 9 / 13 / 16",
    "gen1": "Hydra 9 / 13 / 16"
  },
  {
    "feature": "Cooling",
    "gen2": "Air-cooled RF",
    "gen1": "Air-cooled RF + water-cooled DC"
  },
  {
    "feature": "Workflow fit",
    "gen2": "Dedicated RF production",
    "gen1": "RF engraving + glass-tube cutting"
  }
];

const rfAdvantages = [
  {
    "id": "detail",
    "tab": "Cleaner Detail",
    "eyebrow": "CLEANER DETAIL",
    "title": "Fine textures. Richer grayscale.",
    "copy": "RF pulse control brings out fine textures, small text and subtle shades on compatible materials. Tune your settings to each material and finish.",
    "proof": "0.07 mm spot · Up to 2,000 DPI",
    "image": "xrf-detail-proof.webp",
    "alt": "RF engraving detail reference from the XRF Gen2 listing",
    "icon": Target
  },
  {
    "id": "speed",
    "tab": "Faster Response",
    "eyebrow": "FASTER RESPONSE",
    "title": "Detail at production speed.",
    "copy": "Fast RF response works with the servo motion platform to support detailed engraving at up to 2,000 mm/s raster speed and 4G acceleration.",
    "proof": "Up to 2,000 mm/s · 4G",
    "image": "hydra-gen2-faster-response-v2.webp",
    "alt": "Hydra Gen2 laser head with verified 2,000 mm/s, 4G and repeat-positioning performance",
    "icon": ArrowClockwise
  },
  {
    "id": "lifespan",
    "tab": "Longer Lifespan",
    "eyebrow": "LONGER LIFESPAN",
    "title": "Less maintenance. More uptime.",
    "copy": "The sealed RF source is rated for 20,000–30,000 hours and uses air cooling. The glass DC source in Hybrid configurations requires water cooling.",
    "proof": "20,000–30,000 hours · Air-cooled RF",
    "image": "rf-longer-lifespan.webp",
    "alt": "Air-cooled RF source illustration from the XRF Gen2 listing",
    "icon": ShieldCheck
  }
];

const decisionVideos = {
  "performance": {
    "id": "ZQ_VhgOepXE",
    "title": "RF vs glass tube: Hydra 9 cut tests",
    "channel": "Wrico Goods",
    "tag": "HYDRA SERIES · CUT TEST",
    "cover": "hydra-video-ZQ_VhgOepXE.jpg"
  },
  "business": {
    "id": "vf5KO_kGgmU",
    "title": "Hydra 16 Gen2 at Stitchcraft Interiors",
    "channel": "OneLaser",
    "tag": "HYDRA 16 GEN2",
    "cover": "hydra-video-vf5KO_kGgmU.jpg"
  },
  "businessFit": {
    "id": "Fqtlsk_NsKM",
    "title": "A pottery owner’s Hydra 13 story",
    "channel": "OneLaser",
    "tag": "HYDRA SERIES · OWNER STORY",
    "cover": "hydra-video-Fqtlsk_NsKM.jpg"
  },
  "competitor": {
    "id": "y0YUu-4rx7A",
    "title": "Hydra 9 review and competitor comparisons",
    "channel": "Make or Break Shop",
    "tag": "HYDRA 9 · COMPETITOR REVIEW",
    "cover": "hydra-video-y0YUu-4rx7A.jpg"
  }
};

const authorityVideos = [
  {
    "id": "y0YUu-4rx7A",
    "title": "Should you get an industrial-size laser?",
    "channel": "Make or Break Shop",
    "tag": "HYDRA SERIES · HANDS-ON",
    "cover": "hydra-video-y0YUu-4rx7A.jpg"
  },
  {
    "id": "xgY6aEGvvQQ",
    "title": "Hydra 9 unboxing and features",
    "channel": "Wrico Goods",
    "tag": "HYDRA SERIES · WALKTHROUGH",
    "cover": "hydra-video-xgY6aEGvvQQ.jpg"
  },
  {
    "id": "ZQ_VhgOepXE",
    "title": "RF vs glass tube: Hydra 9 cut tests",
    "channel": "Wrico Goods",
    "tag": "HYDRA SERIES · CUT TEST",
    "cover": "hydra-video-ZQ_VhgOepXE.jpg"
  },
  {
    "id": "dYYZXY_FHXc",
    "title": "Hydra touchscreen interface tutorial",
    "channel": "OneLaser",
    "tag": "HYDRA SERIES · TUTORIAL",
    "cover": "hydra-video-dYYZXY_FHXc.jpg"
  },
  {
    "id": "QnASI4XyATU",
    "title": "Print to Cut on my OneLaser Hydra 9",
    "channel": "Sechelski Creations",
    "tag": "HYDRA SERIES · WORKFLOW",
    "cover": "hydra-video-QnASI4XyATU.jpg"
  }
];

const customerStoryVideos = [
  {
    "id": "vf5KO_kGgmU",
    "title": "Hydra 16 Gen2 at Stitchcraft Interiors",
    "channel": "OneLaser",
    "tag": "HYDRA 16 GEN2",
    "cover": "hydra-video-vf5KO_kGgmU.jpg"
  },
  {
    "id": "Fqtlsk_NsKM",
    "title": "A pottery owner’s Hydra 13 story",
    "channel": "OneLaser",
    "tag": "HYDRA SERIES · OWNER STORY",
    "cover": "hydra-video-Fqtlsk_NsKM.jpg"
  },
  {
    "id": "HdP62cQVzs0",
    "title": "The machine behind his best-selling maps",
    "channel": "OneLaser",
    "tag": "HYDRA 16 GEN1 · OWNER STORY",
    "cover": "hydra-video-HdP62cQVzs0.jpg"
  },
  {
    "id": "godnvdc7raE",
    "title": "Making 5-foot store signs with Hydra 16",
    "channel": "Maker Foundry",
    "tag": "HYDRA SERIES · LARGE FORMAT",
    "cover": "hydra-video-godnvdc7raE.jpg"
  }
];

const speedMotionMaterials = [
  {
    "id": "wood",
    "label": "Wood",
    "title": "Large-format detail, repeated at scale.",
    "copy": "Run detailed wood panels and aligned batches across Hydra Gen2’s wide bed with high-speed servo motion and repeatable positioning.",
    "image": "speed-motion-hydra-wood.webp",
    "icon": Tree
  },
  {
    "id": "acrylic",
    "label": "Acrylic",
    "title": "Move from one sign to a full batch.",
    "copy": "Keep large acrylic panels and repeat sign work moving with responsive RF engraving and the cutting source suited to the job.",
    "image": "speed-motion-hydra-acrylic.webp",
    "icon": CubeTransparent
  },
  {
    "id": "slate",
    "label": "Slate",
    "title": "Fixture the batch. Repeat the detail.",
    "copy": "Fill a production fixture with compatible slate pieces and keep fine, high-contrast artwork consistent across the run.",
    "image": "speed-motion-hydra-slate.webp",
    "icon": Target
  },
  {
    "id": "leather",
    "label": "Leather",
    "title": "Scale personalized leather production.",
    "copy": "Process large leather layouts and repeat batches of wallets or tags with precise outlines and consistent engraved detail.",
    "image": "speed-motion-hydra-leather.webp",
    "icon": Handbag
  }
];

const capabilityChapters = [
  {
    "id": "precision",
    "nav": "RF Precision",
    "title": "Sharper detail. More valuable work.",
    "summary": "A focused RF beam, responsive power control and up to 2,000 DPI bring fine textures and smooth grayscale to professional personalization.",
    "spotlights": [
      {
        "title": "Sharper detail. More valuable work.",
        "copy": "RF control supports fine engraving and premium surface detail.",
        "image": "capability-precision-main.webp",
        "metrics": [
          "2,000 DPI",
          "0.07 mm spot",
          "20,000–30,000 h"
        ],
        "hideCopy": true
      }
    ],
    "support": [],
    "proofs": [
      {
        "value": "Air-cooled",
        "label": "RF source cooling",
        "icon": Thermometer
      },
      {
        "value": "≤ 0.01 mm",
        "label": "Repeat positioning",
        "icon": Target
      },
      {
        "value": "2.5 in",
        "label": "Standard focal lens",
        "icon": CubeFocus
      },
      {
        "value": "38W / 70W",
        "label": "RF source options",
        "icon": Fire
      }
    ],
    "details": [
      "Optional focal lengths",
      "Responsive RF control",
      "Hybrid DC source uses water cooling",
      "Optional fiber on supported 70W configurations"
    ]
  },
  {
    "id": "motion",
    "nav": "Speed & Motion",
    "title": "Real Speed to Elevate New Benchmark.",
    "summary": "Hydra Gen2 features an all-new ultra-high-speed AC servo motor, delivering a true 2,000 mm/s raster speed and 4G acceleration while maintaining sharp detail at maximum speed.",
    "speedProof": true,
    "spotlights": [],
    "support": [
      {
        "title": "Ultra-High-Speed Servo Motor",
        "copy": "Production-grade servo delivers faster motion without sacrificing precision.",
        "video": "https://www.1laser.com/cdn/shop/videos/c/vp/e0947b02d4c04f8ba8c864c626a90925/e0947b02d4c04f8ba8c864c626a90925.HD-1080p-7.2Mbps-65820255.mp4?v=0",
        "poster": "https://www.1laser.com/cdn/shop/files/preview_images/e0947b02d4c04f8ba8c864c626a90925.thumbnail.0000000000.jpg?v=1766657449"
      },
      {
        "compareImages": [
          "https://www.1laser.com/cdn/shop/files/Group_208_53b0e333-09a8-43eb-a04f-69787edd5b17.png?v=1769768521&width=1182",
          "https://www.1laser.com/cdn/shop/files/Group_208.png?v=1769768510&width=1182"
        ],
        "compareTitles": ["Servo-Driven Precision Engraving", "Stepper Motor Engraving"],
        "compareCopies": [
          "Advanced PID closed-loop feedback eliminates missed steps, ensuring complete patterns and flawless engraving accuracy.",
          "Open-loop control without feedback can cause missed steps, resulting in partial distortion or incomplete engraving details."
        ]
      }
    ],
    "proofs": [],
    "details": []
  },
  {
    "id": "workflow",
    "nav": "Smart Workflow",
    "title": "Smarter tools. Smoother production.",
    "summary": "Automatic airflow, autofocus, red-dot positioning and direct machine control reduce setup work and keep production moving from one job to the next.",
    "spotlights": [
      {
        "title": "Built-in Airflow That Thinks For You.",
        "copy": "The Smart Dual Air-Assist System auto-switches between Low-Air for clean, detailed engraving corners and High-Air for faster cutting speed and safety. Fully automatic, software-integrated, and no manual tuning needed—delivering cleaner edges and better results every time.",
        "image": "hydra-gen2-dual-air-assist.webp",
        "metrics": [
          "Built-in dual air",
          "Low-Air engraving",
          "High-Air cutting"
        ],
        "hideCopy": false
      }
    ],
    "support": [
      {
        "title": "Autofocus + Red Dot. Zero Guesswork.",
        "copy": "Automated autofocus secures the optimal focal distance. High-visibility red-dot positioning helps place artwork precisely on the material.",
        "image": "hydra-gen2-visual-positioning.webp"
      },
      {
        "title": "A touch. A key. Direct control.",
        "copy": "The GT5 controller combines a 5-inch touchscreen and physical keys for file preview, diagnostics and offline operation.",
        "image": "hydra-gen2-gt5-control.webp"
      }
    ],
    "proofs": [
      {
        "value": "Vision",
        "label": "Camera-assisted positioning",
        "icon": Camera
      },
      {
        "value": "Auto resume",
        "label": "Power-loss job recovery",
        "icon": ArrowClockwise
      },
      {
        "value": "3 ways",
        "label": "Wi-Fi / USB / Ethernet",
        "icon": WifiHigh
      },
      {
        "value": "Smart presets",
        "label": "Material-ready parameters",
        "icon": Target
      }
    ],
    "details": [
      "1 GB job storage"
    ]
  },
  {
    "id": "expansion",
    "nav": "Business Expansion",
    "title": "A platform built to grow with your business.",
    "summary": "Four working areas, pass-through access and optional rotary workflows help your equipment fit a broader range of jobs.",
    "spotlights": [
      {
        "title": "Go longer. Think bigger.",
        "copy": "Front-to-back pass-through doors accommodate longer stock through a 20 mm opening. Plan material support and job alignment for each setup.",
        "image": "hydra-gen2-pass-through.webp",
        "metrics": [
          "Front-to-back access",
          "20 mm opening",
          "Longer stock"
        ],
        "hideCopy": false
      }
    ],
    "support": [
      {
        "title": "Choose your production footprint.",
        "copy": "Hydra 7: 700 × 500 mm. Hydra 9: 900 × 600 mm. Hydra 13: 1,300 × 900 mm. Hydra 16: 1,600 × 1,000 mm.",
        "image": "hydra-gen2-workspace-sizes.webp"
      },
      {
        "title": "From flat work to rotary jobs.",
        "copy": "225 mm Z-axis travel provides setup flexibility. Cylindrical engraving requires a compatible optional 4-pin rotary and suitable object clearance.",
        "image": "hydra-gen2-rotary-workflow.webp"
      }
    ],
    "proofs": [
      {
        "value": "Up to 65 lb",
        "label": "Heavy-duty workbed",
        "icon": Target
      },
      {
        "value": "3-part",
        "label": "Modular placement",
        "icon": CubeTransparent
      },
      {
        "value": "1.5–4 in",
        "label": "Focal lens range",
        "icon": CubeFocus
      },
      {
        "value": "Quick swap",
        "label": "Full lens assembly",
        "icon": ArrowClockwise
      }
    ],
    "details": [
      "Optional compatible filtration",
      "Optional 70W fiber expansion"
    ]
  },
  {
    "id": "protection",
    "nav": "Reliability & Safety",
    "title": "Run cleaner. Stay protected.",
    "summary": "Automatic airflow, lens-temperature monitoring and integrated interlocks support cleaner work and dependable daily operation.",
    "spotlights": [],
    "feature": {
      "title": "Protect the optics that protect your work.",
      "copy": "Real-time lens-temperature monitoring warns of overheating or contamination and can shut off laser output.",
      "image": "hydra-gen2-lens-protection.webp"
    },
    "support": [
      {
        "title": "Monitor the working environment.",
        "copy": "Workbench temperature sensing and PM2.5 detection help monitor the processing environment.",
        "image": "hydra-gen2-environment-monitoring.webp"
      },
      {
        "title": "Interlocks built into the enclosure.",
        "copy": "Lid and side-panel interlocks work with the enclosed chassis and separated electronics area.",
        "image": "hydra-gen2-interlocks.webp"
      }
    ],
    "proofs": [
      {
        "value": "Class 1",
        "label": "FDA-certified design",
        "icon": ShieldCheck
      },
      {
        "value": "Stress-tested",
        "label": "Production-grade structure",
        "icon": Target
      },
      {
        "value": "Audible alert",
        "label": "Over-temperature warning",
        "icon": Thermometer
      },
      {
        "value": "Chiller-free",
        "label": "No leaks or condensation",
        "icon": LockKey
      }
    ],
    "details": [
      "No-alignment mechanical design",
      "NVH optimization"
    ]
  }
];

const purchasePackages = [
  {
    "id": "7",
    "name": "Hydra 7 Gen2",
    "price": 10999.0,
    "msrp": 11999.0,
    "badge": "RF PRO",
    "detail": "700 × 500 mm work area · 70W RF Pro only",
    "hybrid": null,
    "pro": 44667131822114,
    "powerDelta": 0.0,
    "dc": null,
    "area": "700 × 500 mm"
  },
  {
    "id": "9",
    "name": "Hydra 9 Gen2",
    "price": 10999.0,
    "msrp": 11999.0,
    "badge": "CURRENT OFFER",
    "detail": "900 × 600 mm work area · Hybrid or Pro",
    "hybrid": 44745765650466,
    "pro": 44745765617698,
    "powerDelta": 1000.0,
    "dc": 100,
    "area": "900 × 600 mm"
  },
  {
    "id": "13",
    "name": "Hydra 13 Gen2",
    "price": 12999.0,
    "msrp": 13999.0,
    "badge": "LARGER WORKSPACE",
    "detail": "1,300 × 900 mm work area · Hybrid or Pro",
    "hybrid": 44745769156642,
    "pro": 44745769123874,
    "powerDelta": 1000.0,
    "dc": 130,
    "area": "1,300 × 900 mm"
  },
  {
    "id": "16",
    "name": "Hydra 16 Gen2",
    "price": 13999.0,
    "msrp": 14999.0,
    "badge": "LARGE FORMAT",
    "detail": "1,600 × 1,000 mm work area · Hybrid or Pro",
    "hybrid": 44745771155490,
    "pro": 44745771122722,
    "powerDelta": 1000.0,
    "dc": 150,
    "area": "1,600 × 1,000 mm"
  }
];

const officialAccessories = [
  {
    "id": "lightburn",
    "name": "LightBurn \"Pro\" Version - License Key",
    "price": 199.0,
    "msrp": 199.0,
    "variant": 43173642567714,
    "image": "hydra-accessory-lightburn.jpg",
    "imageScale": 1,
    "source": "https://www.1laser.com/products/lightburn-software-pro-license-key",
    "description": "Optional LightBurn Pro license for Windows and macOS."
  },
  {
    "id": "onelaser-industrial-chiller-for-hydra-laser-engraver",
    "name": "OneLaser Chiller For Hydra & Cobra Glass Tube Laser System",
    "price": 699.0,
    "msrp": 699.0,
    "variant": 43173614059554,
    "image": "hydra-accessory-onelaser-industrial-chiller-for-hydra-laser-engraver.jpg",
    "imageScale": 1,
    "source": "https://www.1laser.com/products/onelaser-industrial-chiller-for-hydra-laser-engraver",
    "description": "Water cooling for the Hybrid glass DC source. Confirm the cooling equipment included in your order before adding."
  },
  {
    "id": "multi-function-rotary-axis-57-motor",
    "name": "Multi-Function Rotary Axis (57 Motor) Compatible with OneLaser Hydra & Cobra Series",
    "price": 299.0,
    "msrp": 299.0,
    "variant": 46622053892130,
    "image": "hydra-accessory-multi-function-rotary-axis-57-motor.jpg",
    "imageScale": 1,
    "source": "https://www.1laser.com/products/multi-function-rotary-axis-57-motor",
    "description": "Optional rotary for cylindrical work on Hydra. Confirm object size and clearance before ordering."
  },
  {
    "id": "2-inch-focal-lens-laser-engraver",
    "name": "Focal Lens for Laser Engraving, Hydra and X Series Compatible",
    "price": 44.99,
    "msrp": 44.99,
    "variant": 45337011781666,
    "image": "hydra-accessory-2-inch-focal-lens-laser-engraver.jpg",
    "imageScale": 1,
    "source": "https://www.1laser.com/products/2-inch-focal-lens-laser-engraver",
    "description": "Optional 2-inch focal lens for compatible Hydra optics. Confirm the required barrel and focal length."
  }
];

const formatMoney = (value) => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
}).format(value);

const specs = [
  {
    "title": "Laser source",
    "rows": [
      [
        "RF source",
        "70W Pro / 38W Hybrid"
      ],
      [
        "Hybrid DC source",
        "100W (9) / 130W (13) / 150W (16)"
      ],
      [
        "Cooling",
        "RF air cooling / Hybrid DC water cooling"
      ],
      [
        "Rated RF lifespan",
        "20,000–30,000 hours"
      ]
    ]
  },
  {
    "title": "Performance",
    "rows": [
      [
        "Raster engraving speed",
        "Up to 2,000 mm/s"
      ],
      [
        "Acceleration",
        "4G"
      ],
      [
        "Repeat positioning",
        "≤ 0.01 mm"
      ],
      [
        "Maximum scanning precision",
        "2,000 DPI"
      ]
    ]
  },
  {
    "title": "Workspace",
    "rows": [
      [
        "Hydra 7",
        "700 × 500 mm · Pro only"
      ],
      [
        "Hydra 9",
        "900 × 600 mm"
      ],
      [
        "Hydra 13",
        "1,300 × 900 mm"
      ],
      [
        "Hydra 16",
        "1,600 × 1,000 mm"
      ],
      [
        "Z-axis travel",
        "225 mm"
      ],
      [
        "Pass-through opening",
        "20 mm · front to back"
      ]
    ]
  },
  {
    "title": "Control & software",
    "rows": [
      [
        "Connectivity",
        "Wi-Fi / USB / Ethernet"
      ],
      [
        "Software",
        "LightBurn / MakerBoost / RDWorks"
      ],
      [
        "Operating systems",
        "Windows / macOS"
      ],
      [
        "Controller",
        "GT5 · 5-inch touchscreen + keypad"
      ],
      [
        "Positioning",
        "Camera assistance / autofocus / red dot"
      ]
    ]
  },
  {
    "title": "Machine & electrical",
    "rows": [
      [
        "Hydra 9 Pro size",
        "1,500 × 1,045 × 1,035 mm"
      ],
      [
        "Hydra 9 Hybrid size",
        "1,900 × 1,045 × 1,035 mm"
      ],
      [
        "Power supply",
        "110V 60Hz / 220V 50Hz"
      ],
      [
        "Installation",
        "Confirm circuit capacity, delivery access, ventilation and cooling"
      ]
    ]
  },
  {
    "title": "Optics & safety",
    "rows": [
      [
        "Standard lens",
        "2.5 in"
      ],
      [
        "Focused spot",
        "As small as 0.07 mm"
      ],
      [
        "Interlocks",
        "Lid and side panels"
      ],
      [
        "Monitoring",
        "Lens temperature / workbench temperature / PM2.5"
      ]
    ]
  },
  {
    "title": "Optional expansion",
    "rows": [
      [
        "Rotary",
        "Optional · compatible 4-pin rotary required for cylinders"
      ],
      [
        "Focal lengths",
        "Optional 1.5 / 2 / 3 / 4 in"
      ],
      [
        "Fiber",
        "Optional on supported 70W configurations; confirm availability"
      ],
      [
        "Hybrid cooling",
        "Confirm suitable chiller and package inclusions"
      ]
    ]
  }
];

const faqs = [
  {
    "q": "Should I choose Hybrid or Pro?",
    "a": "Choose Hybrid for 38W RF engraving plus dedicated glass DC cutting. Choose Pro for dedicated 70W RF production. Hydra 9, 13 and 16 offer both; Hydra 7 is Pro only."
  },
  {
    "q": "Does Hydra Gen2 need water cooling?",
    "a": "The RF source is air-cooled. The glass DC source in Hybrid configurations is water-cooled. Confirm the appropriate chiller and what is included with your order."
  },
  {
    "q": "Which accessories are included?",
    "a": "Published essentials include the honeycomb and blade tables, built-in dual air-assist, exhaust fan and ducting, tool kit and setup cables. Rotary attachments, optional lenses, software licenses and upgrades are separate unless explicitly included in your quote."
  },
  {
    "q": "Which software can I use?",
    "a": "Hydra Gen2 supports LightBurn, MakerBoost and RDWorks. Check each application’s operating-system requirements; LightBurn licensing is optional and sold separately."
  },
  {
    "q": "Can I engrave bare metal or cylindrical objects?",
    "a": "Standard CO₂ sources process compatible organic materials, glass and coated surfaces. Bare-metal processing needs an appropriate process or supported optional fiber system. Cylindrical work requires a compatible optional rotary."
  },
  {
    "q": "What electrical supply do I need?",
    "a": "Published configurations are 110V 60Hz / 220V 50Hz. Confirm the specific machine, circuit amperage, ventilation and accessory power requirements with OneLaser before installation."
  },
  {
    "q": "How much is shipping, and when will Hydra arrive?",
    "a": "Shipping, processing and installation arrangements vary by configuration and destination. Confirm current freight costs, availability, delivery access and lead times on the official store or with an engineer."
  },
  {
    "q": "How much more is the Pro configuration?",
    "a": "Current official Hydra 9, 13 and 16 Pro variants are $1,000 above their corresponding Hybrid variants. The choice changes the source configuration: dedicated 70W RF Pro versus 38W RF plus a glass DC source."
  }
];

const journeySections = [
  { id: "why-hydra", label: "Why Hydra" },
  { id: "features", label: "Features" },
  { id: "roi-materials", label: "ROI & Materials" },
  { id: "specs", label: "Specs" },
  { id: "compare", label: "Compare" },
  { id: "reviews", label: "Reviews" },
  { id: "faq-support", label: "FAQ & Support" },
];

const consultationFeedback = [
  {
    "name": "Stitchcraft Interiors",
    "role": "Hydra 16 Gen2 · Video summary",
    "quote": "Revo Reeves shows how Hydra 16 Gen2 fits into current custom automotive interior work."
  },
  {
    "name": "The Stamp House",
    "role": "Hydra 13 · Video summary",
    "quote": "Heather Dorian discusses laser-made pottery tools and a growing production workflow."
  },
  {
    "name": "OneLaser map-maker story",
    "role": "Hydra 16 Gen1 · Video summary",
    "quote": "An owner describes using Hydra 16 Gen1 to create engraved maps."
  },
  {
    "name": "Make or Break Shop",
    "role": "Hydra series · Video summary",
    "quote": "A hands-on overview explores the capabilities and workshop demands of an industrial-size laser."
  },
  {
    "name": "Wrico Goods",
    "role": "Hydra 9 · Video summary",
    "quote": "RF and glass-tube cutting tests explore how the two sources process material."
  },
  {
    "name": "Sechelski Creations",
    "role": "Hydra 9 · Video summary",
    "quote": "A print-to-cut demonstration shows an example of the Hydra workflow."
  }
];

const competitorModels = ["Hydra 9 (early model)", "Thunder Nova 35", "OMTech AF2440", "OMTech Pronto 45"];
const competitorRows = [
  ["Glass CO₂ configuration", "100W", "Glass CO₂; wattage not stated", "100W", "100W"],
  ["Maximum speed cited", "1,200 mm/s · 3G", "Lower speed; no figure cited", "600 mm/s", "1,000 mm/s"],
  ["RF option discussed", "38W RF upgrade (+$2,000)", "RF model discussed separately as Nova Plus 35", "Glass-only comparison", "Glass-only comparison"],
  ["Price cited · glass-only", "About $7,000", "Above $9,000", "About $4,500", "About $6,000"]
];

function SpecGroup({ group }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`spec-group ${open ? "is-open" : ""}`}>
      <button type="button" className="spec-group__trigger" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <span>{group.title}</span>
        <span aria-hidden="true">{open ? <Minus size={18} /> : <Plus size={18} />}</span>
      </button>
      {open && (
        <div className="spec-group__rows">
          {group.rows.map(([label, value, context]) => (
            <div className="spec-row" key={label}>
              <span>{label}</span>
              <div><strong>{value}</strong>{context && <small>{context}</small>}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function YouTubeCover({ video, onPlay, className = "" }) {
  return (
    <button type="button" className={`youtube-cover ${className}`.trim()} onClick={() => onPlay(video)} aria-label={`Play ${video.title} by ${video.channel}`}>
      <img src={video.cover ? asset(video.cover) : `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" loading="lazy" />
      <span className="youtube-cover__play"><Play size={26} weight="fill" /></span>
      <i>{video.tag}</i>
    </button>
  );
}

function ReviewVideoCard({ video, onPlay, index, total }) {
  return (
    <button type="button" className="review-video-card" onClick={() => onPlay(video)} aria-label={`Play ${video.title} by ${video.channel}`}>
      <span className="review-video-card__media">
        <img src={video.cover ? asset(video.cover) : `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" loading="lazy" />
        <span><Play size={22} weight="fill" /></span>
        {index !== undefined && <i>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</i>}
      </span>
      <span className="review-video-card__copy"><small>{video.tag}</small><strong>{video.title}</strong><span>{video.channel}</span></span>
    </button>
  );
}

function GenerationComparison() {
  return (
    <section className="generation-comparison" id="compare" aria-labelledby="generation-comparison-title" data-reveal>
      <span className="commercial-capabilities__anchor" id="generation-comparison" aria-hidden="true" />
      <div className="generation-comparison__inner">
        <header className="generation-comparison__header">
          <span className="eyebrow">PRO VS. HYBRID</span>
          <h2 id="generation-comparison-title">One platform. Two ways to produce.</h2>
          <p><strong>RF production or RF engraving with dedicated glass-tube cutting.</strong></p>
        </header>

        <div className="generation-comparison__table-wrap">
          <table className="generation-comparison__table">
            <caption className="sr-only">Hydra Gen1 and Hydra Gen2 feature comparison</caption>
            <colgroup>
              <col className="generation-comparison__feature-column" />
              <col className="generation-comparison__gen2-column" />
              <col className="generation-comparison__gen1-column" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col"><span className="sr-only">Feature</span></th>
                <th scope="col" className="generation-comparison__gen2-heading">Hydra Pro Gen2</th>
                <th scope="col" className="generation-comparison__gen1-heading">Hydra Hybrid Gen2</th>
              </tr>
            </thead>
            <tbody>
              {generationComparisons.map((item) => (
                <tr key={item.feature}>
                  <th scope="row">{item.feature}</th>
                  <td className="generation-comparison__gen2" data-label="Hydra Pro Gen2">{item.gen2}</td>
                  <td className="generation-comparison__gen1" data-label="Hydra Hybrid Gen2">{item.gen1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="generation-comparison__statement">Choose the source configuration around your materials and daily workload.</p>
      </div>
    </section>
  );
}

function SpeedMotionProof() {
  const {
    activeIndex: activeMaterial,
    selectIndex: selectMaterial,
    interactionProps: carouselProps,
  } = useAutoplayCarousel(speedMotionMaterials.length);
  const materialTabRefs = useRef([]);
  const selectedMaterial = speedMotionMaterials[activeMaterial];

  function handleMaterialKeyDown(event, index) {
    const navigationKeys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!navigationKeys.includes(event.key)) return;
    event.preventDefault();
    const lastIndex = speedMotionMaterials.length - 1;
    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? lastIndex
        : event.key === "ArrowLeft"
          ? (index - 1 + speedMotionMaterials.length) % speedMotionMaterials.length
          : (index + 1) % speedMotionMaterials.length;
    selectMaterial(nextIndex);
    materialTabRefs.current[nextIndex]?.focus();
  }

  return (
    <article className="speed-motion-proof" {...carouselProps}>
      <div className="speed-motion-proof__controls">
        <div
          className="speed-motion-proof__materials"
          role="tablist"
          aria-label="Explore Hydra speed and motion by material"
        >
          {speedMotionMaterials.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                type="button"
                role="tab"
                aria-selected={activeMaterial === index}
                aria-controls="speed-motion-panel"
                className={activeMaterial === index ? "is-active" : ""}
                key={item.id}
                ref={(node) => { materialTabRefs.current[index] = node; }}
                onClick={() => selectMaterial(index)}
                onKeyDown={(event) => handleMaterialKeyDown(event, index)}
              >
                <Icon size={20} weight={activeMaterial === index ? "bold" : "regular"} aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      <div
        className="speed-motion-proof__stage"
        id="speed-motion-panel"
        role="tabpanel"
        aria-live="polite"
      >
        <div className="speed-motion-proof__media">
          <img
            key={selectedMaterial.id}
            src={asset(selectedMaterial.image)}
            alt={`${selectedMaterial.label} speed and motion comparison for the OneLaser Hydra Gen2`}
          />
        </div>

        <div className="speed-motion-proof__copy">
          <span className="speed-motion-proof__profile">Hydra Gen2 speed · Servo motion</span>
          <h4>{selectedMaterial.title}</h4>
          <p>{selectedMaterial.copy}</p>
          <div className="speed-motion-proof__metrics" aria-label="Confirmed Hydra Gen2 motion performance">
            <div><strong>2,000</strong><span>mm/s raster speed</span></div>
            <div><strong>4G</strong><span>Working acceleration</span></div>
          </div>
        </div>
      </div>
    </article>
  );
}

function RfAdvantages({ activeIndex, onChange, carouselProps }) {
  return (
    <section className="rf-advantages" id="rf-advantages" data-chapter-index="0" {...carouselProps}>
      <div className="rf-advantages__inner">
        <header className="rf-advantages__header">
          <span className="eyebrow">WHY RF TUBE</span>
          <h2>Why makers choose RF tube.</h2>
          <p>Cleaner detail, faster response, and up to 30,000 hours of source life—built for products worth making and selling.</p>
        </header>
        <div className="rf-advantages__tabs" role="tablist" aria-label="Explore the advantages of RF laser technology">
          {rfAdvantages.map((item, index) => {
            return (
              <button
                type="button"
                role="tab"
                id={`rf-tab-${item.id}`}
                aria-selected={activeIndex === index}
                aria-controls="rf-advantage-panel"
                tabIndex={activeIndex === index ? 0 : -1}
                className={activeIndex === index ? "is-active" : ""}
                key={item.id}
                onClick={() => onChange(index)}
                onKeyDown={(event) => {
                  const navigationKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"];
                  if (!navigationKeys.includes(event.key)) return;
                  event.preventDefault();
                  const lastIndex = rfAdvantages.length - 1;
                  const nextIndex = event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? lastIndex
                      : event.key === "ArrowLeft" || event.key === "ArrowUp"
                        ? (index - 1 + rfAdvantages.length) % rfAdvantages.length
                        : (index + 1) % rfAdvantages.length;
                  onChange(nextIndex);
                  event.currentTarget.parentElement
                    ?.querySelectorAll('[role="tab"]')
                    [nextIndex]?.focus();
                }}
              >
                <span>{item.tab}</span>
              </button>
            );
          })}
        </div>
        <div
          className="rf-advantages__stage"
          id="rf-advantage-panel"
          role="tabpanel"
          aria-labelledby={`rf-tab-${rfAdvantages[activeIndex].id}`}
          aria-live="polite"
        >
          <div className="rf-advantages__media">
            <img
              key={rfAdvantages[activeIndex].id}
              className={`rf-advantages__image rf-advantages__image--${rfAdvantages[activeIndex].id}`}
              src={asset(rfAdvantages[activeIndex].image)}
              alt={rfAdvantages[activeIndex].alt}
            />
          </div>
          <div className="rf-advantages__copy">
            <span className="eyebrow">{rfAdvantages[activeIndex].eyebrow}</span>
            <h3>{rfAdvantages[activeIndex].title}</h3>
            <p>{rfAdvantages[activeIndex].copy}</p>
            <strong>{rfAdvantages[activeIndex].proof}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

function CapabilityBrowser({ onPlay, children }) {
  const [activeChapter, setActiveChapter] = useState(0);
  const chapterRefs = useRef([]);
  const navRef = useRef(null);

  function jumpToNode(node, offset) {
    if (!node) return;
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo({ top: window.scrollY + node.getBoundingClientRect().top - offset, behavior: "auto" });
    requestAnimationFrame(() => { root.style.scrollBehavior = previousBehavior; });
  }

  useEffect(() => {
    const chapters = [
      document.getElementById("rf-advantages"),
      document.getElementById("power-guide"),
      ...chapterRefs.current,
      document.getElementById("makerboost"),
    ].filter(Boolean);
    const observer = new IntersectionObserver(() => {
      const visible = chapters
        .map((target) => ({ target, rect: target.getBoundingClientRect() }))
        .filter(({ rect }) => rect.bottom > 96 && rect.top < window.innerHeight * .32)
        .sort((a, b) => Math.abs(a.rect.top - 150) - Math.abs(b.rect.top - 150));
      if (visible[0]) setActiveChapter(Number(visible[0].target.dataset.chapterIndex));
    }, { rootMargin: "-96px 0px -68% 0px", threshold: 0 });

    chapters.forEach((chapter) => observer.observe(chapter));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    const activeButton = nav?.querySelector(`[data-chapter-nav="${activeChapter}"]`);
    if (!nav || !activeButton || window.innerWidth > 760) return;
    nav.scrollTo({
      left: activeButton.offsetLeft - ((nav.clientWidth - activeButton.clientWidth) / 2),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, [activeChapter]);

  useEffect(() => {
    if (!["#features", "#capability-system"].includes(window.location.hash)) return;
    const alignToCapabilities = () => jumpToNode(document.getElementById("features"), 64);
    const timeout = window.setTimeout(alignToCapabilities, 350);
    window.addEventListener("load", alignToCapabilities, { once: true });
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("load", alignToCapabilities);
    };
  }, []);

  function selectChapter(index) {
    setActiveChapter(index);
    jumpToNode(
      index === 0 ? document.getElementById("rf-advantages") : chapterRefs.current[index],
      window.innerWidth <= 760 ? 180 : 100,
    );
  }

  return (
    <section className="capability-scroll" id="features">
      <span className="commercial-capabilities__anchor" id="capability-system" aria-hidden="true" />
      <div className="journey-opening-artwork">
        <img src={asset("feature-overview-capabilities-v4.webp")} style={{aspectRatio:"3840 / 2004",objectFit:"cover"}} alt="Hydra Gen2 feature overview covering RF precision, power options, motion, workflow, safety and support" />
      </div>
      <nav
          className="capability-scroll__nav"
          aria-label="Explore Hydra Gen2 advantages"
          ref={navRef}
          style={{
            "--active-chapter": activeChapter,
            "--chapter-count": capabilityChapters.length + 1,
          }}
        >
          {capabilityChapters.map((item, index) => (
            <button
              type="button"
              key={item.id}
              className={activeChapter === index ? "is-active" : ""}
              onClick={() => selectChapter(index)}
              aria-current={activeChapter === index ? "step" : undefined}
              data-chapter-nav={index}
            >
              <strong>{item.nav}</strong>
            </button>
          ))}
          <button
            type="button"
            className={activeChapter === capabilityChapters.length ? "is-active" : ""}
            onClick={() => {
              setActiveChapter(capabilityChapters.length);
              jumpToNode(document.getElementById("makerboost"), window.innerWidth <= 760 ? 136 : 100);
            }}
            aria-current={activeChapter === capabilityChapters.length ? "step" : undefined}
            data-chapter-nav={capabilityChapters.length}
          >
            <strong>Software</strong>
          </button>
      </nav>
      {children}
      <div className="capability-scroll__layout">

        <div className="capability-scroll__chapters">
          {capabilityChapters.map((chapter, chapterIndex) => (
            <section
              className="capability-scroll__chapter"
              id={`capability-${chapter.id}`}
              data-chapter-index={chapterIndex}
              ref={(node) => { chapterRefs.current[chapterIndex] = node; }}
              aria-labelledby={`capability-${chapter.id}-title`}
              key={chapter.id}
            >
              <header className="capability-scroll__chapter-heading">
                <small>{chapter.nav}</small>
                <h3 id={`capability-${chapter.id}-title`}>{chapter.title}</h3>
                <p>{chapter.summary}</p>
              </header>

              <div className="capability-scroll__stories">
                {chapter.speedProof && <SpeedMotionProof />}
                {chapter.spotlights.map((spotlight) => (
                  <article className="capability-scroll__story" key={spotlight.title}>
                    <div className="capability-scroll__media capability-scroll__media--static">
                      {spotlight.video ? (
                        <video controls muted playsInline preload="metadata" poster={spotlight.poster} aria-label={`${spotlight.title} Hydra Gen2 video`} style={{ display: "block", width: "100%", height: "100%", objectFit: "contain", background: "#000" }}>
                          <source src={spotlight.video} type="video/mp4" />
                        </video>
                      ) : (
                        <img src={asset(spotlight.image)} alt={`${spotlight.title} Hydra Gen2 proof`} />
                      )}
                    </div>
                    {!spotlight.hideCopy && (
                      <div className="capability-scroll__story-copy">
                        <h4>{spotlight.title}</h4>
                        <p>{spotlight.copy}</p>
                        <div>{spotlight.metrics.map((metric) => <span key={metric}>{metric}</span>)}</div>
                      </div>
                    )}
                  </article>
                ))}
              </div>

              {(chapter.feature || chapter.support.length > 0) && (
                <div className={chapter.id === "protection" ? "capability-scroll__media-showcase capability-scroll__media-showcase--compact" : "capability-scroll__media-showcase"}>
                {chapter.feature && (
                  <article className="capability-scroll__feature capability-scroll__story">
                    {chapter.id === "protection" ? (
                      <div className="capability-scroll__media capability-scroll__media--static">
                        <img src={asset(chapter.feature.image)} alt={`${chapter.feature.title} Hydra Gen2 proof`} />
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="capability-scroll__media"
                        onClick={() => onPlay(chapter.feature.title, asset(chapter.feature.image))}
                        aria-label={`Open ${chapter.feature.title} full-size media preview`}
                      >
                        <img src={asset(chapter.feature.image)} alt={`${chapter.feature.title} Hydra Gen2 proof`} />
                        <span className="capability-scroll__play" aria-hidden="true"><Play size={25} weight="fill" /></span>
                      </button>
                    )}
                    <div className="capability-scroll__story-copy">
                      <h4>{chapter.feature.title}</h4>
                      <p>{chapter.feature.copy}</p>
                      {chapter.feature.metrics?.length > 0 && (
                        <div>{chapter.feature.metrics.map((metric) => <span key={metric}>{metric}</span>)}</div>
                      )}
                    </div>
                  </article>
                )}

                <div className={chapter.support.some((item) => item.icon) ? "capability-scroll__support capability-scroll__support--icons" : "capability-scroll__support"}>
                  {chapter.support.map((item) => (
                    <article key={item.title ?? item.compareTitles?.join("-")}>
                      {item.icon ? (
                        <span className="capability-scroll__support-icon" aria-hidden="true"><item.icon size={28} weight="regular" /></span>
                      ) : item.video ? (
                        <video className="capability-scroll__support-media" controls muted playsInline preload="metadata" poster={item.poster} aria-label={`${item.title} video`}>
                          <source src={item.video} type="video/mp4" />
                        </video>
                      ) : item.compareImages ? (
                        <div className="capability-scroll__comparison-media">
                          {item.compareImages.map((image, imageIndex) => (
                            <figure key={image}>
                              <img src={image} alt="" />
                              <figcaption>
                                <strong>{item.compareTitles[imageIndex]}</strong>
                                <span>{item.compareCopies[imageIndex]}</span>
                              </figcaption>
                            </figure>
                          ))}
                        </div>
                      ) : (
                        <img src={asset(item.image)} alt="" />
                      )}
                      {!item.compareImages && (
                        <div>
                          <h4>{item.title}</h4>
                          <p>{item.copy}</p>
                          {item.metrics?.length > 0 && (
                            <div className="capability-scroll__support-tags">
                              {item.metrics.map((metric) => <span key={metric}>{metric}</span>)}
                            </div>
                          )}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
                </div>
              )}

              {chapter.proofs.length > 0 && (
                <div className="capability-scroll__proofs">
                  {chapter.proofs.map(({ value, label, icon: Icon }) => (
                    <article key={`${value}-${label}`}>
                      <Icon size={24} weight="regular" aria-hidden="true" />
                      <strong>{value}</strong>
                      <span>{label}</span>
                    </article>
                  ))}
                </div>
              )}

              {chapter.details.length > 0 && (
                <div className="capability-scroll__details" aria-label={`${chapter.nav} additional details`}>
                  <span>More built in</span>
                  <div>{chapter.details.map((detail) => <span key={detail}>{detail}</span>)}</div>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HydraPage() {
  useEffect(() => {
    document.title = "OneLaser Hydra Gen2 Industrial RF Laser | OneLaser";
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = "Explore the OneLaser Hydra Gen2 industrial RF laser, built for precision, speed and production-ready performance.";
  }, []);
  const [activeMedia, setActiveMedia] = useState(0);
  const [activeMaterial, setActiveMaterial] = useState(0);
  const [materialPaused, setMaterialPaused] = useState(false);
  const [materialTimerEpoch, setMaterialTimerEpoch] = useState(0);
  const [materialReducedMotion, setMaterialReducedMotion] = useState(() => (
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  ));
  const {
    activeIndex: activeRfAdvantage,
    selectIndex: setActiveRfAdvantage,
    interactionProps: rfCarouselProps,
  } = useAutoplayCarousel(rfAdvantages.length);
  const {
    activeIndex: activePowerProof,
    selectIndex: setActivePowerProof,
    interactionProps: powerCarouselProps,
  } = useAutoplayCarousel(powerProofs.length);
  const [openFaq, setOpenFaq] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedPackageId, setSelectedPackageId] = useState("9");
  const [purchasePower, setPurchasePower] = useState("38W");
  const [selectedPurchaseAccessories, setSelectedPurchaseAccessories] = useState([]);
  const [activeJourneySection, setActiveJourneySection] = useState("why-hydra");
  const [journeyVisible, setJourneyVisible] = useState(false);
  const [videoModal, setVideoModal] = useState(null);
  const [youtubeVideo, setYoutubeVideo] = useState(null);
  const thumbnailRailRef = useRef(null);
  const heroMediaTouchStartX = useRef(null);
  const authorityVideoRailRef = useRef(null);
  const horizontalRailDragRef = useRef({ rail: null, pointerId: null, startX: 0, startScrollLeft: 0, dragged: false });
  const reviewVideoRailRef = useRef(null);
  const consultationFeedbackRailRef = useRef(null);
  const materialTabRefs = useRef([]);
  const materialTouchStartX = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [topButtonState, setTopButtonState] = useState("hidden");
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    initializeAnalytics();
    trackEvent("view_content", {
      content_name: "OneLaser Hydra Gen2",
      content_category: "Laser engraver",
      value: 10999,
      currency: "USD",
    });
  }, []);

  useEffect(() => {
    materialCategories.forEach(({ image }) => {
      const preload = new Image();
      preload.src = asset(image);
    });
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setMaterialReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (materialReducedMotion || materialPaused) return undefined;
    const timeout = window.setTimeout(() => {
      setActiveMaterial((current) => (current + 1) % materialCategories.length);
    }, MATERIAL_AUTOPLAY_DELAY);
    return () => window.clearTimeout(timeout);
  }, [activeMaterial, materialPaused, materialReducedMotion, materialTimerEpoch]);

  useEffect(() => {
    const revealNodes = [...document.querySelectorAll("[data-reveal]")];
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8%" });
    revealNodes.forEach((node) => revealObserver.observe(node));

    const updateProgress = () => {
      const currentScrollY = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? Math.min(100, (currentScrollY / max) * 100) : 0);
      const readingLine = currentScrollY + 156;
      const currentSection = journeySections.reduce((active, section) => {
        const node = document.getElementById(section.id);
        const absoluteTop = node ? node.getBoundingClientRect().top + currentScrollY : Number.POSITIVE_INFINITY;
        return absoluteTop <= readingLine ? section.id : active;
      }, "why-hydra");
      setActiveJourneySection(currentSection);
      if (currentScrollY < 480) {
        setTopButtonState("hidden");
      } else if (currentScrollY < lastScrollYRef.current - 4) {
        setTopButtonState("visible");
      } else if (currentScrollY > lastScrollYRef.current + 4) {
        setTopButtonState("muted");
      }
      const journeyStart = document.getElementById("why-hydra");
      setJourneyVisible(Boolean(journeyStart && journeyStart.getBoundingClientRect().bottom <= window.innerHeight));
      lastScrollYRef.current = currentScrollY;
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    const placeholderPalettes = [
      ["#e7ded5", "#d8c9bc", "#f3ece5"],
      ["#dfe5df", "#cbd8cf", "#edf2ed"],
      ["#dde4e8", "#c7d4db", "#edf2f4"],
      ["#e8dfdf", "#d9c8ca", "#f4ebeb"],
      ["#e5e0e9", "#d3cadb", "#f1edf4"],
      ["#e1e6e3", "#cbd7d2", "#eff3f1"],
      ["#e8e2d7", "#d8cdbb", "#f4efe6"],
    ];
    const assignPlaceholderPalette = (image) => {
      const seed = `${image.getAttribute("src") || ""}|${image.alt || ""}`;
      const hash = [...seed].reduce((value, character) => (
        ((value << 5) - value + character.charCodeAt(0)) | 0
      ), 0);
      const [base, low, high] = placeholderPalettes[Math.abs(hash) % placeholderPalettes.length];
      image.style.setProperty("--image-placeholder-base", base);
      image.style.setProperty("--image-placeholder-low", low);
      image.style.setProperty("--image-placeholder-high", high);
    };
    const prepareImage = (image) => {
      if (!(image instanceof HTMLImageElement)) return;
      assignPlaceholderPalette(image);
      image.classList.toggle("is-image-ready", image.complete && image.naturalWidth > 0);
      image.classList.toggle("is-image-error", image.complete && image.naturalWidth === 0);
    };
    const markReady = (event) => {
      if (!(event.target instanceof HTMLImageElement)) return;
      event.target.classList.add("is-image-ready");
      event.target.classList.remove("is-image-error");
    };
    const markError = (event) => {
      if (!(event.target instanceof HTMLImageElement)) return;
      event.target.classList.add("is-image-error");
      event.target.classList.remove("is-image-ready");
    };
    const imageObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        if (record.type === "attributes") prepareImage(record.target);
        record.addedNodes.forEach((node) => {
          if (node instanceof HTMLImageElement) prepareImage(node);
          if (node instanceof Element) node.querySelectorAll("img").forEach(prepareImage);
        });
      });
    });

    document.querySelectorAll("img").forEach(prepareImage);
    document.addEventListener("load", markReady, true);
    document.addEventListener("error", markError, true);
    imageObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["src", "srcset"],
      childList: true,
      subtree: true,
    });
    return () => {
      document.removeEventListener("load", markReady, true);
      document.removeEventListener("error", markError, true);
      imageObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!youtubeVideo && !videoModal) return undefined;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setYoutubeVideo(null);
        setVideoModal(null);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [youtubeVideo, videoModal]);

  const selectedPurchasePackage = useMemo(() => {
    const selected = purchasePackages.find((item) => item.id === selectedPackageId) ?? purchasePackages[0];
    const powerDelta = purchasePower === "70W" ? selected.powerDelta : 0;
    return { ...selected, price: selected.price + powerDelta, msrp: selected.msrp + powerDelta };
  }, [selectedPackageId, purchasePower]);

  const purchaseAccessoryTotal = useMemo(
    () => officialAccessories
      .filter((item) => selectedPurchaseAccessories.includes(item.id))
      .reduce((sum, item) => sum + item.price, 0),
    [selectedPurchaseAccessories],
  );

  const purchaseAccessoryMsrpTotal = useMemo(
    () => officialAccessories
      .filter((item) => selectedPurchaseAccessories.includes(item.id))
      .reduce((sum, item) => sum + item.msrp, 0),
    [selectedPurchaseAccessories],
  );

  const purchaseTotal = (selectedPurchasePackage.price + purchaseAccessoryTotal) * quantity;
  const purchaseMsrpTotal = (selectedPurchasePackage.msrp + purchaseAccessoryMsrpTotal) * quantity;
  const monthlyPayment = purchaseTotal / 24;
  const selectedVariant = purchasePower === "70W" ? selectedPurchasePackage.pro : selectedPurchasePackage.hybrid;
  const cartItems = [`${selectedVariant}:${quantity}`, ...officialAccessories.filter(item => selectedPurchaseAccessories.includes(item.id)).map(item => `${item.variant}:${quantity}`)];
  const checkoutUrl = `https://www.1laser.com/cart/${cartItems.join(',')}`;
  const SHOP_PAY_CHECKOUT_URL = checkoutUrl;
  const MORE_PAYMENT_OPTIONS_URL = checkoutUrl;
  const financingCopy = selectedPackageId === "9" && purchasePower === "38W" && !selectedPurchaseAccessories.length && quantity === 1 ? "From $534/mo." : "Financing available";

  function handleJourneyNavigation(section) {
    trackEvent("navigate_section", { section_id: section.id, section_name: section.label });
    document.getElementById(section.id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  }

  function getPurchaseEventParameters() {
    return {
      content_name: `Hydra Gen2 ${purchasePower} ${selectedPurchasePackage.name}`,
      content_ids: [`hydra-gen2-${purchasePower.toLowerCase()}-${selectedPackageId}`],
      content_type: "product",
      value: purchaseTotal,
      currency: "USD",
      quantity,
      accessory_count: selectedPurchaseAccessories.length,
    };
  }

  function handleAddToCart() {
    trackEvent("add_to_cart", getPurchaseEventParameters());
    window.open(checkoutUrl, "_blank", "noopener,noreferrer");
  }

  function handleShopPayCheckout() {
    trackEvent("begin_checkout", {
      ...getPurchaseEventParameters(),
      checkout_type: "shop_pay",
    });
  }

  function trackLead(destination, leadType) {
    trackEvent("generate_lead", {
      content_name: "OneLaser Hydra Gen2",
      lead_type: leadType,
      destination,
    });
  }

  function selectMedia(index) {
    setActiveMedia(index);
  }

  function playOfficialFilm() {
    if (!officialFilm.youtubeId) return;
    setYoutubeVideo({
      id: officialFilm.youtubeId,
      title: officialFilm.title,
      channel: "OneLaser",
      tag: "OFFICIAL Hydra GEN2 FILM",
    });
  }

  function stepMedia(direction) {
    setActiveMedia((current) => (current + direction + media.length) % media.length);
  }

  function handleHeroMediaTouchStart(event) {
    heroMediaTouchStartX.current = event.changedTouches[0]?.clientX ?? null;
  }

  function handleHeroMediaTouchEnd(event) {
    const startX = heroMediaTouchStartX.current;
    const endX = event.changedTouches[0]?.clientX;
    heroMediaTouchStartX.current = null;

    if (startX == null || endX == null || Math.abs(endX - startX) < 44) return;
    stepMedia(endX < startX ? 1 : -1);
  }

  function scrollThumbnails(direction) {
    thumbnailRailRef.current?.scrollBy({ left: direction * 330, behavior: "smooth" });
  }

  function scrollReviewVideos(direction) {
    reviewVideoRailRef.current?.scrollBy({ left: direction * 420, behavior: "smooth" });
  }

  function scrollAuthorityVideos(direction) {
    authorityVideoRailRef.current?.scrollBy({ left: direction * 420, behavior: "smooth" });
  }

  function startHorizontalRailDrag(event) {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const rail = event.currentTarget;
    horizontalRailDragRef.current = {
      rail,
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: rail.scrollLeft,
      dragged: false,
    };
  }

  function moveHorizontalRailDrag(event) {
    const drag = horizontalRailDragRef.current;
    const rail = drag.rail;
    if (!rail || drag.pointerId !== event.pointerId) return;
    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 4 && !drag.dragged) {
      drag.dragged = true;
      rail.setPointerCapture?.(event.pointerId);
      rail.classList.add("is-dragging");
    }
    if (!drag.dragged) return;
    event.preventDefault();
    rail.scrollLeft = drag.startScrollLeft - distance;
  }

  function endHorizontalRailDrag(event) {
    const drag = horizontalRailDragRef.current;
    const rail = drag.rail;
    if (!rail || drag.pointerId !== event.pointerId) return;
    if (rail.hasPointerCapture?.(event.pointerId)) rail.releasePointerCapture(event.pointerId);
    rail.classList.remove("is-dragging");
    drag.rail = null;
    drag.pointerId = null;
    if (drag.dragged) window.setTimeout(() => { drag.dragged = false; }, 0);
  }

  function suppressHorizontalRailClickAfterDrag(event) {
    if (!horizontalRailDragRef.current.dragged) return;
    event.preventDefault();
    event.stopPropagation();
    horizontalRailDragRef.current.dragged = false;
  }

  function scrollConsultationFeedback(direction) {
    const rail = consultationFeedbackRailRef.current;
    if (!rail) return;
    const firstCard = rail.querySelector("blockquote");
    const cardWidth = firstCard?.getBoundingClientRect().width ?? 360;
    const gap = Number.parseFloat(getComputedStyle(rail).columnGap || getComputedStyle(rail).gap) || 12;
    rail.scrollBy({ left: direction * (cardWidth + gap), behavior: "smooth" });
  }

  function selectMaterial(index, { focus = false } = {}) {
    const nextIndex = (index + materialCategories.length) % materialCategories.length;
    setActiveMaterial(nextIndex);
    setMaterialTimerEpoch((current) => current + 1);
    if (focus) materialTabRefs.current[nextIndex]?.focus();
  }

  function resumeMaterialAutoplay() {
    setMaterialPaused(false);
    setMaterialTimerEpoch((current) => current + 1);
  }

  function handleMaterialKeyDown(event, index) {
    const navigationKeys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!navigationKeys.includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? materialCategories.length - 1
        : event.key === "ArrowLeft"
          ? index - 1
          : index + 1;
    selectMaterial(nextIndex, { focus: true });
  }

  function openStory(title, image) {
    if (typeof title === "object" && title?.id) {
      setYoutubeVideo(title);
      return;
    }
    setVideoModal({ title, image });
  }

  function togglePurchaseAccessory(accessoryId) {
    setSelectedPurchaseAccessories((current) => {
      const selected = !current.includes(accessoryId);
      trackEvent("select_accessory", { accessory_id: accessoryId, selected });
      return selected ? [...current, accessoryId] : current.filter((id) => id !== accessoryId);
    });
  }

  return (
    <div className="site-shell home-global-chrome">
      <div className="page-progress" aria-hidden="true"><span style={{ width: `${scrollProgress}%` }} /></div>
      <a className="skip-link" href="#main">Skip to content</a>
      <HomeNavigation megaMenuActivation="click" />

      <nav className={journeyVisible ? "journey-nav is-visible" : "journey-nav"} aria-label="Explore Hydra Gen2 page sections">
        <div className="journey-nav__inner">
          <div className="journey-nav__rail">
            {journeySections.map((section, index) => (
              <button
                type="button"
                className={activeJourneySection === section.id ? "is-active" : ""}
                aria-current={activeJourneySection === section.id ? "location" : undefined}
                onClick={() => handleJourneyNavigation(section)}
                key={section.id}
              >
                <span>{section.label}</span>
                <small>{String(index + 1).padStart(2, "0")}</small>
              </button>
            ))}
          </div>
          <span className="journey-nav__count">
            {String(Math.max(1, journeySections.findIndex(({ id }) => id === activeJourneySection) + 1)).padStart(2, "0")}
            <i>/</i>{String(journeySections.length).padStart(2, "0")}
          </span>
        </div>
      </nav>

      <main id="main">
        <section className="hero section" id="top">
          <div className="hero-media">
            <div
              className="media-stage"
              aria-label="Hydra Gen2 product gallery"
              aria-roledescription="carousel"
              onTouchStart={handleHeroMediaTouchStart}
              onTouchEnd={handleHeroMediaTouchEnd}
              onTouchCancel={() => { heroMediaTouchStartX.current = null; }}
            >
              <img src={media[activeMedia].src} alt={media[activeMedia].alt} draggable="false" />
              <span className="media-count">{String(activeMedia + 1).padStart(2, "0")} / {String(media.length).padStart(2, "0")}</span>
              <button type="button" className="media-arrow media-arrow--previous" aria-label="Previous product view" onClick={() => stepMedia(-1)}><CaretLeft size={25} /></button>
              <button type="button" className="media-arrow media-arrow--next" aria-label="Next product view" onClick={() => stepMedia(1)}><CaretRight size={25} /></button>
            </div>
            <div className="thumbnail-controls">
              <button type="button" className="thumb-arrow" aria-label="Scroll product views left" onClick={() => scrollThumbnails(-1)}><CaretLeft size={20} /></button>
              <div className="thumbnail-row" ref={thumbnailRailRef} aria-label="Product views">
                {media.map((item, index) => (
                  <button
                    type="button"
                    key={item.src}
                    className={activeMedia === index ? "thumbnail is-active" : "thumbnail"}
                    onClick={() => selectMedia(index)}
                    aria-label={`Show product view ${String(index + 1).padStart(2, "0")}`}
                  >
                    <img src={item.src} alt="" />
                  </button>
                ))}
              </div>
              <button type="button" className="thumb-arrow" aria-label="Scroll product views right" onClick={() => scrollThumbnails(1)}><CaretRight size={20} /></button>
              <span className="thumbnail-divider" aria-hidden="true" />
              <button type="button" className="video-thumbnail video-thumbnail--placeholder" onClick={playOfficialFilm} aria-label="Watch the official Hydra Gen2 film" disabled={!officialFilm.youtubeId}>
                <span><Play size={16} weight="fill" /><small>WATCH</small></span>
              </button>
            </div>
            <div className="hero-assurance-grid" aria-label="Hydra Gen2 information, consultation, and support benefits">
              <a className="hero-assurance-card hero-assurance-card--link" href={SALES_CALL_URL} target="_blank" rel="noreferrer" onClick={() => trackLead("sales-consultation-call", "book_free_call")}>
                <Phone size={28} weight="light" aria-hidden="true" />
                <strong>Book A Free Call</strong>
                <ArrowUpRight className="hero-assurance-card__arrow" size={15} aria-hidden="true" />
              </a>
              <a className="hero-assurance-card hero-assurance-card--link" href={BROCHURE_URL} target="_blank" rel="noreferrer" onClick={() => trackLead("hydra-brochure", "download_brochure")}>
                <DownloadSimple size={28} weight="light" aria-hidden="true" />
                <strong>Download Brochure</strong>
                <ArrowUpRight className="hero-assurance-card__arrow" size={15} aria-hidden="true" />
              </a>
              <a className="hero-assurance-card hero-assurance-card--link" href={SUPPORT_URL} target="_blank" rel="noreferrer" onClick={() => trackLead("onelaser-support", "hero_assurance_support")}>
                <Headset size={28} weight="light" aria-hidden="true" />
                <strong>100% U.S.-based Engineers with Lifetime Support</strong>
                <ArrowUpRight className="hero-assurance-card__arrow" size={15} aria-hidden="true" />
              </a>
              <div className="hero-assurance-card">
                <ShieldCheck size={28} weight="light" aria-hidden="true" />
                <strong>Max 3-Year Warranty: Unmatched Reliability</strong>
              </div>
            </div>
          </div>

          <div className="purchase-panel">
            <h1>OneLaser Hydra™ {selectedPackageId} Gen2 Industrial Laser Engraver ({selectedPackageId === "7" ? "70W RF" : "38W RF + DC / 70W RF"})</h1>

            <div className="rating-row" aria-label={`Hydra ${selectedPackageId} Gen2 has no published customer ratings yet`}>
              <span className="rating-stars" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((item) => <Star size={18} weight="regular" key={item} />)}
              </span>
              <strong>—</strong>
              <a href="#reviews">0 reviews</a>
            </div>

            <ul className="hero-highlights">
              <li><strong>38W / 70W RF source:</strong> 20,000–30,000 hours, air-cooled.</li>
              <li><strong>Production speed:</strong> up to 2,000 mm/s · 4G acceleration.</li>
              <li><strong>Professional detail:</strong> 2,000 DPI · 0.07 mm spot · ≤ 0.01 mm repeat.</li>
              <li><strong>Work area:</strong> {selectedPurchasePackage.area} · camera-assisted positioning.</li>
            </ul>

            <div className="official-price">
              <div className="official-price__main">
                <span>Final price</span>
                <strong>{formatMoney(selectedPurchasePackage.price)} <small>USD</small></strong>
                <em>Save {formatMoney(selectedPurchasePackage.msrp - selectedPurchasePackage.price)}</em>
              </div>
              <div className="official-price__msrp">
                <span>MSRP</span>
                <strong><span>{formatMoney(selectedPurchasePackage.msrp)}</span> <small>USD</small></strong>
              </div>
            </div>
            <div className="financing-line">
              <strong><span>{financingCopy}</span> with Affirm</strong>
              <a href="https://www.1laser.com/pages/financing" target="_blank" rel="noreferrer">See if you qualify <CaretRight size={15} /></a>
            </div>
            <div className="financing-more">
              <span>Subject to eligibility and terms</span>
              <a href="https://www.1laser.com/pages/financing" target="_blank" rel="noreferrer">Click here <ArrowUpRight size={14} /></a>
            </div>

            <div className="purchase-options" id="purchase-options">
              <div className="purchase-section-heading">
                <div><span>Choose your laser source</span><small>Same platform, tuned for different workloads.</small></div>
              </div>
              <div className="purchase-power-options">
                {[
                  { id: "38W", title: "38W RF + DC", copy: "Fine RF engraving & glass-tube cutting" },
                  { id: "70W", title: "70W RF Pro", copy: "Dedicated RF detail & production" },
                ].map((item) => {
                  const selected = purchasePower === item.id;
                  return (
                    <button
                      type="button"
                      className={selected ? "purchase-power is-selected" : "purchase-power"}
                      key={item.id}
                      disabled={selectedPackageId === "7" && item.id === "38W"}
                      onClick={() => {
                        setPurchasePower(item.id);
                        if (item.id === "38W" && selectedPackageId === "7") setSelectedPackageId("9");
                        trackEvent("select_power", { power: item.id, value: item.id === "70W" ? 11999 : 10999, currency: "USD" });
                      }}
                      aria-pressed={selected}
                    >
                      <span><strong>{item.title}</strong>{item.badge && <small>{item.badge}</small>}</span>
                      <p>{item.copy}</p>
                    </button>
                  );
                })}
              </div>

              <div className="purchase-section-heading">
                <div><span>Package</span><small>Choose the setup that matches your workspace.</small></div>
              </div>
              <div className="official-packages">
                {purchasePackages.map((item) => {
                  const selected = selectedPackageId === item.id;
                  const powerAdjustment = purchasePower === "70W" ? item.powerDelta : 0;
                  const packagePrice = item.price + powerAdjustment;
                  const packageMsrp = item.msrp + powerAdjustment;
                  return (
                    <button
                      type="button"
                      className={selected ? "official-package is-selected" : "official-package"}
                      key={item.id}
                      onClick={() => {
                        setSelectedPackageId(item.id);
                        if (!item.hybrid) setPurchasePower("70W");
                        trackEvent("select_package", { package_id: item.id, power: purchasePower });
                      }}
                      aria-pressed={selected}
                    >
                      <div className="official-package__top">
                        <span><small>{item.badge}</small><strong>{item.name}</strong></span>
                        <span>
                          <strong>{formatMoney(packagePrice)}</strong>
                          <span className="official-package__monthly">Financing subject to approval</span>
                          <em>Save {formatMoney(packageMsrp - packagePrice)}</em>
                        </span>
                      </div>
                      <div className="official-package__detail"><Check size={17} weight="bold" /><span>{item.detail}</span></div>
                    </button>
                  );
                })}
              </div>

              <div className="purchase-section-heading purchase-section-heading--accessories">
                <div><span>Frequently bought together</span><small>Official accessory pricing from OneLaser.</small></div>
              </div>
              <div className="purchase-accessories">
                {officialAccessories.map((item) => {
                  const selected = selectedPurchaseAccessories.includes(item.id);
                  return (
                    <label className={selected ? "purchase-accessory is-selected" : "purchase-accessory"} key={item.id}>
                      <input type="checkbox" checked={selected} onChange={() => togglePurchaseAccessory(item.id)} />
                      <span
                        className="purchase-accessory__media"
                        style={{ "--accessory-image-scale": item.imageScale }}
                      >
                        <img src={asset(item.image)} alt={item.name} />
                      </span>
                      <span><strong>{item.name}</strong><small>OPTIONAL</small><p>{item.description}</p></span>
                      <span className="purchase-accessory__price"><strong>{formatMoney(item.price)}</strong><del>{formatMoney(item.msrp)}</del></span>
                    </label>
                  );
                })}
              </div>

              <div className="purchase-total">
                <span><small>Your configuration</small><strong>{purchasePower} · {selectedPurchasePackage.name}{selectedPurchaseAccessories.length ? ` + ${selectedPurchaseAccessories.length} optional item${selectedPurchaseAccessories.length > 1 ? "s" : ""}` : ""}</strong></span>
                <strong>{formatMoney(purchaseTotal)}</strong>
              </div>
              <div className="purchase-actions purchase-actions--hero">
                <div className="quantity-control" aria-label="Purchase quantity">
                  <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus size={15} /></button>
                  <strong>{quantity}</strong>
                  <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)}><Plus size={15} /></button>
                </div>
                <button type="button" className="primary-cta" onClick={handleAddToCart}>Add to Cart</button>
              </div>
              <a
                className="secondary-cta secondary-cta--link secondary-cta--shop"
                href={SHOP_PAY_CHECKOUT_URL}
                target="_blank"
                rel="noreferrer"
                onClick={handleShopPayCheckout}
              >
                Continue to checkout <ArrowUpRight size={16} />
              </a>
              <a className="more-payment-options" href={MORE_PAYMENT_OPTIONS_URL} target="_blank" rel="noreferrer" onClick={() => trackEvent("begin_checkout", { ...getPurchaseEventParameters(), checkout_type: "more_payment_options" })}>More payment options <ArrowUpRight size={14} /></a>
            </div>

          </div>
        </section>

        <section className="feature-overview" id="why-hydra" data-reveal>
          <img src={asset("feature-overview-hydra-gen2-v2.webp")} style={{aspectRatio:"3840 / 1800",objectFit:"cover"}} alt="OneLaser Hydra Gen2 in an industrial workshop surrounded by finished engraved products" />
        </section>

        <section className="official-film" aria-labelledby="official-film-title" data-reveal>
          <header className="official-film__header">
            <span className="eyebrow">OFFICIAL Hydra GEN2 FILM</span>
            <h2 id="official-film-title">{officialFilm.title}</h2>
            <p>See how Revo Reeves of Stitchcraft Interiors uses Hydra 16 Gen2 in his custom automotive interior work today.</p>
          </header>
          <button type="button" className="official-film__placeholder" onClick={playOfficialFilm} aria-label="Watch the official Hydra Gen2 film" disabled={!officialFilm.youtubeId}>
            <div className="official-film__placeholder-copy">
              <span>ONELASER · OFFICIAL FILM</span>
              <strong>Hydra GEN2</strong>
              <span className="official-film__play" aria-hidden="true">
                <Play size={28} weight="fill" />
              </span>
              <small>WATCH OFFICIAL FILM</small>
            </div>
          </button>
        </section>

        <section className="review-proof authority-proof" aria-labelledby="authority-proof-title" data-reveal>
          <div className="review-proof__header">
            <div className="section-heading section-heading--stack">
              <span className="eyebrow">REVIEWS, TESTS &amp; TUTORIALS</span>
              <h2 id="authority-proof-title">See Hydra put to the test.</h2>
              <p>Explore hands-on reviews, cutting tests and feature demonstrations. Videos show Hydra series hardware; generations may vary.</p>
            </div>
            <div className="review-proof__controls" aria-label="Browse Hydra reviews and demonstrations">
              <button type="button" onClick={() => scrollAuthorityVideos(-1)} aria-label="Show previous Hydra video"><CaretLeft size={22} /></button>
              <button type="button" onClick={() => scrollAuthorityVideos(1)} aria-label="Show more Hydra videos"><CaretRight size={22} /></button>
            </div>
          </div>
          <div
            className="review-proof__rail is-mouse-draggable"
            ref={authorityVideoRailRef}
            aria-label="Hydra machine reviews and demonstrations"
            onPointerDown={startHorizontalRailDrag}
            onPointerMove={moveHorizontalRailDrag}
            onPointerUp={endHorizontalRailDrag}
            onPointerCancel={endHorizontalRailDrag}
            onClickCapture={suppressHorizontalRailClickAfterDrag}
            onDragStart={(event) => event.preventDefault()}
          >
            {authorityVideos.map((video, index) => <ReviewVideoCard video={video} onPlay={setYoutubeVideo} index={index} total={authorityVideos.length} key={video.id} />)}
          </div>
        </section>

        <CapabilityBrowser onPlay={openStory}>
          <RfAdvantages activeIndex={activeRfAdvantage} onChange={setActiveRfAdvantage} carouselProps={rfCarouselProps} />
          <section className="power-guide" id="power-guide" data-chapter-index="0" data-reveal {...powerCarouselProps}>
            <div className="power-guide__inner">
              <div className="section-heading section-heading--left">
                <span className="eyebrow">TWO PURPOSE-BUILT RF OPTIONS</span>
                <h2>Choose the power that fits your work.</h2>
                <p>Hybrid and Pro share the Hydra production platform. Choose dedicated RF production or RF engraving with glass DC cutting.</p>
              </div>
              <div className="power-switch" role="tablist" aria-label="Explore 38W and 70W RF results">
                {powerProofs.map((item, index) => (
                  <button
                    type="button"
                    role="tab"
                    id={`power-tab-${item.id}`}
                    aria-controls="power-proof-panel"
                    aria-selected={activePowerProof === index}
                    tabIndex={activePowerProof === index ? 0 : -1}
                    className={activePowerProof === index ? "is-active" : ""}
                    key={item.id}
                    onClick={() => setActivePowerProof(index)}
                    onKeyDown={(event) => {
                      const navigationKeys = ["ArrowLeft", "ArrowRight", "Home", "End"];
                      if (!navigationKeys.includes(event.key)) return;
                      event.preventDefault();
                      const nextIndex = event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? powerProofs.length - 1
                          : event.key === "ArrowLeft"
                            ? (index - 1 + powerProofs.length) % powerProofs.length
                            : (index + 1) % powerProofs.length;
                      setActivePowerProof(nextIndex);
                      event.currentTarget.parentElement
                        ?.querySelectorAll('[role="tab"]')
                        [nextIndex]?.focus();
                    }}
                  >
                    {item.tab}
                  </button>
                ))}
              </div>
              <div
                className="power-proof-stage"
                id="power-proof-panel"
                role="tabpanel"
                aria-labelledby={`power-tab-${powerProofs[activePowerProof].id}`}
                aria-live="polite"
              >
                <div className="power-proof-stage__media">
                  <img key={powerProofs[activePowerProof].id} src={asset(powerProofs[activePowerProof].image)} alt={powerProofs[activePowerProof].alt} />
                </div>
                <div className="power-proof-stage__copy">
                  <span className="eyebrow">{powerProofs[activePowerProof].eyebrow}</span>
                  <h3>{powerProofs[activePowerProof].title}</h3>
                  <p>{powerProofs[activePowerProof].copy}</p>
                  <strong>{powerProofs[activePowerProof].proof}</strong>
                </div>
              </div>
            </div>
          </section>
        </CapabilityBrowser>

        <section className="makerboost-proof" id="makerboost" data-chapter-index={capabilityChapters.length} data-reveal>
          <div className="makerboost-proof__inner">
            <div className="makerboost-proof__intro">
              <header className="makerboost-proof__header">
                <span className="eyebrow">MAKERBOOST AI SOFTWARE</span>
                <h2>Out of the box, into creation.</h2>
              </header>
              <div className="makerboost-proof__copy">
                <p className="makerboost-proof__body">MakerBoost is built for the Hydra platform — automatic model detection, recommended parameters and registration-mark recognition help simplify setup and repeat production.</p>
              </div>
            </div>
            <div className="makerboost-proof__media">
              <img src={asset("software-makerboost.webp")} alt="MakerBoost AI software identity artwork" />
            </div>
          </div>
        </section>

        <section className="software-compatibility" id="software" data-reveal>
          <div className="software-compatibility__inner">
            <header className="software-compatibility__header">
              <span className="eyebrow">SOFTWARE</span>
              <h2>Your software. Your way.</h2>
            </header>
            <article className="software-compatibility__stage">
              <div className="software-compatibility__copy">
                <p className="software-compatibility__body">Works with LightBurn, RDWorks, and MakerBoost AI — supporting formats including AI, PDF, DXF, HPGL, PLT, RD, SVG, LBRN, BMP, JPG, PNG, GIF, TIFF and more.</p>
              </div>
              <div className="software-compatibility__media">
                <img src={asset("software-compatibility.webp")} alt="LightBurn and RDWorks software compatibility shown on a laptop" />
              </div>
            </article>
          </div>
        </section>

        <CommercialCapabilities asset={asset} equipmentInvestment={purchaseTotal} />

        <section className="section materials" id="materials" data-reveal>
          <div className="section-heading section-heading--stack">
            <span className="eyebrow">MATERIALS THAT BECOME BUSINESSES</span>
            <h2>From material choice to sellable work.</h2>
            <p>Large-format projects. Repeatable batches. Fine engraving detail. Application images are illustrative concepts.</p>
          </div>
          <div
            className="material-gallery"
            role="region"
            aria-roledescription="carousel"
            aria-label="Hydra Gen2 finished-product material gallery"
            onMouseEnter={() => setMaterialPaused(true)}
            onMouseLeave={resumeMaterialAutoplay}
            onFocusCapture={() => setMaterialPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) resumeMaterialAutoplay();
            }}
            onTouchStart={(event) => {
              materialTouchStartX.current = event.changedTouches[0]?.clientX ?? null;
              setMaterialPaused(true);
            }}
            onTouchEnd={(event) => {
              const endX = event.changedTouches[0]?.clientX;
              if (materialTouchStartX.current !== null && endX !== undefined) {
                const distance = endX - materialTouchStartX.current;
                if (Math.abs(distance) > 48) selectMaterial(activeMaterial + (distance > 0 ? -1 : 1));
              }
              materialTouchStartX.current = null;
              resumeMaterialAutoplay();
            }}
            onTouchCancel={() => {
              materialTouchStartX.current = null;
              resumeMaterialAutoplay();
            }}
          >
            <div id="material-gallery-stage" className="material-gallery__stage" aria-live={materialPaused ? "polite" : "off"}>
              <img key={materialCategories[activeMaterial].id} src={asset(materialCategories[activeMaterial].image)} alt={`${materialCategories[activeMaterial].label} large-format and batch engraving application concept`} />
              <div className="material-gallery__copy">
                <span>{materialCategories[activeMaterial].label}</span>
                <h3>{materialCategories[activeMaterial].title}</h3>
                <p>{materialCategories[activeMaterial].copy}</p>
                <strong>{materialCategories[activeMaterial].proof}</strong>
              </div>
            </div>
            <div className="material-tabs" role="tablist" aria-label="Explore Hydra Gen2 material categories">
              {materialCategories.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeMaterial === index}
                    aria-controls="material-gallery-stage"
                    className={activeMaterial === index ? "is-active" : ""}
                    key={item.id}
                    ref={(node) => { materialTabRefs.current[index] = node; }}
                    onClick={() => selectMaterial(index)}
                    onKeyDown={(event) => handleMaterialKeyDown(event, index)}
                  >
                    <span className="material-tab__label"><Icon size={23} weight="regular" aria-hidden="true" /><span>{item.label}</span></span>
                    <small>{String(index + 1).padStart(2, "0")}</small>
                  </button>
                );
              })}
            </div>
            <div className="material-progress" aria-hidden="true">
              <span
                key={`${activeMaterial}-${materialTimerEpoch}`}
                className={materialPaused ? "is-paused" : ""}
                style={{ "--material-progress-duration": `${MATERIAL_AUTOPLAY_DELAY}ms` }}
              />
            </div>
          </div>
        </section>

        <section className="section specs" id="specs" data-reveal>
          <div className="section-heading section-heading--stack">
            <span className="eyebrow">COMPLETE DETAILS</span><h2>Specifications.</h2>
            <p>Core published specifications for the Hydra Gen2 platform. Final bundle content and electrical requirements should be confirmed at checkout.</p>
            <a className="specs-brochure" href={BROCHURE_URL} target="_blank" rel="noreferrer" onClick={() => trackLead("hydra-brochure", "download_brochure")}>Download Brochure <ArrowUpRight size={16} /></a>
          </div>
          <div className="spec-list">
            {specs.map((group) => <SpecGroup group={group} key={group.title} />)}
          </div>
        </section>

        <GenerationComparison />

        <section className="sales-video sales-video--competitor" data-reveal>
          <span className="commercial-capabilities__anchor" id="comparison-proof" aria-hidden="true" />
          <YouTubeCover video={decisionVideos.competitor} onPlay={setYoutubeVideo} />
          <div className="sales-video__copy">
            <span className="eyebrow">HYDRA VS. THE COMPETITION</span>
            <h2>See how Hydra compares.</h2>
            <p>Compare the early Hydra 9 with Thunder Nova 35, OMTech AF2440 and OMTech Pronto 45, as discussed by Make or Break Shop. Figures below reflect the video, not current offers or Gen2 specifications.</p>
            <div className="measured-comparison" role="region" aria-label="Machines compared in the Hydra 9 video" tabIndex="0">
              <table>
                <thead>
                  <tr><th scope="col">In the video</th>{competitorModels.map((model) => <th scope="col" key={model}>{model}</th>)}</tr>
                </thead>
                <tbody>
                  {competitorRows.map(([label, ...values]) => (
                    <tr key={label}><th scope="row">{label}</th>{values.map((value, index) => <td key={competitorModels[index]}>{value}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="measured-comparison__note">
              Historical comparison from the <a href="https://www.machinesformakers.com/products/onelaser-hydra-9/video-review" target="_blank" rel="noreferrer">creator’s video transcript</a>. Hydra footage uses a pre-production unit. Prices exclude its optional RF upgrade; affiliate relationships are disclosed by the creator.
            </p>
          </div>
        </section>

        <section className="review-proof" id="reviews" aria-labelledby="review-proof-title" data-reveal>
          <div className="review-proof__header">
            <div className="section-heading section-heading--stack">
              <span className="eyebrow">CUSTOMER STORIES · REAL PRODUCTION</span>
              <h2 id="review-proof-title">Real businesses. Real results.</h2>
              <p>From custom automotive interiors to pottery tools, maps and large-format signs—see how owners put Hydra to work.</p>
            </div>
            <div className="review-proof__controls" aria-label="Browse customer stories">
              <button type="button" onClick={() => scrollReviewVideos(-1)} aria-label="Show previous customer story"><CaretLeft size={22} /></button>
              <button type="button" onClick={() => scrollReviewVideos(1)} aria-label="Show more customer stories"><CaretRight size={22} /></button>
            </div>
          </div>
          <div
            className="review-proof__rail is-mouse-draggable"
            ref={reviewVideoRailRef}
            aria-label="Customer story videos"
            onPointerDown={startHorizontalRailDrag}
            onPointerMove={moveHorizontalRailDrag}
            onPointerUp={endHorizontalRailDrag}
            onPointerCancel={endHorizontalRailDrag}
            onClickCapture={suppressHorizontalRailClickAfterDrag}
            onDragStart={(event) => event.preventDefault()}
          >
            {customerStoryVideos.map((video, index) => <ReviewVideoCard video={video} onPlay={setYoutubeVideo} index={index} total={customerStoryVideos.length} key={video.id} />)}
          </div>

        </section>

        <section className="decision-paths" id="next-step" aria-labelledby="decision-paths-title" data-reveal>
          <div className="decision-paths__heading">
            <span className="eyebrow">NOT READY TO CHECK OUT?</span>
            <h2 id="decision-paths-title">Choose the next step that helps you decide.</h2>
            <p>Explore customer stories, speak with an experienced engineer, or get the information you need to evaluate Hydra Gen2 on your own time.</p>
          </div>
          <div className="decision-paths__grid">
            <a
              className="decision-path"
              href="https://www.1laser.com/pages/testimonials"
              target="_blank"
              rel="noreferrer"
              onClick={() => trackLead("testimonials", "customer_stories")}
            >
              <span><Play size={22} weight="fill" /></span>
              <strong>See what owners are making</strong>
              <p>Visit real workshops and hear how OneLaser owners bring their ideas to life.</p>
              <i>Explore customer stories <ArrowUpRight size={15} /></i>
            </a>
            <a
              className="decision-path"
              href={SALES_CALL_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackLead("sales-consultation", "talk_to_engineer")}
            >
              <span><Phone size={22} weight="bold" /></span>
              <strong>Talk to an engineer</strong>
              <p>Get a free 30-minute consultation focused on your products, workflow and setup.</p>
              <i>Schedule a consultation <ArrowUpRight size={15} /></i>
            </a>
            <form
              className="decision-path decision-path--capture"
              action="https://www.1laser.com/contact#ContactForm"
              method="post"
              target="_blank"
              onSubmit={() => trackLead("shopify-contact", "email_capture")}
            >
              <input type="hidden" name="form_type" value="contact" />
              <input type="hidden" name="utf8" value="✓" />
              <input type="hidden" name="contact[subject]" value="Hydra Gen2 website lead" />
              <span><EnvelopeSimple size={22} weight="bold" /></span>
              <strong>Get Hydra Gen2 information</strong>
              <p>Choose the complete specifications, an itemized quote or help evaluating your materials.</p>
              <label>
                <span className="sr-only">Choose what you want to receive</span>
                <select name="contact[body]" defaultValue="Send me the complete Hydra Gen2 specification sheet">
                  <option>Send me the complete Hydra Gen2 specification sheet</option>
                  <option>I want an itemized Hydra Gen2 quotation</option>
                  <option>I want to discuss my materials with an engineer</option>
                </select>
              </label>
              <label className="decision-path__email">
                <span className="sr-only">Email address</span>
                <input type="email" name="contact[email]" placeholder="Work email" required />
                <button type="submit" aria-label="Send my Hydra Gen2 request"><ArrowUpRight size={17} /></button>
              </label>
            </form>
          </div>
        </section>

        <section className="trade-up-banner" aria-labelledby="trade-up-title" data-reveal>
          <div>
            <span className="eyebrow">TRADE UP TO Hydra</span>
            <h2 id="trade-up-title">Have an old laser? Explore a Hydra upgrade.</h2>
            <p>Tell OneLaser what you own today and confirm current eligibility and offers for your chosen Hydra configuration.</p>
          </div>
          <a
            href="https://www.1laser.com/pages/trade-up?utm_source=hydra-gen2-listing&utm_medium=product-page&utm_campaign=hydra-gen2-trade-up"
            target="_blank"
            rel="noreferrer"
            onClick={() => trackLead("trade-up", "trade_up")}
          >
            Check my trade-up value <ArrowUpRight size={16} />
          </a>
        </section>

        <section className="ownership-support" id="faq-support" data-reveal>
          <span className="commercial-capabilities__anchor" id="support" aria-hidden="true" />
          <div className="ownership-support__inner">
            <div className="ownership-support__grid">
              <article className="ownership-support__card">
                <div className="ownership-support__card-top"><Check size={26} weight="bold" aria-hidden="true" /><span>01</span></div>
                <div className="ownership-support__lead"><h3>Clear terms. Confident decisions.</h3></div>
                <div className="ownership-support__details">
                  <p>Review OneLaser’s current return eligibility, exclusions, fees and shipping responsibilities for your Hydra configuration before ordering. Contact the team for help with the process.</p>
                </div>
              </article>
              <article className="ownership-support__card">
                <div className="ownership-support__card-top"><ShieldCheck size={26} weight="regular" aria-hidden="true" /><span>02</span></div>
                <div className="ownership-support__lead"><h3>We built it to last. We back it to prove it.</h3></div>
                <div className="ownership-support__details">
                  <p>Review current Hydra warranty coverage, component terms and exclusions with OneLaser. Confirm coverage for the installed RF source, any glass DC source and optional accessories before ordering.</p>
                </div>
              </article>
              <article className="ownership-support__card ownership-support__card--wide">
                <div className="ownership-support__card-top"><Star size={26} weight="regular" aria-hidden="true" /><span>03</span></div>
                <div className="ownership-support__lead"><h3>One Support. Real engineers. Real experience.</h3></div>
                <div className="ownership-support__details">
                  <p>Work directly with OneLaser’s U.S.-based engineering team for lifetime support, 1-on-1 training and setup guidance. Plan delivery access, electrical requirements, ventilation and cooling before your machine arrives.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section faq" id="faq" data-reveal>
          <div className="section-heading section-heading--stack faq-heading"><span className="eyebrow">BUYING QUESTIONS</span><h2>Good answers before you commit.</h2></div>
          <div className="faq-list">
            {faqs.map((item, index) => (
              <div className="faq-item" key={item.q}>
                <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}>
                  <span>{item.q}</span><span aria-hidden="true">{openFaq === index ? <Minus size={18} /> : <Plus size={18} />}</span>
                </button>
                {openFaq === index && <p>{item.a}</p>}
              </div>
            ))}
          </div>
        </section>

      </main>

      <HomeFooter />

      <button
        type="button"
        className={`back-to-top back-to-top--${topButtonState}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        })}
      >
        <CaretUp size={17} weight="bold" aria-hidden="true" />
        <span>TOP</span>
      </button>

      <div className="sticky-buy" aria-label="Sticky purchase bar">
        <div>
          <strong>{selectedPurchasePackage.name}</strong>
          <span>{purchasePower === "38W" ? "38W RF + DC" : "70W RF Pro"} · {selectedPurchaseAccessories.length ? `${selectedPurchaseAccessories.length} optional item${selectedPurchaseAccessories.length > 1 ? "s" : ""}` : "Standalone configuration"}</span>
          <small>U.S.-based lifetime support · 1-on-1 setup guidance</small>
        </div>
        <div className="sticky-buy__price">
          <div className="sticky-buy__amounts">
            <span><strong>{formatMoney(purchaseTotal)}</strong><del>{formatMoney(purchaseMsrpTotal)}</del></span>
            <small>Financing available with Affirm</small>
          </div>
          <button type="button" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>

      {videoModal && (
        <div className="video-modal" role="dialog" aria-modal="true" aria-label={`${videoModal.title} media preview`} onClick={() => setVideoModal(null)}>
          <div className="video-modal__dialog" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="video-modal__close" aria-label="Close media preview" onClick={() => setVideoModal(null)}><X size={22} /></button>
            <div className="video-modal__media">
              <img src={videoModal.image} alt="" />
              <span><Play size={26} weight="fill" /></span>
            </div>
            <div className="video-modal__copy">
              <h2>{videoModal.title}</h2>
              <p>Hydra Gen2 product media. Application images are illustrative concepts; actual results depend on material and settings.</p>
            </div>
          </div>
        </div>
      )}

      {youtubeVideo && (
        <div className="youtube-modal" role="dialog" aria-modal="true" aria-label={`${youtubeVideo.title} YouTube video`} onClick={() => setYoutubeVideo(null)}>
          <div className="youtube-modal__dialog" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="youtube-modal__close" aria-label="Close YouTube video" onClick={() => setYoutubeVideo(null)}><X size={23} /></button>
            <div className="youtube-modal__player">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeVideo.id}?autoplay=1&rel=0&modestbranding=1`}
                title={youtubeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="youtube-modal__copy"><span className="eyebrow">{youtubeVideo.tag}</span><h2>{youtubeVideo.title}</h2><p>{youtubeVideo.channel} · YouTube</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
