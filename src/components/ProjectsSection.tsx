import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Box, Sphere } from "@react-three/drei";
import { gsap } from "gsap";
import * as THREE from "three";
import { ExternalLink, Github } from "lucide-react";

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
    id: 1,
    title: "E-Commerce Platform",
    description:
      "Modern e-commerce solution with React, Node.js, and Stripe integration",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    color: "#00D9FF",
    demo: "https://demo.example.com",
    github: "https://github.com/krishnakhanal",
  },
  {
    id: 2,
    title: "3D Portfolio Website",
    description:
      "Interactive portfolio showcasing Three.js capabilities and modern web design",
    tech: ["Three.js", "React", "GSAP", "WebGL"],
    color: "#FF6B35",
    demo: "https://portfolio.example.com",
    github: "https://github.com/krishnakhanal",
  },
  {
    id: 3,
    title: "Task Management App",
    description:
      "Collaborative task management with real-time updates and team features",
    tech: ["React", "Firebase", "TypeScript", "Tailwind"],
    color: "#10B981",
    demo: "https://tasks.example.com",
    github: "https://github.com/krishnakhanal",
  },
  {
    id: 4,
    title: "Task Management App",
    description:
      "Collaborative task management with real-time updates and team features",
    tech: ["React", "Firebase", "TypeScript", "Tailwind"],
    color: "#10B981",
    demo: "https://tasks.example.com",
    github: "https://github.com/krishnakhanal",
  },
  {
    id: 5,
    title: "Task Management App",
    description:
      "Collaborative task management with real-time updates and team features",
    tech: ["React", "Firebase", "TypeScript", "Tailwind"],
    color: "#10B981",
    demo: "https://tasks.example.com",
    github: "https://github.com/krishnakhanal",
  },
  {
    id: 6,
    title: "Task Management App",
    description:
      "Collaborative task management with real-time updates and team features",
    tech: ["React", "Firebase", "TypeScript", "Tailwind"],
    color: "#10B981",
    demo: "https://tasks.example.com",
    github: "https://github.com/krishnakhanal",
  },
  {
    id: 7,
    title: "Task Management App",
    description:
      "Collaborative task management with real-time updates and team features",
    tech: ["React", "Firebase", "TypeScript", "Tailwind"],
    color: "#10B981",
    demo: "https://tasks.example.com",
    github: "https://github.com/krishnakhanal",
  },
  {
    id: 8,
    title: "Task Management App",
    description:
      "Collaborative task management with real-time updates and team features",
    tech: ["React", "Firebase", "TypeScript", "Tailwind"],
    color: "#10B981",
    demo: "https://tasks.example.com",
    github: "https://github.com/krishnakhanal",
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

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen pt-20 md:pt-32 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto h-full">
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
            <div className="hidden lg:block lg:sticky lg:top-24 h-[800px]">
              <div className="w-full h-full">
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
                  {/* Temporarily commenting out 3D visualization until component is ready */}
                  {/* <ProjectsVisualization
                    projects={projects}
                    onHover={setHoveredProject}
                  /> */}
                </Canvas>
              </div>
            </div>
          )}

          {/* Projects List */}
          <div className="flex flex-col space-y-6 pb-12">
            <div
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-xl"
              onMouseLeave={() => setHoveredProject(null)}
            >
              {hoveredProject ? (
                <div className="space-y-4">
                  <h3
                    className="text-xl md:text-2xl font-bold text-white mb-3"
                    style={{ color: hoveredProject.color }}
                  >
                    {hoveredProject.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {hoveredProject.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {hoveredProject.tech.map((tech) => (
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
                      href={hoveredProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors text-sm md:text-base"
                    >
                      <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                      Live Demo
                    </a>
                    <a
                      href={hoveredProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm md:text-base"
                    >
                      <Github className="w-4 h-4 md:w-5 md:h-5" />
                      View Code
                    </a>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-gray-300">
                    Click or hover over a project to see more details
                  </p>
                </div>
              )}

              {/* All Projects List */}
              <div className="space-y-4 mt-8 pt-8 border-t border-gray-700">
                <h3 className="text-lg md:text-xl font-semibold text-white sticky top-0 bg-gray-900 pb-4">
                  All Projects
                </h3>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className={`bg-gray-800 rounded-lg p-3 md:p-4 border transition-colors cursor-pointer ${
                        hoveredProject?.id === project.id
                          ? "border-cyan-400"
                          : "border-gray-700 hover:border-cyan-400"
                      }`}
                      onMouseEnter={() => setHoveredProject(project)}
                      onClick={() => setHoveredProject(project)}
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
    </div>
  );
};

export default ProjectsSection;
