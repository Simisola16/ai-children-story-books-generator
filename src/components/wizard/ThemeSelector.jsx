import React from 'react';
import { Rocket, Trees, Waves, Sparkles, Castle, Heart, Moon, Compass } from 'lucide-react';

export const STORY_THEMES = [
  {
    id: 'Space Explorer',
    title: 'Space Explorer',
    description: 'Zip through sparkling starry nebulae and make friends with friendly comet critters.',
    icon: Rocket,
    accent: 'bg-indigo-100 border-indigo-300 text-indigo-900',
    badge: '#3A86FF',
  },
  {
    id: 'Enchanted Forest',
    title: 'Enchanted Forest',
    description: 'Wander along mossy trails with talking woodland foxes, hedgehogs, and glowing fairies.',
    icon: Trees,
    accent: 'bg-emerald-100 border-emerald-300 text-emerald-900',
    badge: '#4C8B5B',
  },
  {
    id: 'Secret Ocean Kingdom',
    title: 'Ocean Kingdom',
    description: 'Dive beneath turquoise waves with playful dolphins and gentle singing whales.',
    icon: Waves,
    accent: 'bg-cyan-100 border-cyan-300 text-cyan-900',
    badge: '#06D6A0',
  },
  {
    id: 'Gentle Dinosaur Valley',
    title: 'Dinosaur Valley',
    description: 'Share sweet mangoes with gentle baby Brachiosaurus and glide with friendly Pterodactyls.',
    icon: Compass,
    accent: 'bg-amber-100 border-amber-300 text-amber-900',
    badge: '#F2A93B',
  },
  {
    id: 'Magical Sky Castle',
    title: 'Magical Sky Castle',
    description: 'Build clouds with smiling baby dragons and uncover hidden rainbow treasures.',
    icon: Castle,
    accent: 'bg-purple-100 border-purple-300 text-purple-900',
    badge: '#8338EC',
  },
  {
    id: 'Bedtime Star Wonder',
    title: 'Bedtime Star Wonder',
    description: 'A soothing, cozy tale of tucking in sleepy stars and drifting into peaceful sweet dreams.',
    icon: Moon,
    accent: 'bg-rose-100 border-rose-300 text-rose-900',
    badge: '#C4436B',
  },
];

export const ThemeSelector = ({ selectedTheme, onSelectTheme }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {STORY_THEMES.map((theme) => {
        const Icon = theme.icon;
        const isSelected = selectedTheme === theme.id;

        return (
          <button
            key={theme.id}
            type="button"
            onClick={() => onSelectTheme(theme.id)}
            className={`text-left p-5 rounded-2xl border-3 transition-all relative overflow-hidden group ${
              isSelected
                ? 'bg-[#FFFDF7] border-ink ring-4 ring-marigold/50 shadow-lg scale-[1.02]'
                : 'bg-[#FFFDF7]/70 hover:bg-[#FFFDF7] border-ink/20 hover:border-ink/60 shadow-sm hover:shadow-md'
            }`}
          >
            {/* Active Indicator Pin */}
            {isSelected && (
              <div className="absolute top-3 right-3 w-3.5 h-3.5 rounded-full bg-berry border-2 border-ink shadow" />
            )}

            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-12 h-12 rounded-xl border-2 border-ink flex items-center justify-center shadow-sm ${theme.accent}`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-lg text-ink">
                {theme.title}
              </h4>
            </div>

            <p className="text-xs text-charcoal/80 leading-relaxed font-medium">
              {theme.description}
            </p>
          </button>
        );
      })}
    </div>
  );
};
