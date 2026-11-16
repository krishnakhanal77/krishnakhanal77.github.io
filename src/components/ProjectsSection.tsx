import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import React from "react";
import { fadeUp, stagger } from "./motion";

interface Project {
  title: string;
  description: string;
  tech: string[];
  demo?: string;
  github?: string;
}

const projects: Project[] = [
  {
    title: "RxPIN",
    description:
      "A SaaS therapy management system that streamlines record-keeping and day-to-day operations for therapists and clients, primarily focused on autism care.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind", "TanStack Query"],
    demo: "https://aerawat.com",
  },
  {
    title: "Baywater Mobile",
    description:
      "Field-service app for Baywater Healthcare with real-time support, offline capability, push notifications, and Google Maps integration.",
    tech: ["React Native", "TypeScript", "SQLite", "TypeORM", "Tailwind"],
    demo: "https://baywater.co.uk/",
  },
  {
    title: "Victim Support Scotland",
    description:
      "A complete system for a charity that supports victims of domestic violence and abuse.",
    tech: ["React", "React Query", "Tailwind"],
    demo: "https://victimsupport.scot/",
  },
  {
    title: "Nepal Press Khabar",
    description: "News portal website built with React, Node.js, and MongoDB.",
    tech: ["React", "Node.js", "MongoDB"],
    demo: "https://nepalpresskhabar.com/",
  },
  {
    title: "Hawkins",
    description:
      "Inventory management web app for tracking and managing stock levels through a clean, efficient interface.",
    tech: ["React", "React Query", "Tailwind"],
  },
  {
    title: "PM Tool",
    description:
      "Project management tool for task tracking and resource allocation across teams.",
    tech: ["React", "React Query", "Tailwind"],
  },
  {
    title: "Warehouse Management System",
    description: "Mobile application for warehouse operations and stock handling.",
    tech: ["React Native", "Expo", "TypeScript", "Tailwind"],
  },
];

const isLink = (url?: string): url is string => !!url && url !== "#";

const ProjectsSection: React.FC = () => (
  <div className="mx-auto max-w-6xl">
    <motion.header
      className="mb-10 space-y-3 text-center"
      variants={fadeUp}
      initial="hidden"
      animate="show"
    >
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
        <span className="gradient-text">Featured Projects</span>
      </h1>
      <p className="text-gray-400 md:text-lg">
        A selection of products I've built and shipped
      </p>
    </motion.header>

    <motion.div
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      variants={stagger(0.1, 0.07)}
      initial="hidden"
      animate="show"
    >
      {projects.map((project) => {
        const Wrapper = isLink(project.demo) ? motion.a : motion.div;
        return (
          <Wrapper
            key={project.title}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            {...(isLink(project.demo) && {
              href: project.demo,
              target: "_blank",
              rel: "noopener noreferrer",
            })}
            className="card group flex flex-col p-5 hover:border-cyan-400/40"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold text-white">{project.title}</h3>
              <div className="flex shrink-0 gap-2 text-gray-500">
                {isLink(project.github) && (
                  <Github className="h-4 w-4" aria-label="Source code" />
                )}
                {isLink(project.demo) && (
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-400"
                    aria-label="Open live site"
                  />
                )}
              </div>
            </div>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-400">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </Wrapper>
        );
      })}
    </motion.div>
  </div>
);

export default ProjectsSection;
