import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, BookOpen, Download } from 'lucide-react';
import { ReadAloudControl } from './ReadAloudControl';

export const BookSpread = ({ story, onDownloadPdf, isDownloadingPdf }) => {
  // Spreads:
  // index 0 = Cover
  // index 1..N = Page spreads (each page has an illustration + story text)
  // index N+1 = Back cover / Moral
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [flipDirection, setFlipDirection] = useState(1); // 1 = forward, -1 = backward

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

  // Current page text for Read Aloud
  let currentReadAloudText = '';
  if (spreadIndex === 0) {
    currentReadAloudText = `${story.title}. A special storybook for ${childName}.`;
  } else if (spreadIndex > 0 && spreadIndex <= totalPages) {
    currentReadAloudText = story.pages[spreadIndex - 1]?.text || '';
  } else {
    currentReadAloudText = `The Moral of the story: ${story.moral || 'Kindness and curiosity guide us.'} The End!`;
  }

  // 3D Flip animation variants
  const flipVariants = {
    initial: (dir) => ({
      rotateY: dir > 0 ? 45 : -45,
      opacity: 0,
      scale: 0.96,
    }),
    animate: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1],
      },
    },
    exit: (dir) => ({
      rotateY: dir > 0 ? -45 : 45,
      opacity: 0,
      scale: 0.96,
      transition: {
        duration: 0.4,
        ease: [0.5, 0, 0.75, 0],
      },
    }),
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
      {/* Top Reader Controls Bar */}
      <div className="w-full flex items-center justify-between px-4 py-3 mb-4 bg-[#FFFDF7]/80 backdrop-blur rounded-2xl border-2 border-ink/20 shadow-sm">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-berry" />
          <span className="font-display font-bold text-base text-ink truncate max-w-xs sm:max-w-md">
            {story.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
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
            className="flex items-center gap-2 px-3.5 py-1.5 bg-meadow hover:bg-meadow-dark text-white font-bold text-xs rounded-full border-2 border-ink shadow-sm transition-all active:scale-95 disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isDownloadingPdf ? 'Generating PDF...' : 'Download PDF'}
            </span>
          </button>
        </div>
      </div>

      {/* Book Spread Main 3D Container */}
      <div className="w-full book-perspective py-2 px-1 sm:px-4">
        <AnimatePresence mode="wait" custom={flipDirection}>
          <motion.div
            key={spreadIndex}
            custom={flipDirection}
            variants={flipVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full bg-[#FFFDF7] rounded-3xl border-4 border-[#2E1F3D] shadow-book-spread overflow-hidden min-h-[500px] sm:min-h-[580px] lg:min-h-[620px] flex flex-col md:flex-row relative"
          >
            {/* ========================================================= */}
            {/* SPREAD 0: COVER */}
            {/* ========================================================= */}
            {spreadIndex === 0 && (
              <div className="w-full h-full flex flex-col md:flex-row p-6 sm:p-12 items-center justify-between gap-8 bg-parchment-pattern border-8 border-ink/10 m-2 sm:m-4 rounded-2xl">
                {/* Left: Big Title & Dedication */}
                <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-berry text-white text-xs font-black uppercase tracking-wider self-center md:self-start shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-marigold" />
                    Personalized Storybook
                  </div>

                  <h1 className="font-display font-black text-3xl sm:text-5xl text-ink leading-tight text-shadow">
                    {story.title}
                  </h1>

                  <p className="font-reading text-lg text-charcoal/90 italic">
                    An enchanting tale created especially for{' '}
                    <strong className="text-berry font-bold not-italic">
                      {childName}
                    </strong>
                    .
                  </p>

                  <div className="pt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="px-3 py-1 bg-parchment-dark text-ink font-bold text-xs rounded-lg border border-ink/20">
                      🎨 {story.artStyle} Style
                    </span>
                    <span className="px-3 py-1 bg-parchment-dark text-ink font-bold text-xs rounded-lg border border-ink/20">
                      📖 {totalPages} Illustrated Pages
                    </span>
                  </div>

                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={nextSpread}
                      className="px-8 py-3.5 bg-marigold hover:bg-marigold-dark text-ink font-black text-base rounded-2xl border-3 border-ink shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-3"
                    >
                      <span>Open Book & Start Reading</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Right: Cover Artwork */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="w-full max-w-[380px] aspect-square rounded-2xl overflow-hidden border-4 border-ink shadow-xl bg-white relative group">
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
                {/* Left Page (Desktop: Illustration) */}
                <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col items-center justify-center relative bg-parchment-pattern">
                  {/* Subtle right gutter shadow */}
                  <div className="hidden md:block absolute right-0 top-0 bottom-0 w-8 book-gutter-shadow-right pointer-events-none" />

                  <div className="w-full h-full max-h-[460px] aspect-square rounded-2xl overflow-hidden border-4 border-ink shadow-md bg-white">
                    <img
                      src={story.pages[spreadIndex - 1]?.imageUrl}
                      alt={story.pages[spreadIndex - 1]?.text}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Mobile Page indicator */}
                  <div className="md:hidden mt-3 text-xs font-bold text-ink/70">
                    Page {spreadIndex} of {totalPages}
                  </div>
                </div>

                {/* Center Book Gutter Spine on Desktop */}
                <div className="hidden md:block w-px bg-ink/20 relative">
                  <div className="absolute top-0 bottom-0 -left-6 w-6 book-gutter-shadow pointer-events-none" />
                  <div className="absolute top-0 bottom-0 -right-6 w-6 book-gutter-shadow-right pointer-events-none" />
                </div>

                {/* Right Page (Desktop: Reading Text in Literata/Lora) */}
                <div className="w-full md:w-1/2 p-6 sm:p-12 flex flex-col justify-between relative bg-parchment-light">
                  {/* Subtle left gutter shadow */}
                  <div className="hidden md:block absolute left-0 top-0 bottom-0 w-8 book-gutter-shadow pointer-events-none" />

                  {/* Chapter / Page Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-sans text-xs font-extrabold uppercase tracking-widest text-berry">
                      &starf; Page {spreadIndex} of {totalPages}
                    </span>
                  </div>

                  {/* Story Text with Drop Cap in 'Literata' */}
                  <div className="my-auto">
                    <p className="font-reading text-xl sm:text-2xl lg:text-[26px] text-charcoal leading-relaxed sm:leading-[1.75]">
                      <span className="font-display font-black text-4xl sm:text-5xl text-marigold-dark float-left mr-2.5 mt-0 leading-none">
                        {story.pages[spreadIndex - 1]?.text?.charAt(0)}
                      </span>
                      {story.pages[spreadIndex - 1]?.text?.slice(1)}
                    </p>
                  </div>

                  {/* Footer Page Number */}
                  <div className="flex items-center justify-between pt-6 border-t border-ink/10 text-xs font-bold text-ink/60 font-sans">
                    <span>{story.title}</span>
                    <span>{spreadIndex}</span>
                  </div>
                </div>
              </>
            )}

            {/* ========================================================= */}
            {/* FINAL SPREAD: BACK COVER & MORAL */}
            {/* ========================================================= */}
            {spreadIndex > totalPages && (
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 sm:p-16 bg-parchment-pattern border-8 border-ink/10 m-2 sm:m-4 rounded-2xl">
                <div className="max-w-2xl space-y-6">
                  <div className="inline-block px-6 py-2 bg-marigold text-ink font-sans font-black text-sm uppercase tracking-widest rounded-full border-2 border-ink shadow-md">
                    &star; The Moral of the Story &star;
                  </div>

                  <h2 className="font-display font-bold text-2xl sm:text-4xl text-ink leading-snug">
                    &ldquo;{story.moral || 'Kindness, curiosity, and courage make every day magical.'}&rdquo;
                  </h2>

                  <div className="font-display font-black text-3xl sm:text-5xl text-berry tracking-widest pt-4">
                    THE END
                  </div>

                  <p className="font-reading text-base text-charcoal/80">
                    Thank you for reading with {childName}!
                  </p>

                  <div className="pt-6 flex flex-wrap gap-4 justify-center">
                    <button
                      type="button"
                      onClick={() => setSpreadIndex(0)}
                      className="px-6 py-3 bg-parchment-dark hover:bg-parchment text-ink font-bold text-sm rounded-xl border-2 border-ink transition-all"
                    >
                      Read From Start
                    </button>
                    <button
                      type="button"
                      onClick={onDownloadPdf}
                      disabled={isDownloadingPdf}
                      className="px-6 py-3 bg-meadow hover:bg-meadow-dark text-white font-bold text-sm rounded-xl border-2 border-ink shadow-md transition-all flex items-center gap-2"
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

      {/* Bottom Navigation Pagination Controls */}
      <div className="flex items-center justify-between w-full max-w-md mt-6 px-4">
        <button
          type="button"
          onClick={prevSpread}
          disabled={spreadIndex === 0}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#FFFDF7] hover:bg-parchment text-ink font-bold text-sm rounded-2xl border-2 border-ink shadow-sm transition-all disabled:opacity-40 disabled:hover:bg-[#FFFDF7]"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>

        <div className="font-sans font-extrabold text-xs text-ink/70 uppercase tracking-wider bg-parchment-dark/70 px-4 py-2 rounded-full border border-ink/20">
          {spreadIndex === 0
            ? 'Cover'
            : spreadIndex > totalPages
            ? 'Back Cover'
            : `Spread ${spreadIndex} of ${totalPages}`}
        </div>

        <button
          type="button"
          onClick={nextSpread}
          disabled={spreadIndex === totalSpreads - 1}
          className="flex items-center gap-2 px-5 py-2.5 bg-marigold hover:bg-marigold-dark text-ink font-black text-sm rounded-2xl border-2 border-ink shadow-sm transition-all disabled:opacity-40 disabled:hover:bg-marigold"
        >
          <span>Next</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
