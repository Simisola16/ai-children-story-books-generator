import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Sparkles, Wand2, Download, Volume2, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { AvatarPreview } from '../components/avatar/AvatarBuilder';

export const LandingPage = () => {
  const sampleAvatar = {
    skinTone: '#F5D0A9',
    hairStyle: 'curly',
    hairColor: '#3D2314',
    eyeColor: '#2E1F3D',
    outfitColor: '#F2A93B',
    accessory: 'crown',
  };

  return (
    <div className="min-h-screen bg-parchment-pattern">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading and CTAs */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-parchment-dark border border-ink/20 shadow-sm text-ink text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-berry animate-bounce" />
                <span>AI-Powered Picture Books for Children</span>
              </div>

              <h1 className="font-display font-black text-4xl sm:text-6xl text-ink leading-[1.12] tracking-tight">
                Turn Your Child into the{' '}
                <span className="text-berry underline decoration-marigold decoration-wavy decoration-2">
                  Hero of Their Own
                </span>{' '}
                Storybook.
              </h1>

              <p className="font-reading text-lg sm:text-xl text-charcoal/90 leading-relaxed max-w-2xl">
                Create an illustrated character look, pick a wondrous theme, and
                watch as our AI weaves a complete, personalized picture book with
                page-matching art, interactive 3D page-turns, read-aloud storytelling,
                and keepsake PDF prints.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/register"
                  className="px-8 py-4 bg-berry hover:bg-berry-dark text-white font-black text-base rounded-2xl border-3 border-ink shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3"
                >
                  <Sparkles className="w-5 h-5 text-marigold fill-marigold" />
                  <span>Create Your First Story</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-[#FFFDF7] hover:bg-parchment text-ink font-bold text-base rounded-2xl border-3 border-ink shadow-md transition-all flex items-center justify-center"
                >
                  Sign In to Library
                </Link>
              </div>

              {/* Safety badge */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-4 text-xs font-bold text-ink/70">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-meadow" />
                  <span>100% Child-Safe Content</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-berry" />
                  <span>Illustrated Avatars (No Photos)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Book Preview */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Decorative floating badge */}
                <div className="absolute -top-6 -left-6 z-20 bg-[#FFFDF7] p-3 rounded-2xl border-2 border-ink shadow-lg flex items-center gap-3 transform -rotate-6">
                  <AvatarPreview avatar={sampleAvatar} size={50} />
                  <div>
                    <span className="block font-bold text-xs text-ink">Leo's Star Look</span>
                    <span className="block text-[10px] text-berry font-extrabold uppercase">Starring Character</span>
                  </div>
                </div>

                {/* Open Book Display Mockup */}
                <div className="w-full bg-[#FFFDF7] rounded-3xl border-4 border-ink shadow-book-spread p-6 relative">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border-2 border-ink shadow-inner bg-gradient-to-br from-indigo-900 via-purple-900 to-amber-900 flex flex-col items-center justify-center p-6 text-center text-white relative">
                    <div className="absolute inset-0 bg-parchment-pattern opacity-10" />
                    <Sparkles className="w-10 h-10 text-marigold mb-3" />
                    <h3 className="font-display font-black text-2xl mb-1 text-parchment">
                      Leo & the Starlight Otter
                    </h3>
                    <p className="font-reading text-xs text-parchment-light italic max-w-xs">
                      "Together, they soared past the rings of Saturn, spreading giggles across the milky way."
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between pt-2 border-t border-ink/15 text-xs font-bold text-ink">
                    <span className="flex items-center gap-1">
                      <Volume2 className="w-4 h-4 text-berry" /> Read Aloud
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="w-4 h-4 text-meadow" /> Printable PDF
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="py-16 bg-[#FFFDF7] border-y-2 border-ink/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-display font-black text-3xl sm:text-4xl text-ink">
              Crafted Like a True Picture Book
            </h2>
            <p className="mt-3 text-charcoal/80 font-medium">
              Everything designed to inspire wonder, joy, and family reading time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-parchment/40 rounded-3xl p-8 border-2 border-ink/20 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-marigold border-2 border-ink flex items-center justify-center mb-5">
                <Wand2 className="w-6 h-6 text-ink" />
              </div>
              <h3 className="font-display font-bold text-xl text-ink mb-2">
                Illustrated Avatar Builder
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed font-medium">
                Pick hairstyles, skin tones, cute outfits, and hero capes. The AI maintains character consistency across every page illustration!
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-parchment/40 rounded-3xl p-8 border-2 border-ink/20 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-berry text-white border-2 border-ink flex items-center justify-center mb-5">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display font-bold text-xl text-ink mb-2">
                3D Page-Turn Reader
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed font-medium">
                Experience dual facing pages, tactile page flips, center-gutter shadows, and integrated Web Speech read-aloud narration.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-parchment/40 rounded-3xl p-8 border-2 border-ink/20 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-meadow text-white border-2 border-ink flex items-center justify-center mb-5">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display font-bold text-xl text-ink mb-2">
                Print-Ready PDF Keepsake
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed font-medium">
                Export high-resolution landscape PDFs ready for home printing or gifting, complete with custom cover and moral seal.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
