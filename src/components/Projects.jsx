import React from "react";
import { project1 } from "../assets";
import { project2 } from "../assets";
import { project3 } from "../assets";
import Reveal from "./Reveal";

const projects = [
  {
    id: 1,
    title: "Coffee Landing Page",
    description:
      "A warm, conversion-focused landing page for a coffee brand with smooth scroll sections and a responsive layout.",
    tech: ["React", "Tailwind CSS", "Node.js"],
    category: "react",
    github: "https://github.com/SamaaAboDiab/Coffe-react.git",
    demo: "https://coffe-react-beta.vercel.app/",
    image: project1,
  },
  {
    id: 2,
    title: "Dashboard UI",
    description:
      "A modern dashboard UI for managing and visualizing data with an intuitive user interface.admin panel and responsive design.",
    tech: ["React", "Tailwind CSS"],
    category: "ui ",
    github: "https://github.com/SamaaAboDiab/Project2",
    demo: "https://project2-demo.com",
    image: project2,
  },
  {
    id: 3,
    title: "Tawazon — Healthy Food Website",
    description:
      "A fully responsive healthy food restaurant website with calorie-counted meals, user authentication, shopping cart,and Built with HTML, CSS, and JavaScript.",
    tech: ["HTML", "CSS", "JavaScript", "LocalStorage"],
    category: "web",
    github: "https://github.com/SamaaAboDiab/tawazone_HTML.git",
    demo: "https://tawazonehtmltry.vercel.app/Login.html",
    image: project3,
  },
];

const Projects = () => {
  return (
    <div className="min-h-screen bg-ink">
      <div className="max-w-6xl px-4 pt-8 pb-16 mx-auto">
        <Reveal className="mb-10 text-center">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-4">
            Projects
          </span>
          <h2 className="mb-4 text-3xl font-bold text-white font-head md:text-5xl">
            Selected Work
          </h2>
          <p className="max-w-2xl mx-auto text-muted">
            A selection of work — applications built with attention to
            performance, architecture, and user experience.
          </p>
        </Reveal>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal
              key={project.id}
              delay={index * 90}
              className="overflow-hidden transition-all duration-300 border shadow-xl bg-ink-2/60 backdrop-blur-sm rounded-xl border-white/10 hover:border-accent/40 hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                />
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-white">
                  {project.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs border rounded-full bg-accent/10 text-accent border-accent/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 text-sm font-medium text-center text-white transition-colors duration-200 border rounded-lg bg-white/5 hover:bg-white/10 border-white/10 hover:border-accent/40"
                  >
                    GitHub
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 text-sm font-medium text-center text-white transition-colors duration-200 rounded-lg shadow-lg bg-accent hover:brightness-110 hover:shadow-accent/25"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA — Have a project in mind */}
        <Reveal className="px-6 mt-20 text-center border bg-ink-2/60 backdrop-blur-sm border-white/10 rounded-2xl py-14 md:py-16">
          <h2 className="mb-4 text-2xl font-bold text-white font-head md:text-4xl">
            Have a project in mind?
          </h2>
          <p className="max-w-xl mx-auto mb-8 text-muted">
            {/* TODO: عدّلي الجملة دي حسب وضعك الفعلي */}
            I'm open to new opportunities and collaborative projects — let's
            build something together.
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 font-semibold text-white transition-all duration-300 rounded-full shadow-lg bg-accent hover:brightness-110 shadow-accent/30"
          >
            Let's Talk
          </a>
        </Reveal>
      </div>
    </div>
  );
};

export default Projects;
