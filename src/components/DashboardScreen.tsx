import React from 'react';
import { APP_METADATA } from '../data/inventory';
import {
  Plus,
  Zap,
  FileSpreadsheet,
  Presentation,
  FolderGit2,
  Clock,
  ArrowRight,
  Database,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

interface DashboardScreenProps {
  onStartReport: () => void;
  onQuickDemo: (siteNo: string) => void;
  onOpenInventory: () => void;
  onOpenQA: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onStartReport,
  onQuickDemo,
  onOpenInventory,
  onOpenQA,
}) => {
  return (
    <section className="transition-opacity duration-200 animate-fadeIn">
      {/* F01 Mandatory Header Attribution Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 rounded-2xl text-white p-6 sm:p-8 mb-8 shadow-xl border border-slate-800 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Official Engineering Productivity Tool</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3 leading-tight">
            {APP_METADATA.title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal max-w-3xl">
            Automates the extraction of site billboard metadata from{' '}
            <span className="text-emerald-400 font-mono font-medium">{APP_METADATA.inventoryName}</span> and
            standardizes photo inspection presentations in Google Slides in under two minutes with
            sequential naming.
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* F01 Main Action Button */}
            <button
              onClick={onStartReport}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/40 hover:shadow-emerald-600/30 transition-all transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer"
            >
              <Plus className="w-5 h-5 stroke-[2.4]" />
              <span>Generate Inspection Photos Report</span>
            </button>

            {/* Test Sample Quick Launcher */}
            <button
              onClick={() => onQuickDemo('AGT-092')}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition cursor-pointer"
            >
              <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span>Test Sample Data (AGT-092)</span>
            </button>

            <button
              onClick={onOpenInventory}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700/80 transition cursor-pointer"
            >
              <Database className="w-4 h-4 text-blue-400" />
              <span>Browse 2,450 Sites</span>
            </button>
          </div>
        </div>
      </div>

      {/* Status & Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Card 1: Inventory Source */}
        <div
          onClick={onOpenInventory}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-sm transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Inventory Source</span>
            <FileSpreadsheet className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-base font-bold text-slate-900 truncate" title="Inventori_2026.gsheets">
            Inventori_2026
          </p>
          <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Live synced (2,450 sites)</span>
          </p>
        </div>

        {/* Card 2: Slide Template */}
        <a
          href={APP_METADATA.templateUrl}
          target="_blank"
          rel="noreferrer"
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-amber-300 hover:shadow-sm transition group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Slide Template</span>
            <Presentation className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-base font-bold text-slate-900 truncate">{APP_METADATA.templateName}</p>
          <p className="text-xs text-slate-500 font-medium mt-1">2-Page format (Max 8 photos)</p>
        </a>

        {/* Card 3: Target Drive */}
        <a
          href={APP_METADATA.driveFolderUrl}
          target="_blank"
          rel="noreferrer"
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-sm transition group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Target Drive</span>
            <FolderGit2 className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-base font-bold text-slate-900 truncate font-mono">13gDVVR5fnjpfN7...</p>
          <p className="text-xs text-slate-500 font-medium mt-1 font-mono">BTO / Reports / 2026</p>
        </a>

        {/* Card 4: Report SLA */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Report SLA</span>
            <Clock className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-base font-bold text-slate-900">&lt; 2 Minutes</p>
          <p className="text-xs text-slate-500 font-medium mt-1">From upload to Drive file</p>
        </div>
      </div>

      {/* Standard Operating Procedure (SOP) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Standard Operating Procedure (SOP)</span>
          </h2>
          <span className="text-[11px] text-slate-400 font-medium">BTO-SOP-ENG-2026-04</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="flex gap-3">
            <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center flex-shrink-0 border border-slate-200">
              1
            </span>
            <div>
              <p className="text-sm font-bold text-slate-800">Input Site Number</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                System looks up Location, Billboard Size, and Format directly from inventory.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-3">
            <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center flex-shrink-0 border border-slate-200">
              2
            </span>
            <div>
              <p className="text-sm font-bold text-slate-800">Upload 1 to 8 Photos</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Multi-upload site inspection shots. Unfilled frames automatically remain clean grey.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-3">
            <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center flex-shrink-0 border border-slate-200">
              3
            </span>
            <div>
              <p className="text-sm font-bold text-slate-800">Pairwise Comments</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Review 2 photos side-by-side per step with specific engineering observations.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-3">
            <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center flex-shrink-0 border border-slate-200">
              4
            </span>
            <div>
              <p className="text-sm font-bold text-slate-800">Automated Slide Output</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Creates sequential file (e.g. AGT-092-001) in target shared Google Drive folder.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Launch Billboard Sites section */}
      <div className="bg-slate-100/70 border border-slate-200 rounded-xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Quick Launch Test Sites (Inventori_2026)
          </h3>
          <button
            onClick={onOpenInventory}
            className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
          >
            <span>View All Sites</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div
            onClick={() => onQuickDemo('AGT-092')}
            className="p-3 bg-white rounded-lg border border-slate-200 hover:border-emerald-500 hover:shadow-xs transition cursor-pointer flex items-center justify-between group"
          >
            <div>
              <span className="font-mono font-bold text-slate-900 group-hover:text-emerald-700 transition">
                AGT-092
              </span>
              <p className="text-slate-500 text-[11px] truncate max-w-[200px]">
                Lebuhraya Persekutuan KM 14.2
              </p>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded">
              Unipole
            </span>
          </div>

          <div
            onClick={() => onQuickDemo('KUL-551')}
            className="p-3 bg-white rounded-lg border border-slate-200 hover:border-emerald-500 hover:shadow-xs transition cursor-pointer flex items-center justify-between group"
          >
            <div>
              <span className="font-mono font-bold text-slate-900 group-hover:text-emerald-700 transition">
                KUL-551
              </span>
              <p className="text-slate-500 text-[11px] truncate max-w-[200px]">
                Jalan Tun Razak, KL
              </p>
            </div>
            <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded">
              LED 4K
            </span>
          </div>

          <div
            onClick={() => onQuickDemo('SGR-889')}
            className="p-3 bg-white rounded-lg border border-slate-200 hover:border-emerald-500 hover:shadow-xs transition cursor-pointer flex items-center justify-between group"
          >
            <div>
              <span className="font-mono font-bold text-slate-900 group-hover:text-emerald-700 transition">
                SGR-889
              </span>
              <p className="text-slate-500 text-[11px] truncate max-w-[200px]">
                NKVE Subang Toll Plaza
              </p>
            </div>
            <span className="text-[10px] bg-purple-50 text-purple-700 font-semibold px-2 py-0.5 rounded">
              Gantry
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
