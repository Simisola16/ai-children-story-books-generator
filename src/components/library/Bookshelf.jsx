import React, { useState } from 'react';
import { BookSpine } from './BookSpine';
import {
  PlusCircle,
  Sparkles,
  LayoutGrid,
  BookOpen,
  Download,
  Trash2,
  Columns,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Bookshelf = ({ stories = [], childName = '', onDelete, onDownloadPdf }) => {
  const [viewMode, setViewMode] = useState('grid'); // Default to 'grid' on mobile, can switch to 'shelf'

  // Break stories into shelves of 7 books per shelf for the shelf view
  const booksPerShelf = 7;
  const shelves = [];

  if (stories.length === 0) {
    shelves.push([]);
  } else {
    for (let i = 0; i < stories.length; i += booksPerShelf) {
      shelves.push(stories.slice(i, i + booksPerShelf));
    }
  }

  return (
    <div className="w-full space-y-6">
      {/* View Switcher Controls */}
      {stories.length > 0 && (
        <div className="flex items-center justify-between px-2">
          <span className="text-xs font-black uppercase tracking-wider text-ink/70">
            {stories.length} {stories.length === 1 ? 'Storybook' : 'Storybooks'} in Library
          </span>

          <div className="inline-flex p-1 bg-parchment-dark/60 rounded-xl border border-ink/20 shadow-inner">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#FFFDF7] text-ink border border-ink/20 shadow-sm'
                  : 'text-ink/60 hover:text-ink'
              }`}
              title="Card Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('shelf')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'shelf'
                  ? 'bg-[#FFFDF7] text-ink border border-ink/20 shadow-sm'
                  : 'text-ink/60 hover:text-ink'
              }`}
              title="Wooden Shelf View"
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Shelf</span>
            </button>
          </div>
        </div>
      )}

      {/* VIEW 1: Visual Card Grid (Super mobile friendly & touch optimized) */}
      {viewMode === 'grid' && (
        <>
          {stories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {stories.map((story) => {
                const isComplete = story.status === 'complete';
                const child = story.childProfileId?.name || 'Child';

                return (
                  <div
                    key={story._id}
                    className="bg-[#FFFDF7] rounded-3xl border-3 border-ink shadow-parchment-card hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
                  >
                    {/* Cover Art Tile */}
                    <Link
                      to={isComplete ? `/stories/${story._id}` : `/stories/${story._id}/generating`}
                      className="block aspect-square w-full relative overflow-hidden bg-parchment border-b-2 border-ink/15"
                    >
                      <img
                        src={story.coverImageUrl || story.pages?.[0]?.imageUrl}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-berry text-white text-[10px] font-black uppercase tracking-wider rounded-lg border border-ink shadow-sm">
                        {child}
                      </div>
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-parchment text-ink text-[10px] font-extrabold rounded-lg border border-ink shadow-sm">
                        {story.pageCount || 4} Pages
                      </div>
                    </Link>

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-display font-black text-lg text-ink line-clamp-1 group-hover:text-berry transition-colors">
                          {story.title}
                        </h3>
                        <p className="font-reading text-xs text-charcoal/80 line-clamp-2 mt-1">
                          {story.synopsis || `An adventure tale created for ${child}.`}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-2 border-t border-ink/10 flex items-center justify-between gap-2">
                        <Link
                          to={isComplete ? `/stories/${story._id}` : `/stories/${story._id}/generating`}
                          className="flex-1 py-2 px-3 bg-marigold hover:bg-marigold-dark text-ink font-black text-xs rounded-xl border-2 border-ink shadow-sm transition-all flex items-center justify-center gap-1.5"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>{isComplete ? 'Read Book' : 'Generating...'}</span>
                        </Link>

                        {isComplete && onDownloadPdf && (
                          <button
                            type="button"
                            onClick={() => onDownloadPdf(story)}
                            className="p-2 bg-meadow hover:bg-meadow-dark text-white rounded-xl border-2 border-ink shadow-sm transition-all"
                            title="Download PDF"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        )}

                        {onDelete && (
                          <button
                            type="button"
                            onClick={() => onDelete(story._id)}
                            className="p-2 bg-rose-50 hover:bg-rose-100 text-berry rounded-xl border-2 border-berry/30 transition-all"
                            title="Delete Storybook"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full bg-[#FFFDF7] rounded-3xl p-8 sm:p-12 border-4 border-ink shadow-parchment-card text-center space-y-4">
              <Sparkles className="w-10 h-10 text-marigold mx-auto" />
              <h3 className="font-display font-black text-2xl text-ink">
                No Storybooks on this Shelf Yet!
              </h3>
              <p className="text-sm text-charcoal/80 max-w-sm mx-auto">
                Ready to weave an adventure? Create your child's personalized picture book in minutes.
              </p>
              <div className="pt-2">
                <Link
                  to="/create"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-berry text-white font-bold text-sm rounded-xl border-2 border-ink shadow-md"
                >
                  <PlusCircle className="w-4 h-4 text-marigold" />
                  <span>Create First Story</span>
                </Link>
              </div>
            </div>
          )}
        </>
      )}

      {/* VIEW 2: Classic 3D Wooden Bookshelf Spines View */}
      {viewMode === 'shelf' && (
        <div className="w-full space-y-12">
          {shelves.map((shelfStories, shelfIdx) => (
            <div key={shelfIdx} className="relative pt-8 pb-4">
              {/* Books Row */}
              <div className="flex items-end justify-start gap-2.5 sm:gap-4 px-4 sm:px-12 min-h-[280px] sm:min-h-[320px] overflow-x-auto pb-1 scrollbar-none">
                {shelfStories.length > 0 ? (
                  shelfStories.map((story, bookIdx) => (
                    <BookSpine
                      key={story._id}
                      story={story}
                      index={shelfIdx * booksPerShelf + bookIdx}
                      onDelete={onDelete}
                      onDownloadPdf={onDownloadPdf}
                    />
                  ))
                ) : (
                  <div className="w-full flex flex-col items-center justify-center py-12 text-center">
                    <p className="font-display font-bold text-lg text-ink/70 mb-3">
                      This shelf is empty!
                    </p>
                    <Link
                      to="/create"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-marigold hover:bg-marigold-dark text-ink font-black text-sm rounded-xl border-2 border-ink shadow"
                    >
                      <Sparkles className="w-4 h-4" />
                      Generate a Book
                    </Link>
                  </div>
                )}
              </div>

              {/* Wooden Shelf Plank */}
              <div className="relative w-full h-8 bg-gradient-to-b from-[#C48C56] to-[#8D5B28] rounded-md border-t-2 border-[#E7BF92] border-b-4 border-[#5E3A18] shadow-lg flex items-center justify-between px-4">
                <div className="w-full h-0.5 bg-white/20 absolute top-1 left-0 right-0" />
                <div className="w-4 h-10 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] rounded-b border border-ink/40 shadow -mt-2" />
                <div className="w-4 h-10 bg-gradient-to-r from-[#AA7C11] to-[#D4AF37] rounded-b border border-ink/40 shadow -mt-2" />
              </div>

              {/* Shelf Drop Shadow */}
              <div className="w-full h-4 bg-gradient-to-b from-ink/15 to-transparent -mt-0.5" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
