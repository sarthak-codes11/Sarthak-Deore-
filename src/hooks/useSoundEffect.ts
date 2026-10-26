"use client";

import { useEffect, useRef, useCallback, useState } from "react";

// Global audio state shared across the application
interface AudioState {
  context: AudioContext | null;
  tickBuffer: AudioBuffer | null;
  isMuted: boolean;
  initialized: boolean;
  nextPlayTime: number;
}

const audioState: AudioState = {
  context: null,
  tickBuffer: null,
  isMuted: false,
  initialized: false,
  nextPlayTime: 0
};

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioState.context) {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      audioState.context = new AudioCtx({ latencyHint: "interactive" });
    }
  }
  if (audioState.context && audioState.context.state === "suspended") {
    audioState.context.resume().catch(() => {});
  }
  return audioState.context;
}

// Pre-load authentic tick.wav into memory AudioBuffer
function preloadTickBuffer() {
  if (typeof window === "undefined" || audioState.tickBuffer) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  fetch("/tick.wav")
    .then((res) => res.arrayBuffer())
    .then((buf) => ctx.decodeAudioData(buf))
    .then((decoded) => {
      audioState.tickBuffer = decoded;
    })
    .catch(() => {
      // Fallback will use synthetic oscillator
    });
}

export function useSoundEffect() {
  const [isMuted, setIsMuted] = useState(false);
  const lastTickTime = useRef(0);

  // Initialize and attach unlock listeners on user interaction
  useEffect(() => {
    const unlock = () => {
      const ctx = getAudioContext();
      if (ctx && ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      preloadTickBuffer();
    };

    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, []);

  // Play authentic tick.wav with granular scheduling (matching Deji's useSoundEffect)
  const playTick = useCallback((pitch = 1.0, volume = 0.25) => {
    if (audioState.isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Granular debounce: 12ms minimum between ticks
      if (now - lastTickTime.current < 0.012) return;
      lastTickTime.current = now;

      if (audioState.tickBuffer) {
        // Authentic tick sample playback
        const source = ctx.createBufferSource();
        const gainNode = ctx.createGain();
        source.buffer = audioState.tickBuffer;
        source.playbackRate.value = pitch;
        gainNode.gain.value = volume;

        source.connect(gainNode);
        gainNode.connect(ctx.destination);

        const playAt = Math.max(now, audioState.nextPlayTime);
        source.start(playAt);
        audioState.nextPlayTime = playAt + 0.012;

        source.onended = () => {
          source.disconnect();
          gainNode.disconnect();
        };
      } else {
        // Synthetic fallback if audio sample is still loading
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = "bandpass";
        filter.frequency.setValueAtTime(2400 * pitch, now);
        filter.Q.setValueAtTime(4.0, now);

        osc.type = "sine";
        osc.frequency.setValueAtTime(1400 * pitch, now);
        osc.frequency.exponentialRampToValueAtTime(120 * pitch, now + 0.025);

        gain.gain.setValueAtTime(volume * 0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.035);
      }
    } catch {
      // AudioContext interrupted or unsupported
    }
  }, []);

  // Play a subtle scrub grain
  const playScrub = useCallback(
    (progress: number) => {
      const pitch = 0.9 + Math.min(progress, 1) * 0.4;
      playTick(pitch, 0.12);
    },
    [playTick]
  );

  const toggleMute = useCallback(() => {
    audioState.isMuted = !audioState.isMuted;
    setIsMuted(audioState.isMuted);
    if (!audioState.isMuted) {
      playTick(1.0, 0.25);
    }
  }, [playTick]);

  return {
    playTick,
    playScrub,
    isMuted,
    toggleMute
  };
}
