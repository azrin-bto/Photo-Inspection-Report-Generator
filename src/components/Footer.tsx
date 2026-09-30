import React from 'react';
import { APP_METADATA } from '../data/inventory';
import { ExternalLink, FileSpreadsheet, Presentation, FolderGit2 } from 'lucide-react';

interface FooterProps {
  onOpenInventory?: () => void;
  onOpenQA?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInventory, onOpenQA }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto py-5 no-print text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <p className="font-semibold text-slate-700">
              {APP_METADATA.company} • Internal Project Engineering Tool
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Author &amp; System Architect:{' '}
              <span className="text-slate-700 font-semibold">{APP_METADATA.author}</span> •{' '}
              {APP_METADATA.version}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            {onOpenInventory && (
              <button
                onClick={onOpenInventory}
                className="hover:text-emerald-700 font-medium flex items-center gap-1 transition"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                <span>Inventori_2026</span>
              </button>
            )}

            <a
              href={APP_METADATA.templateUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-700 font-medium flex items-center gap-1 transition"
              title="View IPR_Sample.gslides master template"
            >
              <Presentation className="w-3.5 h-3.5 text-amber-600" />
              <span>IPR_Sample.gslides</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
            </a>

            <a
              href={APP_METADATA.driveFolderUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-700 font-medium flex items-center gap-1 transition"
              title="Open target Google Drive destination"
            >
              <FolderGit2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Drive Output Folder</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
            </a>

            {onOpenQA && (
              <button
                onClick={onOpenQA}
                className="text-slate-600 hover:text-slate-900 font-semibold underline decoration-slate-300 transition"
              >
                QA Checklist (TC01–TC08)
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
