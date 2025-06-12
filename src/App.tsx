import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import AboutSection from "./components/AboutSection";
import Background3D from "./components/Background3D";
import ContactSection from "./components/ContactSection";
import FlashScreen from "./components/FlashScreen";
import LeftAnimations from "./components/LeftAnimations";
import Navigation from "./components/Navigation";
import ProjectsSection from "./components/ProjectsSection";
import "./styles/global.css";

type Section = "flash" | "about" | "projects" | "contact";

function App() {
  const [currentSection, setCurrentSection] = useState<Section>("flash");
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Handle mobile detection only for 3D/Canvas optimizations
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSectionChange = (section: Section) => {
    setCurrentSection(section);
  };

  const handleFlashComplete = () => {
    setCurrentSection("about");
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-gray-900 relative">
      {/* Enhanced 3D Background - only show when not on flash screen and not on mobile */}
      {currentSection !== "flash" && !isMobile && (
        <div className="fixed inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            gl={{ antialias: true, alpha: true }}
          >
            <Background3D />
            <LeftAnimations />
          </Canvas>
        </div>
      )}

      {/* Mobile Background - simplified gradient */}
      {currentSection !== "flash" && isMobile && (
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />
      )}

      {/* Main Content */}
      <div className="relative z-10">
        {currentSection === "flash" && (
          <FlashScreen isLoading={isLoading} onComplete={handleFlashComplete} />
        )}

        {currentSection !== "flash" && (
          <div className="flex flex-col min-h-screen">
            <Navigation
              currentSection={currentSection}
              onSectionChange={handleSectionChange}
              isMobile={isMobile}
            />

            <main className="flex-1 w-full">
              {currentSection === "about" && (
                <AboutSection show3D={!isMobile} />
              )}
              {currentSection === "projects" && (
                <ProjectsSection show3D={!isMobile} />
              )}
              {currentSection === "contact" && (
                <ContactSection show3D={!isMobile} />
              )}
            </main>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
