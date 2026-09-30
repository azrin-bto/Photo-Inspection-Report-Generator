import React from 'react';
import { ScreenId } from '../types';
import { APP_METADATA } from '../data/inventory';
import { CheckCircle2, ChevronRight, Database, FileSpreadsheet } from 'lucide-react';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onOpenInventory: () => void;
  onOpenQA: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onOpenInventory,
  onOpenQA,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <div
          className="flex items-center space-x-3 cursor-pointer select-none group"
          onClick={() => onNavigate('dashboard')}
          title="Return to Dashboard"
        >
          <div className="h-10 flex items-center justify-center flex-shrink-0 overflow-hidden rounded bg-emerald-600 px-2 py-1 shadow-sm">
            <span className="font-extrabold text-white text-base tracking-tighter">BIG TREE</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-slate-900 tracking-tight text-base group-hover:text-emerald-700 transition">
                BIG TREE OUTDOOR
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">
                {APP_METADATA.version}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium tracking-wide">
              {APP_METADATA.subHeader}
            </p>
          </div>
        </div>

        {/* Workflow Stepper Pills (Active during report generation) */}
        {currentScreen !== 'dashboard' && (
          <nav aria-label="Workflow progress" className="hidden md:flex items-center space-x-2 text-xs font-semibold">
            {/* Step 1 */}
            <button
              onClick={() => onNavigate('input')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-full border transition ${
                currentScreen === 'input'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-xs'
                  : 'bg-slate-100 text-slate-500 border-transparent hover:bg-slate-200'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                  currentScreen === 'input'
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-slate-300 text-slate-700 font-medium'
                }`}
              >
                1
              </span>
              <span>Site &amp; Photos</span>
            </button>

            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />

            {/* Step 2 */}
            <button
              onClick={() => onNavigate('comments')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-full border transition ${
                currentScreen === 'comments'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-xs'
                  : 'bg-slate-100 text-slate-500 border-transparent hover:bg-slate-200'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                  currentScreen === 'comments'
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-slate-300 text-slate-700 font-medium'
                }`}
              >
                2
              </span>
              <span>Pairwise Comments</span>
            </button>

            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />

            {/* Step 3 */}
            <button
              onClick={() => onNavigate('success')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-full border transition ${
                currentScreen === 'success'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-xs'
                  : 'bg-slate-100 text-slate-500 border-transparent hover:bg-slate-200'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                  currentScreen === 'success'
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-slate-300 text-slate-700 font-medium'
                }`}
              >
                3
              </span>
              <span>Google Slides Output</span>
            </button>
          </nav>
        )}

        {/* User profile & Database telemetry */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenQA}
            className="hidden lg:flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition border border-slate-200"
            title="View PRD Section 9 QA Verification Checklist (TC01-TC08)"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>QA Matrix (v1.1)</span>
          </button>

          <button
            onClick={onOpenInventory}
            className="text-right hidden sm:block hover:opacity-80 transition cursor-pointer"
            title="Click to browse Inventori_2026.gsheets database"
          >
            <p className="text-xs font-bold text-slate-800">{APP_METADATA.userRole}</p>
            <p className="text-[11px] text-slate-500 flex items-center justify-end gap-1">
              <span>Connected:</span>
              <span className="font-mono text-emerald-600 font-semibold underline decoration-dotted">
                {APP_METADATA.inventoryName}
              </span>
            </p>
          </button>

          <div
            onClick={onOpenInventory}
            className="w-9 h-9 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-700 font-bold text-xs cursor-pointer hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 transition"
            title="Internal Project Engineer • Click to inspect site database"
          >
            PE
          </div>
        </div>
      </div>
    </header>
  );
};
