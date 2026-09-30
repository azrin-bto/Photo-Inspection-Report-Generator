export type ScreenId = 'dashboard' | 'input' | 'comments' | 'success';

export interface SiteRecord {
  siteNo: string;
  location: string;
  size: string;
  format: string; // Structure column
  defaultVisual: string;
  seqCount: number;
  highway?: string;
  state?: string;
  district?: string;
  coordinates?: string;
}

export interface InspectionPhoto {
  id: string;
  url: string;
  name: string;
  comment: string;
  sizeBytes?: number;
  uploadedAt?: string;
}

export interface AppState {
  currentScreen: ScreenId;
  siteNo: string;
  siteData: SiteRecord | null;
  visual: string;
  photos: (InspectionPhoto | null)[]; // exactly 8 slots
  currentPairIndex: number; // 0, 1, 2, 3
  generatedFilename: string;
  activeSlidePreviewPage: 1 | 2;
  lookupError: string | null;
  isGenerating: boolean;
  generationStep: number;
}

export interface QAItem {
  id: string;
  ref: string;
  feature: string;
  condition: string;
  status: 'PASSED' | 'PENDING' | 'NOT TESTED';
  notes: string;
}
