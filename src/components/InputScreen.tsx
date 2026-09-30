import React, { useState, useRef } from 'react';
import { SiteRecord, InspectionPhoto } from '../types';
import { APP_METADATA, INVENTORY_DATABASE, SAMPLE_INSPECTION_PHOTOS } from '../data/inventory';
import {
  ArrowLeft,
  ArrowRight,
  Search,
  AlertTriangle,
  FileCheck2,
  FolderGit2,
  UploadCloud,
  X,
  Sparkles,
  RotateCcw,
  CheckCircle,
} from 'lucide-react';

interface InputScreenProps {
  siteNo: string;
  siteData: SiteRecord | null;
  visual: string;
  photos: (InspectionPhoto | null)[];
  lookupError: string | null;
  onSiteNoChange: (siteNo: string) => void;
  onLookupSite: (siteNo: string) => void;
  onVisualChange: (visual: string) => void;
  onPhotosChange: (photos: (InspectionPhoto | null)[]) => void;
  onProceedToComments: () => void;
  onBackToDashboard: () => void;
  onOpenInventory: () => void;
}

export const InputScreen: React.FC<InputScreenProps> = ({
  siteNo,
  siteData,
  visual,
  photos,
  lookupError,
  onSiteNoChange,
  onLookupSite,
  onVisualChange,
  onPhotosChange,
  onProceedToComments,
  onBackToDashboard,
  onOpenInventory,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadWarning, setUploadWarning] = useState<string | null>(null);

  const filledCount = photos.filter(Boolean).length;
  const pg1Count = photos.slice(0, 4).filter(Boolean).length;
  const pg2Count = photos.slice(4, 8).filter(Boolean).length;

  // Handle files upload
  const handleFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files).filter((file) => file.type.startsWith('image/'));

    if (fileArray.length === 0) return;

    if (fileArray.length > 8) {
      setUploadWarning('Maximum 8 images allowed. Only the first 8 images were kept.');
    } else {
      setUploadWarning(null);
    }

    const filesToUse = fileArray.slice(0, 8);
    const newPhotos = [...photos];

    filesToUse.forEach((file, index) => {
      // Find the first available empty slot or replace slot
      let targetSlot = newPhotos.findIndex((p) => p === null);
      if (targetSlot === -1 && index < 8) {
        targetSlot = index;
      }

      if (targetSlot !== -1 && targetSlot < 8) {
        const objectUrl = URL.createObjectURL(file);
        newPhotos[targetSlot] = {
          id: `upload-${Date.now()}-${index}`,
          url: objectUrl,
          name: file.name,
          comment: `Inspection detail for ${file.name.replace(/\.[^/.]+$/, '')} at ${siteNo || 'site'}.`,
          sizeBytes: file.size,
          uploadedAt: 'Just now',
        };
      }
    });

    onPhotosChange(newPhotos);
  };

  const handleRemovePhoto = (slotIndex: number) => {
    const newPhotos = [...photos];
    newPhotos[slotIndex] = null;
    onPhotosChange(newPhotos);
  };

  const handleClearAllPhotos = () => {
    onPhotosChange([null, null, null, null, null, null, null, null]);
    setUploadWarning(null);
  };

  const handleLoadDefaultPhotos = () => {
    const newPhotos: (InspectionPhoto | null)[] = [
      { ...SAMPLE_INSPECTION_PHOTOS[0] },
      { ...SAMPLE_INSPECTION_PHOTOS[1] },
      { ...SAMPLE_INSPECTION_PHOTOS[2] },
      { ...SAMPLE_INSPECTION_PHOTOS[3] },
      { ...SAMPLE_INSPECTION_PHOTOS[4] },
      null,
      null,
      null,
    ];
    onPhotosChange(newPhotos);
    setUploadWarning(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Preview file name calculated
  const seqNumber = siteData ? String(siteData.seqCount).padStart(3, '0') : '001';
  const namingPreview = `${siteNo || 'AGT-092'}-${seqNumber}.gslides`;

  return (
    <section className="transition-opacity duration-200 animate-fadeIn">
      {/* Breadcrumb / Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <div>
          <button
            onClick={onBackToDashboard}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition mb-1 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          <h2 className="text-xl font-bold text-slate-900">Step 1: Site Metadata &amp; Photo Upload</h2>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono bg-slate-100 border border-slate-300 text-slate-700 px-2.5 py-1 rounded">
            PRD Requirements: F02 &amp; F03
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ============================================================== */}
        {/* LEFT COLUMN: F02 SITE METADATA RETRIEVAL                       */}
        {/* ============================================================== */}
        <div className="lg:col-span-4 space-y-6">
          {/* Site Lookup Box */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <label
                htmlFor="input-site-no"
                className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5"
              >
                <span>Site Number (SiteNo)</span>
                <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={onOpenInventory}
                className="text-[11px] text-emerald-600 hover:underline font-medium"
              >
                Browse Sheet
              </button>
            </div>

            {/* Search Input Group */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  id="input-site-no"
                  type="text"
                  value={siteNo}
                  onChange={(e) => onSiteNoChange(e.target.value.toUpperCase())}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') onLookupSite(siteNo);
                  }}
                  placeholder="e.g. AGT-092, KUL-551"
                  className="w-full pl-3.5 pr-8 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-mono font-semibold uppercase text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                />
                <button
                  type="button"
                  onClick={() => onLookupSite(siteNo)}
                  className="absolute right-2 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                  title="Search site"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => onLookupSite(siteNo)}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold tracking-wide transition flex items-center gap-1 cursor-pointer"
              >
                <span>Lookup</span>
              </button>
            </div>

            {/* Error Message Box (PRD F02 Failure requirement: TC03) */}
            {lookupError && (
              <div
                id="site-error-box"
                className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start gap-2 animate-fadeIn"
              >
                <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Lookup Failed</p>
                  <p id="site-error-text">{lookupError}</p>
                </div>
              </div>
            )}

            {/* Quick Test Chips */}
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              <span className="font-medium text-slate-400">Quick tests:</span>
              <div className="space-x-1.5 font-mono">
                <button
                  type="button"
                  onClick={() => onLookupSite('AGT-092')}
                  className="hover:underline text-emerald-600 font-semibold cursor-pointer"
                >
                  AGT-092
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => onLookupSite('KUL-551')}
                  className="hover:underline text-emerald-600 font-semibold cursor-pointer"
                >
                  KUL-551
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => onLookupSite('SGR-889')}
                  className="hover:underline text-emerald-600 font-semibold cursor-pointer"
                >
                  SGR-889
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => onLookupSite('INVALID-999')}
                  className="hover:underline text-red-500 font-semibold cursor-pointer"
                  title="Test invalid site error"
                >
                  INVALID
                </button>
              </div>
            </div>
          </div>

          {/* Auto-populated Metadata Fields (F02) */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                <span>Sheet Metadata ({APP_METADATA.inventoryName})</span>
              </h3>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  siteData
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {siteData ? 'Verified' : 'Pending Lookup'}
              </span>
            </div>

            {/* Location (Read-only) */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Location (Column: Location)
              </label>
              <input
                type="text"
                readOnly
                value={siteData ? siteData.location : '— Please lookup SiteNo —'}
                className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 cursor-not-allowed select-all"
              />
            </div>

            {/* Size & Format (Read-only) */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Size (Column: Size)
                </label>
                <input
                  type="text"
                  readOnly
                  value={siteData ? siteData.size : '—'}
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs font-mono font-semibold text-slate-800 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Format (Column: Structure)
                </label>
                <input
                  type="text"
                  readOnly
                  value={siteData ? siteData.format : '—'}
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Editable Visual Field (Per PRD F02 requirement) */}
            <div className="pt-2 border-t border-slate-100">
              <label
                htmlFor="meta-visual"
                className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1 flex items-center justify-between"
              >
                <span>Visual Description / Campaign</span>
                <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                  Editable
                </span>
              </label>
              <input
                id="meta-visual"
                type="text"
                value={visual}
                onChange={(e) => onVisualChange(e.target.value)}
                placeholder="e.g. Maybank Islamic - Premier Wealth 2026 Visual"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                This text appears on the title block of Page 1 in Google Slides.
              </p>
            </div>
          </div>

          {/* Destination Info Box */}
          <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <p className="font-bold text-slate-800 flex items-center gap-1.5">
              <FolderGit2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Target Output Destination:</span>
            </p>
            <p className="font-mono text-[11px] text-slate-700 bg-white p-1.5 rounded border border-slate-200 truncate select-all">
              Folder ID: {APP_METADATA.driveFolderId}
            </p>
            <p className="text-[11px] text-slate-500">
              Naming template:{' '}
              <span className="font-mono font-bold text-slate-800">{namingPreview}</span>
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* RIGHT COLUMN: F03 MULTI-IMAGE UPLOAD BOX (1-8 IMAGES)          */}
        {/* ============================================================== */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <span>Inspection Photos Grid</span>
                  <span
                    id="photo-count-badge"
                    className="bg-slate-100 text-slate-800 text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border border-slate-200"
                  >
                    {filledCount} / 8 Selected
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Accepts up to 8 images (JPG, PNG). Empty frames remain blank grey placeholders.
                </p>
              </div>

              {/* Upload Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) handleFiles(e.target.files);
                  }}
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold border border-slate-300 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Select Files</span>
                </button>

                <button
                  type="button"
                  onClick={handleLoadDefaultPhotos}
                  className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold border border-emerald-200 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Load 5 Sample Photos</span>
                </button>

                {filledCount > 0 && (
                  <button
                    type="button"
                    onClick={handleClearAllPhotos}
                    className="px-2 py-1.5 text-slate-400 hover:text-red-600 rounded text-xs transition cursor-pointer"
                    title="Clear all photos"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Warning Notice for > 8 images (PRD F03 requirement: TC05) */}
            {uploadWarning && (
              <div
                id="upload-warning-box"
                className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-center gap-2 animate-fadeIn"
              >
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span id="upload-warning-text">{uploadWarning}</span>
              </div>
            )}

            {/* Drag & Drop Zone */}
            <div
              id="drop-zone"
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition mb-6 ${
                isDragOver
                  ? 'border-emerald-500 bg-emerald-50/40 scale-[0.99]'
                  : 'border-slate-300 hover:border-emerald-500 bg-slate-50/60 hover:bg-emerald-50/20'
              }`}
            >
              <div className="flex flex-col items-center justify-center space-y-1">
                <UploadCloud className="w-8 h-8 text-slate-400" />
                <p className="text-xs font-semibold text-slate-700">
                  Drag &amp; drop inspection photos here, or{' '}
                  <span className="text-emerald-600 underline">browse files</span>
                </p>
                <p className="text-[11px] text-slate-400">
                  Supports JPG, PNG • Max 8 images total (Page 1: 1–4, Page 2: 5–8)
                </p>
              </div>
            </div>

            {/* Visual Grid of 8 numbered frames (PRD F03: TC04) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" id="frames-grid">
              {Array.from({ length: 8 }).map((_, i) => {
                const photo = photos[i];
                const slotNum = i + 1;
                const pageNum = slotNum <= 4 ? 1 : 2;

                return (
                  <div
                    key={`slot-${slotNum}`}
                    className={`relative rounded-xl border p-2.5 flex flex-col justify-between transition hover:shadow-md ${
                      photo
                        ? 'border-emerald-300 bg-white shadow-xs'
                        : 'border-dashed border-slate-300 bg-slate-50'
                    }`}
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-center justify-between text-[11px] font-bold mb-1.5">
                        <span
                          className={`flex items-center gap-1 ${
                            photo ? 'text-slate-800' : 'text-slate-400'
                          }`}
                        >
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                              photo ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-700'
                            }`}
                          >
                            {slotNum}
                          </span>
                          <span>Frame #{slotNum}</span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">Pg {pageNum}</span>
                      </div>

                      {/* Photo Thumbnail or Empty Grey Box */}
                      <div className="w-full h-28 sm:h-32 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center relative border border-slate-200">
                        {photo ? (
                          <>
                            <img
                              src={photo.url}
                              alt={photo.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemovePhoto(i);
                              }}
                              className="absolute top-1.5 right-1.5 bg-black/70 hover:bg-red-600 text-white p-1 rounded-full text-xs transition cursor-pointer"
                              title="Remove photo"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </>
                        ) : (
                          <div className="text-center p-2 text-slate-400 select-none">
                            <div className="w-8 h-8 mx-auto mb-1 rounded bg-slate-200 flex items-center justify-center text-slate-400 text-xs">
                              {slotNum}
                            </div>
                            <p className="text-[10px] font-medium text-slate-400">Empty Grey Frame</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-2 text-[10px] truncate text-slate-500">
                      {photo ? (
                        <span className="text-slate-700 font-medium">{photo.name}</span>
                      ) : (
                        <span className="italic text-slate-400">Unused template space</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Action: Insert Button (Navigates to Pairwise Commenting F04) */}
            <div className="mt-8 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-500 font-medium">
                <span>
                  Page 1: {pg1Count} photo{pg1Count !== 1 ? 's' : ''} ({4 - pg1Count} blank) • Page 2:{' '}
                  {pg2Count} photo{pg2Count !== 1 ? 's' : ''} ({4 - pg2Count} blank)
                </span>
              </div>

              <button
                type="button"
                id="btn-insert"
                disabled={filledCount === 0}
                onClick={onProceedToComments}
                className={`px-6 py-2.5 rounded-lg text-xs font-bold tracking-wide shadow-md transition flex items-center gap-2 cursor-pointer ${
                  filledCount === 0
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-60'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/20 hover:shadow-emerald-600/20'
                }`}
              >
                <span>Insert &amp; Proceed to Comments</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
