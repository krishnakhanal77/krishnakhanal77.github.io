import { Box, Float, Sphere, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { ExternalLink, Github } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  color: string;
  demo?: string;
  github?: string;
}

const projects: Project[] = [
  {
    id: 2,
    title: "RxPIN",
    description:
      "Built and maintained RxPIN, a SaaS-based therapy management system designed to streamline record-keeping and overall operations for therapists and clients, primarily focused on autism care.",
    tech: ["Next Js", "React", "Tailwind", "TypeScript", "Tanstack Query"],
    color: "#FF6B35",
    demo: "https://aerawat.com",
    github: "#",
  },
  {
    id: 3,
    title: "Baywater Mobile - Field-Service App",
    description:
      "Developed the Baywater Healthcare mobile app with real-time support, offline capability, push notifications, and Google Maps integration for enhanced healthcare delivery ",
    tech: ["React Native", "Tailwind", "SQLite", "TypeORM", "TypeScript"],
    color: "#10B981",
    demo: "https://baywater.co.uk/",
    github: "#",
  },
  {
    id: 4,
    title: "Hawkins (Inventory Management System)",
    description:
      "A web application for inventory management built with React, enabling efficient tracking and management of stock levels with a user-friendly interface.",
    tech: ["React", "React Query", "Tailwind"],
    color: "#10B981",
    demo: "#",
    github: "#",
  },
  {
    id: 5,
    title: "PM Tool (Project Management Tool)",
    description:
      "A project management tool built with React, enabling efficient task management and resource allocation with a user-friendly interface.",
    tech: ["React", "React Query", "Tailwind"],
    color: "#10B981",
    demo: "#",
    github: "#",
  },
  {
    id: 6,
    title: "Warehouse Management System",
    description:
      "Mobile application for warehouse management built with React Native",
    tech: ["React Native", "Expo", "Tailwind", "TypeScript"],
    color: "#10B981",
    demo: "#",
    github: "#",
  },
  {
    id: 7,
    title: "Victim Support Scotland (VSS)",
    description:
      "A whole system for a charity organization that provides support to victims of domestic violence and abuse",
    tech: ["React", "React Query", "Tailwind"],
    color: "#10B981",
    demo: "https://victimsupport.scot/",
    github: "#",
  },
  {
    id: 8,
    title: "Nepal Press Khabar",
    description: "News portal website built with React, Node.js, and MongoDB",
    tech: ["React", "Node.js", "MongoDB"],
    color: "#10B981",
    demo: "https://nepalpresskhabar.com/",
    github: "#",
  },
];

interface ProjectCubeProps {
  project: Project;
  position: [number, number, number];
  onHover: (project: Project | null) => void;
}

function ProjectCube({ project, position, onHover }: ProjectCubeProps) {
  const cubeRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime + project.id) * 0.1;
      cubeRef.current.rotation.y = state.clock.elapsedTime * 0.2;

      const targetScale = hovered ? 1.2 : 1;
      cubeRef.current.scale.lerp(
        { x: targetScale, y: targetScale, z: targetScale } as THREE.Vector3,
        0.1
      );
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.2}>
      <group
        ref={cubeRef}
        position={position}
        onPointerEnter={() => {
          setHovered(true);
          onHover(project);
        }}
        onPointerLeave={() => {
          setHovered(false);
          onHover(null);
        }}
      >
        <Box scale={hovered ? 1.1 : 1}>
          <meshStandardMaterial
            color={project.color}
            emissive={project.color}
            emissiveIntensity={hovered ? 0.3 : 0.1}
            metalness={0.3}
            roughness={0.4}
          />
        </Box>

        {/* Floating particles around the cube */}
        {hovered && (
          <group>
            {Array.from({ length: 15 }).map((_, i) => (
              <Sphere
                key={i}
                position={[
                  (Math.random() - 0.5) * 3,
                  (Math.random() - 0.5) * 3,
                  (Math.random() - 0.5) * 3,
                ]}
                scale={0.03}
              >
                <meshStandardMaterial
                  color={project.color}
                  emissive={project.color}
                  emissiveIntensity={0.8}
                />
              </Sphere>
            ))}
          </group>
        )}

        <Text
          font="/fonts/inter-bold.woff"
          fontSize={0.2}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          position={[0, 0, 1.2]}
        >
          {project.title}
        </Text>
      </group>
    </Float>
  );
}

interface ProjectsSectionProps {
  show3D: boolean;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ show3D }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const lastProjectRef = useRef<Project | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }
  }, []);

  // Save the last hovered project
  useEffect(() => {
    if (hoveredProject) {
      lastProjectRef.current = hoveredProject;
    }
  }, [hoveredProject]);

  const handleMouseEnter = (project: Project, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setHoverPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
    setHoveredProject(project);
  };

  // Render hover card using portal
  const renderHoverCard = () => {
    // Use either the currently hovered project or the last one when hovering the card
    const displayProject =
      hoveredProject || (isHoveringCard ? lastProjectRef.current : null);

    if (!displayProject) return null;

    return ReactDOM.createPortal(
      <div
        className="fixed bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700 shadow-xl z-[9999] w-[300px] sm:w-[550px]"
        style={{
          left: `${hoverPosition.x}px`,
          top: `${hoverPosition.y}px`,
          transform: "translate(-50%, -100%)",
        }}
        onMouseEnter={() => setIsHoveringCard(true)}
        onMouseLeave={() => setIsHoveringCard(false)}
      >
        <div className="space-y-4">
          <h3
            className="text-xl md:text-2xl font-bold text-white mb-3"
            style={{ color: displayProject.color }}
          >
            {displayProject.title}
          </h3>
          <p className="text-gray-300 mb-4">{displayProject.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {displayProject.tech.map((tech) => (
              <span
                key={tech}
                className="px-2 md:px-3 py-1 bg-gray-700 text-white rounded-full text-xs md:text-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href={displayProject.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors text-sm md:text-base"
            >
              <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
              Live Demo
            </a>
            <a
              href={displayProject.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm md:text-base"
            >
              <Github className="w-4 h-4 md:w-5 md:h-5" />
              View Code
            </a>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen pt-20 md:pt-32 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
            Featured Projects
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Interactive showcase of my latest work
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 3D Projects Visualization - Only show on larger screens */}
          {show3D && (
            <div className="">
              {/* <div className="w-full h-full">
                <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
                  <ambientLight intensity={0.4} />
                  <pointLight
                    position={[10, 10, 10]}
                    intensity={0.8}
                    color="#00D9FF"
                  />
                  <pointLight
                    position={[-10, -10, -10]}
                    intensity={0.4}
                    color="#FF6B35"
                  />
                  Temporarily commenting out 3D visualization until component is ready
                  <ProjectsVisualization
                    projects={projects}
                    onHover={setHoveredProject}
                  />
                </Canvas>
              </div> */}
            </div>
          )}

          {/* Projects List */}
          <div className="">
            <div
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-xl overflow-visible"
              onMouseLeave={() => {
                if (!isHoveringCard) {
                  setHoveredProject(null);
                }
              }}
            >
              {/* All Projects List */}
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl font-semibold text-white top-0 bg-gray-900 pb-4">
                  All Projects
                </h3>
                <div
                  className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 relative overflow-visible"
                  style={{ clipPath: "inset(0 0 0 0)", paddingBottom: "100px" }}
                >
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className={`relative bg-gray-800 rounded-lg p-3 md:p-4 border transition-colors cursor-pointer group overflow-visible ${
                        hoveredProject?.id === project.id
                          ? "border-cyan-400"
                          : "border-gray-700 hover:border-cyan-400"
                      }`}
                      onMouseEnter={(e) => handleMouseEnter(project, e)}
                      onClick={(e) => handleMouseEnter(project, e)}
                    >
                      <h4 className="font-semibold text-white">
                        {project.title}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {project.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Render hover card using portal */}
      {renderHoverCard()}
    </div>
  );
};

export default ProjectsSection;
