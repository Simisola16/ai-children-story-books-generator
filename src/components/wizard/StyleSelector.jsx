import React from 'react';
import { Palette, Sparkles, Scissors, Brush, Box, BookOpen } from 'lucide-react';

export const ART_STYLES = [
  {
    id: 'watercolor',
    title: 'Gentle Watercolor',
    subtitle: 'Soft pastel washes, gentle pencil contours, warm paper texture',
    icon: Brush,
    gradient: 'from-amber-200 via-rose-100 to-sky-200',
  },
  {
    id: 'soft cartoon',
    title: 'Soft Cartoon',
    subtitle: 'Friendly rounded shapes, vibrant joyful colors, storybook charm',
    icon: Palette,
    gradient: 'from-yellow-200 via-emerald-100 to-cyan-200',
  },
  {
    id: 'paper-cutout',
    title: 'Paper-cutout Craft',
    subtitle: 'Layered handcrafted paper textures with soft drop-shadow depth',
    icon: Scissors,
    gradient: 'from-orange-200 via-amber-100 to-teal-200',
  },
  {
    id: 'whimsical gouache',
    title: 'Whimsical Gouache',
    subtitle: 'Rich opaque brushstrokes, vintage picture book nostalgia',
    icon: Sparkles,
    gradient: 'from-emerald-200 via-amber-100 to-rose-200',
  },
  {
    id: 'claymation',
    title: 'Claymation 3D',
    subtitle: 'Cute tactile stop-motion clay characters with warm lighting',
    icon: Box,
    gradient: 'from-rose-200 via-peach-100 to-lime-200',
  },
  {
    id: 'digital picture book',
    title: 'Digital Storybook',
    subtitle: 'Luminous lighting, crisp details, contemporary children book feel',
    icon: BookOpen,
    gradient: 'from-violet-200 via-indigo-100 to-pink-200',
  },
];

export const StyleSelector = ({ selectedStyle, onSelectStyle }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {ART_STYLES.map((style) => {
        const Icon = style.icon;
        const isSelected = selectedStyle === style.id;

        return (
          <button
            key={style.id}
            type="button"
            onClick={() => onSelectStyle(style.id)}
            className={`text-left p-5 rounded-2xl border-3 transition-all relative overflow-hidden group ${
              isSelected
                ? 'bg-[#FFFDF7] border-ink ring-4 ring-berry/40 shadow-lg scale-[1.02]'
                : 'bg-[#FFFDF7]/70 hover:bg-[#FFFDF7] border-ink/20 hover:border-ink/60 shadow-sm hover:shadow-md'
            }`}
          >
            {/* Color Swatch Preview Bar */}
            <div className={`h-3 w-full rounded-full bg-gradient-to-r ${style.gradient} border border-ink/20 mb-3`} />

            {isSelected && (
              <div className="absolute top-3 right-3 w-3.5 h-3.5 rounded-full bg-marigold border-2 border-ink shadow" />
            )}

            <div className="flex items-center gap-2.5 mb-1.5">
              <Icon className="w-5 h-5 text-ink/80" />
              <h4 className="font-display font-bold text-base text-ink">
                {style.title}
              </h4>
            </div>

            <p className="text-xs text-charcoal/80 leading-relaxed font-medium">
              {style.subtitle}
            </p>
          </button>
        );
      })}
    </div>
  );
};
