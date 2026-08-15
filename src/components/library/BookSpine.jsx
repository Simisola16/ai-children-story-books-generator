import React from 'react';
import { Sparkles, BookOpen, Download, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const SPINE_PALETTES = [
  { bg: 'bg-[#C4436B]', border: 'border-[#8E2800]', text: 'text-[#FFFDF7]', foil: '#F2A93B' },
  { bg: 'bg-[#2E1F3D]', border: 'border-[#1D1327]', text: 'text-[#FFFDF7]', foil: '#F2A93B' },
  { bg: 'bg-[#4C8B5B]', border: 'border-[#2D5A38]', text: 'text-[#FFFDF7]', foil: '#FFFBEA' },
  { bg: 'bg-[#F2A93B]', border: 'border-[#B87D1B]', text: 'text-[#2E1F3D]', foil: '#2E1F3D' },
  { bg: 'bg-[#3A86FF]', border: 'border-[#1D4ED8]', text: 'text-[#FFFDF7]', foil: '#F2A93B' },
  { bg: 'bg-[#8338EC]', border: 'border-[#5B17B0]', text: 'text-[#FFFDF7]', foil: '#FFEAA7' },
];

export const BookSpine = ({ story, index, onDelete, onDownloadPdf }) => {
  const palette = SPINE_PALETTES[index % SPINE_PALETTES.length];
  const childName = story.childProfileId?.name || 'Child';
  const isComplete = story.status === 'complete';

  return (
    <div className="relative group flex flex-col items-center">
      {/* 3D Vertical Book Spine */}
      <Link
        to={isComplete ? `/stories/${story._id}` : `/stories/${story._id}/generating`}
        className={`w-14 sm:w-16 h-72 sm:h-80 rounded-t-lg rounded-b-sm ${palette.bg} ${palette.border} border-y-2 border-r-4 border-l-2 shadow-book-spine cursor-pointer transition-all duration-300 transform group-hover:-translate-y-4 group-hover:scale-105 flex flex-col justify-between py-4 px-2.5 relative select-none`}
      >
        {/* Top Gold Embossed Star */}
        <div className="flex justify-center">
          <Sparkles className="w-4 h-4 text-marigold" />
        </div>

        {/* Vertical Title (Rotated 90 degrees) */}
        <div className="flex-1 flex items-center justify-center overflow-hidden my-2">
          <span
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            className={`font-display font-black text-sm tracking-wider uppercase truncate max-h-48 ${palette.text}`}
          >
            {story.title}
          </span>
        </div>

        {/* Bottom Spine Details: Child Tag + Ribbons */}
        <div className="flex flex-col items-center text-center">
          <div className="w-full h-0.5 bg-white/30 my-1" />
          <span className={`text-[10px] font-sans font-extrabold uppercase tracking-tight truncate w-full ${palette.text} opacity-90`}>
            {childName}
          </span>
          <span className={`text-[9px] font-sans font-bold opacity-75 ${palette.text}`}>
            {story.pageCount}p
          </span>
        </div>

        {/* Ribbon Bookmark Peeking Out at the Bottom */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3 h-5 bg-berry rounded-b-sm shadow-sm" />
      </Link>

      {/* Floating Hover Action Tooltip */}
      <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto flex items-center gap-1.5 bg-[#FFFDF7] px-2.5 py-1 rounded-xl border-2 border-ink shadow-lg z-20 whitespace-nowrap text-xs font-bold text-ink">
        <Link
          to={isComplete ? `/stories/${story._id}` : `/stories/${story._id}/generating`}
          className="hover:text-berry flex items-center gap-1"
        >
          <BookOpen className="w-3.5 h-3.5" /> Read
        </Link>
        {isComplete && onDownloadPdf && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onDownloadPdf(story);
            }}
            className="hover:text-meadow p-1"
            title="Download PDF"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onDelete(story._id);
            }}
            className="hover:text-red-500 p-1"
            title="Delete Story"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
