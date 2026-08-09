import React, { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const ALL_SECTION_IDS = ["home", ...navLinks.map((l) => l.id)];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  // Navbar background on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight whichever section is currently in view
  useEffect(() => {
    const sections = ALL_SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Close drawer on desktop resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close on Escape, lock body scroll while open
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[110] py-3 transition-all duration-300 border-b ${
        scrolled
          ? "bg-ink/85 backdrop-blur-xl border-white/10 py-3"
          : "bg-ink/40 backdrop-blur-md border-transparent"
      }`}
    >
      <div className="relative z-[95] flex items-center justify-between max-w-6xl px-4 mx-auto md:px-6">
        {/* الاسم - بيعمل سكرول لأعلى الصفحة */}
        <a
          href="#home"
          onClick={() => setIsOpen(false)}
          className="flex-shrink-0"
        >
          <h1 className="flex items-center gap-2 text-lg font-bold text-white transition-colors duration-300 font-head hover:text-accent md:text-xl">
            <span className="inline-block w-2 h-2 rounded-full bg-accent" />
            Samaa<span className="text-accent">.</span>
          </h1>
        </a>

        {/* روابط سطح المكتب */}
        <div className="flex items-center gap-2">
          <ul className="hidden md:flex items-center gap-1 text-sm md:text-[0.95rem] font-medium">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={`px-3.5 py-2 rounded-lg transition-all duration-300 inline-block border ${
                      isActive
                        ? "text-white bg-white/5 border-white/20 shadow-[0_0_15px_rgba(108,99,255,0.3)]"
                        : "text-muted border-transparent hover:text-white hover:bg-white/5 hover:border-white/20 hover:shadow-[0_0_20px_rgba(108,99,255,0.25)]"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <ThemeToggle />

          {/* زر الهامبرجر - يظهر بس في الشاشات الصغيرة */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            aria-expanded={isOpen}
            aria-controls="mobile-drawer"
            className={`relative flex items-center justify-center text-white transition-all duration-300 rounded-full md:hidden w-9 h-9 hover:text-accent hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <span className="sr-only">Open navigation</span>
            <div className="flex flex-col justify-between w-5 h-4">
              <span className="block h-[2px] w-full bg-white rounded-full" />
              <span className="block h-[2px] w-full bg-white rounded-full" />
              <span className="block h-[2px] w-full bg-white rounded-full" />
            </div>
          </button>
        </div>
      </div>

      {/* ══ Backdrop ══ */}
      <div
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
        className={`md:hidden fixed inset-0 z-[90] bg-ink transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ══ الدرج الجانبي ══ */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        className={`md:hidden fixed top-0 right-0 h-screen w-56 max-w-[65%] z-[100] bg-ink border-l border-white/10 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-end px-5 py-4 border-b border-white/10">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="flex items-center justify-center text-white transition-colors duration-300 rounded-full w-9 h-9 hover:text-accent hover:bg-white/5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="w-5 h-5"
            >
              <path d="m18 6-12 12M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col flex-1 px-3 py-4">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link, index) => {
              const isActive = active === link.id;
              return (
                <li
                  key={link.id}
                  className={isOpen ? "animate-fade-in-up" : ""}
                  style={{ animationDelay: isOpen ? `${index * 60}ms` : "0ms" }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`block w-full px-3 py-3 rounded-lg text-base font-semibold transition-all duration-300 ${
                      isActive
                        ? "text-white bg-white/5 border border-white/20"
                        : "text-muted border border-transparent hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="px-3 pt-4 pb-6 mt-auto">
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center w-full gap-1 px-4 py-3 text-sm font-bold text-center text-white transition-all duration-300 rounded-lg bg-accent hover:brightness-110"
          >
            Hire Me
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
