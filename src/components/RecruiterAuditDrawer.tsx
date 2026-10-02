/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Copy,
  ExternalLink,
  MessageSquare,
  FileText,
  Mail,
  Phone,
  Linkedin,
  Sparkles,
  Share2
} from 'lucide-react';
import {
  OWNER_INFO,
  RECRUITER_SKILL_VERIFICATIONS,
  PORTFOLIO_PROJECTS,
  ProjectFeedbackPin
} from '../data/portfolioData';

interface RecruiterAuditDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  pins: Record<string, ProjectFeedbackPin[]>;
  onOpenResumeModal: () => void;
  onOpenInquiryModal: () => void;
}

export const RecruiterAuditDrawer: React.FC<RecruiterAuditDrawerProps> = ({
  isOpen,
  onClose,
  pins,
  onOpenResumeModal,
  onOpenInquiryModal
}) => {
  const [copiedBrief, setCopiedBrief] = useState(false);
  const [activeTab, setActiveTab] = useState<'matrix' | 'feedback' | 'snapshot'>('matrix');

  if (!isOpen) return null;

  // Flatten all pins across projects
  const allPins = Object.entries(pins).flatMap(([projId, projPins]) => {
    const proj = PORTFOLIO_PROJECTS.find((p) => p.id === projId);
    return projPins.map((p) => ({ ...p, projectTitle: proj?.title || 'Project' }));
  });

  const handleCopyEvaluationBrief = () => {
    const lines = [
      `# Candidate Evaluation Brief: ${OWNER_INFO.name}`,
      `Positioning: ${OWNER_INFO.positioning}`,
      `Location: ${OWNER_INFO.location}`,
      `Availability: ${OWNER_INFO.availability}`,
      `Contact: ${OWNER_INFO.email} | ${OWNER_INFO.phone}`,
      '',
      '## Verified Technical Competencies:',
      ...RECRUITER_SKILL_VERIFICATIONS.map(
        (s) => `- ${s.skill} [${s.level}]: ${s.rubric} (${s.tool})`
      ),
      '',
      '## Design Team Review Notes & Pinned Observations:',
      ...allPins.map(
        (p) => `- [${p.category}] on "${p.projectTitle}": "${p.comment}" — ${p.author}`
      ),
      '',
      `Resume & Inquiry Form: ${OWNER_INFO.googleFormUrl}`
    ];

    navigator.clipboard.writeText(lines.join('\n'));
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl h-full bg-[#0d0e15] border-l border-[#27272a] shadow-2xl flex flex-col overflow-hidden text-zinc-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="recruiter-drawer-title"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#27272a] bg-[#10121b] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <h2 id="recruiter-drawer-title" className="text-base font-display font-bold text-white tracking-tight">
                Recruiter & Design Lead Evaluation Mode
              </h2>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              60-Second Fast-Track review, verified skill rubric, and team feedback notes.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close Recruiter Evaluation Panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Candidate Mini Snapshot Bar */}
        <div className="px-6 py-3.5 bg-[#141622] border-b border-[#27272a] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div>
              <span className="font-semibold text-white">{OWNER_INFO.name}</span>
              <span className="text-zinc-500 mx-1.5">·</span>
              <span className="text-zinc-400">{OWNER_INFO.location}</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
              Immediate Availability
            </span>
          </div>

          <div className="flex items-center gap-3 text-zinc-400">
            <a
              href={`mailto:${OWNER_INFO.email}`}
              className="hover:text-amber-300 transition-colors flex items-center gap-1"
              title="Send Direct Email"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
            <a
              href={OWNER_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1"
              title="Chat on WhatsApp"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <a
              href={OWNER_INFO.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-400 transition-colors flex items-center gap-1"
              title="Open LinkedIn Profile"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-3 border-b border-[#27272a] flex gap-6 text-xs font-medium">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'matrix'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            Skill Verification Matrix ({RECRUITER_SKILL_VERIFICATIONS.length})
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'feedback'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <span>Team Review Pins</span>
            <span className="px-1.5 py-0.2 rounded-full bg-zinc-800 text-[10px] text-zinc-300">
              {allPins.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('snapshot')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'snapshot'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            Positioning & Principles
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'matrix' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-zinc-400 pb-1">
                <span>Evaluated Competencies</span>
                <span className="text-[11px] text-amber-400/90">Based on live portfolio evidence</span>
              </div>

              {RECRUITER_SKILL_VERIFICATIONS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-[#12141f] border border-[#232638] space-y-2 hover:border-[#383d59] transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-semibold text-white">{item.skill}</h4>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800/80 text-amber-300 border border-zinc-700 shrink-0">
                      {item.level}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed">{item.rubric}</p>

                  <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-400">
                    <div>
                      Verified in: <span className="text-zinc-200">{item.verifiedIn}</span>
                    </div>
                    <div className="font-mono text-zinc-400">Primary: {item.tool}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-lg bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed">
                Design leads and recruiters can click anywhere on the portfolio's interactive Before/After viewer to place review pins. Below are the pinned evaluation notes collected across projects.
              </div>

              <div className="space-y-3">
                {allPins.length === 0 ? (
                  <div className="text-center py-8 text-zinc-500 text-xs">
                    No pins added yet. Click on any interactive canvas to drop review notes.
                  </div>
                ) : (
                  allPins.map((pin, i) => (
                    <div
                      key={pin.id || i}
                      className="p-3.5 rounded-lg bg-[#12141f] border border-[#27272a] space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-amber-300">{pin.category}</span>
                        <span className="text-[10px] text-zinc-500 font-mono">{pin.timestamp}</span>
                      </div>
                      <p className="text-xs text-zinc-200 leading-relaxed">{pin.comment}</p>
                      <div className="text-[11px] text-zinc-400 flex items-center justify-between pt-1">
                        <span>Project: {pin.projectTitle}</span>
                        <span className="text-zinc-300">By {pin.author}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'snapshot' && (
            <div className="space-y-5 text-xs text-zinc-300">
              <div className="p-4 rounded-lg bg-[#12141f] border border-[#27272a] space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold block">
                  Candidate Philosophy
                </span>
                <p className="text-sm font-display font-medium text-white italic">
                  "{OWNER_INFO.coreStatement}"
                </p>
                <p className="leading-relaxed text-zinc-400">
                  {OWNER_INFO.positioning}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#12141f] border border-[#27272a] space-y-2.5">
                <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold block">
                  Core Production Stack
                </span>
                <ul className="grid grid-cols-2 gap-2 text-zinc-200">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    Adobe Photoshop (16-bit Master)
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    Adobe Lightroom / Camera Raw
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    Adobe Illustrator / InDesign
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    Generative Concept Acceleration
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-[#12141f] border border-[#27272a] space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold block">
                  Truthful Project Classifications
                </span>
                <p className="text-zinc-400 leading-relaxed">
                  Every asset is strictly labeled by source: Self-Initiated Commercial Study, Independent Portfolio Project, Local Business Support, or AI-Assisted Editing Study. Zero fabricated agency client claims.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Action Footer */}
        <div className="p-4 border-t border-[#27272a] bg-[#10121b] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyEvaluationBrief}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-200 bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors cursor-pointer"
              title="Copy complete rubric and notes formatted for team review"
            >
              <Copy className="w-3.5 h-3.5 text-amber-400" />
              <span>{copiedBrief ? 'Copied Brief to Clipboard!' : 'Copy Evaluation Brief'}</span>
            </button>

            <button
              onClick={onOpenResumeModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-200 bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-zinc-300" />
              <span>View Resume</span>
            </button>
          </div>

          <button
            onClick={onOpenInquiryModal}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors cursor-pointer"
          >
            <span>Proceed to Interview / Form</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
