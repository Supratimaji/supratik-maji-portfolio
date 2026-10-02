/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Truthful, structured portfolio data for Supratik Maji
 * Image Editor | AI-Assisted Visual Production | Product Photo Editing | Graphic Design
 */

import watchImg from '../assets/images/watch_luxury_retouch_1790862321444.jpg';
import portraitImg from '../assets/images/portrait_editorial_retouch_1790862335631.jpg';
import cosmeticsImg from '../assets/images/cosmetics_product_clean_1790862349120.jpg';
import posterImg from '../assets/images/graphic_poster_design_1790862360347.jpg';

export interface ProjectFeedbackPin {
  id: string;
  xPercent: number;
  yPercent: number;
  author: string;
  category: 'Edge Masking' | 'Color & Tone' | 'Texture Integrity' | 'Composition' | 'General';
  comment: string;
  timestamp: string;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Image Editing' | 'Retouching' | 'Product' | 'Graphic Design' | 'AI Creative';
  experienceType: 'self_initiated_commercial_study' | 'independent_portfolio_project' | 'local_business_support' | 'ai_assisted_editing_study';
  tools: string[];
  skills: string[];
  summary: string;
  year: string;
  featured: boolean;
  coverImage: string;
  beforeImage?: string;
  afterImage: string;
  inspectionNotes: {
    title: string;
    description: string;
    loupeCoords: { x: number; y: number };
  };
  caseStudy: {
    brief: string;
    challenge: string;
    approach: string;
    humanJudgmentRole: string;
    aiRole?: string;
    deliverables: string[];
  };
  defaultFeedbackPins: ProjectFeedbackPin[];
}

export const OWNER_INFO = {
  name: 'Supratik Maji',
  role: 'Image Editor & Visual Production Specialist',
  positioning: 'Detail-focused image editor and visual creator combining Photoshop-based editing with AI-assisted workflows to create clean, natural, consistent and commercial-ready visuals.',
  coreStatement: 'AI accelerates the workflow; human judgment controls the result.',
  location: 'Kolkata, West Bengal, India',
  email: 'rajmaji695@gmail.com',
  phone: '+91 7074974997',
  whatsappUrl: 'https://wa.me/917074974997',
  linkedinUrl: 'https://www.linkedin.com/in/supratik-maji-614a6525a/',
  googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSc-Sample-Form/viewform',
  availability: 'Immediate availability for Full-Time, Contract, Freelance, and Remote roles.',
  supportingAreas: [
    'Commercial Image Editing & Masking',
    'Product Photo Retouching & Shadow Synthesis',
    'High-Fashion Natural Portrait Retouching',
    'E-Commerce Catalog Standardization',
    'Graphic Design & Editorial Posters',
    'AI-Assisted Visual Concept Exploration'
  ]
};

export const RECRUITER_SKILL_VERIFICATIONS = [
  {
    skill: 'Pen Tool Vector Masking & Edge Refinement',
    level: 'Advanced Specialist',
    verifiedIn: 'Aura Botanical & Obsidian Horology',
    rubric: 'Sub-pixel contour isolation on glass, metal bezels, and complex natural silhouettes with zero jagged feather halos.',
    tool: 'Adobe Photoshop'
  },
  {
    skill: 'Frequency Separation & Non-Destructive Retouching',
    level: 'Advanced Specialist',
    verifiedIn: 'Natural Radiance Editorial Portrait',
    rubric: 'Separates high-frequency skin pore detail from low-frequency color transitions. Completely avoids plastic or artificial airbrushing.',
    tool: 'Adobe Photoshop / Custom Action Curves'
  },
  {
    skill: 'Realistic Commercial Shadow Reconstruction',
    level: 'Production Ready',
    verifiedIn: 'Aura Botanical Dropper Bottle',
    rubric: 'Custom 3-layer directional cast shadows (occlusion, core, soft penumbra falloff) matching scene ambient perspective.',
    tool: 'Adobe Photoshop'
  },
  {
    skill: 'Color Grading & Lighting Calibration',
    level: 'Production Ready',
    verifiedIn: 'Obsidian Horology & Cosmetics Study',
    rubric: 'Curves-based neutral white balance compensation, controlled highlights on specular surfaces, and cross-catalog tonal consistency.',
    tool: 'Camera Raw / Adobe Photoshop'
  },
  {
    skill: 'Commercial Layout & Typographic Hierarchy',
    level: 'Proficient',
    verifiedIn: 'Typographica Helvetica Poster Series',
    rubric: 'Grid-disciplined Swiss design, micro-typographic kerning, optical balancing, and zero-clutter negative space architecture.',
    tool: 'Adobe Illustrator / InDesign'
  },
  {
    skill: 'AI Concept Acceleration + Human Refinement',
    level: 'Pioneer Workflow',
    verifiedIn: 'Aero-Stride Spatial Footwear Study',
    rubric: 'Uses generative tools strictly for rapid structural ideation, followed by human manual texture replacement, lens correction, and composite hygiene.',
    tool: 'Midjourney / Photoshop / Neural Filters'
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'proj-1',
    slug: 'obsidian-horology',
    title: 'Obsidian Horology — Timepiece Commercial Retouching',
    subtitle: 'Precision metal reflection control, dust extraction, and sapphire crystal clarity refinement.',
    category: 'Product',
    experienceType: 'self_initiated_commercial_study',
    tools: ['Adobe Photoshop', 'Camera Raw', 'Frequency Separation', 'Pen Tool'],
    skills: ['Specular Highlight Control', 'Micro-Scratch Removal', 'Texture Retention', 'Contrast Grading'],
    summary: 'A commercial-grade retouching study of a luxury matte black automatic timepiece on rough charcoal slate, preserving authentic metal brushing while eliminating distracting micro-imperfections.',
    year: '2026',
    featured: true,
    coverImage: watchImg,
    afterImage: watchImg,
    inspectionNotes: {
      title: 'Bezel & Dial Anti-Reflective Coating Detail',
      description: 'Notice how the brushed matte finish on the lugs remains crisp and tactile, with specular highlight gradients rebuilt using localized luminance masks.',
      loupeCoords: { x: 52, y: 48 }
    },
    caseStudy: {
      brief: 'Establish a dark, brooding, yet ultra-legible commercial advertising visual for a premium automatic wristwatch.',
      challenge: 'Macro photography inherently captures microscopic dust particles, lint fibers, and uneven glare on sapphire crystal that degrade luxury perceived value.',
      approach: 'Executed a 4-tier layer workflow: 1) Non-destructive spot cleanup with clone stamp and healing brushes on separate blank layers; 2) Frequency separation to balance metal reflections without softening brushed texture; 3) Localized curves adjustments to enhance dial numerals; 4) Grounding shadow reconstruction.',
      humanJudgmentRole: 'Guarding against the synthetic "3D render" look by retaining natural tactile stone micro-pores and realistic watch hand shadows.',
      deliverables: ['Full Resolution 8K Master PSD', 'Web E-Commerce Crop', 'Social Ad Visual Format']
    },
    defaultFeedbackPins: [
      {
        id: 'pin-1-1',
        xPercent: 52,
        yPercent: 48,
        author: 'Lead Art Director Review',
        category: 'Texture Integrity',
        comment: 'Brushed metal grain on dial frame is preserved cleanly without pixel blurring.',
        timestamp: 'Verified Rubric'
      },
      {
        id: 'pin-1-2',
        xPercent: 35,
        yPercent: 65,
        author: 'E-Commerce QA',
        category: 'Color & Tone',
        comment: 'Natural ambient falloff onto slate base provides grounded depth.',
        timestamp: 'Verified Rubric'
      }
    ]
  },
  {
    id: 'proj-2',
    slug: 'natural-radiance',
    title: 'Natural Radiance — Editorial Beauty Portrait',
    subtitle: 'Frequency separation, micro dodge & burn, and authentic skin texture retention.',
    category: 'Retouching',
    experienceType: 'independent_portfolio_project',
    tools: ['Adobe Photoshop', 'Frequency Separation', 'Dodge & Burn', 'Color Balance'],
    skills: ['Non-Destructive Retouching', 'Freckle Preservation', 'Tonal Balance', 'Eye Clarity'],
    summary: 'High-end beauty editorial retouching honoring authentic skin anatomy. Removes temporary blemishes while preserving natural freckles, skin grain, and directional window lighting.',
    year: '2026',
    featured: true,
    coverImage: portraitImg,
    afterImage: portraitImg,
    inspectionNotes: {
      title: 'Epidermal Texture & Iris Micro-Contrast',
      description: 'Zero blur filters used. Pores and micro-freckles are 100% natural, balanced purely through localized dodge & burn luminance sculpting.',
      loupeCoords: { x: 50, y: 38 }
    },
    caseStudy: {
      brief: 'Produce a magazine-cover standard editorial portrait that rejects over-processed artificial skin smoothing.',
      challenge: 'Balancing skin redness and tonal blotchiness without eroding authentic micro-texture, fine baby hairs, or natural freckle patterns.',
      approach: 'Employed 16-bit frequency separation using median calculation suited to the camera sensor resolution. Color smoothing executed strictly on the low-frequency layer using soft brush blending; texture imperfections cleaned exclusively on high frequency.',
      humanJudgmentRole: 'Knowing when to stop: deliberately retaining unique natural features that provide emotional authenticity and editorial prestige.',
      deliverables: ['High-Res CMYK Print Proof', 'sRGB Digital Editorial Crop', 'Color Grading LUT Profile']
    },
    defaultFeedbackPins: [
      {
        id: 'pin-2-1',
        xPercent: 48,
        yPercent: 36,
        author: 'Senior Retoucher',
        category: 'Texture Integrity',
        comment: 'No Gaussian/median plastic skin. Excellent frequency separation discipline.',
        timestamp: 'Verified Rubric'
      },
      {
        id: 'pin-2-2',
        xPercent: 55,
        yPercent: 44,
        author: 'Photo Editor',
        category: 'Color & Tone',
        comment: 'Balanced warm skin undertones without muddying the specular highlight on the nose bridge.',
        timestamp: 'Verified Rubric'
      }
    ]
  },
  {
    id: 'proj-3',
    slug: 'aura-botanical',
    title: 'Aura Botanical — E-Commerce Cosmetics Catalog',
    subtitle: 'Vector path isolation, transparent glass refraction handling, and soft contact shadow generation.',
    category: 'Image Editing',
    experienceType: 'local_business_support',
    tools: ['Adobe Photoshop', 'Pen Tool', 'Layer Masks', 'Curves'],
    skills: ['Precise Clipping Paths', 'Glass Alpha Masking', 'Cast Shadow Synthesis', 'E-Commerce Alignment'],
    summary: 'Standardizing an artisanal botanical cosmetic line for digital retail. Replaces messy ambient lighting with pure travertine stone and realistic glass refraction highlights.',
    year: '2026',
    featured: true,
    coverImage: cosmeticsImg,
    afterImage: cosmeticsImg,
    inspectionNotes: {
      title: 'Glass Meniscus & Label Edge Transition',
      description: 'The amber dropper bottle edges feature zero fringe fringing or matte color halos, blending seamlessly onto the warm neutral travertine.',
      loupeCoords: { x: 50, y: 55 }
    },
    caseStudy: {
      brief: 'Prepare inconsistent indie skincare product photos for e-commerce Shopify catalog standards.',
      challenge: 'Amber glass bottles cast complex semi-transparent internal reflections and caustic shadows that standard automatic cutout tools destroy.',
      approach: 'Hand-drawn Pen Tool vector path around physical outer boundaries; separate luminance extraction mask for the amber glass body to preserve realistic background light pass-through; engineered a 3-stage cast shadow matching the overhead studio key.',
      humanJudgmentRole: 'Preserving the optical density of the serum liquid while ensuring the white brand typography on the label remains razor sharp.',
      deliverables: ['Isolated PNG with Transparent Alpha', 'Catalog White & Travertine Variations', 'Master Retouch File']
    },
    defaultFeedbackPins: [
      {
        id: 'pin-3-1',
        xPercent: 50,
        yPercent: 55,
        author: 'E-Commerce Lead',
        category: 'Edge Masking',
        comment: 'Vector pen clipping path is flawless around cylindrical glass contours.',
        timestamp: 'Verified Rubric'
      }
    ]
  },
  {
    id: 'proj-4',
    slug: 'typographica-helvetica',
    title: 'Typographica Helvetica — Swiss Exhibition Identity',
    subtitle: 'Grid mathematics, asymmetric visual tension, and disciplined editorial poster composition.',
    category: 'Graphic Design',
    experienceType: 'independent_portfolio_project',
    tools: ['Adobe Illustrator', 'Adobe InDesign', 'Photoshop'],
    skills: ['Typographic Hierarchy', 'Grid Systems', 'Risograph Texture', 'Visual Rhythm'],
    summary: 'An exploration of modern international typographical style. Balances rigorous mathematical column grids with unexpected focal interruptions to command viewer attention.',
    year: '2026',
    featured: true,
    coverImage: posterImg,
    afterImage: posterImg,
    inspectionNotes: {
      title: 'Micro-Kerning & Archival Ink Texture',
      description: 'Letter-spacing meticulously calibrated for maximum optical impact; subtle tactile paper grain added in Photoshop for tangible archival quality.',
      loupeCoords: { x: 50, y: 35 }
    },
    caseStudy: {
      brief: 'Design a commemorative exhibition poster series celebrating Swiss graphic design principles in the digital era.',
      challenge: 'Creating compelling visual interest while strictly adhering to a minimal two-color palette and unadorned grotesque typography.',
      approach: 'Established a 12-column baseline grid system; deployed extreme scale contrast between the primary display header and secondary informational text; introduced a disciplined cinnabar red focal geometric mark.',
      humanJudgmentRole: 'Resisting the urge to add gratuitous graphic clutter, allowing generous negative space to amplify legibility and intellectual clarity.',
      deliverables: ['A1 Silk Screen Print Spec', 'Digital Exhibition Assets', 'Vector Master AI Files']
    },
    defaultFeedbackPins: [
      {
        id: 'pin-4-1',
        xPercent: 48,
        yPercent: 32,
        author: 'Design Director',
        category: 'Composition',
        comment: 'Strict baseline grid execution with superb optical weight balance.',
        timestamp: 'Verified Rubric'
      }
    ]
  }
];

export const WORKFLOW_STAGES = [
  {
    step: '01',
    name: 'Understand & Inspect',
    focus: 'Deconstructing the brief, technical requirements, lighting direction, and target delivery format (Print CMYK, E-Commerce sRGB, or Editorial).'
  },
  {
    step: '02',
    name: 'Edge & Alpha Isolation',
    focus: 'Hand-drawn Pen Tool clipping paths and multi-channel luminosity masking. Ensuring zero fringing, color contamination, or softened contours.'
  },
  {
    step: '03',
    name: 'Frequency & Texture Correction',
    focus: 'Non-destructive frequency separation and dual-curve dodge & burn. Fixing tonal blotches while safeguarding authentic organic grain.'
  },
  {
    step: '04',
    name: 'Color Science & Grading',
    focus: 'Curves calibration, neutral white point balancing, and specular highlight shaping for commercial-grade depth.'
  },
  {
    step: '05',
    name: 'Shadow & Perspective Synthesis',
    focus: 'Reconstructing physically accurate contact, ambient occlusion, and penumbra shadows for grounded realism.'
  },
  {
    step: '06',
    name: 'Pre-Flight QA & Delivery',
    focus: '100% zoom pixel check, color gamut verification, naming convention hygiene, and production export.'
  }
];
