/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Download, Printer, Mail, Phone, MapPin, Linkedin, CheckCircle2 } from 'lucide-react';
import { OWNER_INFO, RECRUITER_SKILL_VERIFICATIONS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiryModal: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  onOpenInquiryModal
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="w-full max-w-3xl bg-[#0d0e15] border border-[#27272a] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-zinc-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-title"
      >
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-[#27272a] bg-[#10121b] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 id="resume-title" className="text-base font-display font-bold text-white tracking-tight">
              Verified Candidate Resume — {OWNER_INFO.name}
            </h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
              Immediate Availability
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Close Resume"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Sheet */}
        <div className="flex-1 overflow-y-auto p-8 sm:p-10 space-y-8 bg-[#0a0b10] text-zinc-300 font-sans">
          
          {/* Resume Header Lockup */}
          <div className="border-b border-[#27272a] pb-6 space-y-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                {OWNER_INFO.name}
              </h1>
              <span className="text-xs font-mono text-amber-400">
                Kolkata, West Bengal, India
              </span>
            </div>

            <p className="text-sm text-zinc-300 font-medium">
              {OWNER_INFO.positioning}
            </p>

            {/* Contact Row */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-1">
              <a href={`mailto:${OWNER_INFO.email}`} className="hover:text-white flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                {OWNER_INFO.email}
              </a>
              <span>·</span>
              <a href={OWNER_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                {OWNER_INFO.phone}
              </a>
              <span>·</span>
              <a href={OWNER_INFO.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                linkedin.com/in/supratik-maji-614a6525a
              </a>
            </div>
          </div>

          {/* Core Philosophy Section */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-wider text-amber-400 font-bold">
              Professional Stance
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic border-l-2 border-amber-400/60 pl-3">
              "{OWNER_INFO.coreStatement} Dedicated to pixel-level edge masking, natural skin texture preservation (frequency separation without artificial airbrushing), and disciplined commercial visual standardization."
            </p>
          </div>

          {/* Technical Specializations */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider text-amber-400 font-bold">
              Core Technical Competencies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-[#11131c] border border-[#232635] space-y-1">
                <div className="font-semibold text-white">Commercial Image Editing & Isolation</div>
                <p className="text-zinc-400">Sub-pixel Pen Tool vector clipping paths, hair and transparent glass alpha masking, color de-contamination.</p>
              </div>
              <div className="p-3 rounded-lg bg-[#11131c] border border-[#232635] space-y-1">
                <div className="font-semibold text-white">High-End Portrait & Product Retouching</div>
                <p className="text-zinc-400">16-bit frequency separation, micro dodge & burn, specular highlight shaping, specular dust cleanup.</p>
              </div>
              <div className="p-3 rounded-lg bg-[#11131c] border border-[#232635] space-y-1">
                <div className="font-semibold text-white">Shadow & Lighting Synthesis</div>
                <p className="text-zinc-400">Reconstructing realistic 3-stage contact, ambient occlusion, and penumbra drop shadows for e-commerce catalogs.</p>
              </div>
              <div className="p-3 rounded-lg bg-[#11131c] border border-[#232635] space-y-1">
                <div className="font-semibold text-white">AI-Assisted Workflow Integration</div>
                <p className="text-zinc-400">Utilizing generative visual models for rapid concept ideation, backed by manual Photoshop composite and texture refinement.</p>
              </div>
            </div>
          </div>

          {/* Truthful Background & Experience */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-wider text-amber-400 font-bold">
              Experience & Project Background
            </h3>

            <div className="space-y-4">
              <div className="border-l border-zinc-800 pl-4 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">Product Photo Editing & Visual Standardization</span>
                  <span className="font-mono text-zinc-400">Personal / Local Business Support</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Executing clipping paths, color cast removal, and realistic travertine/pure-white shadow synthesis for indie brand skincare bottles and retail goods.
                </p>
              </div>

              <div className="border-l border-zinc-800 pl-4 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">Technical Head — Entrepreneurship Development Cell</span>
                  <span className="font-mono text-zinc-400">Institutional Leadership</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Supervised design output, promotional posters, speaker announcements, and visual identity collateral for collegiate innovation initiatives.
                </p>
              </div>

              <div className="border-l border-zinc-800 pl-4 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">Independent Commercial Retouching Studies</span>
                  <span className="font-mono text-zinc-400">Self-Initiated Portfolio</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  High-fashion editorial beauty retouching focusing on pore preservation, and luxury timepiece advertising macro cleanup.
                </p>
              </div>
            </div>
          </div>

          {/* Software & Tools */}
          <div className="pt-2 border-t border-[#27272a] flex flex-wrap items-center justify-between gap-4 text-xs">
            <div>
              <span className="text-zinc-400">Primary Software: </span>
              <span className="text-zinc-200 font-medium">Adobe Photoshop, Camera Raw, Illustrator, InDesign</span>
            </div>
            <div>
              <span className="text-zinc-400">Generative Tools: </span>
              <span className="text-zinc-200 font-medium">Midjourney, Photoshop Neural Filters</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[#27272a] bg-[#10121b] flex items-center justify-between">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download / Print PDF</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenInquiryModal();
            }}
            className="px-4 py-2 text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 rounded-md transition-colors cursor-pointer"
          >
            Contact for Hire / Schedule Interview
          </button>
        </div>
      </div>
    </div>
  );
};
