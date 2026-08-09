/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // toggled via a "light" class on <html> — see ThemeToggle.jsx
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // All colors now read from CSS variables (defined in index.css)
        // so ThemeToggle can swap them at runtime without touching any component.
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        "ink-2": "rgb(var(--color-ink-2) / <alpha-value>)",
        "ink-3": "rgb(var(--color-ink-3) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        coral: "rgb(var(--color-coral) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        // "white" is overridden on purpose: every component uses text-white /
        // border-white/10 / bg-white/5 as the theme's primary foreground color.
        // Re-pointing it at a variable means dark <-> light re-themes the whole
        // site without editing Navbar, Footer, Hero, About, Contact, Projects, etc.
        white: "rgb(var(--color-white) / <alpha-value>)",
      },
      fontFamily: {
        head: ["Syne", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
