import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BookOpen,
  Download,
  RotateCcw,
  Volume2,
} from 'lucide-react';
import { ReadAloudControl } from './ReadAloudControl';

export const BookSpread = ({ story, onDownloadPdf, isDownloadingPdf }) => {
  // Spreads:
  // index 0 = Cover
  // index 1..N = Page spreads (illustration + text)
  // index N+1 = Back cover / Moral
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [flipDirection, setFlipDirection] = useState(1); // 1 = forward, -1 = backward
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const totalPages = story.pages?.length || 0;
  const totalSpreads = totalPages + 2; // Cover + Pages + Back Cover

  const childName = story.childProfileId?.name || 'Little Adventurer';

  // Keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSpread();
      } else if (e.key === 'ArrowLeft') {
        prevSpread();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [spreadIndex, totalSpreads]);

  const nextSpread = () => {
    if (spreadIndex < totalSpreads - 1) {
      setFlipDirection(1);
      setSpreadIndex((prev) => prev + 1);
    }
  };

  const prevSpread = () => {
    if (spreadIndex > 0) {
      setFlipDirection(-1);
      setSpreadIndex((prev) => prev - 1);
    }
  };

  // Touch Swipe Handlers for Mobile & Tablet
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swiped Left -> Next Page
      nextSpread();
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Previous Page
      prevSpread();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Current page text for Read Aloud
  let currentReadAloudText = '';
  if (spreadIndex === 0) {
    currentReadAloudText = `${story.title}. A special personalized storybook for ${childName}.`;
  } else if (spreadIndex > 0 && spreadIndex <= totalPages) {
    currentReadAloudText = story.pages[spreadIndex - 1]?.text || '';
  } else {
    currentReadAloudText = `The Moral of the story: ${story.moral || 'Kindness and curiosity guide us.'} The End!`;
  }

  // 3D Flip animation variants
  const flipVariants = {
    initial: (dir) => ({
      rotateY: dir > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.97,
    }),
    animate: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: [0.25, 1, 0.5, 1],
      },
    },
    exit: (dir) => ({
      rotateY: dir > 0 ? -30 : 30,
      opacity: 0,
      scale: 0.97,
      transition: {
        duration: 0.35,
        ease: [0.5, 0, 0.75, 0],
      },
    }),
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
      {/* Top Reader Controls Bar */}
      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-4 py-3 mb-4 bg-[#FFFDF7]/90 backdrop-blur rounded-2xl border-2 border-ink/20 shadow-sm">
        <div className="flex items-center gap-2 overflow-hidden">
          <BookOpen className="w-5 h-5 text-berry shrink-0" />
          <span className="font-display font-bold text-sm sm:text-base text-ink truncate">
            {story.title}
          </span>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 shrink-0">
          {/* Read Aloud */}
          <ReadAloudControl
            currentText={currentReadAloudText}
            pageNumber={spreadIndex}
          />

          {/* Download PDF Button */}
          <button
            type="button"
            onClick={onDownloadPdf}
            disabled={isDownloadingPdf}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-meadow hover:bg-meadow-dark text-white font-bold text-xs rounded-full border-2 border-ink shadow-sm transition-all active:scale-95 disabled:opacity-50 shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="inline">
              {isDownloadingPdf ? 'Exporting...' : 'PDF'}
            </span>
          </button>
        </div>
      </div>

      {/* Book Spread Main 3D Container with Swipe Listeners */}
      <div
        className="w-full book-perspective py-2 px-1 sm:px-2 touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait" custom={flipDirection}>
          <motion.div
            key={spreadIndex}
            custom={flipDirection}
            variants={flipVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full bg-[#FFFDF7] rounded-3xl border-3 sm:border-4 border-[#2E1F3D] shadow-book-spread overflow-hidden min-h-[440px] sm:min-h-[540px] lg:min-h-[600px] flex flex-col md:flex-row relative"
          >
            {/* ========================================================= */}
            {/* SPREAD 0: COVER */}
            {/* ========================================================= */}
            {spreadIndex === 0 && (
              <div className="w-full h-full flex flex-col md:flex-row p-5 sm:p-10 items-center justify-between gap-6 sm:gap-8 bg-parchment-pattern border-4 sm:border-8 border-ink/10 m-1.5 sm:m-3 rounded-2xl">
                {/* Left: Title & Dedication */}
                <div className="w-full md:w-1/2 flex flex-col justify-center space-y-3 sm:space-y-4 text-center md:text-left order-2 md:order-1">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-berry text-white text-[11px] sm:text-xs font-black uppercase tracking-wider self-center md:self-start shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-marigold" />
                    Personalized Storybook
                  </div>

                  <h1 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-ink leading-tight">
                    {story.title}
                  </h1>

                  <p className="font-reading text-base sm:text-lg text-charcoal/90 italic">
                    An enchanting tale created especially for{' '}
                    <strong className="text-berry font-bold not-italic">
                      {childName}
                    </strong>
                    .
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="px-2.5 py-1 bg-parchment-dark text-ink font-bold text-xs rounded-lg border border-ink/20">
                      🎨 {story.artStyle || 'Illustrated'}
                    </span>
                    <span className="px-2.5 py-1 bg-parchment-dark text-ink font-bold text-xs rounded-lg border border-ink/20">
                      📖 {totalPages} Illustrated Pages
                    </span>
                  </div>

                  <div className="pt-4 sm:pt-6">
                    <button
                      type="button"
                      onClick={nextSpread}
                      className="w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-marigold hover:bg-marigold-dark text-ink font-black text-sm sm:text-base rounded-2xl border-2 sm:border-3 border-ink shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center justify-center gap-2"
                    >
                      <span>Open Book & Start Reading</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Right: Cover Artwork */}
                <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2">
                  <div className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] aspect-square rounded-2xl overflow-hidden border-3 sm:border-4 border-ink shadow-xl bg-white relative group">
                    <img
                      src={story.coverImageUrl || story.pages?.[0]?.imageUrl}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* SPREAD 1..N: STORY PAGES (Facing 2-page Spread) */}
            {/* ========================================================= */}
            {spreadIndex > 0 && spreadIndex <= totalPages && (
              <>
                {/* Left Page (Illustration) */}
                <div className="w-full md:w-1/2 p-4 sm:p-8 flex flex-col items-center justify-center relative bg-parchment-pattern">
                  {/* Subtle right gutter shadow on desktop */}
                  <div className="hidden md:block absolute right-0 top-0 bottom-0 w-8 book-gutter-shadow-right pointer-events-none" />

                  <div className="w-full max-w-[320px] sm:max-w-[420px] md:max-w-none aspect-square rounded-2xl overflow-hidden border-3 sm:border-4 border-ink shadow-md bg-white">
                    <img
                      src={story.pages[spreadIndex - 1]?.imageUrl}
                      alt={story.pages[spreadIndex - 1]?.text}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>

                  {/* Mobile Page indicator */}
                  <div className="md:hidden mt-2 text-xs font-bold text-ink/70">
                    Page {spreadIndex} of {totalPages}
                  </div>
                </div>

                {/* Center Book Gutter Spine on Desktop */}
                <div className="hidden md:block w-px bg-ink/20 relative">
                  <div className="absolute top-0 bottom-0 -left-6 w-6 book-gutter-shadow pointer-events-none" />
                  <div className="absolute top-0 bottom-0 -right-6 w-6 book-gutter-shadow-right pointer-events-none" />
                </div>

                {/* Right Page (Story Text in Literata) */}
                <div className="w-full md:w-1/2 p-5 sm:p-8 lg:p-12 flex flex-col justify-between relative bg-parchment-light">
                  {/* Subtle left gutter shadow on desktop */}
                  <div className="hidden md:block absolute left-0 top-0 bottom-0 w-8 book-gutter-shadow pointer-events-none" />

                  {/* Chapter / Page Badge */}
                  <div className="hidden md:flex items-center justify-between mb-4">
                    <span className="font-sans text-xs font-extrabold uppercase tracking-widest text-berry">
                      &starf; Page {spreadIndex} of {totalPages}
                    </span>
                  </div>

                  {/* Story Text with Drop Cap in 'Literata' */}
                  <div className="my-auto py-2 sm:py-4">
                    <p className="font-reading text-lg sm:text-2xl lg:text-[24px] text-charcoal leading-relaxed sm:leading-[1.75]">
                      <span className="font-display font-black text-3xl sm:text-5xl text-marigold-dark float-left mr-2.5 mt-0 leading-none">
                        {story.pages[spreadIndex - 1]?.text?.charAt(0)}
                      </span>
                      {story.pages[spreadIndex - 1]?.text?.slice(1)}
                    </p>
                  </div>

                  {/* Footer Page Number */}
                  <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-ink/10 text-xs font-bold text-ink/60 font-sans">
                    <span className="truncate max-w-[200px]">{story.title}</span>
                    <span>{spreadIndex}</span>
                  </div>
                </div>
              </>
            )}

            {/* ========================================================= */}
            {/* FINAL SPREAD: BACK COVER & MORAL */}
            {/* ========================================================= */}
            {spreadIndex > totalPages && (
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 sm:p-14 bg-parchment-pattern border-4 sm:border-8 border-ink/10 m-1.5 sm:m-3 rounded-2xl">
                <div className="max-w-2xl space-y-4 sm:space-y-6">
                  <div className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 bg-marigold text-ink font-sans font-black text-xs sm:text-sm uppercase tracking-widest rounded-full border-2 border-ink shadow-md">
                    &star; The Moral of the Story &star;
                  </div>

                  <h2 className="font-display font-bold text-xl sm:text-3xl text-ink leading-snug">
                    &ldquo;{story.moral || 'Kindness, curiosity, and courage make every day magical.'}&rdquo;
                  </h2>

                  <div className="font-display font-black text-2xl sm:text-4xl text-berry tracking-widest pt-2 sm:pt-4">
                    THE END
                  </div>

                  <p className="font-reading text-sm sm:text-base text-charcoal/80">
                    Thank you for reading with {childName}!
                  </p>

                  <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    <button
                      type="button"
                      onClick={() => setSpreadIndex(0)}
                      className="px-6 py-3 bg-parchment-dark hover:bg-parchment text-ink font-bold text-sm rounded-xl border-2 border-ink transition-all flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Read From Start</span>
                    </button>
                    <button
                      type="button"
                      onClick={onDownloadPdf}
                      disabled={isDownloadingPdf}
                      className="px-6 py-3 bg-meadow hover:bg-meadow-dark text-white font-bold text-sm rounded-xl border-2 border-ink shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Printable PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation Pagination Controls (Touch-Friendly & Fluid) */}
      <div className="flex items-center justify-between w-full max-w-md mt-4 sm:mt-6 px-3">
        <button
          type="button"
          onClick={prevSpread}
          disabled={spreadIndex === 0}
          className="min-h-[44px] flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 bg-[#FFFDF7] hover:bg-parchment text-ink font-bold text-xs sm:text-sm rounded-2xl border-2 border-ink shadow-sm transition-all active:scale-95 disabled:opacity-40 disabled:hover:bg-[#FFFDF7]"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Previous</span>
        </button>

        <div className="font-sans font-extrabold text-[11px] sm:text-xs text-ink/70 uppercase tracking-wider bg-parchment-dark/70 px-3 sm:px-4 py-2 rounded-full border border-ink/20">
          {spreadIndex === 0
            ? 'Cover'
            : spreadIndex > totalPages
            ? 'Back Cover'
            : `${spreadIndex} / ${totalPages}`}
        </div>

        <button
          type="button"
          onClick={nextSpread}
          disabled={spreadIndex === totalSpreads - 1}
          className="min-h-[44px] flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 bg-marigold hover:bg-marigold-dark text-ink font-black text-xs sm:text-sm rounded-2xl border-2 border-ink shadow-sm transition-all active:scale-95 disabled:opacity-40 disabled:hover:bg-marigold"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Swipe tip for mobile */}
      <div className="md:hidden mt-2 text-[10px] text-charcoal/50 font-bold uppercase tracking-wider text-center">
        💡 Swipe left / right or tap buttons to turn pages
      </div>
    </div>
  );
};
