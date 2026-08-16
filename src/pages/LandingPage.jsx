import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Sparkles,
  Wand2,
  Download,
  Volume2,
  ShieldCheck,
  Heart,
  ArrowRight,
  ChevronDown,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { AvatarPreview } from '../components/avatar/AvatarBuilder';
import { SEO } from '../components/common/SEO';

export const LandingPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const sampleAvatar = {
    skinTone: '#F5D0A9',
    hairStyle: 'curly',
    hairColor: '#3D2314',
    eyeColor: '#2E1F3D',
    outfitColor: '#F2A93B',
    accessory: 'crown',
  };

  const faqs = [
    {
      q: 'How does the AI create personalized storybooks for my child?',
      a: 'You create a custom illustrated character look with hairstyles, outfits, and accessories. Then, pick a story genre (space exploration, underwater kingdom, bedtime calm, etc.) and learning moral. Our AI generates an original, engaging story matching your child’s age, alongside vivid full-page illustrations depicting their custom avatar on every page.',
    },
    {
      q: 'Is the content 100% safe and appropriate for young children?',
      a: 'Yes, absolutely. All generated stories and illustrations undergo multi-layer kid-safe content filters. Stories promote positive values like kindness, courage, honesty, empathy, and bedtime relaxation.',
    },
    {
      q: 'Can I download and print the storybooks as keepsakes?',
      a: 'Yes! Every story comes with a high-resolution, landscape-oriented PDF download. It includes a custom illustrated cover, facing page layouts, and a moral badge — perfect for home printing, laminating, or bedtime reading.',
    },
    {
      q: 'How does the 3D page-turn reader and read-aloud work?',
      a: 'Our interactive web reader simulates a real physical picture book with dual-page spreads, 3D flip animations, and natural center-gutter depth. An integrated read-aloud button uses text-to-speech to narrate each page aloud to your child.',
    },
    {
      q: 'What age ranges are supported?',
      a: 'AI Storybook Generator supports toddlers and children from ages 2 to 10+ (Toddler 2–4, Early Reader 5–7, and Young Explorer 8–10), tailoring vocabulary, sentence complexity, and themes accordingly.',
    },
  ];

  // FAQ Schema for Rich Google Search Snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-parchment-pattern">
      <SEO
        title="Magical Personalized Tales & Bedtime Stories for Children"
        description="Create personalized, beautifully illustrated children's storybooks featuring your child as the star character. Read online with 3D page-turns or download printable PDFs."
        keywords="personalized children books, AI storybook generator, custom bedtime stories, illustrated kids books, avatar story creator, printable storybook PDF"
        canonical="/"
        structuredData={faqSchema}
      />

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

              <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-ink leading-[1.15] tracking-tight">
                Turn Your Child into the{' '}
                <span className="text-berry underline decoration-marigold decoration-wavy decoration-2">
                  Hero of Their Own
                </span>{' '}
                Storybook.
              </h1>

              <p className="font-reading text-base sm:text-xl text-charcoal/90 leading-relaxed max-w-2xl">
                Create an illustrated character look, pick a wondrous theme, and
                watch as our AI weaves a complete, personalized picture book with
                page-matching art, interactive 3D page-turns, read-aloud storytelling,
                and keepsake PDF prints.
              </p>

              <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link
                  to="/register"
                  id="hero-create-story-btn"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-berry hover:bg-berry-dark text-white font-black text-sm sm:text-base rounded-2xl border-3 border-ink shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 sm:gap-3"
                >
                  <Sparkles className="w-5 h-5 text-marigold fill-marigold" />
                  <span>Create Your First Story</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  id="hero-sign-in-btn"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-[#FFFDF7] hover:bg-parchment text-ink font-bold text-sm sm:text-base rounded-2xl border-3 border-ink shadow-md transition-all flex items-center justify-center"
                >
                  Sign In to Library
                </Link>
              </div>

              {/* Safety badge */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs font-bold text-ink/70">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-meadow shrink-0" />
                  <span>100% Child-Safe Content</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-berry shrink-0" />
                  <span>Illustrated Avatars (No Photos)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Book Preview */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Decorative floating badge */}
                <div className="absolute -top-4 -left-2 sm:-top-6 sm:-left-6 z-20 bg-[#FFFDF7] p-2.5 sm:p-3 rounded-2xl border-2 border-ink shadow-lg flex items-center gap-2.5 sm:gap-3 transform -rotate-6">
                  <AvatarPreview avatar={sampleAvatar} size={44} />
                  <div>
                    <span className="block font-bold text-[11px] sm:text-xs text-ink">Leo's Star Look</span>
                    <span className="block text-[9px] sm:text-[10px] text-berry font-extrabold uppercase">Starring Character</span>
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

      {/* Interactive FAQ Section for Parents & Organic SEO */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-marigold/30 text-ink font-bold text-xs uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 fill-marigold text-ink" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-ink">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-charcoal/80 text-base">
            Everything you need to know about our AI storybooks and printable keepsakes.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-[#FFFDF7] rounded-2xl border-2 border-ink/20 overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  id={`faq-toggle-${idx}`}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-display font-bold text-base sm:text-lg text-ink hover:text-berry transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-berry shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-ink/60 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-berry' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-charcoal/90 text-sm sm:text-base font-reading leading-relaxed border-t border-ink/10">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-berry via-berry-dark to-ink text-white">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <Sparkles className="w-10 h-10 text-marigold mx-auto animate-pulse" />
          <h2 className="font-display font-black text-3xl sm:text-5xl text-parchment">
            Start Your Child's Magical Adventure Today
          </h2>
          <p className="font-reading text-lg sm:text-xl text-parchment-light max-w-2xl mx-auto">
            Join parents worldwide bringing bedtime to life with custom-illustrated storybooks.
          </p>
          <div className="pt-2">
            <Link
              to="/register"
              id="cta-bottom-register"
              className="inline-flex items-center gap-3 px-8 py-4 bg-marigold hover:bg-amber-400 text-ink font-black text-lg rounded-2xl border-3 border-ink shadow-xl transition-all transform hover:-translate-y-1"
            >
              <span>Create a Free Story Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Semantic Footer with SEO Links */}
      <footer className="bg-parchment-dark border-t-2 border-ink/20 py-12 text-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 font-display font-black text-xl text-ink">
              <span>📖</span>
              <span>AI Storybook Generator</span>
            </div>
            <p className="text-xs text-charcoal/80 max-w-sm leading-relaxed">
              Personalized children's picture books created with safe AI, custom avatar builder, 3D flipbook reading, and high-quality PDF downloads.
            </p>
            <p className="text-[11px] text-charcoal/60 pt-2">
              © {new Date().getFullYear()} AI Storybook Generator. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm text-ink uppercase tracking-wider mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-charcoal/80">
              <li>
                <Link to="/register" className="hover:text-berry transition-colors">
                  Create First Story
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-berry transition-colors">
                  Sign In to Library
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm text-ink uppercase tracking-wider mb-3">
              Story Formats
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-charcoal/80">
              <li className="flex items-center gap-1.5">
                <span>✨</span> Custom Character Avatars
              </li>
              <li className="flex items-center gap-1.5">
                <span>📖</span> 3D Virtual Page Flip Reader
              </li>
              <li className="flex items-center gap-1.5">
                <span>🔊</span> Text-to-Speech Audio Read-Aloud
              </li>
              <li className="flex items-center gap-1.5">
                <span>📄</span> High-Res Printable PDFs
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};
