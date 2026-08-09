import React from "react";
import {
  TbBrandGithub,
  TbBrandLinkedin,
  TbBrandWhatsapp,
} from "react-icons/tb";

// TODO: replace with your real WhatsApp number (country code, no + or spaces)
const WHATSAPP_NUMBER = "201234567890";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/SamaaAboDiab",
    icon: <TbBrandGithub className="w-5 h-5" strokeWidth={1.75} />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/samaa-abo-diab/",
    icon: <TbBrandLinkedin className="w-5 h-5" strokeWidth={1.75} />,
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${201091231029}`,
    icon: <TbBrandWhatsapp className="w-5 h-5" strokeWidth={1.75} />,
  },
];

const Footer = () => {
  return (
    <footer className="border-t bg-ink border-white/10">
      <div className="flex flex-col items-center justify-between max-w-6xl gap-6 px-6 py-8 mx-auto sm:flex-row md:px-10">
        <a href="#home" className="font-bold text-white font-head">
          Samaa<span className="text-accent">.</span>
        </a>

        <p className="text-sm text-center text-muted">
          &copy; {new Date().getFullYear()} Samaa Abo Diab. Built with React &
          Tailwind CSS.
        </p>

        <div className="flex items-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-muted hover:text-accent hover:border-accent/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
