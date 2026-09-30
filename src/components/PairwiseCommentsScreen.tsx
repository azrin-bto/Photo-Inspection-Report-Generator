import React from 'react';
import { InspectionPhoto } from '../types';
import { PRESET_ENGINEERING_COMMENTS } from '../data/inventory';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Presentation,
  CheckCircle,
  FileSpreadsheet,
} from 'lucide-react';

interface PairwiseCommentsScreenProps {
  siteNo: string;
  photos: (InspectionPhoto | null)[];
  currentPairIndex: number;
  onPairIndexChange: (index: number) => void;
  onCommentChange: (photoIndex: number, comment: string) => void;
  onBackToInput: () => void;
  onCreateReport: () => void;
}

export const PairwiseCommentsScreen: React.FC<PairwiseCommentsScreenProps> = ({
  siteNo,
  photos,
  currentPairIndex,
  onPairIndexChange,
  onCommentChange,
  onBackToInput,
  onCreateReport,
}) => {
  const filledCount = photos.filter(Boolean).length;
  const leftIndex = currentPairIndex * 2;
  const rightIndex = currentPairIndex * 2 + 1;

  const leftPhoto = photos[leftIndex];
  const rightPhoto = photos[rightIndex];

  const getPositionText = (slotNum: number) => {
    const page = slotNum <= 4 ? 1 : 2;
    const pos = slotNum % 2 === 1 ? 'Left' : 'Right';
    const vert = (slotNum === 1 || slotNum === 2 || slotNum === 5 || slotNum === 6) ? 'Top' : 'Bottom';
    return `Page ${page} (${vert}-${pos})`;
  };

  const applyPreset = (photoIndex: number) => {
    const randomPreset =
      PRESET_ENGINEERING_COMMENTS[Math.floor(Math.random() * PRESET_ENGINEERING_COMMENTS.length)];
    onCommentChange(photoIndex, randomPreset);
  };

  return (
    <section className="transition-opacity duration-200 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <div>
          <button
            onClick={onBackToInput}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition mb-1 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Upload &amp; Metadata</span>
          </button>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-bold text-slate-900">
              Step 2: Pairwise Photo Commenting &amp; Verification
            </h2>
            <span
              id="current-pair-badge"
              className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full"
            >
              Pair {currentPairIndex + 1} of 4 (Photos {leftIndex + 1} &amp; {rightIndex + 1})
            </span>
          </div>
        </div>

        {/* Site Quick Reference */}
        <div className="bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-4 shadow-xs">
          <div>
            <span className="text-slate-400">SiteNo:</span>{' '}
            <span className="font-mono font-bold text-slate-800">{siteNo}</span>
          </div>
          <div>
            <span className="text-slate-400">Total Photos:</span>{' '}
            <span className="font-bold text-emerald-600">{filledCount}</span>
          </div>
          <div className="hidden sm:block">
            <span className="text-slate-400">Target Output:</span>{' '}
            <span className="font-bold text-slate-700">2-Page Google Slides</span>
          </div>
        </div>
      </div>

      {/* Navigation & Step Tracker Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          {[0, 1, 2, 3].map((idx) => {
            const hasLeft = Boolean(photos[idx * 2]);
            const hasRight = Boolean(photos[idx * 2 + 1]);
            const isFilled = hasLeft || hasRight;

            return (
              <button
                key={`pair-btn-${idx}`}
                onClick={() => onPairIndexChange(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  currentPairIndex === idx
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>Photos {idx * 2 + 1} &amp; {idx * 2 + 2}</span>
                {isFilled && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      currentPairIndex === idx ? 'bg-white' : 'bg-emerald-500'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-slate-500 hidden sm:block">
          Per PRD F04: Empty comment boxes default to blank text on the slide.
        </p>
      </div>

      {/* Pairwise 2-Photo Workspace (F04 Core) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" id="pairwise-container">
        {/* Left Photo Box (Slot A) */}
        <div
          id="slot-card-left"
          className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded bg-slate-800 text-white flex items-center justify-center text-[11px] font-mono">
                  {leftIndex + 1}
                </span>
                <span>
                  Photo Slot #{leftIndex + 1} {leftPhoto ? `(${leftPhoto.name})` : '(Unfilled)'}
                </span>
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                Assigned to: {getPositionText(leftIndex + 1)}
              </span>
            </div>

            {/* Preview Image Frame */}
            <div className="relative w-full h-64 bg-slate-100 border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center mb-4">
              {leftPhoto ? (
                <img
                  src={leftPhoto.url}
                  alt={leftPhoto.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                  <div className="w-12 h-12 rounded bg-slate-200 flex items-center justify-center text-slate-400 font-bold mb-2">
                    {leftIndex + 1}
                  </div>
                  <p className="text-xs font-medium">Unfilled Slot</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Will render blank grey on slide</p>
                </div>
              )}
            </div>
          </div>

          {/* Comment Input Box */}
          <div>
            <label
              htmlFor="comment-left"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Engineering Comment / Observation
            </label>
            <textarea
              id="comment-left"
              rows={3}
              disabled={!leftPhoto}
              value={leftPhoto ? leftPhoto.comment : ''}
              onChange={(e) => onCommentChange(leftIndex, e.target.value)}
              placeholder={
                leftPhoto
                  ? 'Enter inspection notes (e.g. Frontal approach view 150m, vinyl tension in good condition, illumination fully working)...'
                  : 'Empty photo slot — this frame will remain clean grey on slide.'
              }
              className={`w-full p-3 rounded-lg text-xs transition ${
                leftPhoto
                  ? 'bg-slate-50 border border-slate-300 text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                  : 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed italic'
              }`}
            />
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
              <span>Standard slide footnote style</span>
              {leftPhoto && (
                <button
                  type="button"
                  onClick={() => applyPreset(leftIndex)}
                  className="text-emerald-600 hover:underline font-medium flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-emerald-500" />
                  <span>Insert quick tag</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Photo Box (Slot B) */}
        <div
          id="slot-card-right"
          className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded bg-slate-800 text-white flex items-center justify-center text-[11px] font-mono">
                  {rightIndex + 1}
                </span>
                <span>
                  Photo Slot #{rightIndex + 1} {rightPhoto ? `(${rightPhoto.name})` : '(Unfilled)'}
                </span>
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                Assigned to: {getPositionText(rightIndex + 1)}
              </span>
            </div>

            {/* Preview Image Frame */}
            <div className="relative w-full h-64 bg-slate-100 border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center mb-4">
              {rightPhoto ? (
                <img
                  src={rightPhoto.url}
                  alt={rightPhoto.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                  <div className="w-12 h-12 rounded bg-slate-200 flex items-center justify-center text-slate-400 font-bold mb-2">
                    {rightIndex + 1}
                  </div>
                  <p className="text-xs font-medium">Unfilled Slot</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Will render blank grey on slide</p>
                </div>
              )}
            </div>
          </div>

          {/* Comment Input Box */}
          <div>
            <label
              htmlFor="comment-right"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Engineering Comment / Observation
            </label>
            <textarea
              id="comment-right"
              rows={3}
              disabled={!rightPhoto}
              value={rightPhoto ? rightPhoto.comment : ''}
              onChange={(e) => onCommentChange(rightIndex, e.target.value)}
              placeholder={
                rightPhoto
                  ? 'Enter inspection notes (e.g. Structure catwalk clearance verified, no rust detected on unipole column joints)...'
                  : 'Empty photo slot — this frame will remain clean grey on slide.'
              }
              className={`w-full p-3 rounded-lg text-xs transition ${
                rightPhoto
                  ? 'bg-slate-50 border border-slate-300 text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                  : 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed italic'
              }`}
            />
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
              <span>Standard slide footnote style</span>
              {rightPhoto && (
                <button
                  type="button"
                  onClick={() => applyPreset(rightIndex)}
                  className="text-emerald-600 hover:underline font-medium flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-emerald-500" />
                  <span>Insert quick tag</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar (Previous, Next, Create Report) */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center justify-between">
        <button
          type="button"
          id="btn-prev-pair"
          disabled={currentPairIndex === 0}
          onClick={() => onPairIndexChange(currentPairIndex - 1)}
          className="px-5 py-2.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          &larr; Previous Pair
        </button>

        <div className="flex items-center gap-3">
          {currentPairIndex < 3 && (
            <button
              type="button"
              id="btn-next-pair"
              onClick={() => onPairIndexChange(currentPairIndex + 1)}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold tracking-wide transition flex items-center gap-2 cursor-pointer"
            >
              <span>Next Pair</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            id="btn-create-report"
            onClick={onCreateReport}
            className="px-7 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold tracking-wide shadow-md shadow-emerald-950/20 hover:shadow-emerald-600/30 transition flex items-center gap-2 cursor-pointer"
          >
            <Presentation className="w-4 h-4" />
            <span>Create Report (F05)</span>
          </button>
        </div>
      </div>
    </section>
  );
};
