/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { SlidersHorizontal, Eye, ZoomIn, Layers, MessageSquarePlus, CheckCircle2 } from 'lucide-react';
import { ProjectFeedbackPin } from '../data/portfolioData';

interface BeforeAfterSliderProps {
  beforeImg?: string;
  afterImg: string;
  title: string;
  subtitle: string;
  pins: ProjectFeedbackPin[];
  onAddPin?: (pin: Omit<ProjectFeedbackPin, 'id' | 'timestamp'>) => void;
  enablePinning?: boolean;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImg,
  afterImg,
  title,
  subtitle,
  pins,
  onAddPin,
  enablePinning = false
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [viewMode, setViewMode] = useState<'split' | 'mask' | 'loupe'>('split');
  const [loupePos, setLoupePos] = useState({ x: 50, y: 50, active: false });
  const [activePinId, setActivePinId] = useState<string | null>(null);
  const [newPinModal, setNewPinModal] = useState<{ x: number; y: number } | null>(null);
  const [newComment, setNewComment] = useState('');
  const [newCategory, setNewCategory] = useState<ProjectFeedbackPin['category']>('Edge Masking');
  const [newAuthor, setNewAuthor] = useState('Design Evaluator');

  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse / Touch movement for slider
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clamped = Math.max(0, Math.min(rect.width, x));
    setSliderPos((clamped / rect.width) * 100);
  }, []);

  const onMouseDown = () => setIsDragging(true);
  const onMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };
    const handleGlobalMouseUp = () => {
      if (isDragging) setIsDragging(false);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, handleMove]);

  // Touch handlers
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  // Keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPos((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPos((prev) => Math.min(100, prev + 5));
    }
  };

  // Canvas click for pinning
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enablePinning || isDragging) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setNewPinModal({ x, y });
  };

  const handleCreatePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPinModal || !newComment.trim()) return;
    onAddPin?.({
      xPercent: Math.round(newPinModal.x),
      yPercent: Math.round(newPinModal.y),
      author: newAuthor.trim() || 'Design Evaluator',
      category: newCategory,
      comment: newComment.trim()
    });
    setNewPinModal(null);
    setNewComment('');
  };

  // Handle Loupe tracking
  const handleLoupeMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (viewMode !== 'loupe' || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLoupePos({ x, y, active: true });
  };

  return (
    <div className="w-full bg-[#10121a] border border-[#27272a] rounded-xl overflow-hidden shadow-2xl">
      {/* Top Header Bar */}
      <div className="px-6 py-4 border-b border-[#27272a] flex flex-wrap items-center justify-between gap-4 bg-[#0d0e14]">
        <div>
          <h3 className="text-base font-semibold text-white tracking-tight">{title}</h3>
          <p className="text-xs text-zinc-400 mt-0.5">{subtitle}</p>
        </div>

        {/* View Mode Segmented Control (Interactive button tab group) */}
        <div className="flex items-center gap-1 p-1 bg-[#181a24] border border-[#27272a] rounded-lg text-xs font-medium">
          <button
            onClick={() => setViewMode('split')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'split' ? 'bg-[#272a38] text-white shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Split Reveal</span>
          </button>

          <button
            onClick={() => setViewMode('loupe')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'loupe' ? 'bg-[#272a38] text-white shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ZoomIn className="w-3.5 h-3.5" />
            <span>2.5x Pixel Loupe</span>
          </button>

          <button
            onClick={() => setViewMode('mask')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'mask' ? 'bg-[#272a38] text-white shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Alpha Mask Pass</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div
        ref={containerRef}
        tabIndex={0}
        role="region"
        aria-label="Interactive before and after image comparison slider"
        onKeyDown={handleKeyDown}
        onMouseMove={handleLoupeMouseMove}
        onMouseLeave={() => setLoupePos((prev) => ({ ...prev, active: false }))}
        onClick={handleCanvasClick}
        className="relative w-full aspect-16/10 sm:aspect-16/9 bg-zinc-950 select-none overflow-hidden cursor-crosshair focus:outline-none focus:ring-1 focus:ring-amber-400/50"
      >
        {/* Underneath Layer: Final Retouched Asset */}
        <img
          src={afterImg}
          alt="Retouched final output"
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-filter duration-300 ${
            viewMode === 'mask' ? 'contrast-200 grayscale invert brightness-125' : ''
          }`}
          referrerPolicy="no-referrer"
        />

        {/* Split Reveal: Left Side (Original / Raw Layer with authentic flat unretouched treatment) */}
        {viewMode === 'split' && (
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ width: `${sliderPos}%` }}
          >
            <img
              src={beforeImg || afterImg}
              alt="Raw unretouched capture"
              className="absolute inset-0 w-full h-full object-cover max-w-none"
              style={{
                width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                filter: beforeImg
                  ? 'none'
                  : 'brightness(0.92) contrast(0.85) saturate(0.8) blur(0.2px)'
              }}
              referrerPolicy="no-referrer"
            />
            {/* Raw State Label */}
            <div className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-black/75 backdrop-blur-xs text-[11px] font-mono tracking-wider text-zinc-300 border border-white/10 rounded">
              RAW / UNRETOUCHED
            </div>
          </div>
        )}

        {/* Retouched Label */}
        {viewMode === 'split' && (
          <div className="absolute top-4 right-4 z-10 px-2.5 py-1 bg-amber-950/80 backdrop-blur-xs text-[11px] font-mono tracking-wider text-amber-200 border border-amber-500/30 rounded">
            FINAL RETOUCHED
          </div>
        )}

        {/* Loupe View Mode Lens */}
        {viewMode === 'loupe' && loupePos.active && (
          <div
            className="absolute w-48 h-48 rounded-full border-2 border-amber-400/80 shadow-2xl pointer-events-none overflow-hidden z-20"
            style={{
              left: `calc(${loupePos.x}% - 96px)`,
              top: `calc(${loupePos.y}% - 96px)`,
              boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.45), 0 10px 30px rgba(0, 0, 0, 0.8)'
            }}
          >
            <div
              className="w-full h-full bg-no-repeat"
              style={{
                backgroundImage: `url(${afterImg})`,
                backgroundSize: '250%',
                backgroundPosition: `${loupePos.x}% ${loupePos.y}%`
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-4 h-0.5 bg-amber-400/60" />
              <div className="h-4 w-0.5 bg-amber-400/60 absolute" />
            </div>
            <div className="absolute bottom-2 inset-x-0 text-center text-[10px] font-mono bg-black/80 text-amber-300 py-0.5">
              2.5x SUB-PIXEL CHECK
            </div>
          </div>
        )}

        {/* Draggable Divider Line in Split Mode */}
        {viewMode === 'split' && (
          <div
            className="absolute top-0 bottom-0 z-20 cursor-ew-resize flex items-center justify-center"
            style={{ left: `calc(${sliderPos}% - 16px)`, width: '32px' }}
            onMouseDown={onMouseDown}
            onTouchMove={onTouchMove}
          >
            <div className="w-0.5 h-full bg-white/90 shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
            <div className="absolute w-8 h-8 rounded-full bg-zinc-900 border border-white/60 shadow-lg flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform">
              <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-200" />
            </div>
          </div>
        )}

        {/* Existing Interactive Feedback Pins */}
        {pins.map((pin) => (
          <div
            key={pin.id}
            className="absolute z-25 group"
            style={{ left: `${pin.xPercent}%`, top: `${pin.yPercent}%` }}
            onClick={(e) => {
              e.stopPropagation();
              setActivePinId(activePinId === pin.id ? null : pin.id);
            }}
          >
            <div className="relative -translate-x-1/2 -translate-y-1/2">
              <button
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-mono font-bold transition-all shadow-md cursor-pointer ${
                  activePinId === pin.id
                    ? 'bg-amber-400 text-black ring-4 ring-amber-400/30 scale-110'
                    : 'bg-zinc-900/90 text-amber-300 border border-amber-400/60 hover:bg-amber-400 hover:text-black'
                }`}
                aria-label={`Feedback note by ${pin.author}`}
              >
                ●
              </button>

              {/* Pin Tooltip Card */}
              <div
                className={`absolute bottom-8 left-1/2 -translate-x-1/2 w-64 bg-[#141620] border border-[#32364a] rounded-lg p-3 shadow-2xl text-left pointer-events-auto transition-all duration-150 ${
                  activePinId === pin.id ? 'opacity-100 scale-100 z-30' : 'opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1 pb-1 border-b border-white/10">
                  <span className="font-semibold text-amber-300">{pin.category}</span>
                  <span className="font-mono text-[10px]">{pin.timestamp}</span>
                </div>
                <p className="text-xs text-zinc-200 leading-relaxed">{pin.comment}</p>
                <div className="mt-2 text-[10px] text-zinc-400 font-medium">
                  Auditor: <span className="text-zinc-300">{pin.author}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Modal when dropping a new pin */}
        {newPinModal && (
          <div
            className="absolute z-30 bg-[#161824] border border-amber-500/40 rounded-lg p-4 shadow-2xl w-72 text-left"
            style={{
              left: `${Math.min(75, Math.max(25, newPinModal.x))}%`,
              top: `${Math.min(75, Math.max(25, newPinModal.y))}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
              <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                <MessageSquarePlus className="w-3.5 h-3.5" />
                Add Review Pin
              </span>
              <button
                onClick={() => setNewPinModal(null)}
                className="text-zinc-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePin} className="space-y-2.5">
              <div>
                <label className="text-[10px] uppercase text-zinc-400 block mb-1">Audit Criteria</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full bg-[#0d0e14] border border-[#27272a] rounded px-2 py-1 text-xs text-zinc-200 focus:outline-none focus:border-amber-400"
                >
                  <option value="Edge Masking">Edge Masking & Alpha Cleanliness</option>
                  <option value="Color & Tone">Color Grading & Specular Light</option>
                  <option value="Texture Integrity">Texture Retention (Anti-Blur)</option>
                  <option value="Composition">Composition & Layout</option>
                  <option value="General">General Craft Assessment</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase text-zinc-400 block mb-1">Your Evaluation Note</label>
                <textarea
                  rows={2}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="e.g. Sharp edge on bevel, natural skin grain..."
                  className="w-full bg-[#0d0e14] border border-[#27272a] rounded px-2.5 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  autoFocus
                />
              </div>

              <div>
                <label className="text-[10px] uppercase text-zinc-400 block mb-1">Evaluator / Title</label>
                <input
                  type="text"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full bg-[#0d0e14] border border-[#27272a] rounded px-2 py-1 text-xs text-zinc-200 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setNewPinModal(null)}
                  className="px-2.5 py-1 text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-black text-xs font-semibold rounded cursor-pointer transition-colors"
                >
                  Save Pin
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Stage Bottom Instruction Bar */}
      <div className="px-6 py-3 bg-[#0d0e14] border-t border-[#27272a] flex flex-wrap items-center justify-between text-xs text-zinc-400 gap-3">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-zinc-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive Proof Stage</span>
          </span>
          <span className="hidden sm:inline text-zinc-500">·</span>
          <span className="hidden sm:inline text-zinc-400">
            {viewMode === 'split' && 'Drag slider or use Left/Right arrow keys to inspect the edit'}
            {viewMode === 'loupe' && 'Move cursor over the asset to activate 2.5x macro loupe'}
            {viewMode === 'mask' && 'High-contrast alpha luminance channel verification'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {enablePinning ? (
            <span className="text-amber-300 font-medium text-[11px] flex items-center gap-1">
              <MessageSquarePlus className="w-3 h-3" />
              Click anywhere on canvas to drop review pin
            </span>
          ) : (
            <span className="font-mono text-[11px] text-zinc-400">
              Revealed: {Math.round(sliderPos)}% Final
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
