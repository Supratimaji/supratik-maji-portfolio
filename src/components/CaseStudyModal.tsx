/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Check, Wrench, Layers, Sparkles, ExternalLink } from 'lucide-react';
import { PortfolioProject, ProjectFeedbackPin } from '../data/portfolioData';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface CaseStudyModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  pins: ProjectFeedbackPin[];
  onAddPin: (pin: Omit<ProjectFeedbackPin, 'id' | 'timestamp'>) => void;
  onOpenInquiryModal: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  pins,
  onAddPin,
  onOpenInquiryModal
}) => {
  if (!project) return null;

  // Format experience type cleanly without pill cages
  const formatExpType = (type: string) => {
    switch (type) {
      case 'self_initiated_commercial_study':
        return 'Self-Initiated Commercial Study';
      case 'independent_portfolio_project':
        return 'Independent Portfolio Project';
      case 'local_business_support':
        return 'Local Business Support';
      case 'ai_assisted_editing_study':
        return 'AI-Assisted Editing Study';
      default:
        return 'Portfolio Study';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="w-full max-w-5xl bg-[#0d0e15] border border-[#27272a] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-zinc-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-[#27272a] bg-[#10121b] flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-amber-400">
              {formatExpType(project.experienceType)}
            </span>
            <h2 className="text-lg font-display font-bold text-white tracking-tight mt-0.5">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Interactive Inspection Canvas with Before/After Slider & Pins */}
          <div>
            <div className="flex items-center justify-between mb-3 text-xs text-zinc-400">
              <span className="font-semibold text-zinc-200">Interactive Technical Inspection & Pin Canvas</span>
              <span className="text-[11px] text-zinc-400">Click canvas to drop team review note</span>
            </div>

            <BeforeAfterSlider
              afterImg={project.afterImage}
              title={project.inspectionNotes.title}
              subtitle={project.inspectionNotes.description}
              pins={pins}
              onAddPin={onAddPin}
              enablePinning={true}
            />
          </div>

          {/* Clean Unboxed Metadata Line (Anti-Slop rule) */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 border-y border-[#27272a] py-3.5">
            <span className="text-zinc-200 font-medium">Tools: {project.tools.join(', ')}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>Category: {project.category}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>Year: {project.year}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-amber-400/90">{formatExpType(project.experienceType)}</span>
          </div>

          {/* Editorial Case Study Story Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            {/* Column 1: Context & Problem */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xs uppercase tracking-wider text-amber-400 font-bold mb-2">
                  01. The Commercial Brief
                </h3>
                <p className="text-zinc-300 leading-relaxed">
                  {project.caseStudy.brief}
                </p>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-wider text-amber-400 font-bold mb-2">
                  02. Technical Challenge
                </h3>
                <p className="text-zinc-300 leading-relaxed">
                  {project.caseStudy.challenge}
                </p>
              </div>
            </div>

            {/* Column 2: Execution & Human Craft */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xs uppercase tracking-wider text-amber-400 font-bold mb-2">
                  03. The Editing Approach
                </h3>
                <p className="text-zinc-300 leading-relaxed">
                  {project.caseStudy.approach}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#131522] border border-amber-500/20 space-y-2">
                <h3 className="text-xs uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  04. Human Creative Judgment Control
                </h3>
                <p className="text-zinc-300 text-xs leading-relaxed">
                  {project.caseStudy.humanJudgmentRole}
                </p>
              </div>
            </div>
          </div>

          {/* Deliverables Spec */}
          <div className="pt-4 border-t border-[#27272a]">
            <h3 className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-3">
              Standard Deliverables & Production Hygiene
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.caseStudy.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-[#11131c] border border-[#232635] text-xs text-zinc-300 flex items-center gap-2"
                >
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-4 border-t border-[#27272a] bg-[#10121b] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            ← Return to Portfolio
          </button>

          <button
            onClick={onOpenInquiryModal}
            className="px-4 py-2 text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 rounded-md transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>Inquire About This Project Type</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
