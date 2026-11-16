import { motion } from "framer-motion";
import { Code2, Database, Server, Smartphone, Wrench } from "lucide-react";
import React from "react";
import { fadeUp, stagger } from "./motion";

const skillGroups = [
  {
    title: "Frontend",
    icon: Code2,
    accent: "text-cyan-400",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "TanStack Query"],
  },
  {
    title: "Backend",
    icon: Server,
    accent: "text-green-400",
    skills: ["Node.js", "NestJS", "Express.js", "REST APIs", "TypeORM"],
  },
  {
    title: "Mobile",
    icon: Smartphone,
    accent: "text-violet-400",
    skills: ["React Native", "Expo", "Push Notifications", "Offline-first"],
  },
  {
    title: "Databases",
    icon: Database,
    accent: "text-orange-400",
    skills: ["MongoDB", "SQLite"],
  },
  {
    title: "Tools",
    icon: Wrench,
    accent: "text-pink-400",
    skills: ["Git", "GitHub", "Vite"],
  },
];

const experience = [
  {
    role: "Senior Frontend Developer",
    company: "Aerawat Corp.",
    period: "2024 – Present",
    description:
      "Frontend development for enterprise applications using React, Next.js, TypeScript, and modern web technologies.",
  },
  {
    role: "Frontend Developer",
    company: "Dogma International",
    period: "2022 – 2024",
    description:
      "Developed responsive web applications and collaborated with design teams to create pixel-perfect UIs. Also worked on mobile applications using React Native.",
  },
  {
    role: "MERN Stack Developer",
    company: "ABS Soft Nepal Pvt. Ltd.",
    period: "2021 – 2022",
    description:
      "Built full-stack web applications with MongoDB, Express, React, and Node.js, and collaborated with design teams to create pixel-perfect UIs.",
  },
];

const AboutSection: React.FC = () => (
  <motion.div
    className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16"
    variants={stagger(0.05)}
    initial="hidden"
    animate="show"
  >
    {/* Intro + skills */}
    <div className="space-y-8">
      <motion.div variants={fadeUp} className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          <span className="gradient-text">Kri$hna Khanal</span>
        </h1>
        <h2 className="text-xl font-semibold text-gray-200 md:text-2xl">
          Full Stack Developer
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-gray-400 md:text-lg">
          I build fast, accessible web and mobile products end to end — from
          polished React and Next.js interfaces to scalable APIs with Node.js
          and NestJS. Shipping SaaS, healthcare, and enterprise applications
          since 2021.
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500">
          Skills
        </h3>
        <motion.div
          className="grid gap-3 sm:grid-cols-2"
          variants={stagger(0.15, 0.06)}
        >
          {skillGroups.map(({ title, icon: Icon, accent, skills }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="card p-4"
            >
              <div className="mb-3 flex items-center gap-2">
                <Icon className={`h-4 w-4 ${accent}`} />
                <span className="text-sm font-semibold text-white">{title}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span key={skill} className="chip">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>

    {/* Experience timeline */}
    <motion.div variants={fadeUp} className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500">
        Experience
      </h3>
      <motion.ol
        className="relative space-y-6 border-l border-white/10 pl-6"
        variants={stagger(0.2, 0.12)}
      >
        {experience.map((job, i) => (
          <motion.li key={job.company} variants={fadeUp} className="relative">
            <span
              className={`absolute -left-[31px] top-1.5 h-3 w-3 rounded-full ring-4 ring-gray-950 ${
                i === 0 ? "bg-cyan-400" : "bg-gray-600"
              }`}
            />
            <div className="card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h4 className="font-semibold text-white">{job.role}</h4>
                <span className="text-xs text-gray-500">{job.period}</span>
              </div>
              <p className="mt-0.5 text-sm text-cyan-400">{job.company}</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">
                {job.description}
              </p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </motion.div>
  </motion.div>
);

export default AboutSection;
