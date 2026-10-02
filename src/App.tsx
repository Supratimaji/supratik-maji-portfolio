/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  SlidersHorizontal,
  ArrowRight,
  CheckCircle2,
  UserCheck,
  FileText,
  Mail,
  Phone,
  Linkedin,
  Sparkles,
  Layers,
  Wrench,
  Maximize2,
  ExternalLink,
  MessageSquarePlus,
  Send,
  Camera,
  ShieldCheck,
  Compass
} from 'lucide-react';
import {
  OWNER_INFO,
  PORTFOLIO_PROJECTS,
  RECRUITER_SKILL_VERIFICATIONS,
  WORKFLOW_STAGES,
  PortfolioProject,
  ProjectFeedbackPin
} from './data/portfolioData';
import { Navigation } from './components/Navigation';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { ProjectCard } from './components/ProjectCard';
import { RecruiterAuditDrawer } from './components/RecruiterAuditDrawer';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ResumeModal } from './components/ResumeModal';
import { InquiryModal } from './components/InquiryModal';
import { WorkAreas } from './components/WorkAreas';

export default function App() {
  // Modal & Drawer states
  const [isRecruiterDrawerOpen, setIsRecruiterDrawerOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  // Category filter state
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  // Real-time collaborative pins state per project
  const [projectPins, setProjectPins] = useState<Record<string, ProjectFeedbackPin[]>>(() => {
    const initial: Record<string, ProjectFeedbackPin[]> = {};
    PORTFOLIO_PROJECTS.forEach((p) => {
      initial[p.id] = [...p.defaultFeedbackPins];
    });
    return initial;
  });

  const handleAddPin = (projectId: string, newPin: Omit<ProjectFeedbackPin, 'id' | 'timestamp'>) => {
    const pin: ProjectFeedbackPin = {
      ...newPin,
      id: `pin-${Date.now()}`,
      timestamp: 'Just now'
    };
    setProjectPins((prev) => ({
      ...prev,
      [projectId]: [...(prev[projectId] || []), pin]
    }));
  };

  // Filtered projects
  const filteredProjects = PORTFOLIO_PROJECTS.filter((proj) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Retouching') return proj.category === 'Retouching';
    if (selectedFilter === 'Product') return proj.category === 'Product';
    if (selectedFilter === 'Image Editing') return proj.category === 'Image Editing';
    if (selectedFilter === 'Graphic Design') return proj.category === 'Graphic Design';
    if (selectedFilter === 'AI Creative') return proj.category === 'AI Creative';
    return true;
  });

  const featuredHeroProject = PORTFOLIO_PROJECTS[0];

  const handleOpenWorkAreaProject = (slug: string) => {
    const project = PORTFOLIO_PROJECTS.find((item) => item.slug === slug);
    if (project) setSelectedProject(project);
  };

  return (
    <div id="top" className="min-h-screen bg-[#090a0f] text-[#f3f4f6] font-sans antialiased selection:bg-amber-400 selection:text-black">
      
      {/* 1. Global Navigation Bar */}
      <Navigation
        onOpenRecruiterDrawer={() => setIsRecruiterDrawerOpen(true)}
        onOpenInquiryModal={() => setIsInquiryModalOpen(true)}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
      />

      <main className="space-y-24 sm:space-y-32">
        
        {/* 2. Hero Section: Split Editorial & Interactive Proof */}
        <section className="relative pt-12 sm:pt-20 pb-8 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Typographic Positioning & Fast Scan */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Quiet Text Kicker (Anti-slop: unboxed, clean text with separators) */}
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span className="text-amber-400 font-semibold">{OWNER_INFO.name}</span>
                <span aria-hidden="true">·</span>
                <span>Kolkata, India</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400">Immediate Availability</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white leading-[1.08] text-balance">
                Image Editing, Commercial Retouching &amp; AI Production.
              </h1>

              {/* Subheadline & Philosophy */}
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal max-w-xl">
                {OWNER_INFO.positioning}
              </p>

              {/* Stance Quote */}
              <div className="border-l-2 border-amber-400/80 pl-4 py-1 text-sm text-zinc-400 italic">
                "{OWNER_INFO.coreStatement}"
              </div>

              {/* Hero Action CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="#work"
                  className="px-6 py-3 bg-white text-zinc-950 font-semibold text-sm rounded-lg hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-sm"
                >
                  <span>View Selected Work</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setIsRecruiterDrawerOpen(true)}
                  className="px-5 py-3 bg-amber-950/40 border border-amber-500/40 text-amber-300 font-medium text-sm rounded-lg hover:bg-amber-900/50 hover:border-amber-400 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <UserCheck className="w-4 h-4 text-amber-400" />
                  <span>Recruiter Fast-Track</span>
                </button>

                <button
                  onClick={() => setIsResumeModalOpen(true)}
                  className="px-4 py-3 text-zinc-400 hover:text-white font-medium text-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Resume</span>
                </button>
              </div>

              {/* Verified Competencies Micro-Summary */}
              <div className="pt-6 border-t border-[#222432] flex flex-wrap gap-x-6 gap-y-2 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Sub-Pixel Pen Masking
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Frequency Separation (Anti-Plastic)
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  E-Commerce Cast Shadows
                </span>
              </div>
            </div>

            {/* Right Column: Interactive Live Before/After Hero Stage */}
            <div className="lg:col-span-6">
              <div className="relative">
                <div className="flex items-center justify-between pb-2 text-xs text-zinc-400">
                  <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                    Live Technical Demonstration
                  </span>
                  <span className="font-mono text-[11px] text-zinc-500">
                    Interactive Comparison Engine
                  </span>
                </div>

                <BeforeAfterSlider
                  afterImg={featuredHeroProject.afterImage}
                  title="Obsidian Horology — Specular & Dust Retouch"
                  subtitle="Drag divider or toggle 2.5x Loupe / Mask mode"
                  pins={projectPins[featuredHeroProject.id] || []}
                  onAddPin={(pin) => handleAddPin(featuredHeroProject.id, pin)}
                  enablePinning={true}
                />
              </div>
            </div>

          </div>
        </section>

        {/* 3. Recruiter Fast-Track Evaluation Banner */}
        <section id="recruiter-eval" className="px-6 max-w-7xl mx-auto">
          <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#121422] to-[#0e101a] border border-[#2a2e45] shadow-xl">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                  <UserCheck className="w-4 h-4" />
                  <span>DESIGN DIRECTOR &amp; RECRUITER AUDIT PANEL</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  Designed for 60-Second Creative Talent Assessment.
                </h2>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Design leads and hiring managers evaluate candidates by craftsmanship, not generic claims. Review Supratik's 6-point verified skill matrix, inspect edge sharpness, and leave collaborative feedback pins directly on project canvases.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
                <button
                  onClick={() => setIsRecruiterDrawerOpen(true)}
                  className="w-full sm:w-auto px-6 py-3 bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Open Recruiter Audit Matrix</span>
                </button>

                <button
                  onClick={() => setIsResumeModalOpen(true)}
                  className="w-full sm:w-auto px-5 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-zinc-400" />
                  <span>Candidate Resume</span>
                </button>
              </div>

            </div>

            {/* Quick Competency Grid */}
            <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
              {RECRUITER_SKILL_VERIFICATIONS.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-[11px] font-mono text-amber-400">{item.level}</div>
                  <div className="font-semibold text-white truncate" title={item.skill}>
                    {item.skill.split(' ')[0]} {item.skill.split(' ')[1]}
                  </div>
                  <div className="text-[11px] text-zinc-400 truncate">{item.tool}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Selected Work & Case Studies with Functional Filtering */}
        <section id="work" className="px-6 max-w-7xl mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#27272a]">
            <div>
              <div className="text-xs font-mono text-amber-400 mb-1">PROOF 01 &amp; 02 — REAL-WORLD ARTIFACTS</div>
              <h2 className="text-3xl font-display font-bold text-white tracking-tight">
                Selected Work &amp; Case Studies
              </h2>
              <p className="text-sm text-zinc-400 mt-1 max-w-xl">
                Every project is verified by source classification: Self-Initiated Commercial Studies, Independent Projects, and Local Business Support.
              </p>
            </div>

            {/* Interactive Segmented Filter Control (Functional button tabs) */}
            <div className="flex items-center flex-wrap gap-1 p-1 bg-[#12141f] border border-[#27272a] rounded-lg text-xs font-medium self-start md:self-end">
              {['All', 'Product', 'Retouching', 'Image Editing', 'Graphic Design'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    selectedFilter === cat
                      ? 'bg-amber-400 text-black font-semibold shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Project Bento / Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={(p) => setSelectedProject(p)}
                pinCount={(projectPins[project.id] || []).length}
              />
            ))}
          </div>

        </section>

        {/* 5. Recruiter Work Map — Main Work Areas */}
        <WorkAreas onOpenProject={handleOpenWorkAreaProject} />

        {/* 6. Proof Pillar 01 — Dedicated Editing & Retouching Deep-Dive */}
        <section id="proof-editing" className="px-6 max-w-7xl mx-auto space-y-8">
          
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono text-amber-400">PROOF 01 — EDITING CRAFT</span>
            <h2 className="text-3xl font-display font-bold text-white tracking-tight">
              Natural Beauty Retouching &amp; Frequency Separation
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              True professional retouching respects anatomy. Contrast this against generic AI airbrushing: every freckle, pore, and specular window reflection is preserved naturally.
            </p>
          </div>

          {/* Interactive Inspection for Portrait */}
          <div className="w-full">
            <BeforeAfterSlider
              afterImg={PORTFOLIO_PROJECTS[1].afterImage}
              title="Natural Radiance — Editorial Beauty Portrait"
              subtitle="Inspect cheekbone pore structure and eye micro-reflections with the 2.5x Loupe"
              pins={projectPins[PORTFOLIO_PROJECTS[1].id] || []}
              onAddPin={(pin) => handleAddPin(PORTFOLIO_PROJECTS[1].id, pin)}
              enablePinning={true}
            />
          </div>

          {/* 3 Pillars of Retouching Rigor */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-5 rounded-xl bg-[#10121b] border border-[#27272a] space-y-2">
              <h3 className="text-sm font-semibold text-white">01. 16-Bit Frequency Separation</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Separating high-frequency skin textures from low-frequency color transitions prevents color smearing and preserves authentic tactile grain.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#10121b] border border-[#27272a] space-y-2">
              <h3 className="text-sm font-semibold text-white">02. Micro Dodge &amp; Burn</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Gradual luminance sculpting using 50% gray overlay layers and localized curve masks, avoiding disruptive pixel-shifting algorithms.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#10121b] border border-[#27272a] space-y-2">
              <h3 className="text-sm font-semibold text-white">03. Eye &amp; Hair Edge Refinement</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Multi-channel luminosity masking to isolate flyaway hairs cleanly against diverse studio backdrops with zero harsh fringing.
              </p>
            </div>
          </div>

        </section>

        {/* 6. Proof Pillar 03 — Evolution: The AI Creative Lab */}
        <section className="px-6 max-w-7xl mx-auto space-y-8">
          
          <div className="p-8 sm:p-10 rounded-2xl bg-[#0f111a] border border-[#27272a] space-y-8">
            <div className="max-w-3xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>PROOF 03 — AI-ERA CREATIVE LAB &amp; EVOLUTION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                How Modern AI Accelerates Visual Production Without Sacrificing Judgment.
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed">
                AI is treated strictly as an exploration accelerator, not a replacement for Photoshop mastery. Here is how Supratik bridges generative concepting with disciplined commercial finishing.
              </p>
            </div>

            {/* Workflow Progression: Idea -> AI Direction -> Human Finishing */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              
              <div className="p-4 rounded-xl bg-[#151724] border border-[#27293d] space-y-2">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">Stage 01</span>
                <h4 className="font-semibold text-white">Creative Brief &amp; Stance</h4>
                <p className="text-zinc-400 leading-relaxed">
                  Defining product silhouettes, lighting requirements, and target commercial context before invoking any generative tool.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#151724] border border-[#27293d] space-y-2">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">Stage 02</span>
                <h4 className="font-semibold text-white">AI Concept Acceleration</h4>
                <p className="text-zinc-400 leading-relaxed">
                  Generating 20+ compositional and material direction variations in minutes to explore radical layout angles.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#151724] border border-[#27293d] space-y-2">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">Stage 03</span>
                <h4 className="font-semibold text-white">Human Discrimination</h4>
                <p className="text-zinc-400 leading-relaxed">
                  Identifying AI flaws: anatomical distortions, impossible reflections, blurry edges, and synthetic texture smudges.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#151724] border border-amber-500/30 space-y-2">
                <span className="text-[10px] font-mono text-amber-300 uppercase tracking-wider block">Stage 04</span>
                <h4 className="font-semibold text-white">Photoshop Craft &amp; Finish</h4>
                <p className="text-zinc-300 leading-relaxed">
                  Manual vector clipping paths, authentic texture overlays, accurate shadow geometry, and typography integration.
                </p>
              </div>

            </div>

            {/* Core Philosophy Banner */}
            <div className="pt-4 border-t border-[#222434] flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-400">
              <span className="text-zinc-300 font-medium italic">
                "AI provides infinite rough clay; human Photoshop craft sculpts the finished commercial asset."
              </span>
              <button
                onClick={() => setIsInquiryModalOpen(true)}
                className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 cursor-pointer"
              >
                Discuss an AI-Assisted Visual Project →
              </button>
            </div>
          </div>

        </section>

        {/* 7. Workflow & Standards Section */}
        <section id="workflow" className="px-6 max-w-7xl mx-auto space-y-8">
          
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono text-amber-400">DISCIPLINE &amp; HYGIENE</span>
            <h2 className="text-3xl font-display font-bold text-white tracking-tight">
              Standard 6-Phase Editing Workflow
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Every deliverable follows a repeatable, non-destructive layer pipeline ensuring instant revisions, organized master PSDs, and uncompromised print/web exports.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WORKFLOW_STAGES.map((stage) => (
              <div
                key={stage.step}
                className="p-6 rounded-xl bg-[#10121b] border border-[#27272a] space-y-3 hover:border-[#3b3f54] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    STAGE {stage.step}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                </div>
                <h3 className="text-base font-semibold text-white">{stage.name}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{stage.focus}</p>
              </div>
            ))}
          </div>

        </section>

        {/* 8. Candidate Background & Leadership */}
        <section className="px-6 max-w-7xl mx-auto">
          <div className="p-8 sm:p-10 rounded-2xl bg-[#0c0d15] border border-[#27272a] space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-amber-400">TRUTHFUL BACKGROUND</span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight mt-1">
                  Experience &amp; Leadership Track Record
                </h2>
              </div>

              <button
                onClick={() => setIsResumeModalOpen(true)}
                className="self-start md:self-auto px-4 py-2 text-xs font-semibold text-zinc-950 bg-white hover:bg-zinc-200 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Full Resume</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              <div className="p-5 rounded-xl bg-[#12141f] border border-[#222432] space-y-2">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Commercial Retouching</span>
                <h4 className="text-sm font-semibold text-white">Product Photo Editing &amp; Local Business Support</h4>
                <p className="text-zinc-400 leading-relaxed">
                  Executing vector clipping paths, neutral color balance, and realistic travertine/pure-white cast shadows for indie brand goods.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#12141f] border border-[#222432] space-y-2">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Institutional Leadership</span>
                <h4 className="text-sm font-semibold text-white">Technical Head — Entrepreneurship Cell</h4>
                <p className="text-zinc-400 leading-relaxed">
                  Directed visual communication, promotional graphics, speaker announcements, and branding systems for student startup events.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#12141f] border border-[#222432] space-y-2">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Self-Initiated Studies</span>
                <h4 className="text-sm font-semibold text-white">Editorial Beauty &amp; Luxury Horology Retouching</h4>
                <p className="text-zinc-400 leading-relaxed">
                  Rigorous independent projects verifying 16-bit frequency separation, sub-pixel specular cleanup, and print-ready CMYK proofing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Final Recruiter & Client CTA / Contact Section */}
        <section id="contact" className="px-6 max-w-7xl mx-auto pb-12">
          <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-[#131522] to-[#0c0d14] border border-[#2c3048] text-center space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Immediate Hire / Contract</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight max-w-2xl mx-auto">
              Ready to elevate your visual production?
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
              Whether you need commercial product photo editing, high-fashion natural retouching, or an immediate creative talent hire in your design team.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setIsInquiryModalOpen(true)}
                className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-semibold text-sm rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>Start a Project / Send Inquiry</span>
              </button>

              <button
                onClick={() => setIsRecruiterDrawerOpen(true)}
                className="px-6 py-3.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium text-sm rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span>Open Recruiter Review Panel</span>
              </button>

              <a
                href={OWNER_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3.5 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 font-medium text-sm rounded-lg transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp: {OWNER_INFO.phone}</span>
              </a>
            </div>

            {/* Direct Coordinates */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400">
              <a href={`mailto:${OWNER_INFO.email}`} className="hover:text-white flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                {OWNER_INFO.email}
              </a>
              <span>·</span>
              <a href={OWNER_INFO.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                LinkedIn Profile
              </a>
              <span>·</span>
              <span>{OWNER_INFO.location}</span>
            </div>

          </div>
        </section>

      </main>

      {/* 10. Clean Minimalist Footer */}
      <footer className="border-t border-[#27272a] bg-[#07080c] py-8 px-6 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-semibold text-zinc-300">{OWNER_INFO.name}</span>
            <span className="mx-2">·</span>
            <span>Image Editing &amp; AI-Assisted Visual Production</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#top" className="hover:text-zinc-300 transition-colors">
              Back to Top ↑
            </a>
            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="hover:text-zinc-300 transition-colors cursor-pointer"
            >
              Resume
            </button>
            <button
              onClick={() => setIsInquiryModalOpen(true)}
              className="hover:text-zinc-300 transition-colors cursor-pointer"
            >
              Inquire
            </button>
          </div>
        </div>
      </footer>

      {/* Drawers & Modals */}
      <RecruiterAuditDrawer
        isOpen={isRecruiterDrawerOpen}
        onClose={() => setIsRecruiterDrawerOpen(false)}
        pins={projectPins}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
        onOpenInquiryModal={() => setIsInquiryModalOpen(true)}
      />

      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        pins={selectedProject ? projectPins[selectedProject.id] || [] : []}
        onAddPin={(pin) => {
          if (selectedProject) handleAddPin(selectedProject.id, pin);
        }}
        onOpenInquiryModal={() => setIsInquiryModalOpen(true)}
      />

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        onOpenInquiryModal={() => setIsInquiryModalOpen(true)}
      />

      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
      />

    </div>
  );
}
