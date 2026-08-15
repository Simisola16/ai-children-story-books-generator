/**
 * Speech Synthesis Service for Storybook Read Aloud
 * Uses the Web Speech API (window.speechSynthesis) natively supported in modern browsers.
 * 
 * ARCHITECTURE NOTE:
 * This v1 implementation is free and requires zero extra API keys.
 * It is architected so it can be swapped for a cloud TTS API (ElevenLabs / Google Cloud TTS / OpenAI Audio)
 * by replacing the speakText() implementation with an audio player streaming endpoints.
 */

class SpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.currentUtterance = null;
    this.isSpeaking = false;
    this.isPaused = false;
    this.onBoundaryCallback = null;
    this.onEndCallback = null;
  }

  isSupported() {
    return Boolean(this.synth && 'SpeechSynthesisUtterance' in window);
  }

  getVoices() {
    if (!this.synth) return [];
    return this.synth.getVoices();
  }

  /**
   * Selects a gentle, warm storyteller voice if available
   */
  getBestStorytellerVoice() {
    const voices = this.getVoices();
    // Prioritize natural English female/warm voices
    const preferredVoices = [
      'Samantha',
      'Karen',
      'Victoria',
      'Google UK English Female',
      'Google US English',
      'Microsoft Zira',
      'Natural',
    ];

    for (const name of preferredVoices) {
      const match = voices.find((v) => v.name.includes(name));
      if (match) return match;
    }

    return voices.find((v) => v.lang.startsWith('en')) || voices[0] || null;
  }

  /**
   * Speaks the provided page text with sentence/word callbacks
   */
  speak({ text, onBoundary, onEnd, onError, rate = 0.9, pitch = 1.05 }) {
    if (!this.isSupported()) {
      if (onError) onError(new Error('Speech Synthesis is not supported in this browser.'));
      return;
    }

    this.stop(); // Stop any active reading

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;

    const voice = this.getBestStorytellerVoice();
    if (voice) {
      utterance.voice = voice;
    }

    utterance.rate = rate; // Slightly slower for bedtime / children comprehension
    utterance.pitch = pitch; // Warm and friendly tone

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.isPaused = false;
    };

    utterance.onboundary = (event) => {
      if (onBoundary) {
        onBoundary({
          charIndex: event.charIndex,
          charLength: event.charLength || 0,
          name: event.name,
        });
      }
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.isPaused = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = (err) => {
      this.isSpeaking = false;
      this.isPaused = false;
      if (onError) onError(err);
    };

    this.synth.speak(utterance);
  }

  pause() {
    if (this.synth && this.isSpeaking && !this.isPaused) {
      this.synth.pause();
      this.isPaused = true;
    }
  }

  resume() {
    if (this.synth && this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
    }
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      this.isPaused = false;
    }
  }
}

export const speechService = new SpeechService();
