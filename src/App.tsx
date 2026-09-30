/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenId, SiteRecord, InspectionPhoto } from './types';
import {
  INVENTORY_DATABASE,
  SAMPLE_INSPECTION_PHOTOS,
  APP_METADATA,
} from './data/inventory';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DashboardScreen } from './components/DashboardScreen';
import { InputScreen } from './components/InputScreen';
import { PairwiseCommentsScreen } from './components/PairwiseCommentsScreen';
import { SuccessScreen } from './components/SuccessScreen';
import { InventoryModal } from './components/InventoryModal';
import { QAModal } from './components/QAModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('dashboard');
  const [siteNo, setSiteNo] = useState<string>('AGT-092');
  const [siteData, setSiteData] = useState<SiteRecord | null>(INVENTORY_DATABASE['AGT-092']);
  const [visual, setVisual] = useState<string>('Maybank Islamic - Premier Wealth 2026 Visual');

  // Exactly 8 photo slots (Page 1: slots 0..3, Page 2: slots 4..7)
  const [photos, setPhotos] = useState<(InspectionPhoto | null)[]>([
    { ...SAMPLE_INSPECTION_PHOTOS[0] },
    { ...SAMPLE_INSPECTION_PHOTOS[1] },
    { ...SAMPLE_INSPECTION_PHOTOS[2] },
    { ...SAMPLE_INSPECTION_PHOTOS[3] },
    { ...SAMPLE_INSPECTION_PHOTOS[4] },
    null,
    null,
    null,
  ]);

  const [currentPairIndex, setCurrentPairIndex] = useState<number>(0); // 0: 1&2, 1: 3&4, 2: 5&6, 3: 7&8
  const [generatedFilename, setGeneratedFilename] = useState<string>('AGT-092-001.gslides');
  const [activeSlidePreviewPage, setActiveSlidePreviewPage] = useState<1 | 2>(1);
  const [lookupError, setLookupError] = useState<string | null>(null);

  // Generation animation states
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<number>(1);

  // Modals
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState<boolean>(false);
  const [isQAModalOpen, setIsQAModalOpen] = useState<boolean>(false);

  // F02 Site Metadata Lookup
  const handleLookupSite = (querySiteNo: string) => {
    const trimmed = querySiteNo.trim().toUpperCase();
    setSiteNo(trimmed);

    if (!trimmed) {
      setLookupError('Please enter a Site Number to search.');
      setSiteData(null);
      return;
    }

    if (INVENTORY_DATABASE[trimmed]) {
      const found = INVENTORY_DATABASE[trimmed];
      setSiteData(found);
      setVisual(found.defaultVisual);
      setLookupError(null);

      const seqStr = String(found.seqCount).padStart(3, '0');
      setGeneratedFilename(`${trimmed}-${seqStr}.gslides`);
    } else {
      // PRD F02 error requirement: TC03
      setLookupError('Site Number not found in inventory. Please verify and try again.');
      setSiteData(null);
      setGeneratedFilename(`${trimmed}-001.gslides`);
    }
  };

  // Quick Demo Trigger
  const handleQuickDemo = (demoSiteNo: string) => {
    handleLookupSite(demoSiteNo);
    setCurrentScreen('input');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pairwise Comments change
  const handleCommentChange = (photoIndex: number, newComment: string) => {
    const newPhotos = [...photos];
    if (newPhotos[photoIndex]) {
      newPhotos[photoIndex] = {
        ...newPhotos[photoIndex]!,
        comment: newComment,
      };
      setPhotos(newPhotos);
    }
  };

  // Trigger Report Generation (F05)
  const handleCreateReport = () => {
    // Calculate final sequential file name
    const seq = siteData ? String(siteData.seqCount).padStart(3, '0') : '001';
    const filename = `${siteNo || 'AGT-092'}-${seq}.gslides`;
    setGeneratedFilename(filename);

    setIsGenerating(true);
    setGenerationStep(1);
    setCurrentScreen('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Step-by-step progress simulation
    setTimeout(() => {
      setGenerationStep(2);
    }, 500);

    setTimeout(() => {
      setGenerationStep(3);
    }, 900);

    setTimeout(() => {
      setIsGenerating(false);
      setActiveSlidePreviewPage(1);
    }, 1300);
  };

  // Navigation handlers
  const handleProceedToComments = () => {
    setCurrentPairIndex(0);
    setCurrentScreen('comments');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreateAnother = () => {
    setCurrentScreen('input');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Application Bar */}
      <Header
        currentScreen={currentScreen}
        onNavigate={(screen) => {
          setCurrentScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenInventory={() => setIsInventoryModalOpen(true)}
        onOpenQA={() => setIsQAModalOpen(true)}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {currentScreen === 'dashboard' && (
          <DashboardScreen
            onStartReport={() => {
              setCurrentScreen('input');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onQuickDemo={handleQuickDemo}
            onOpenInventory={() => setIsInventoryModalOpen(true)}
            onOpenQA={() => setIsQAModalOpen(true)}
          />
        )}

        {currentScreen === 'input' && (
          <InputScreen
            siteNo={siteNo}
            siteData={siteData}
            visual={visual}
            photos={photos}
            lookupError={lookupError}
            onSiteNoChange={setSiteNo}
            onLookupSite={handleLookupSite}
            onVisualChange={setVisual}
            onPhotosChange={setPhotos}
            onProceedToComments={handleProceedToComments}
            onBackToDashboard={handleBackToDashboard}
            onOpenInventory={() => setIsInventoryModalOpen(true)}
          />
        )}

        {currentScreen === 'comments' && (
          <PairwiseCommentsScreen
            siteNo={siteNo}
            photos={photos}
            currentPairIndex={currentPairIndex}
            onPairIndexChange={setCurrentPairIndex}
            onCommentChange={handleCommentChange}
            onBackToInput={() => {
              setCurrentScreen('input');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onCreateReport={handleCreateReport}
          />
        )}

        {currentScreen === 'success' && (
          <SuccessScreen
            siteNo={siteNo}
            siteData={siteData}
            visual={visual}
            photos={photos}
            generatedFilename={generatedFilename}
            isGenerating={isGenerating}
            generationStep={generationStep}
            activeSlidePage={activeSlidePreviewPage}
            onSwitchSlidePage={setActiveSlidePreviewPage}
            onCreateAnother={handleCreateAnother}
            onBackToDashboard={handleBackToDashboard}
            onOpenQA={() => setIsQAModalOpen(true)}
          />
        )}
      </main>

      {/* Footer Attribution */}
      <Footer
        onOpenInventory={() => setIsInventoryModalOpen(true)}
        onOpenQA={() => setIsQAModalOpen(true)}
      />

      {/* Database Sheet Directory Modal */}
      <InventoryModal
        isOpen={isInventoryModalOpen}
        onClose={() => setIsInventoryModalOpen(false)}
        selectedSiteNo={siteNo}
        onSelectSite={(selected) => {
          handleLookupSite(selected);
          setIsInventoryModalOpen(false);
        }}
      />

      {/* PRD QA Verification Modal */}
      <QAModal isOpen={isQAModalOpen} onClose={() => setIsQAModalOpen(false)} />
    </div>
  );
}
