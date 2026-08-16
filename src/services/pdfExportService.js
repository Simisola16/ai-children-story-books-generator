import { jsPDF } from 'jspdf';

/**
 * Helper to load an image URL into a base64 Data URL with fallback
 */
const loadImageDataUrl = async (url) => {
  if (!url) return null;
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width || 800;
        canvas.height = img.naturalHeight || img.height || 800;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        resolve(dataUrl);
      } catch (err) {
        console.warn('[PDF Export] Canvas export failed, skipping image:', err);
        resolve(null);
      }
    };
    img.onerror = () => {
      console.warn('[PDF Export] Could not load image:', url);
      resolve(null);
    };
    img.src = url;
  });
};

/**
 * Generates and downloads a high-resolution, print-ready landscape PDF
 * for a given storybook completely in the browser.
 */
export const generateStorybookPdf = async (story, filename) => {
  if (!story) throw new Error('No story data provided');

  // Create A4 Landscape PDF (297mm x 210mm)
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 297;
  const pageHeight = 210;
  const childName = story.childProfileId?.name || story.childName || 'Little Hero';
  const totalPages = story.pages?.length || 4;
  const safeFilename = filename || `${story.title.replace(/[^a-zA-Z0-9_-]/g, '_')}_Storybook.pdf`;

  // Color Palette
  const colors = {
    ink: [46, 31, 61],
    parchment: [246, 235, 211],
    white: [255, 253, 247],
    marigold: [242, 169, 59],
    berry: [196, 67, 107],
    meadow: [76, 139, 91],
    charcoal: [58, 52, 46],
  };

  // Helper to draw parchment background and double border
  const drawPageBorder = () => {
    // Fill background
    doc.setFillColor(...colors.parchment);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Inner paper card
    doc.setFillColor(...colors.white);
    doc.roundedRect(8, 8, pageWidth - 16, pageHeight - 16, 6, 6, 'F');

    // Outer ink border
    doc.setDrawColor(...colors.ink);
    doc.setLineWidth(1.2);
    doc.roundedRect(8, 8, pageWidth - 16, pageHeight - 16, 6, 6, 'S');

    // Inner gold decorative line
    doc.setDrawColor(...colors.marigold);
    doc.setLineWidth(0.6);
    doc.roundedRect(12, 12, pageWidth - 24, pageHeight - 24, 4, 4, 'S');
  };

  // ==========================================
  // PAGE 1: COVER
  // ==========================================
  drawPageBorder();

  // Top Badge
  doc.setFillColor(...colors.berry);
  doc.roundedRect(20, 20, 60, 8, 4, 4, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('PERSONALIZED STORYBOOK', 50, 25.5, { align: 'center' });

  // Story Title (Left side)
  doc.setTextColor(...colors.ink);
  doc.setFont('times', 'bold');
  doc.setFontSize(26);
  const titleLines = doc.splitTextToSize(story.title || 'Magical Adventure', 120);
  doc.text(titleLines, 20, 42);

  // Dedication
  const titleOffset = 42 + titleLines.length * 10;
  doc.setFont('times', 'italic');
  doc.setFontSize(14);
  doc.setTextColor(...colors.charcoal);
  doc.text(`An enchanting tale created especially for`, 20, titleOffset + 4);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...colors.berry);
  doc.setFontSize(18);
  doc.text(childName, 20, titleOffset + 14);

  // Tags & Features
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...colors.charcoal);
  doc.text(`Theme: ${story.theme || 'Adventure'}  •  Style: ${story.artStyle || 'Watercolor'}  •  ${totalPages} Illustrated Pages`, 20, titleOffset + 26);

  // Cover Image (Right side)
  const coverUrl = story.coverImageUrl || story.pages?.[0]?.imageUrl;
  const coverDataUrl = await loadImageDataUrl(coverUrl);

  if (coverDataUrl) {
    // Outer shadow box
    doc.setFillColor(230, 220, 200);
    doc.roundedRect(162, 22, 114, 114, 4, 4, 'F');
    // Image
    doc.addImage(coverDataUrl, 'JPEG', 160, 20, 114, 114);
    doc.setDrawColor(...colors.ink);
    doc.setLineWidth(1);
    doc.roundedRect(160, 20, 114, 114, 2, 2, 'S');
  }

  // Cover Footer
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...colors.charcoal);
  doc.text('AI STORYBOOK GENERATOR • KEEPSAKE EDITION', pageWidth / 2, pageHeight - 16, { align: 'center' });

  // ==========================================
  // PAGES 2..N+1: STORY SPREADS
  // ==========================================
  const pages = story.pages || [];
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const pageNum = i + 1;

    doc.addPage('a4', 'landscape');
    drawPageBorder();

    // Center Spine Gutter divider
    doc.setDrawColor(220, 210, 195);
    doc.setLineWidth(0.8);
    doc.line(pageWidth / 2, 14, pageWidth / 2, pageHeight - 14);

    // Left Page: Full Illustration
    const pageImgData = await loadImageDataUrl(page.imageUrl);
    if (pageImgData) {
      doc.addImage(pageImgData, 'JPEG', 20, 24, 115, 115);
      doc.setDrawColor(...colors.ink);
      doc.setLineWidth(0.8);
      doc.roundedRect(20, 24, 115, 115, 2, 2, 'S');
    } else {
      // Placeholder box
      doc.setFillColor(240, 235, 225);
      doc.roundedRect(20, 24, 115, 115, 2, 2, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(...colors.ink);
      doc.text('Illustration', 77, 82, { align: 'center' });
    }

    // Left Page Number
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(150, 140, 130);
    doc.text(`Page ${pageNum}`, 77, pageHeight - 18, { align: 'center' });

    // Right Page: Story Text
    // Page Header Badge
    doc.setFillColor(...colors.parchment);
    doc.roundedRect(158, 22, 50, 7, 3, 3, 'F');
    doc.setTextColor(...colors.berry);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text(`PAGE ${pageNum} OF ${totalPages}`, 183, 27, { align: 'center' });

    // Story Text Content
    doc.setTextColor(...colors.ink);
    doc.setFont('times', 'normal');
    doc.setFontSize(15);
    const storyTextLines = doc.splitTextToSize(page.text || '', 115);
    doc.text(storyTextLines, 158, 48, { lineHeightFactor: 1.6 });

    // Right Page Footer
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(150, 140, 130);
    doc.text(story.title, 158, pageHeight - 18);
    doc.text(`${pageNum}`, pageWidth - 20, pageHeight - 18, { align: 'right' });
  }

  // ==========================================
  // FINAL PAGE: THE MORAL & BACK COVER
  // ==========================================
  doc.addPage('a4', 'landscape');
  drawPageBorder();

  // Moral Gold Seal Box
  doc.setFillColor(...colors.marigold);
  doc.roundedRect(pageWidth / 2 - 45, 30, 90, 12, 6, 6, 'F');
  doc.setDrawColor(...colors.ink);
  doc.setLineWidth(0.8);
  doc.roundedRect(pageWidth / 2 - 45, 30, 90, 12, 6, 6, 'S');

  doc.setTextColor(...colors.ink);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('THE MORAL OF THE STORY', pageWidth / 2, 38, { align: 'center' });

  // Moral Text
  doc.setFont('times', 'italic');
  doc.setFontSize(18);
  doc.setTextColor(...colors.ink);
  const moralLines = doc.splitTextToSize(`"${story.moral || 'Kindness, curiosity, and courage make every day magical.'}"`, 210);
  doc.text(moralLines, pageWidth / 2, 62, { align: 'center', lineHeightFactor: 1.5 });

  // THE END
  doc.setFont('times', 'bold');
  doc.setFontSize(36);
  doc.setTextColor(...colors.berry);
  doc.text('THE END', pageWidth / 2, 118, { align: 'center' });

  // Closing Dedication Note
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(...colors.charcoal);
  doc.text(`Thank you for reading with ${childName}!`, pageWidth / 2, 136, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...colors.marigold);
  doc.text('Created with AI Storybook Generator • https://childrenstorybooksgenerator.vercel.app', pageWidth / 2, pageHeight - 20, { align: 'center' });

  // Save / Download PDF
  doc.save(safeFilename);
  return true;
};
