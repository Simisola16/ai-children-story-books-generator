import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { BookSpread } from '../components/reader/BookSpread';
import { ArrowLeft, Sparkles, AlertCircle } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const StoryReaderPage = () => {
  const { id: storyId } = useParams();
  const navigate = useNavigate();

  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        const res = await api.getStory(storyId);
        if (res.success && res.story) {
          if (res.story.status !== 'complete') {
            // If still generating or queued, redirect to progress page
            navigate(`/stories/${storyId}/generating`);
            return;
          }
          setStory(res.story);
        } else {
          setError('Storybook not found.');
        }
      } catch (err) {
        console.error('[Reader Fetch Error]', err);
        setError(err.message || 'Failed to load storybook.');
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [storyId, navigate]);

  const handleDownloadPdf = async () => {
    if (!story) return;
    setIsDownloadingPdf(true);
    try {
      const filename = `${story.title.replace(/[^a-zA-Z0-9_-]/g, '_')}_Storybook.pdf`;
      await api.downloadPdf(story._id, filename);
    } catch (err) {
      alert(`PDF download failed: ${err.message}`);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  // Structured Data Schema for Books
  const bookSchema = story
    ? {
        '@context': 'https://schema.org',
        '@type': 'Book',
        name: story.title,
        headline: story.title,
        description: story.synopsis || `A personalized children's adventure storybook created for ${story.childName || 'a young explorer'}.`,
        inLanguage: 'en',
        numberOfPages: story.pages?.length || 5,
        image: story.coverImageUrl || 'https://childrenstorybooksgenerator.vercel.app/og-image.svg',
        author: {
          '@type': 'Organization',
          name: 'AI Storybook Generator',
        },
        publisher: {
          '@type': 'Organization',
          name: 'AI Storybook Generator',
        },
        genre: story.theme || "Children's Fiction",
        learningResourceType: "Children's Picture Book",
      }
    : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-parchment-pattern py-24 text-center">
        <SEO title="Opening Storybook..." />
        <div className="inline-block w-10 h-10 border-4 border-berry border-t-transparent rounded-full animate-spin mb-4" />
        <h3 className="font-display font-bold text-2xl text-ink">
          Opening Your Storybook...
        </h3>
        <p className="text-sm font-medium text-charcoal/70 mt-1">
          Smoothing the pages and setting the bookstand
        </p>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-parchment-pattern">
        <SEO title="Storybook Unavailable" noIndex={true} />
        <div className="max-w-md w-full bg-[#FFFDF7] rounded-3xl p-8 border-4 border-ink shadow-parchment-card text-center space-y-4">
          <div className="w-14 h-14 mx-auto bg-rose-100 rounded-2xl flex items-center justify-center border-2 border-berry">
            <AlertCircle className="w-8 h-8 text-berry" />
          </div>
          <h2 className="font-display font-bold text-2xl text-ink">
            Storybook Unavailable
          </h2>
          <p className="text-sm text-charcoal/80">
            {error || 'We could not find this storybook in your library.'}
          </p>
          <Link
            to="/library"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-marigold text-ink font-black text-sm rounded-xl border-2 border-ink shadow"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Bookshelf</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-parchment-pattern py-6 sm:py-10">
      <SEO
        title={`${story.title} — Personalized Children's Book`}
        description={
          story.synopsis ||
          `Read '${story.title}', an interactive personalized picture book starring ${story.childName || 'your child'} with 3D page turns and audio narration.`
        }
        ogImage={story.coverImageUrl || '/og-image.svg'}
        canonical={`/stories/${storyId}`}
        structuredData={bookSchema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex items-center justify-between">
          <Link
            to="/library"
            id="reader-back-library-btn"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFFDF7] hover:bg-parchment text-ink font-bold text-xs rounded-xl border-2 border-ink shadow-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-berry" />
            <span>Back to Bookshelf</span>
          </Link>

          <Link
            to="/create"
            id="reader-new-story-btn"
            className="inline-flex items-center gap-2 px-4 py-2 bg-marigold hover:bg-marigold-dark text-ink font-bold text-xs rounded-xl border-2 border-ink shadow-sm transition-colors"
          >
            <Sparkles className="w-4 h-4 text-ink" />
            <span>New Story</span>
          </Link>
        </div>

        {/* 3D Book Spread Reader */}
        <BookSpread
          story={story}
          onDownloadPdf={handleDownloadPdf}
          isDownloadingPdf={isDownloadingPdf}
        />
      </div>
    </div>
  );
};
