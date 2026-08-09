import React, { useEffect, useRef, useState } from "react";
import { TbBrandGithub, TbBrandLinkedin } from "react-icons/tb";
import { heroArt } from "../assets";
import { heroArt2 } from "../assets";

const WORDS = ["Creative", "Innovative", "Responsive", "Accessible", "Modern"];

// Longest possible word (including the fallback "React.js") — used to reserve
// a fixed width so the typing effect never reflows anything around it.
const MAX_WORD_LEN = Math.max(...WORDS.map((w) => w.length), "React.js".length);

const useTypedText = (words) => {
  const [text, setText] = useState("");

  useEffect(() => {
    let wordIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timeoutId;

    const tick = () => {
      const word = words[wordIdx];
      let delay;

      if (!deleting) {
        charIdx++;
        setText(word.slice(0, charIdx));
        delay = charIdx === word.length ? 1800 : 90 + Math.random() * 60;
        if (charIdx === word.length) deleting = true;
      } else {
        charIdx--;
        setText(word.slice(0, charIdx));
        delay = 45;
        if (charIdx === 0) {
          deleting = false;
          wordIdx = (wordIdx + 1) % words.length;
          delay = 400;
        }
      }

      timeoutId = setTimeout(tick, delay);
    };

    timeoutId = setTimeout(tick, 700);
    return () => clearTimeout(timeoutId);
  }, [words]);

  return text;
};

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/SamaaAboDiab",
    icon: (
      <TbBrandGithub className="w-7 h-7 sm:w-7 sm:h-7" strokeWidth={1.75} />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/samaa-abo-diab/",
    icon: (
      <TbBrandLinkedin className="w-7 h-7 sm:w-7 sm:h-7" strokeWidth={1.75} />
    ),
  },
];

const Hero = () => {
  const typed = useTypedText(WORDS);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);

  // Light parallax on the ambient blobs as the user scrolls
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    let ticking = false;

    const applyParallax = () => {
      const y = window.scrollY;
      if (blob1Ref.current) {
        blob1Ref.current.style.transform = `translateY(${y * 0.18}px)`;
      }
      if (blob2Ref.current) {
        blob2Ref.current.style.transform = `translateY(${y * -0.12}px)`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(applyParallax);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative flex items-start pt-6 pb-10 overflow-hidden text-white bg-ink sm:items-center sm:py-12">
      {/* Ambient gradient blobs — smaller & tamer on mobile so they don't cause horizontal scroll */}
      <div className="absolute inset-0 pointer-events-none opacity-20 sm:opacity-30">
        <div
          ref={blob1Ref}
          className="absolute top-8 left-4 w-40 h-40 sm:top-16 sm:left-10 sm:w-72 sm:h-72 bg-accent rounded-full blur-[70px] sm:blur-[110px]"
        />
        <div
          ref={blob2Ref}
          className="absolute bottom-4 right-4 w-56 h-56 sm:bottom-10 sm:right-10 sm:w-96 sm:h-96 bg-accent rounded-full blur-[80px] sm:blur-[130px]"
        />
      </div>

      <div className="relative z-10 grid items-center max-w-6xl gap-8 px-4 py-10 mx-auto sm:gap-12 sm:px-6 sm:py-16 md:grid-cols-2">
        {/* Right illustration — hidden on small screens, shown from md up */}
        <div
          className="relative flex-col items-center justify-center hidden md:flex md:order-2 animate-fade-in-up"
          style={{ animationDelay: "150ms" }}
        >
          <img
            src={heroArt}
            alt="Illustration of a laptop with code"
            className="hero-float w-40 sm:w-56 md:w-96 lg:w-[30rem] xl:w-[34rem] drop-shadow-[0_25px_35px_rgba(108,99,255,0.35)]"
          />
          <div className="w-32 h-4 -mt-2 rounded-full sm:w-40 sm:h-5 hero-shadow bg-accent/50 blur-2xl" />
        </div>

        {/* Left: text */}
        <div className="text-center md:order-1 md:text-left animate-fade-in-up">
          {/* Avatar badge */}
          <div className="flex items-center justify-center w-72 h-72 mx-auto mb-4 text-xl font-bold border-4 rounded-full sm:w-36 sm:h-36 sm:mb-5 md:mx-0 bg-accent font-head border-ink-2 shadow-[0_0_50px_14px_rgba(108,99,255,0.4)]">
            <img
              src={heroArt2}
              alt="Avatar"
              className="object-cover w-full h-full rounded-full"
            />
          </div>

          <h1 className="mb-3 text-3xl font-extrabold leading-tight font-head sm:mb-4 sm:text-4xl md:text-5xl">
            Frontend{" "}
            <span
              className="relative inline-block text-center align-bottom"
              style={{ minWidth: `${MAX_WORD_LEN}ch` }}
            >
              {/* Invisible sizer — reserves space for the longest word so nothing reflows,
                  without pinning the visible text/cursor to the far edge of that space. */}
              <span className="invisible" aria-hidden="true">
                {"A".repeat(MAX_WORD_LEN)}
              </span>
              <span className="absolute inset-0 text-transparent bg-gradient-to-r from-accent via-white to-accent bg-clip-text animate-gradient">
                {typed || "React.js"}
                <span className="text-accent cursor-blink">|</span>
              </span>
            </span>
            <br />
            <span className="text-white">Developer</span>
          </h1>

          <p className="max-w-xl mx-auto mb-5 text-lg leading-relaxed sm:mb-6 sm:text-base md:text-lg text-muted md:mx-0">
            Frontend development deals with the parts of a website that the end
            user actually sees and interacts with. I build websites that are
            beautiful, functional, responsive, and accessible.
          </p>

          {/* Social icon circles */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-7 sm:gap-3.5 sm:mb-8 md:justify-start">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex items-center justify-center w-12 h-12 text-white transition-all duration-300 bg-transparent border-2 rounded-full shadow-md border-white/70 dark:border-white sm:w-14 sm:h-14 hover:bg-accent/10 hover:border-accent hover:text-accent"
              >
                {s.icon}
              </a>
            ))}
          </div>

          <div className="flex flex-row flex-wrap justify-center w-full gap-3 mx-auto sm:gap-4 md:justify-start md:mx-0">
            <a
              href="https://drive.google.com/file/d/1nJlnW4vBPSnvJZlOcyKNIugupJJx0hoC/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-3 text-sm font-semibold text-center text-white transition-all duration-300 border-2 rounded-lg sm:flex-none sm:px-7 sm:text-base border-white/20 hover:border-accent hover:text-accent hover:bg-accent/5"
            >
              Download My CV
            </a>
            <a
              href="#projects"
              className="flex-1 px-4 py-3 text-sm font-semibold text-center text-white transition-all duration-300 rounded-lg shadow-lg sm:flex-none sm:px-7 sm:text-base bg-accent hover:brightness-110 shadow-accent/30"
            >
              View My Projects
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
