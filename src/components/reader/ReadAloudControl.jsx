import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Square } from 'lucide-react';
import { speechService } from '../../services/speechService';

export const ReadAloudControl = ({ currentText, pageNumber }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const isSupported = speechService.isSupported();

  // Stop reading whenever the page changes
  useEffect(() => {
    speechService.stop();
    setIsPlaying(false);
    setIsPaused(false);
  }, [pageNumber, currentText]);

  const handlePlay = () => {
    if (!currentText) return;

    if (isPaused) {
      speechService.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    setIsPlaying(true);
    setIsPaused(false);

    speechService.speak({
      text: currentText,
      onEnd: () => {
        setIsPlaying(false);
        setIsPaused(false);
      },
      onError: (err) => {
        console.warn('[ReadAloud Error]', err);
        setIsPlaying(false);
        setIsPaused(false);
      },
    });
  };

  const handlePause = () => {
    speechService.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = () => {
    speechService.stop();
    setIsPlaying(false);
    setIsPaused(false);
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 bg-[#FFFDF7] px-3.5 py-1.5 rounded-full border-2 border-ink shadow-sm">
      <div className="flex items-center gap-1.5 text-xs font-bold text-ink pr-1">
        <Volume2 className="w-4 h-4 text-berry animate-pulse" />
        <span className="hidden sm:inline">Read Aloud</span>
      </div>

      {!isPlaying && !isPaused ? (
        <button
          type="button"
          onClick={handlePlay}
          className="p-1.5 bg-marigold hover:bg-marigold-dark text-ink rounded-full transition-colors active:scale-95 shadow-sm"
          title="Start reading aloud"
        >
          <Play className="w-3.5 h-3.5 fill-ink" />
        </button>
      ) : isPlaying ? (
        <button
          type="button"
          onClick={handlePause}
          className="p-1.5 bg-berry hover:bg-berry-dark text-white rounded-full transition-colors active:scale-95 shadow-sm"
          title="Pause reading"
        >
          <Pause className="w-3.5 h-3.5 fill-white" />
        </button>
      ) : (
        <button
          type="button"
          onClick={handlePlay}
          className="p-1.5 bg-meadow hover:bg-meadow-dark text-white rounded-full transition-colors active:scale-95 shadow-sm"
          title="Resume reading"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
        </button>
      )}

      {(isPlaying || isPaused) && (
        <button
          type="button"
          onClick={handleStop}
          className="p-1.5 bg-charcoal hover:bg-ink text-white rounded-full transition-colors active:scale-95 shadow-sm"
          title="Stop reading"
        >
          <Square className="w-3.5 h-3.5 fill-white" />
        </button>
      )}
    </div>
  );
};
