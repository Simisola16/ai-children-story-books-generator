import React from 'react';
import { BookSpine } from './BookSpine';
import { PlusCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Bookshelf = ({ stories = [], childName = '', onDelete, onDownloadPdf }) => {
  // Break stories into shelves of 6-8 books per shelf
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
    <div className="w-full space-y-12">
      {shelves.map((shelfStories, shelfIdx) => (
        <div key={shelfIdx} className="relative pt-8 pb-4">
          {/* Books Row */}
          <div className="flex items-end justify-start gap-3 sm:gap-4 px-6 sm:px-12 min-h-[300px] overflow-x-auto pb-1 scrollbar-none">
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
                <p className="font-display font-bold text-xl text-ink/70 mb-3">
                  This shelf is currently empty!
                </p>
                <Link
                  to="/create"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-marigold hover:bg-marigold-dark text-ink font-black text-sm rounded-xl border-2 border-ink shadow transition-transform active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  Generate {childName ? `${childName}'s First Book` : 'a New Book'}
                </Link>
              </div>
            )}
          </div>

          {/* Wooden Shelf Plank */}
          <div className="relative w-full h-8 bg-gradient-to-b from-[#C48C56] to-[#8D5B28] rounded-md border-t-2 border-[#E7BF92] border-b-4 border-[#5E3A18] shadow-lg flex items-center justify-between px-4">
            {/* Shelf Wood Grain Highlights */}
            <div className="w-full h-0.5 bg-white/20 absolute top-1 left-0 right-0" />

            {/* Left Brass Bracket */}
            <div className="w-4 h-10 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] rounded-b border border-ink/40 shadow -mt-2" />
            
            {/* Right Brass Bracket */}
            <div className="w-4 h-10 bg-gradient-to-r from-[#AA7C11] to-[#D4AF37] rounded-b border border-ink/40 shadow -mt-2" />
          </div>

          {/* Shelf Drop Shadow */}
          <div className="w-full h-4 bg-gradient-to-b from-ink/15 to-transparent -mt-0.5" />
        </div>
      ))}
    </div>
  );
};
