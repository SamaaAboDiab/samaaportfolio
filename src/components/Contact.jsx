import React, { useState } from "react";
import Reveal from "./Reveal";

// Formspree endpoint (from your Formspree dashboard)
const FORMSPREE_ENDPOINT = "https://formspree.io/f/meedqnwj";

// TODO: replace with your real email (used for the "Email" link below)
const YOUR_EMAIL = "samaaabodiab21@gmail.com";

const contactInfo = [
  {
    label: "Email",
    value: YOUR_EMAIL,
    href: `mailto:${YOUR_EMAIL}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/samaa-abo-diab",
    href: "https://www.linkedin.com/in/samaa-abo-diab/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3c0-1.5-.6-2.4-1.8-2.4-1 0-1.6.7-1.9 1.3v-.9h-2.1v7.3h2.1v-4c0-.7.1-1.4.9-1.4.8 0 .8.7.8 1.4v4h2.1M6.5 8.8c.8 0 1.3-.6 1.3-1.3 0-.7-.5-1.3-1.3-1.3-.8 0-1.3.6-1.3 1.3 0 .7.5 1.3 1.3 1.3M7 18.5h2.1v-7.3H7v7.3z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "github.com/SamaaAboDiab",
    href: "https://github.com/SamaaAboDiab",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.21.68-.48 0-.24-.01-.88-.01-1.72-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.56 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48C19.13 20.17 22 16.42 22 12c0-5.52-4.48-10-10-10z" />
      </svg>
    ),
  },
];

const initialForm = { name: "", email: "", message: "" };

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {
      name: !form.name.trim(),
      email: !form.email.trim(),
      message: !form.message.trim(),
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setStatus("sending");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      if (res.ok) {
        setStatus("sent");
        setForm(initialForm);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Formspree error:", err);
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 4500);
    }
  };

  return (
    <div className="bg-ink min-h-[calc(100vh-73px)] pt-8 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-4">
            Contact
          </span>
          <h2 className="mb-4 text-3xl font-bold text-white font-head md:text-5xl">
            Let's build something together
          </h2>
          <p className="max-w-xl mx-auto text-muted">
            Have a project in mind? I'd love to hear about it. Send me a message
            and let's make it happen.
          </p>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Info side */}
          <Reveal direction="left" className="space-y-4">
            {contactInfo.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-ink-2/60 border border-white/10 hover:border-accent/40 rounded-xl p-5 transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="flex items-center justify-center flex-shrink-0 rounded-full w-11 h-11 bg-accent/10 text-accent">
                  {item.icon}
                </span>
                <span>
                  <span className="block text-xs tracking-wide uppercase text-muted">
                    {item.label}
                  </span>
                  <span className="block font-medium text-white break-all">
                    {item.value}
                  </span>
                </span>
              </a>
            ))}
          </Reveal>

          {/* Form side */}
          <Reveal delay={120} direction="right">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="p-6 space-y-5 border bg-ink-2/60 border-white/10 rounded-2xl md:p-8"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-muted mb-1.5"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Samaa Abo Diab"
                  className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 text-white placeholder:text-muted/60 outline-none transition-colors duration-300 focus:border-accent ${
                    errors.name
                      ? "border-coral animate-fade-in"
                      : "border-white/10"
                  }`}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-muted mb-1.5"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 text-white placeholder:text-muted/60 outline-none transition-colors duration-300 focus:border-accent ${
                    errors.email
                      ? "border-coral animate-fade-in"
                      : "border-white/10"
                  }`}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm text-muted mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project…"
                  className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 text-white placeholder:text-muted/60
                   outline-none transition-colors duration-300 focus:border-accent resize-none ${
                     errors.message
                       ? "border-coral animate-fade-in"
                       : "border-white/10"
                   }`}
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="flex items-center justify-center w-full gap-2 px-6 py-3 font-semibold text-white transition-colors duration-300 rounded-full bg-accent hover:brightness-110 disabled:opacity-70"
              >
                {status === "sending" ? "Sending…" : "Send Message "}
              </button>

              {status === "sent" && (
                <p className="text-sm text-center text-accent animate-fade-in-up">
                  Message sent! I'll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-center text-coral animate-fade-in-up">
                  Something went wrong. Please try again or email me directly.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default Contact;
