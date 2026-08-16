import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Bookshelf } from '../components/library/Bookshelf';
import { AvatarPreview } from '../components/avatar/AvatarBuilder';
import { Library as LibraryIcon, Sparkles, Filter, Users, PlusCircle } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const LibraryPage = () => {
  const [children, setChildren] = useState([]);
  const [stories, setStories] = useState([]);
  const [selectedChildId, setSelectedChildId] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchLibraryData = async (childId = null) => {
    try {
      setLoading(true);
      const [childRes, storyRes] = await Promise.all([
        api.getChildren(),
        api.getStories(childId === 'all' ? null : childId),
      ]);

      if (childRes.success) setChildren(childRes.children || []);
      if (storyRes.success) setStories(storyRes.stories || []);
    } catch (err) {
      console.error('[Library Fetch Error]', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLibraryData(selectedChildId);
  }, [selectedChildId]);

  const handleDownloadPdf = async (story) => {
    try {
      await api.downloadPdf(story, `${story.title ? story.title.replace(/[^a-zA-Z0-9_-]/g, '_') : 'Storybook'}_Storybook.pdf`);
    } catch (err) {
      alert(`Could not download PDF: ${err.message}`);
    }
  };

  const handleDeleteStory = async (storyId) => {
    if (!confirm('Are you sure you want to remove this storybook from your shelf?')) return;
    try {
      await api.deleteStory(storyId);
      setStories((prev) => prev.filter((s) => s._id !== storyId));
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  const currentChild = children.find((c) => c._id === selectedChildId);

  return (
    <div className="min-h-screen bg-parchment-pattern py-8 sm:py-12">
      <SEO
        title="My Storybook Library & Bookshelf"
        description="Browse all your created picture books, read in interactive 3D, and download printable PDFs."
        noIndex={true}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Library Header */}
        <div className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-10 border-4 border-ink shadow-parchment-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-berry font-black text-xs uppercase tracking-wider mb-1">
              <LibraryIcon className="w-4 h-4 text-marigold" />
              <span>Family Bookshelf</span>
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-ink">
              Storybook Library
            </h1>
            <p className="font-reading text-sm sm:text-base text-charcoal/80 mt-1">
              Your personalized picture books standing proud on the shelf. Tap any spine to open and read!
            </p>
          </div>

          <Link
            to="/create"
            className="px-6 py-3.5 bg-marigold hover:bg-marigold-dark text-ink font-black text-sm rounded-xl border-2 border-ink shadow-md hover:shadow-lg transition-all transform active:scale-95 flex items-center gap-2 flex-shrink-0"
          >
            <Sparkles className="w-4 h-4 text-ink" />
            <span>Generate New Book</span>
          </Link>
        </div>

        {/* Child Filter Tabs */}
        {children.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedChildId('all')}
              className={`px-5 py-2.5 rounded-2xl font-display font-bold text-xs border-2 transition-all flex items-center gap-2 flex-shrink-0 ${
                selectedChildId === 'all'
                  ? 'bg-berry text-white border-ink shadow-md scale-105'
                  : 'bg-[#FFFDF7] text-ink border-ink/30 hover:border-ink/60'
              }`}
            >
              <LibraryIcon className="w-3.5 h-3.5" />
              <span>All Stories ({stories.length})</span>
            </button>

            {children.map((child) => {
              const isSelected = selectedChildId === child._id;
              return (
                <button
                  key={child._id}
                  type="button"
                  onClick={() => setSelectedChildId(child._id)}
                  className={`px-4 py-2 rounded-2xl font-display font-bold text-xs border-2 transition-all flex items-center gap-2 flex-shrink-0 ${
                    isSelected
                      ? 'bg-marigold text-ink border-ink shadow-md scale-105'
                      : 'bg-[#FFFDF7] text-ink border-ink/30 hover:border-ink/60'
                  }`}
                >
                  <AvatarPreview avatar={child.avatar} size={24} className="rounded-full border" />
                  <span>{child.name}'s Books</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Bookshelf Display */}
        <div className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-10 border-4 border-ink shadow-parchment-card min-h-[450px]">
          {loading ? (
            <div className="py-24 text-center">
              <div className="inline-block w-8 h-8 border-4 border-berry border-t-transparent rounded-full animate-spin mb-3" />
              <p className="font-bold text-sm text-ink/70">Arranging books on the shelf...</p>
            </div>
          ) : (
            <Bookshelf
              stories={stories}
              childName={currentChild?.name || ''}
              onDownloadPdf={handleDownloadPdf}
              onDelete={handleDeleteStory}
            />
          )}
        </div>
      </div>
    </div>
  );
};
