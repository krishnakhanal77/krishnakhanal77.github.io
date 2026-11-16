import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import AboutSection from "./components/AboutSection";
import Background from "./components/Background";
import ContactSection from "./components/ContactSection";
import FlashScreen from "./components/FlashScreen";
import Navigation from "./components/Navigation";
import ProjectsSection from "./components/ProjectsSection";
import "./styles/global.css";

export type Section = "about" | "projects" | "contact";

const sections: Record<Section, React.ReactNode> = {
  about: <AboutSection />,
  projects: <ProjectsSection />,
  contact: <ContactSection />,
};

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentSection, setCurrentSection] = useState<Section>("about");

  const handleSectionChange = (section: Section) => {
    setCurrentSection(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden text-white">
      <Background />

      <AnimatePresence mode="wait">
        {showIntro ? (
          <FlashScreen key="intro" onComplete={() => setShowIntro(false)} />
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex min-h-screen flex-col"
          >
            <Navigation
              currentSection={currentSection}
              onSectionChange={handleSectionChange}
            />

            <main className="flex-1 w-full px-4 pb-16 pt-24 md:px-8 md:pt-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSection}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {sections[currentSection]}
                </motion.div>
              </AnimatePresence>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
