/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Send, Copy, ExternalLink, Mail, Phone, CheckCircle2, MessageSquare } from 'lucide-react';
import { OWNER_INFO } from '../data/portfolioData';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [workType, setWorkType] = useState('Product Photo Editing & Retouching');
  const [timeline, setTimeline] = useState('Immediate / 1–2 Weeks');
  const [details, setDetails] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Build centralized Google Form or mailto fallback
  const handleLaunchGoogleForm = (e: React.FormEvent) => {
    e.preventDefault();
    // Centralized Google Form URL with parameters or direct launch
    // Create mailto fallback pre-filled
    const subject = encodeURIComponent(`Project / Hire Inquiry: ${workType} — ${name || 'Prospective Client'}`);
    const body = encodeURIComponent(
      `Hi Supratik,\n\nI am contacting you regarding ${workType}.\n\nDetails:\n${details}\n\nTimeline: ${timeline}\nContact: ${name} (${email} / ${phone})\n\nSent from Supratik Maji Portfolio`
    );
    window.open(`mailto:${OWNER_INFO.email}?subject=${subject}&body=${body}`, '_blank');
  };

  const handleCopyInquiry = () => {
    const text = [
      `Inquiry for Supratik Maji:`,
      `Service: ${workType}`,
      `Client: ${name || 'Hiring Manager / Client'}`,
      `Email: ${email}`,
      `Phone/WhatsApp: ${phone}`,
      `Timeline: ${timeline}`,
      `Requirement: ${details || 'Discussion on prospective role / project scope.'}`
    ].join('\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="w-full max-w-xl bg-[#0d0e15] border border-[#27272a] rounded-2xl shadow-2xl overflow-hidden flex flex-col text-zinc-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-title"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#27272a] bg-[#10121b] flex items-center justify-between">
          <div>
            <h2 id="inquiry-title" className="text-base font-display font-bold text-white tracking-tight">
              Start a Project / Recruiter Contact
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Direct connection with Supratik Maji · Immediate Availability
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close Inquiry Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Quick Contact Coordinates */}
          <div className="p-4 rounded-xl bg-[#12141f] border border-[#232635] flex flex-wrap items-center justify-between gap-4 text-xs">
            <div>
              <div className="font-semibold text-white">{OWNER_INFO.name}</div>
              <div className="text-zinc-400">{OWNER_INFO.location}</div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`mailto:${OWNER_INFO.email}`}
                className="px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>{OWNER_INFO.email}</span>
              </a>
              <a
                href={OWNER_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{OWNER_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLaunchGoogleForm} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-zinc-400 block mb-1 font-medium">
                  Your Name / Organization
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Elena Rostova / Agency X"
                  className="w-full bg-[#11131c] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-zinc-400 block mb-1 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full bg-[#11131c] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-zinc-400 block mb-1 font-medium">
                  Scope / Work Type
                </label>
                <select
                  value={workType}
                  onChange={(e) => setWorkType(e.target.value)}
                  className="w-full bg-[#11131c] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-400"
                >
                  <option value="Commercial Image Editing & Isolation">Commercial Image Editing & Masking</option>
                  <option value="Product Photo Editing & Retouching">Product Photo Editing & Retouching</option>
                  <option value="High-Fashion / Portrait Retouching">High-Fashion / Portrait Retouching</option>
                  <option value="E-Commerce Catalog Standardization">E-Commerce Catalog Standardization</option>
                  <option value="Graphic Design & Editorial Posters">Graphic Design & Editorial Posters</option>
                  <option value="AI-Assisted Visual Concept Exploration">AI-Assisted Visual Exploration</option>
                  <option value="Full-Time / Contract Hiring">Full-Time / Contract Creative Hiring</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-zinc-400 block mb-1 font-medium">
                  Target Timeline / Availability
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full bg-[#11131c] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-400"
                >
                  <option value="Immediate / Urgent">Immediate / Urgent</option>
                  <option value="1–2 Weeks">1–2 Weeks</option>
                  <option value="Flexible / Ongoing">Flexible / Ongoing</option>
                  <option value="Permanent Role Discussion">Permanent Role Discussion</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-wider text-zinc-400 block mb-1 font-medium">
                Brief Scope / Key Requirements
              </label>
              <textarea
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe your visual deliverables, volume of images, or candidate interview details..."
                className="w-full bg-[#11131c] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleCopyInquiry}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-amber-400" />
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Inquiry Draft'}</span>
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Direct Inquiry to Supratik</span>
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};
