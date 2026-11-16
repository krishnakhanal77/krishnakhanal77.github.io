import { motion } from "framer-motion";
import { FolderKanban, Mail, User2 } from "lucide-react";
import React from "react";
import type { Section } from "../App";

interface NavigationProps {
  currentSection: Section;
  onSectionChange: (section: Section) => void;
}

const navItems: { key: Section; label: string; icon: React.ReactNode }[] = [
  { key: "about", label: "About", icon: <User2 className="h-4 w-4" /> },
  { key: "projects", label: "Projects", icon: <FolderKanban className="h-4 w-4" /> },
  { key: "contact", label: "Contact", icon: <Mail className="h-4 w-4" /> },
];

const Navigation: React.FC<NavigationProps> = ({
  currentSection,
  onSectionChange,
}) => (
  <motion.nav
    className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    initial={{ y: -40, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    <div className="flex gap-1 rounded-full border border-white/10 bg-gray-900/60 p-1 shadow-lg shadow-black/20 backdrop-blur-md">
      {navItems.map((item) => {
        const active = currentSection === item.key;
        return (
          <button
            key={item.key}
            onClick={() => onSectionChange(item.key)}
            aria-current={active ? "page" : undefined}
            className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors md:px-5 ${
              active ? "text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            {active && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/25 to-blue-500/25 ring-1 ring-cyan-400/40"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{item.icon}</span>
            <span className="relative">{item.label}</span>
          </button>
        );
      })}
    </div>
  </motion.nav>
);

export default Navigation;
