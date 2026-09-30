import React, { useState } from 'react';
import { INVENTORY_DATABASE, APP_METADATA } from '../data/inventory';
import { SiteRecord } from '../types';
import {
  X,
  FileSpreadsheet,
  Search,
  ExternalLink,
  MapPin,
  Maximize2,
  Check,
} from 'lucide-react';

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSite: (siteNo: string) => void;
  selectedSiteNo: string;
}

export const InventoryModal: React.FC<InventoryModalProps> = ({
  isOpen,
  onClose,
  onSelectSite,
  selectedSiteNo,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('ALL');

  if (!isOpen) return null;

  const sites = Object.values(INVENTORY_DATABASE);

  const filteredSites = sites.filter((site) => {
    const matchesSearch =
      site.siteNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.format.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (site.highway && site.highway.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFormat =
      selectedFormat === 'ALL' || site.format.toLowerCase().includes(selectedFormat.toLowerCase());

    return matchesSearch && matchesFormat;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-fadeIn">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base">
                  {APP_METADATA.inventoryName} Directory
                </h3>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  2,450 Live Sites
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Official billboard inventory for Big Tree Outdoor highway &amp; urban assets
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={APP_METADATA.inventorySheetUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition"
              title="Open Google Sheets link"
            >
              <span>Open in Sheets</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="p-4 border-b border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by SiteNo, Location, Highway..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-medium">Format:</span>
            {['ALL', 'Unipole', 'LED', 'Gantry'].map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`px-2.5 py-1 rounded-md font-medium transition cursor-pointer ${
                  selectedFormat === fmt
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        {/* Inventory Table */}
        <div className="flex-1 overflow-y-auto p-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                <th className="py-2.5 px-3">Site No</th>
                <th className="py-2.5 px-3">Location Details</th>
                <th className="py-2.5 px-3">Size</th>
                <th className="py-2.5 px-3">Structure / Format</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSites.map((site) => {
                const isSelected = site.siteNo === selectedSiteNo;
                return (
                  <tr
                    key={site.siteNo}
                    onClick={() => {
                      onSelectSite(site.siteNo);
                      onClose();
                    }}
                    className={`hover:bg-emerald-50/50 cursor-pointer transition ${
                      isSelected ? 'bg-emerald-50' : ''
                    }`}
                  >
                    <td className="py-3 px-3">
                      <span className="font-mono font-bold text-slate-900 text-sm">
                        {site.siteNo}
                      </span>
                      {site.state && (
                        <span className="block text-[10px] text-slate-400 font-sans">
                          {site.state}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 max-w-xs">
                      <p className="font-medium text-slate-800 line-clamp-1">{site.location}</p>
                      {site.highway && (
                        <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-emerald-600 inline" />
                          <span>{site.highway}</span>
                        </p>
                      )}
                    </td>
                    <td className="py-3 px-3 font-mono font-semibold text-slate-700 whitespace-nowrap">
                      {site.size}
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-block bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium border border-slate-200">
                        {site.format}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectSite(site.siteNo);
                          onClose();
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ml-auto ${
                          isSelected
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-emerald-600 hover:text-white'
                        }`}
                      >
                        {isSelected ? <Check className="w-3.5 h-3.5" /> : null}
                        <span>{isSelected ? 'Selected' : 'Use Site'}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing {filteredSites.length} of {sites.length} indexed billboard locations
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold text-xs transition cursor-pointer"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
};
