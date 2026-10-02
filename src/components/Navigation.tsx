/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { OWNER_INFO } from '../data/portfolioData';
import { UserCheck, Send, Menu, X, FileText } from 'lucide-react';

interface NavigationProps {
  onOpenRecruiterDrawer: () => void;
  onOpenInquiryModal: () => void;
  onOpenResumeModal: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onOpenRecruiterDrawer,
  onOpenInquiryModal,
  onOpenResumeModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#27272a] bg-[#090a0f]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text element Brand Zone */}
        <a 
          href="#top" 
          className="text-lg font-display font-bold tracking-tight text-white hover:text-amber-400 transition-colors shrink-0"
        >
          {OWNER_INFO.name}
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#work" className="hover:text-white transition-colors">
            Selected Work
          </a>
          <a href="#proof-editing" className="hover:text-white transition-colors">
            Editing Proof
          </a>
          <a href="#recruiter-eval" className="hover:text-white transition-colors">
            Recruiter Matrix
          </a>
          <a href="#workflow" className="hover:text-white transition-colors">
            Process
          </a>
          <button 
            onClick={onOpenResumeModal}
            className="hover:text-white transition-colors text-left flex items-center gap-1.5 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-zinc-400" />
            Resume
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenRecruiterDrawer}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-amber-300 bg-amber-950/40 border border-amber-500/30 rounded-md hover:bg-amber-900/50 hover:border-amber-500/50 transition-colors cursor-pointer"
            title="Fast 60-second design candidate evaluation with skill verification & feedback pins"
          >
            <UserCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Recruiter Review Mode</span>
          </button>

          <button
            onClick={onOpenInquiryModal}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-zinc-950 bg-white rounded-md hover:bg-zinc-200 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Start a Project</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#27272a] bg-[#0c0d14] px-6 py-5 flex flex-col gap-4 text-sm font-medium">
          <a 
            href="#work" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-300 hover:text-white"
          >
            Selected Work
          </a>
          <a 
            href="#proof-editing" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-300 hover:text-white"
          >
            Editing Proof (Interactive)
          </a>
          <a 
            href="#recruiter-eval" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-300 hover:text-white"
          >
            Recruiter Skill Matrix
          </a>
          <a 
            href="#workflow" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-300 hover:text-white"
          >
            Workflow & Standards
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenResumeModal();
            }}
            className="text-left text-zinc-300 hover:text-white flex items-center gap-2"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            View Resume
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenRecruiterDrawer();
            }}
            className="w-full text-left py-2 px-3 bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs rounded font-medium flex items-center gap-2"
          >
            <UserCheck className="w-4 h-4" />
            Open Recruiter Evaluation Mode
          </button>
        </div>
      )}
    </header>
  );
};
