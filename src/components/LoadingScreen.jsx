import React, { useEffect, useRef, useState } from "react";
import { heroArt } from "../assets";
const NAME = "Samaa Abo Diab";

// Looping background video — fades in/out at each loop boundary instead of
// hard-cutting, so the restart is invisible to the viewer.
const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4";
const VIDEO_FADE_DURATION = 0.2; // seconds, at both the start and end of each loop

const LoadingScreen = ({ onFinish }) => {
  const [typed, setTyped] = useState("");
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);
  const videoRef = useRef(null);

  // Manual seamless video loop: fade the clip out just before it ends, jump
  // back to frame 0, fade it back in — no hard cut, no native `loop` attr.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Belt-and-suspenders: some browsers don't reliably honor the JSX
    // `muted` attribute in time for autoplay, so set it directly too.
    video.muted = true;
    video.play().catch(() => {});

    let rafId;

    const updateOpacity = () => {
      const { currentTime, duration } = video;

      if (duration && !Number.isNaN(duration)) {
        let opacity = 1;
        if (currentTime < VIDEO_FADE_DURATION) {
          opacity = currentTime / VIDEO_FADE_DURATION;
        } else if (currentTime > duration - VIDEO_FADE_DURATION) {
          opacity = Math.max(0, (duration - currentTime) / VIDEO_FADE_DURATION);
        }
        video.style.opacity = String(opacity);
      }

      rafId = requestAnimationFrame(updateOpacity);
    };

    const handleEnded = () => {
      video.style.opacity = "0";
      window.setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
      }, 100);
    };

    video.addEventListener("ended", handleEnded);
    rafId = requestAnimationFrame(updateOpacity);

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    // Type the name out letter by letter
    let i = 0;
    const typeInterval = setInterval(() => {
      i++;
      setTyped(NAME.slice(0, i));
      if (i === NAME.length) clearInterval(typeInterval);
    }, 80);

    // After 5s, start fading out
    const fadeTimer = setTimeout(() => setFadeOut(true), 1000);

    // Remove from DOM after the fade transition finishes, then tell the app
    const hideTimer = setTimeout(() => {
      setHidden(true);
      if (onFinish) onFinish();
    }, 1500);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [onFinish]);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-ink transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background video — fallback bg-ink shows while it loads */}
      <video
        ref={videoRef}
        className="absolute inset-0 z-0 object-cover w-full h-full"
        src={VIDEO_URL}
        autoPlay
        muted
        playsInline
      />

      {/* Gradient overlay so the avatar/text stay legible over the video */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-ink/90 via-ink/20 to-ink/90" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative flex items-center justify-center mb-6 w-28 h-28 sm:w-32 sm:h-32">
          {/* Spinner ring */}
          <div className="absolute inset-0 border-4 rounded-full border-accent/30 border-t-accent animate-spin" />

          {/* Avatar */}
          <div className="flex items-center justify-center w-20 h-20 text-xl font-bold rounded-full sm:w-24 sm:h-24 bg-accent font-head border-4 border-ink-2 shadow-[0_0_40px_10px_rgba(108,99,255,0.4)]">
            
                      <img
                        src={heroArt}
                        alt="Illustration of a laptop with code"
                        className="hero-float w-40 sm:w-56 md:w-96 lg:w-[30rem] xl:w-[34rem] drop-shadow-[0_25px_35px_rgba(108,99,255,0.35)]"
                      />
          </div>
        </div>

        <h2 className="text-xl font-bold text-black font-head sm:text-2xl">
          {typed}
          <span className="text-accent cursor-blink">|</span>
        </h2>

        <div className="w-40 h-1 mt-6 overflow-hidden rounded-full bg-white/10 sm:w-48">
          <div className="h-full loading-bar-fill bg-accent" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
