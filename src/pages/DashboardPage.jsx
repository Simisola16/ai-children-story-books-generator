import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { AvatarPreview } from '../components/avatar/AvatarBuilder';
import { Bookshelf } from '../components/library/Bookshelf';
import { Sparkles, PlusCircle, Users, BookOpen, Library, Wand2 } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const DashboardPage = () => {
  const { user } = useAuth();
  const [children, setChildren] = useState([]);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [childRes, storyRes] = await Promise.all([
          api.getChildren(),
          api.getStories(),
        ]);

        if (childRes.success) setChildren(childRes.children || []);
        if (storyRes.success) setStories(storyRes.stories || []);
      } catch (err) {
        console.error('[Dashboard Data Error]', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      alert(`Failed to delete: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-parchment-pattern py-8 sm:py-12">
      <SEO
        title="Parent Dashboard"
        description="Manage your child character profiles, review generated picture books, and launch new AI storybook adventures."
        noIndex={true}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Welcome Header */}
        <div className="bg-[#FFFDF7] rounded-2xl sm:rounded-3xl p-5 sm:p-10 border-3 sm:border-4 border-ink shadow-parchment-card flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-1.5 sm:space-y-2">
            <div className="inline-flex items-center gap-1.5 text-berry font-black text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-marigold fill-marigold" />
              <span>Parent Studio Dashboard</span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-4xl text-ink">
              Welcome, {user?.name || 'Storyteller'}!
            </h1>
            <p className="font-reading text-sm sm:text-base text-charcoal/80">
              Pick a child, craft a story theme, and create custom illustrated books together.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full md:w-auto">
            <Link
              to="/children"
              className="w-full sm:w-auto px-4 py-2.5 sm:px-5 sm:py-3 bg-parchment hover:bg-parchment-dark text-ink font-bold text-xs sm:text-sm rounded-xl border-2 border-ink transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Users className="w-4 h-4 text-meadow" />
              <span>Manage Children</span>
            </Link>
            <Link
              to="/create"
              className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 bg-marigold hover:bg-marigold-dark text-ink font-black text-xs sm:text-sm rounded-xl border-2 border-ink shadow-md hover:shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2"
            >
              <Wand2 className="w-4 h-4 text-ink" />
              <span>New Story Wizard</span>
            </Link>
          </div>
        </div>

        {/* Children Character Profiles Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-black text-2xl text-ink">
                Child Profiles & Avatars
              </h2>
              <p className="text-xs font-bold text-charcoal/70 uppercase tracking-wider">
                Illustrated character looks for stories
              </p>
            </div>
            <Link
              to="/children"
              className="text-xs font-bold text-berry hover:underline flex items-center gap-1"
            >
              <PlusCircle className="w-4 h-4" /> Add Child
            </Link>
          </div>

          {children.length === 0 ? (
            <div className="bg-[#FFFDF7] rounded-3xl p-8 border-3 border-ink/30 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-parchment-dark rounded-full flex items-center justify-center border-2 border-ink">
                <Users className="w-8 h-8 text-ink/70" />
              </div>
              <h3 className="font-display font-bold text-xl text-ink">
                No child profiles created yet!
              </h3>
              <p className="text-sm text-charcoal/80 max-w-md mx-auto">
                Create an illustrated character profile for your child so they can be the star of every storybook.
              </p>
              <Link
                to="/children"
                className="inline-flex items-center gap-2 px-6 py-3 bg-berry hover:bg-berry-dark text-white font-bold text-sm rounded-xl border-2 border-ink shadow"
              >
                <PlusCircle className="w-4 h-4 text-marigold" />
                <span>Build First Child Profile</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {children.map((child) => (
                <div
                  key={child._id}
                  className="bg-[#FFFDF7] rounded-2xl p-5 border-3 border-ink shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center relative group"
                >
                  <AvatarPreview avatar={child.avatar} size={100} className="mb-3" />
                  <h4 className="font-display font-bold text-lg text-ink">
                    {child.name}
                  </h4>
                  <span className="px-2.5 py-0.5 bg-parchment-dark text-ink font-bold text-[11px] rounded-full border border-ink/20 mt-1 mb-4">
                    Age Band: {child.ageBand}
                  </span>
                  <Link
                    to={`/create?childId=${child._id}`}
                    className="w-full py-2 bg-marigold hover:bg-marigold-dark text-ink font-bold text-xs rounded-xl border-2 border-ink transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Create Story</span>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Story Bookshelf Section */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-black text-2xl text-ink flex items-center gap-2">
                <Library className="w-6 h-6 text-berry" />
                <span>Story Bookshelf</span>
              </h2>
              <p className="text-xs font-bold text-charcoal/70 uppercase tracking-wider">
                Click any spine to open the reader
              </p>
            </div>
            <Link
              to="/library"
              className="text-xs font-bold text-berry hover:underline"
            >
              View Full Library &rarr;
            </Link>
          </div>

          <div className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 border-4 border-ink shadow-parchment-card">
            {loading ? (
              <div className="py-16 text-center">
                <div className="inline-block w-8 h-8 border-4 border-berry border-t-transparent rounded-full animate-spin mb-3" />
                <p className="font-bold text-sm text-ink/70">Polishing the bookshelf...</p>
              </div>
            ) : (
              <Bookshelf
                stories={stories}
                onDownloadPdf={handleDownloadPdf}
                onDelete={handleDeleteStory}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
