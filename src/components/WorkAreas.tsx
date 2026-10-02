import React from 'react';

interface WorkArea {
  number: string;
  title: string;
  description: string;
  tags: string[];
  evidenceSlug?: string;
  evidenceProjectLabel?: string;
}

const WORK_AREAS: WorkArea[] = [
  {
    number: '01',
    title: 'Background Removal & Masking',
    description: 'Clean subject isolation, edge refinement, hair and fabric handling, and background cleanup for product and commercial imagery.',
    tags: ['Background Removal', 'Masking', 'Edge Refinement'],
    evidenceSlug: 'aura-botanical',
    evidenceProjectLabel: 'Aura Botanical'
  },
  {
    number: '02',
    title: 'Image Transformation & Compositing',
    description: 'Transforming source imagery through composition, cleanup, replacement, lighting adjustment and controlled visual integration.',
    tags: ['Compositing', 'Image Transformation', 'Visual Cleanup']
  },
  {
    number: '03',
    title: 'Poster Design & Editing',
    description: 'Editorial posters, promotional artwork, typography-led layouts and visual refinements for digital or print presentation.',
    tags: ['Poster Design', 'Typography', 'Layout'],
    evidenceSlug: 'typographica-helvetica',
    evidenceProjectLabel: 'Typographica Helvetica'
  },
  {
    number: '04',
    title: 'Logo & Brand Visual Creation',
    description: 'Logo studies, brand marks, visual identity exploration and supporting graphic assets with a focus on clarity and application.',
    tags: ['Logo Design', 'Brand Visuals', 'Identity Studies']
  },
  {
    number: '05',
    title: 'Thumbnail Creation',
    description: 'High-impact thumbnail concepts for YouTube, social content and digital campaigns with clear hierarchy and strong visual focus.',
    tags: ['YouTube Thumbnails', 'Social Creative', 'Composition']
  },
  {
    number: '06',
    title: 'Headshot Retouching',
    description: 'Professional headshot cleanup, skin refinement, tonal balance, hair cleanup and background refinement while retaining natural detail.',
    tags: ['Headshot', 'Skin Retouching', 'Color Correction']
  },
  {
    number: '07',
    title: 'Portrait Retouching',
    description: 'Natural portrait and editorial retouching focused on believable skin texture, cleanup, tone and controlled enhancement.',
    tags: ['Portrait', 'Natural Retouching', 'Dodge & Burn'],
    evidenceSlug: 'natural-radiance',
    evidenceProjectLabel: 'Natural Radiance'
  },
  {
    number: '08',
    title: 'Jewelry Retouching',
    description: 'Detail-focused jewelry cleanup, tonal correction, reflection control, color consistency and commercial presentation.',
    tags: ['Jewelry', 'Detail Cleanup', 'Reflection Control']
  },
  {
    number: '09',
    title: 'Product Image Retouching',
    description: 'Commercial product cleanup, tonal correction, detail enhancement, surface refinement and presentation for e-commerce imagery.',
    tags: ['Product Retouching', 'Detail', 'Commercial'],
    evidenceSlug: 'obsidian-horology',
    evidenceProjectLabel: 'Obsidian Horology'
  },
  {
    number: '10',
    title: 'E-commerce Image Editing',
    description: 'Catalog-ready visual preparation including consistent crops, backgrounds, color, alignment and clean product presentation.',
    tags: ['E-commerce', 'Catalog', 'Consistency'],
    evidenceSlug: 'aura-botanical',
    evidenceProjectLabel: 'Aura Botanical'
  },
  {
    number: '11',
    title: 'Creative Image Generation',
    description: 'AI-assisted concept development for campaign visuals, creative directions and image-generation studies followed by human selection and refinement.',
    tags: ['AI Creative', 'Image Generation', 'Art Direction']
  },
  {
    number: '12',
    title: 'AI-assisted Image Editing',
    description: 'Using AI as an exploration and acceleration layer, followed by manual visual review, compositing and finishing.',
    tags: ['AI-assisted Editing', 'Visual Exploration', 'Human Refinement']
  },
  {
    number: '13',
    title: 'Color Correction & Image Cleanup',
    description: 'Color and exposure adjustments, cleanup, consistency work and final visual preparation across a set of images.',
    tags: ['Color Correction', 'Cleanup', 'Consistency'],
    evidenceSlug: 'obsidian-horology',
    evidenceProjectLabel: 'Obsidian Horology'
  },
  {
    number: '14',
    title: 'Photo Restoration',
    description: 'Restoration studies covering damaged-image cleanup, repair, tonal balancing and careful preservation of recognizable detail.',
    tags: ['Restoration', 'Repair', 'Tone']
  }
];

interface WorkAreasProps {
  onOpenProject?: (slug: string) => void;
}

export const WorkAreas: React.FC<WorkAreasProps> = ({ onOpenProject }) => {
  return (
    <section id="work-areas" className="px-6 max-w-7xl mx-auto space-y-8">
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-mono text-amber-400">RECRUITER WORK MAP</div>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
          Main Work &amp; Portfolio Areas
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
          A clear view of the image-editing, retouching, commercial, graphic and AI-assisted work areas covered by this portfolio. Each capability is separated from portfolio evidence so the site never implies a completed project where a dedicated sample has not yet been added.
        </p>
      </div>

      <div className="border-y border-[#27272a]">
        {WORK_AREAS.map((area) => (
          <div
            key={area.number}
            className="group grid grid-cols-[48px_minmax(0,1fr)] lg:grid-cols-[72px_minmax(0,1fr)_240px] gap-4 lg:gap-8 py-6 border-b border-[#27272a] last:border-b-0"
          >
            <div className="font-mono text-xs text-zinc-600 pt-1">{area.number}</div>

            <div className="space-y-2 min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-amber-300 transition-colors">
                  {area.title}
                </h3>
                <span className="text-[11px] font-mono text-zinc-600">
                  {area.evidenceSlug ? 'EVIDENCE LINKED' : 'DEDICATED SAMPLE TO ADD'}
                </span>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed max-w-3xl">
                {area.description}
              </p>

              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-zinc-500">
                {area.tags.map((tag, index) => (
                  <React.Fragment key={tag}>
                    {index > 0 && <span aria-hidden="true">·</span>}
                    <span>{tag}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="flex lg:justify-end items-start lg:items-center pt-1">
              {area.evidenceSlug && onOpenProject ? (
                <button
                  type="button"
                  onClick={() => onOpenProject(area.evidenceSlug!)}
                  className="text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                >
                  {area.evidenceProjectLabel ? `View ${area.evidenceProjectLabel}` : 'View related work'} →
                </button>
              ) : (
                <span className="text-xs text-zinc-600">Sample pending</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 text-[11px] font-mono text-zinc-600">
        RECRUITER NOTE · Capability categories are intentionally broader than the current published evidence. Add only genuine source/result work before marking additional areas as evidence-linked.
      </div>
    </section>
  );
};
