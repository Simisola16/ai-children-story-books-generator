import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { ThemeSelector, STORY_THEMES } from '../components/wizard/ThemeSelector';
import { StyleSelector, ART_STYLES } from '../components/wizard/StyleSelector';
import { AvatarPreview } from '../components/avatar/AvatarBuilder';
import { Sparkles, Wand2, PlusCircle, AlertCircle, ShieldAlert, HeartHandshake } from 'lucide-react';

export const CreateStoryPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [children, setChildren] = useState([]);
  const [selectedChildId, setSelectedChildId] = useState(searchParams.get('childId') || '');
  const [selectedTheme, setSelectedTheme] = useState('Space Explorer');
  const [pageCount, setPageCount] = useState(4);
  const [artStyle, setArtStyle] = useState('watercolor');
  const [customDetails, setCustomDetails] = useState('');

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const res = await api.getChildren();
        if (res.success && res.children) {
          setChildren(res.children);
          if (!selectedChildId && res.children.length > 0) {
            setSelectedChildId(res.children[0]._id);
          }
        }
      } catch (err) {
        console.error('[CreateStory Fetch Error]', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChildren();
  }, [selectedChildId]);

  const selectedChild = children.find((c) => c._id === selectedChildId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedChildId) {
      setError('Please select or create a child profile first.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      // POST /api/stories responds immediately at status "queued"
      const res = await api.createStory({
        childProfileId: selectedChildId,
        theme: selectedTheme,
        pageCount: parseInt(pageCount, 10),
        artStyle,
        customDetails: customDetails.trim(),
      });

      if (res.success && res.storyId) {
        // Navigate to live progress screen
        navigate(`/stories/${res.storyId}/generating`);
      }
    } catch (err) {
      setError(err.message || 'Failed to start story generation.');
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-parchment-pattern py-20 text-center">
        <div className="inline-block w-8 h-8 border-4 border-berry border-t-transparent rounded-full animate-spin mb-3" />
        <p className="font-bold text-sm text-ink/70">Gathering storyteller quill and ink...</p>
      </div>
    );
  }

  if (children.length === 0) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-parchment-pattern">
        <div className="max-w-md w-full bg-[#FFFDF7] rounded-3xl p-8 border-4 border-ink shadow-parchment-card text-center space-y-5">
          <div className="w-16 h-16 mx-auto bg-marigold rounded-2xl flex items-center justify-center border-2 border-ink">
            <Sparkles className="w-8 h-8 text-ink" />
          </div>
          <h2 className="font-display font-black text-2xl text-ink">
            Create a Child Profile First
          </h2>
          <p className="text-sm text-charcoal/80">
            Before generating a storybook, customize an illustrated character look for your child.
          </p>
          <Link
            to="/children"
            className="inline-flex items-center gap-2 px-6 py-3 bg-berry hover:bg-berry-dark text-white font-bold text-sm rounded-xl border-2 border-ink shadow transition-all"
          >
            <PlusCircle className="w-4 h-4 text-marigold" />
            <span>Create First Child Profile</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-parchment-pattern py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Wizard Header */}
        <div className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 border-4 border-ink shadow-parchment-card">
          <div className="inline-flex items-center gap-2 text-berry font-black text-xs uppercase tracking-wider mb-2">
            <Wand2 className="w-4 h-4 text-marigold" />
            <span>Storybook Creation Wizard</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-ink">
            Generate a New Storybook
          </h1>
          <p className="font-reading text-base text-charcoal/80 mt-1">
            Choose your child character, pick a captivating theme and art style, and let AI bring it to life!
          </p>
        </div>

        {error && (
          <div className="p-4 bg-rose-50 border-2 border-berry/40 rounded-2xl flex items-start gap-3 text-berry text-sm font-bold">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* STEP 1: Select Starring Child */}
          <div className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 border-4 border-ink shadow-parchment-card space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-berry">Step 1</span>
                <h3 className="font-display font-bold text-2xl text-ink">
                  Starring Character
                </h3>
              </div>
              <Link
                to="/children"
                className="text-xs font-bold text-berry hover:underline flex items-center gap-1"
              >
                <PlusCircle className="w-4 h-4" /> Add or Edit Children
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {children.map((child) => {
                const isSelected = selectedChildId === child._id;
                return (
                  <button
                    key={child._id}
                    type="button"
                    onClick={() => setSelectedChildId(child._id)}
                    className={`p-4 rounded-2xl border-3 flex flex-col items-center text-center transition-all ${
                      isSelected
                        ? 'bg-parchment border-ink ring-4 ring-marigold/50 shadow-md scale-105'
                        : 'bg-[#FFFDF7]/60 border-ink/20 hover:border-ink/50 hover:bg-[#FFFDF7]'
                    }`}
                  >
                    <AvatarPreview avatar={child.avatar} size={70} className="mb-2" />
                    <span className="font-display font-bold text-base text-ink truncate w-full">
                      {child.name}
                    </span>
                    <span className="text-[11px] font-bold text-charcoal/70">
                      Ages {child.ageBand}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Story Theme */}
          <div className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 border-4 border-ink shadow-parchment-card space-y-4">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-berry">Step 2</span>
              <h3 className="font-display font-bold text-2xl text-ink">
                Story Adventure Theme
              </h3>
              <p className="text-xs text-charcoal/70 font-medium mt-0.5">
                Select an imaginative world tailored to your child
              </p>
            </div>

            <ThemeSelector
              selectedTheme={selectedTheme}
              onSelectTheme={setSelectedTheme}
            />
          </div>

          {/* STEP 3: Art Style & Page Count */}
          <div className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 border-4 border-ink shadow-parchment-card space-y-6">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-berry">Step 3</span>
              <h3 className="font-display font-bold text-2xl text-ink">
                Illustration Style & Length
              </h3>
            </div>

            {/* Page Count Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink/80 mb-2">
                Page Count
              </label>
              <div className="grid grid-cols-3 gap-3 max-w-md">
                {[4, 8, 12].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setPageCount(count)}
                    className={`py-3 px-4 rounded-xl border-3 font-display font-bold text-sm transition-all ${
                      pageCount === count
                        ? 'bg-marigold text-ink border-ink ring-2 ring-ink shadow-md'
                        : 'bg-parchment/40 text-ink/80 border-ink/20 hover:border-ink/50'
                    }`}
                  >
                    {count} Pages
                  </button>
                ))}
              </div>
            </div>

            {/* Art Style Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink/80 mb-2">
                Artwork Aesthetics
              </label>
              <StyleSelector
                selectedStyle={artStyle}
                onSelectStyle={setArtStyle}
              />
            </div>
          </div>

          {/* STEP 4: Optional Custom Details with Server-Side Sanitization Notice */}
          <div className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 border-4 border-ink shadow-parchment-card space-y-4">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-berry">Step 4 (Optional)</span>
              <h3 className="font-display font-bold text-2xl text-ink">
                Special Details or Companion
              </h3>
              <p className="text-xs text-charcoal/70 font-medium mt-0.5">
                Add a favorite toy, pet, bedtime routine, or special lesson (e.g. "Maya loves her teddy bear Barnaby and learning to share").
              </p>
            </div>

            <textarea
              rows={3}
              maxLength={300}
              value={customDetails}
              onChange={(e) => setCustomDetails(e.target.value)}
              placeholder="e.g. Include a friendly floppy-eared puppy who loves finding shiny pebbles..."
              className="w-full p-4 bg-parchment/30 rounded-2xl border-2 border-ink/30 focus:border-berry focus:bg-white focus:outline-none font-bold text-sm text-ink leading-relaxed"
            />

            <div className="flex items-center justify-between text-xs font-bold text-charcoal/60">
              <span className="flex items-center gap-1 text-meadow">
                <HeartHandshake className="w-3.5 h-3.5" /> Wholesome, age-appropriate content guaranteed
              </span>
              <span>{customDetails.length}/300 chars</span>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !selectedChildId}
              className="w-full py-5 bg-berry hover:bg-berry-dark text-white font-display font-black text-xl rounded-2xl border-4 border-ink shadow-lg hover:shadow-xl transition-all transform active:scale-98 disabled:opacity-50 flex items-center justify-center gap-3"
            >
              <Sparkles className="w-6 h-6 text-marigold fill-marigold" />
              <span>{isSubmitting ? 'Queueing Generation...' : `Generate Storybook for ${selectedChild?.name || 'Child'} ✨`}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
