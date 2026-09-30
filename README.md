# BTO Inspection Photos Report Generator

![Big Tree Outdoor](https://lh3.googleusercontent.com/aida-public/AB6AXuBilgD3OyaEtcYvcw5kESZo7AoBFeceW9NJsEEOUu8b5BtlxYGlfxe_HpL5xiMMV5P3Qk2cV62qNjvz0teAmGa_0m5ZwjsCnkdsWVCbxA1_afHnabcXcd36K1v2BTb2yZLA_pwvWHvmcneNEzh07xqsfosCMmchmM-dkjOW4lHXn-wOvbw-4DtTp92uK1zwzpuCTl4bqzqvRq52rt_Jtc1BayaassY9xpklM3HiNN2dY4-KNOlfhqFagZt53CAnlXcIANk)

> **Official Engineering Productivity Tool**  
> *Photo inspection report generator by Ts. Azrin Helmi Bin Mohd Ghazali, Big Tree Outdoor Sdn. Bhd.*  
> **PRD Version:** 1.1 | **Status:** Approved | **Division:** Engineering & Operations

---

## 1. Product Overview

The **BTO Inspection Photos Report Generator** automates the extraction of site billboard metadata from `Inventori_2026.gsheets` and standardizes photo inspection presentations in Google Slides in under two minutes with sequential naming.

### Problem Statement
Manual creation of photo inspection slides is time-consuming, error-prone, and inconsistent across regional billboard reports. This tool streamlines the end-to-end engineering workflow: from site metadata lookup and drag-and-drop photo assignment to pairwise technical review and automated presentation generation in Google Drive.

### Primary Objectives
- **Speed:** Complete standardized 2-page inspection slides in under 2 minutes.
- **Accuracy:** Zero manual transcription of billboard dimensions, structures, and locations.
- **Consistency:** Standardized 16:9 two-page slide layout adhering to `IPR_Sample.gslides`.
- **Traceability:** Automatic zero-padded sequential file naming (`[SiteNo]-[seq].gslides`) saved directly to the designated Google Drive destination folder.

---

## 2. Standard Operating Procedure (SOP)

```
[1. Input Site No] ──▶ [2. Upload 1-8 Photos] ──▶ [3. Pairwise Review] ──▶ [4. Google Slides Output]
  (Auto-fetch Sheet     (Automatic 8-frame grid;     (2 photos side-by-side;   (Sequential naming e.g.
   metadata & size)       unfilled remain grey)       presets & observations)    AGT-092-001 in Drive)
```

1. **Input Site Number (`SiteNo`):** Engineer inputs billboard ID (e.g. `AGT-092`, `KUL-551`, `SGR-889`). System queries `Inventori_2026.gsheets` and auto-fills Location, Size, and Format.
2. **Upload 1 to 8 Inspection Photos:** Drag-and-drop or select up to 8 images. Frames 1–4 are allocated to Page 1; Frames 5–8 to Page 2. Unfilled frames automatically remain clean grey placeholders.
3. **Pairwise Comments:** Step through the 2-photo preview carousel (`Photos 1 & 2` ➔ `Photos 3 & 4` ➔ `Photos 5 & 6` ➔ `Photos 7 & 8`). Enter engineering observations or insert quick standard tags.
4. **Automated Slide Output:** Generates presentation based on `IPR_Sample.gslides` with sequential naming (e.g. `AGT-092-001.gslides`), saving directly to the target shared Google Drive folder with live 16:9 canvas preview and PDF export capability.

---

## 3. Key Feature Specifications (PRD v1.1)

| Feature ID | Feature Name | System Logic & Expected Output | Validation & Error Handling |
| :--- | :--- | :--- | :--- |
| **F01** | **Header & Entry** | Displays official author attribution string and "+ Generate Inspection Photos Report" start button. | Exact title matching: *"Photo inspection report generator by Ts. Azrin Helmi Bin Mohd Ghazali, Big Tree Outdoor Sdn. Bhd."* |
| **F02** | **Metadata Retrieval** | Searches `Inventori_2026.gsheets` under `SiteNo`. Auto-populates `Location`, `Size`, and `Format` (from `Structure` column). Keeps `Visual` editable. | Displays: *"Site Number not found in inventory. Please verify and try again."* on invalid lookup. |
| **F03** | **Image Upload Box** | 8-slot drag-and-drop grid. Frames 1–4 map to Page 1; 5–8 map to Page 2. Unfilled slots remain blank grey frames. | Capped at 8 images. Uploading >8 displays: *"Maximum 8 images allowed. Only the first 8 images were kept."* |
| **F04** | **Pairwise Comments** | Carousel advances 2 photos per step with matching side-by-side comment inputs and standard footnote presets. | Empty comments allowed (defaults to blank text box on slide). |
| **F05** | **Slides Generation** | Clones template `IPR_Sample.gslides`, populates metadata & photos, scans folder to set sequence (e.g. `AGT-092-001`), and saves to Google Drive. | Validates Google Drive target folder permissions and presents live 16:9 interactive slide simulation. |

---

## 4. Integration Targets & Data Architecture

| Resource Type | Resource Identifier | Destination / URL |
| :--- | :--- | :--- |
| **Inventory Source** | `Inventori_2026.gsheets` | `https://docs.google.com/spreadsheets/d/1ZRHVQ0IBSJ8C3L86IFXDH8DYGVFYFYAHCNM9B_TPYEK` |
| **Slide Template** | `IPR_Sample.gslides` | `https://docs.google.com/presentation/d/1-lXKXd53YRH2N4i8uG-4zGI4Oe-pfkEm6MiCYDfCMdY/edit` |
| **Target Drive Folder**| Report Destination Folder | `https://drive.google.com/drive/folders/13gDVVR5fnjpfN7CSULNzU2dXPH3HjaNE` |
| **Folder ID** | `13gDVVR5fnjpfN7CSULNzU2dXPH3HjaNE` | Shared BTO Engineering & Operations Directory |

---

## 5. QA Verification Checklist (PRD Section 9)

All test conditions have been verified:

- [x] **TC01 (F01 Header):** Dashboard displays exact header attribution text and generator start button.
- [x] **TC02 (F02 Metadata):** Valid `SiteNo` (e.g., `AGT-092`) fetches correct Location, Billboard Size, and Structure.
- [x] **TC03 (F02 Metadata):** Invalid `SiteNo` renders clear user alert message.
- [x] **TC04 (F03 Upload):** Dragging 5 photos populates slots 1–5; slots 6–8 remain clean empty grey boxes.
- [x] **TC05 (F03 Upload):** Selecting >8 photos caps upload at 8 and renders warning dialog.
- [x] **TC06 (F04 Preview):** Pairwise comment carousel advances 2 photos per step with synchronized notes.
- [x] **TC07 (F05 Naming):** Output file created with sequential naming format `[SiteNo]-[seq]` (e.g. `AGT-092-001`).
- [x] **TC08 (F05 Output):** Unfilled slots leave corresponding template spaces blank on Google Slides (Page 1 $\le$ 4 photos, Page 2 $\le$ 4 photos).

---

## 6. Tech Stack

- **Framework:** React 19 (TypeScript)
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Design Tokens:** Big Tree Outdoor Industrial Engineering Design System (Slate Navy `#0F172A`, Infrastructure Green `#059669` / `#10B981`)
- **Typography:** Inter (Interface typography) & JetBrains Mono (Tabular numerals, SiteNos, and GIS telemetry)
- **Icons:** Lucide React

---

## 7. Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or bun

### Installation
```bash
# Clone the repository
git clone https://github.com/<your-username>/bto-inspection-report-generator.git

# Navigate to project directory
cd bto-inspection-report-generator

# Install dependencies
npm install
```

### Running Locally
```bash
# Start the Vite development server on port 3000
npm run dev
```

Visit `http://localhost:3000` in your web browser.

### Building for Production
```bash
# Typecheck and compile the applet
npm run build

# Preview production build
npm run preview
```

---

## 8. Author & Attribution

- **Author & System Architect:** Ts. Azrin Helmi Bin Mohd Ghazali
- **Organization:** Big Tree Outdoor Sdn. Bhd.
- **Contact:** azrinhelmi@bigtree.com.my
- **Document Reference:** BTO-PRD-v1.1 (A4 Format)
