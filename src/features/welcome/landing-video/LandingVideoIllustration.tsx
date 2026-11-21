import React, { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { landingVideoConfig } from './landingVideo.config';
import { audioManager } from '../../audio/AudioManager';
import './landingVideo.styles.css';

interface LandingVideoIllustrationProps {
  onComplete: () => void;
  onSkip?: () => void;
}

export const LandingVideoIllustration: React.FC<LandingVideoIllustrationProps> = ({
  onComplete,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(audioManager.getMuted());

  // Handle video completion
  const handleEnded = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
    audioManager.setMuted(nextMuted);
  };

  // Attempt autoplay on mount
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = isMuted;
      video.play().catch(() => {
        // Fallback for strict browser autoplay policies
        video.muted = true;
        setIsMuted(true);
        video.play().catch((err) => {
          console.warn('Video auto-playback blocked:', err);
        });
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`landing-video-container ${isFadingOut ? 'fade-out' : ''}`}
    >
      {/* Edge-to-edge Fullscreen Video */}
      <video
        ref={videoRef}
        className="landing-video-element"
        autoPlay
        playsInline
        muted={isMuted}
        onEnded={handleEnded}
      >
        <source src={landingVideoConfig.videoSrcMp4} type="video/mp4" />
        <source src={landingVideoConfig.videoSrcWebm} type="video/webm" />
      </video>

      {/* Floating Audio Toggle in Top-Right Corner */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center">
        <button
          onClick={toggleMute}
          className="p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-gold-500/30 text-gold-300 hover:text-white hover:border-gold-400 transition-all shadow-lg active:scale-95"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          aria-label="Toggle Audio"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </div>
  );
};
