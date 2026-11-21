# Welcome Landing Video

## 1. Overview
A premium, elegant, festive **Diwali-themed animation video** that plays fullscreen upon landing on the site and automatically dismisses once playback finishes.

- **Source File:** `public/welcome-video.mp4`
- **Presentation:** Edge-to-edge Fullscreen video presentation with smooth cross-fade exit.
- **Auto-Play:** Automatically initiates playback on mount with intelligent autoplay policy fallback.
- **Auto-Dismiss:** When the video finishes playing (`onEnded`), a smooth fade-out occurs and transitions directly to the celebration stage.
- **Controls:** Minimal, elegant floating controls in the top-right corner for Audio Mute/Unmute and Skip.

---

## 2. Directory Structure
```
src/features/welcome/landing-video/
├── LandingVideoIllustration.tsx  # Fullscreen HTML5 video player with auto-dismiss
├── landingVideo.config.ts        # Source paths and configuration constants
├── landingVideo.styles.css       # Fullscreen edge-to-edge and fade-out styles
├── landingVideo.md               # Feature documentation
└── index.ts                      # Barrel exports
```
