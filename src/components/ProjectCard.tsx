/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUpRight, ZoomIn, MessageSquare } from 'lucide-react';
import { PortfolioProject } from '../data/portfolioData';

interface ProjectCardProps {
  project: PortfolioProject;
  onSelect: (project: PortfolioProject) => void;
  pinCount: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect, pinCount }) => {
  const formatExpType = (type: string) => {
    switch (type) {
      case 'self_initiated_commercial_study':
        return 'Commercial Study';
      case 'independent_portfolio_project':
        return 'Independent Project';
      case 'local_business_support':
        return 'Local Support';
      case 'ai_assisted_editing_study':
        return 'AI Creative Study';
      default:
        return 'Portfolio Study';
    }
  };

  return (
    <div
      onClick={() => onSelect(project)}
      className="group relative bg-[#10121a] border border-[#27272a] hover:border-amber-400/40 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 flex flex-col"
    >
      {/* Visual Image Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-zinc-950">
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-102"
          referrerPolicy="no-referrer"
        />

        {/* Hover Inspect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-5">
          <div className="flex items-center justify-between w-full text-xs text-white">
            <span className="flex items-center gap-1.5 font-medium text-amber-300">
              <ZoomIn className="w-3.5 h-3.5" />
              Open Deep Case Study
            </span>
            <span className="flex items-center gap-1 text-zinc-300">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Top Floating Mini Tag */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 bg-black/75 backdrop-blur-xs text-zinc-300 border border-white/10 rounded">
            {formatExpType(project.experienceType)}
          </span>
          {pinCount > 0 && (
            <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-950/80 backdrop-blur-xs text-amber-300 border border-amber-500/30 rounded flex items-center gap-1">
              <MessageSquare className="w-2.5 h-2.5" />
              {pinCount} {pinCount === 1 ? 'pin' : 'pins'}
            </span>
          )}
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Clean Unboxed Metadata Line (No pill enclosure!) */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1.5 font-normal">
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
            <span aria-hidden="true">·</span>
            <span className="text-zinc-500">{project.tools[0]}</span>
          </div>

          <h3 className="text-base font-semibold text-white group-hover:text-amber-300 transition-colors leading-snug">
            {project.title}
          </h3>

          <p className="text-xs text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">
            {project.subtitle}
          </p>
        </div>

        {/* Bottom Skill Indicators */}
        <div className="pt-3 border-t border-[#222430] flex items-center justify-between text-[11px] text-zinc-400">
          <span className="truncate max-w-[200px]">
            {project.skills.slice(0, 2).join(' · ')}
          </span>
          <span className="text-amber-400/80 group-hover:text-amber-300 font-medium shrink-0">
            Inspect Details →
          </span>
        </div>
      </div>
    </div>
  );
};
