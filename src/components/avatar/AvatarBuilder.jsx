import React from 'react';
import { Sparkles, Wand2 } from 'lucide-react';

export const SKIN_TONES = [
  { id: '#FEE3D4', name: 'Fair Porcelain' },
  { id: '#F5D0A9', name: 'Warm Peach' },
  { id: '#E4B58A', name: 'Golden Honey' },
  { id: '#C68642', name: 'Warm Amber' },
  { id: '#8D5524', name: 'Deep Bronze' },
  { id: '#5C3818', name: 'Rich Cocoa' },
];

export const HAIR_STYLES = [
  { id: 'curly', name: 'Curly Waves' },
  { id: 'straight', name: 'Smooth Bob' },
  { id: 'afro', name: 'Bouncy Afro' },
  { id: 'pigtails', name: 'Cute Pigtails' },
  { id: 'spiky', name: 'Playful Spiky' },
  { id: 'braids', name: 'Braided Bun' },
];

export const HAIR_COLORS = [
  { id: '#1E1B18', name: 'Midnight Black' },
  { id: '#3D2314', name: 'Deep Chocolate' },
  { id: '#8B4513', name: 'Warm Chestnut' },
  { id: '#D4A017', name: 'Golden Honey' },
  { id: '#C04000', name: 'Fiery Auburn' },
  { id: '#4A2C18', name: 'Espresso' },
];

export const EYE_COLORS = [
  { id: '#2E1F3D', name: 'Dark Onyx' },
  { id: '#4A2C18', name: 'Warm Brown' },
  { id: '#2E5B88', name: 'Sky Blue' },
  { id: '#3D6A4E', name: 'Forest Green' },
  { id: '#8B5A2B', name: 'Amber Gold' },
];

export const OUTFIT_COLORS = [
  { id: '#F2A93B', name: 'Marigold Yellow' },
  { id: '#C4436B', name: 'Berry Magenta' },
  { id: '#4C8B5B', name: 'Meadow Green' },
  { id: '#3A86FF', name: 'Royal Blue' },
  { id: '#8338EC', name: 'Magic Violet' },
  { id: '#FF5964', name: 'Coral Red' },
];

export const ACCESSORIES = [
  { id: 'none', name: 'None' },
  { id: 'glasses', name: 'Round Glasses' },
  { id: 'crown', name: 'Golden Crown' },
  { id: 'cape', name: 'Hero Cape' },
  { id: 'star-badge', name: 'Star Badge' },
];

/**
 * Reusable Illustrated SVG Avatar Renderer
 */
export const AvatarPreview = ({ avatar, size = 160, className = '' }) => {
  const skin = avatar?.skinTone || '#F5D0A9';
  const hairStyle = avatar?.hairStyle || 'curly';
  const hairColor = avatar?.hairColor || '#3D2314';
  const eyeColor = avatar?.eyeColor || '#2E1F3D';
  const outfitColor = avatar?.outfitColor || '#F2A93B';
  const accessory = avatar?.accessory || 'none';

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#FFFDF7] to-[#EFE2C6] border-4 border-[#2E1F3D] shadow-md flex items-center justify-center ${className}`}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft Background Radial */}
        <circle cx="100" cy="100" r="90" fill="#FFFBEA" opacity="0.6" />

        {/* Hero Cape (Behind) */}
        {accessory === 'cape' && (
          <path
            d="M 50 130 Q 30 180 20 195 L 70 190 Z"
            fill="#C4436B"
            stroke="#8E2800"
            strokeWidth="1.5"
          />
        )}

        {/* Body & Outfit */}
        <path
          d="M 65 145 Q 100 130 135 145 L 150 200 L 50 200 Z"
          fill={outfitColor}
        />
        {/* Collar / Neck */}
        <ellipse cx="100" cy="140" rx="16" ry="8" fill={skin} />

        {/* Ears */}
        <ellipse cx="66" cy="98" rx="8" ry="12" fill={skin} />
        <ellipse cx="134" cy="98" rx="8" ry="12" fill={skin} />

        {/* Head */}
        <ellipse cx="100" cy="95" rx="36" ry="40" fill={skin} />

        {/* Hair Styles */}
        {hairStyle === 'curly' && (
          <g fill={hairColor}>
            <circle cx="75" cy="65" r="18" />
            <circle cx="100" cy="58" r="20" />
            <circle cx="125" cy="65" r="18" />
            <circle cx="64" cy="85" r="15" />
            <circle cx="136" cy="85" r="15" />
            <circle cx="70" cy="105" r="12" />
            <circle cx="130" cy="105" r="12" />
          </g>
        )}

        {hairStyle === 'afro' && (
          <circle cx="100" cy="85" r="46" fill={hairColor} />
        )}

        {hairStyle === 'straight' && (
          <g fill={hairColor}>
            <path d="M 64 95 Q 66 52 100 52 Q 134 52 136 95 Q 100 68 64 95 Z" />
            <rect x="64" y="80" width="10" height="35" rx="5" />
            <rect x="126" y="80" width="10" height="35" rx="5" />
          </g>
        )}

        {hairStyle === 'pigtails' && (
          <g fill={hairColor}>
            <path d="M 64 85 Q 100 55 136 85 Q 100 70 64 85 Z" />
            <circle cx="52" cy="90" r="16" />
            <circle cx="148" cy="90" r="16" />
            {/* Ribbon ties */}
            <circle cx="58" cy="90" r="5" fill="#C4436B" />
            <circle cx="142" cy="90" r="5" fill="#C4436B" />
          </g>
        )}

        {hairStyle === 'spiky' && (
          <g fill={hairColor}>
            <polygon points="75,70 85,42 98,65 110,38 122,65 132,45 138,75" />
            <path d="M 66 90 Q 100 60 134 90 Z" />
          </g>
        )}

        {hairStyle === 'braids' && (
          <g fill={hairColor}>
            <circle cx="100" cy="55" r="18" />
            <path d="M 64 90 Q 100 65 136 90 Z" />
            {/* Braids hanging */}
            <ellipse cx="64" cy="115" rx="6" ry="16" />
            <ellipse cx="136" cy="115" rx="6" ry="16" />
          </g>
        )}

        {/* Eyes with big expressive pupils */}
        <g fill={eyeColor}>
          <circle cx="86" cy="96" r="6.5" />
          <circle cx="114" cy="96" r="6.5" />
        </g>
        {/* Eye Highlights */}
        <circle cx="88" cy="94" r="2.5" fill="#FFFFFF" />
        <circle cx="116" cy="94" r="2.5" fill="#FFFFFF" />

        {/* Sweet Rosy Cheeks */}
        <ellipse cx="76" cy="106" rx="6" ry="4" fill="#FF8B94" opacity="0.65" />
        <ellipse cx="124" cy="106" rx="6" ry="4" fill="#FF8B94" opacity="0.65" />

        {/* Warm Smile */}
        <path
          d="M 90 110 Q 100 120 110 110"
          stroke="#8E2800"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Accessories */}
        {accessory === 'glasses' && (
          <g stroke="#2E1F3D" strokeWidth="2.5" fill="none">
            <circle cx="86" cy="96" r="11" />
            <circle cx="114" cy="96" r="11" />
            <line x1="97" y1="96" x2="103" y2="96" />
          </g>
        )}

        {accessory === 'crown' && (
          <polygon
            points="78,65 88,48 100,58 112,48 122,65"
            fill="#F2A93B"
            stroke="#B87D1B"
            strokeWidth="1.5"
          />
        )}

        {accessory === 'star-badge' && (
          <polygon
            points="100,162 102,168 108,169 103,173 105,179 100,175 95,179 97,173 92,169 98,168"
            fill="#F2A93B"
            stroke="#B87D1B"
            strokeWidth="0.8"
          />
        )}
      </svg>
    </div>
  );
};

export const AvatarBuilder = ({ avatar, onChange }) => {
  const updateField = (field, value) => {
    onChange({ ...avatar, [field]: value });
  };

  const randomizeAvatar = () => {
    const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)].id;
    onChange({
      skinTone: randomItem(SKIN_TONES),
      hairStyle: randomItem(HAIR_STYLES),
      hairColor: randomItem(HAIR_COLORS),
      eyeColor: randomItem(EYE_COLORS),
      outfitColor: randomItem(OUTFIT_COLORS),
      accessory: randomItem(ACCESSORIES),
    });
  };

  return (
    <div className="bg-[#FFFDF7] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-3 border-[#2E1F3D] shadow-parchment-card">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
        {/* Live Preview Display */}
        <div className="flex flex-col items-center gap-3 shrink-0">
          <div className="relative group">
            <AvatarPreview avatar={avatar} size={150} className="sm:w-[180px] sm:h-[180px]" />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-marigold text-ink font-black text-[10px] sm:text-xs uppercase tracking-wider px-3 py-1 rounded-full border border-ink shadow whitespace-nowrap">
              Character Look
            </div>
          </div>

          <button
            type="button"
            onClick={randomizeAvatar}
            className="mt-3 flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-parchment hover:bg-parchment-dark text-ink font-bold text-xs sm:text-sm rounded-xl border-2 border-ink transition-colors shadow-sm"
          >
            <Wand2 className="w-4 h-4 text-berry" />
            <span>Randomize Look</span>
          </button>
        </div>

        {/* Customization Controls */}
        <div className="flex-1 w-full space-y-5">
          {/* Skin Tone Swatches */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/70 mb-2">
              Skin Tone
            </label>
            <div className="flex flex-wrap gap-2.5">
              {SKIN_TONES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => updateField('skinTone', item.id)}
                  title={item.name}
                  style={{ backgroundColor: item.id }}
                  className={`w-9 h-9 rounded-full border-2 transition-all ${
                    avatar.skinTone === item.id
                      ? 'border-berry scale-110 shadow-md ring-2 ring-berry/40'
                      : 'border-ink/30 hover:scale-105'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Hair Style Buttons */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/70 mb-2">
              Hair Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {HAIR_STYLES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => updateField('hairStyle', item.id)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border-2 transition-all text-center ${
                    avatar.hairStyle === item.id
                      ? 'bg-berry text-white border-berry shadow-sm'
                      : 'bg-parchment/40 text-ink border-ink/20 hover:border-ink/50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Hair Color Swatches */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/70 mb-2">
              Hair Color
            </label>
            <div className="flex flex-wrap gap-2.5">
              {HAIR_COLORS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => updateField('hairColor', item.id)}
                  title={item.name}
                  style={{ backgroundColor: item.id }}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    avatar.hairColor === item.id
                      ? 'border-berry scale-110 shadow-md ring-2 ring-berry/40'
                      : 'border-ink/30 hover:scale-105'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Eye Color Swatches */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/70 mb-2">
              Eye Color
            </label>
            <div className="flex flex-wrap gap-2.5">
              {EYE_COLORS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => updateField('eyeColor', item.id)}
                  title={item.name}
                  style={{ backgroundColor: item.id }}
                  className={`w-7 h-7 rounded-full border-2 transition-all ${
                    avatar.eyeColor === item.id
                      ? 'border-berry scale-110 shadow-md ring-2 ring-berry/40'
                      : 'border-ink/30 hover:scale-105'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Outfit Color Swatches */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/70 mb-2">
              Outfit Color
            </label>
            <div className="flex flex-wrap gap-2.5">
              {OUTFIT_COLORS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => updateField('outfitColor', item.id)}
                  title={item.name}
                  style={{ backgroundColor: item.id }}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    avatar.outfitColor === item.id
                      ? 'border-ink scale-110 shadow-md ring-2 ring-marigold'
                      : 'border-ink/30 hover:scale-105'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Accessories */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/70 mb-2">
              Special Accessory
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {ACCESSORIES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => updateField('accessory', item.id)}
                  className={`py-1.5 px-2 rounded-xl text-xs font-bold border-2 transition-all text-center ${
                    avatar.accessory === item.id
                      ? 'bg-marigold text-ink border-ink shadow-sm'
                      : 'bg-parchment/40 text-ink border-ink/20 hover:border-ink/50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
