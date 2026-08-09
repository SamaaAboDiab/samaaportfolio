import React, { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const skills = [
  {
    name: "HTML5",
    color: "#E44D26",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-9 h-9 sm:w-10 sm:h-10"
      >
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
      </svg>
    ),
  },
  {
    name: "CSS3",
    color: "#1572B6",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-9 h-9 sm:w-10 sm:h-10"
      >
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.351l5.373-1.443.98-13.495z" />
      </svg>
    ),
  },
  {
    name: "JavaScript (ES6+)",
    color: "#F7DF1E",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-9 h-9 sm:w-10 sm:h-10"
      >
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
      </svg>
    ),
  },
  {
    name: "React.js",
    color: "#61DAFB",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-9 h-9 sm:w-10 sm:h-10">
        <circle cx="12" cy="12" r="2.2" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="1.3">
          <ellipse cx="12" cy="12" rx="10" ry="4.2" />
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4.2"
            transform="rotate(60 12 12)"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4.2"
            transform="rotate(120 12 12)"
          />
        </g>
      </svg>
    ),
  },
  {
    name: "Redux Toolkit",
    color: "#764ABC",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-9 h-9 sm:w-10 sm:h-10">
        <circle cx="12" cy="12" r="2.3" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="1.4" fill="none">
          <path d="M12 4.5c4 0 7.2 1.6 7.2 4.2 0 1.9-1.7 3.5-4.2 4.2" />
          <path d="M12 19.5c-4 0-7.2-1.6-7.2-4.2 0-1.9 1.7-3.5 4.2-4.2" />
          <path d="M6.7 6.7c1.6-1.6 4-2.5 6.6-2 1.9.35 3.4 1.6 3.9 3.2" />
        </g>
        <circle cx="17.5" cy="7" r="1.4" fill="currentColor" />
        <circle cx="6.5" cy="17" r="1.4" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "React RouterDom",
    color: "#CA4245",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-9 h-9 sm:w-10 sm:h-10"
      >
        <path d="M4.505 14.94c.966 0 1.75.784 1.75 1.75s-.784 1.75-1.75 1.75-1.75-.784-1.75-1.75.784-1.75 1.75-1.75zm14.99 0c.966 0 1.75.784 1.75 1.75s-.784 1.75-1.75 1.75-1.75-.784-1.75-1.75.784-1.75 1.75-1.75zm-7.5-8.19c.966 0 1.75.784 1.75 1.75s-.784 1.75-1.75 1.75-1.75-.784-1.75-1.75.784-1.75 1.75-1.75z" />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          d="M4.505 16.69c4-.2 5.5-2.3 6.99-6.19M19.495 16.69c-4-.2-5.5-2.3-6.99-6.19"
        />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    color: "#38BDF8",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-9 h-9 sm:w-10 sm:h-10"
      >
        <path d="M12 6.5c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98.99 2.11 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35-.98-.99-2.11-2.15-4.6-2.15zM7 12.5c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98.99 2.11 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35-.98-.99-2.11-2.15-4.6-2.15z" />
      </svg>
    ),
  },

  {
    name: "Git & GitHub",
    color: "#F05032",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-9 h-9 sm:w-10 sm:h-10"
      >
        <path d="M23.546 10.93 13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" />
      </svg>
    ),
  },
  {
    name: "REST APIs / Axios",
    color: "#5A29E4",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-9 h-9 sm:w-10 sm:h-10"
      >
        <path d="M11.672 9.263l1.44 2.568h.016l4.184 7.28h4.688L21.44 18.6H5.673l1.216-2.16h9.947l-1.44-2.568h-6.4l1.28-2.243zM12 4.889l1.44 2.568-1.44 2.568-1.44-2.568L12 4.889zM2 18.6l7.056-12.32h4.688L6.688 18.6H2z" />
      </svg>
    ),
  },
];

// Each entry becomes its own boxed, individually-revealed paragraph.
const bioParagraphs = [
  <>
    I'm <span className="font-semibold text-white">Samaa Abo Diab</span>, a{" "}
    <span className="text-accent">Front-End Developer</span> currently building
    my path into the field. I've been learning front-end development for a year
    and a half, and I'm now in a hands-on training program focused on how real
    companies build and structure their code.
  </>,
  <>
    I'm specialized in <span className="text-accent">React.js</span> and use
    technologies such as HTML, CSS, JavaScript, Redux, and Tailwind CSS to build
    clean, functional interfaces.
  </>,
  <>
    What I enjoy most is{" "}
    <span className="text-accent">
      turning a static design into a real, working website
    </span>{" "}
    — making sure every detail translates correctly from the design file to the
    browser.
  </>,
  <>
    I care deeply about <span className="text-accent">user experience</span> and
    making sure a site feels smooth and intuitive to use. I also put a lot of
    focus on <span className="text-accent">responsive design</span>, using
    Tailwind CSS to make sure every project works well across all screen sizes —
    from mobile to desktop.
  </>,
  
];

const SkillCard = ({ name, icon, color }) => {
  return (
    <div
      style={{ "--brand": color }}
      className="flex flex-col items-center justify-center gap-2 p-3 text-center transition-all duration-300 border aspect-square sm:gap-3 sm:p-4 bg-white/5 border-white/10 rounded-xl hover:border-[var(--brand)]/60 hover:bg-white/[0.08] hover:-translate-y-1"
    >
      <span
        className="transition-colors duration-300 text-muted group-hover:text-[var(--brand)]"
        style={{ color: "var(--brand)" }}
      >
        {icon}
      </span>
      <span className="text-xs font-medium leading-tight text-white">
        {name}
      </span>
    </div>
  );
};

// Self-contained scroll reveal — uses IntersectionObserver directly instead
// of relying on AOS's window-scroll listener (which can be silently blocked
// by other scroll-related code elsewhere on the page). Fires once, then
// disconnects.
const useRevealOnView = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // If already in view on mount (e.g. tall screen), reveal immediately.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
};

// A card with a slowly-rotating gradient "glow" traveling around its edges,
// that slides up from below while entering diagonally from the left or
// right, revealing once it scrolls into view.
const GlowBorderCard = ({ children, delay = 0, from = "left" }) => {
  const [ref, visible] = useRevealOnView();
  const startX = from === "left" ? -56 : 56;

  return (
    <div
      ref={ref}
      className="relative p-[1.5px] rounded-2xl overflow-hidden group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0, 0)" : `translate(${startX}px, 40px)`,
        transition:
          "opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="absolute inset-[-50%] opacity-70 group-hover:opacity-100 transition-opacity duration-300 animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,rgb(var(--color-accent))_15%,transparent_35%)]" />
      <div className="relative z-10 p-5 leading-relaxed transition-colors duration-300 sm:p-6 bg-ink-2/90 backdrop-blur-sm rounded-[15px] text-muted">
        {children}
      </div>
    </div>
  );
};

const StatsBox = ({ delay = 0 }) => {
  const [ref, visible] = useRevealOnView();

  return (
    <div
      ref={ref}
      className="grid grid-cols-3 gap-2 p-5 mt-4 border sm:gap-4 sm:p-6 bg-ink-2/60 backdrop-blur-sm border-white/10 rounded-2xl"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0, 0)" : "translate(0, 40px)",
        transition:
          "opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {[
        ["1.5+", "Years Learning"],
        ["3", "Projects Built"],
        ["6+", "Technologies"],
      ].map(([num, label]) => (
        <div key={label} className="text-center">
          <div className="text-xl font-bold sm:text-2xl font-head text-accent">
            {num}
          </div>
          <div className="mt-1 text-[11px] sm:text-xs text-muted">{label}</div>
        </div>
      ))}
    </div>
  );
};

const About = () => {
  return (
    <div className="bg-ink min-h-[calc(100vh-73px)] pt-6 sm:pt-10 pb-10 sm:pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <Reveal className="mb-10 text-center sm:mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-4">
            About Me
          </span>
          <h2 className="text-2xl font-bold text-white font-head sm:text-3xl md:text-5xl">
            The person behind the code
          </h2>
        </Reveal>

        <div className="grid items-start grid-cols-1 gap-6 sm:gap-10 md:grid-cols-2">
          {/* Bio */}
          <div>
            {/* Each paragraph in its own card with an animated glowing border,
                revealed one after another on scroll via AOS. */}
            <div className="space-y-4">
              {bioParagraphs.map((paragraph, index) => (
                <GlowBorderCard
                  key={index}
                  delay={index * 150}
                  from={index % 2 === 0 ? "left" : "right"}
                >
                  <p>{paragraph}</p>
                </GlowBorderCard>
              ))}
            </div>

            <StatsBox delay={bioParagraphs.length * 150} />
          </div>

          {/* Skills */}
          <Reveal
            delay={120}
            direction="right"
            className="p-5 transition-colors duration-300 border sm:p-8 bg-ink-2/60 backdrop-blur-sm border-white/10 hover:border-accent/30 rounded-2xl md:p-10"
          >
            <h3 className="mb-5 text-lg font-bold text-white sm:mb-6 font-head">
              Core Skills
            </h3>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {skills.map((skill, index) => (
                <Reveal key={skill.name} delay={index * 50} direction="zoom">
                  <SkillCard {...skill} />
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default About;
