import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Sphere, Box } from "@react-three/drei";
import { gsap } from "gsap";
import * as THREE from "three";

function Avatar() {
  const avatarRef = useRef<THREE.Group>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (avatarRef.current) {
      avatarRef.current.rotation.x = THREE.MathUtils.lerp(
        avatarRef.current.rotation.x,
        mousePosition.current.y * 0.1,
        0.05
      );
      avatarRef.current.rotation.y = THREE.MathUtils.lerp(
        avatarRef.current.rotation.y,
        mousePosition.current.x * 0.1,
        0.05
      );
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={avatarRef}>
        {/* Simple avatar representation */}
        <Sphere position={[0, 0.5, 0]} scale={0.8}>
          <meshStandardMaterial
            color="#00D9FF"
            metalness={0.3}
            roughness={0.4}
          />
        </Sphere>
        <Box position={[0, -0.5, 0]} scale={[1, 1.2, 0.6]}>
          <meshStandardMaterial
            color="#FF6B35"
            metalness={0.2}
            roughness={0.6}
          />
        </Box>

        {/* Glowing effect */}
        <Sphere position={[0, 0, 0]} scale={1.2}>
          <meshStandardMaterial
            color="#00D9FF"
            emissive="#00D9FF"
            emissiveIntensity={0.1}
            transparent
            opacity={0.1}
          />
        </Sphere>
      </group>
    </Float>
  );
}

function SkillsVisualization() {
  const skills = [
    { name: "React", level: 0.9, color: "#61DAFB" },
    { name: "TypeScript", level: 0.85, color: "#3178C6" },
    { name: "JavaScript", level: 0.95, color: "#F7DF1E" },
    { name: "Node.js", level: 0.9, color: "#1572B6" },
    { name: "React Native", level: 0.8, color: "#61DAFB" },
    { name: "MongoDB", level: 0.8, color: "#47A248" },
  ];

  return (
    <group position={[3, 0, -1]}>
      {skills.map((skill, index) => (
        <Float key={skill.name} speed={1 + index * 0.2} rotationIntensity={0.1}>
          <group position={[0, index * 0.8 - 2, 0]}>
            <Box scale={[skill.level * 2, 0.1, 0.1]}>
              <meshStandardMaterial
                color={skill.color}
                emissive={skill.color}
                emissiveIntensity={0.2}
              />
            </Box>
            <Text
              fontSize={0.2}
              color="#FFFFFF"
              anchorX="left"
              anchorY="middle"
              position={[-1, 0.3, 0]}
            >
              {skill.name}
            </Text>
          </group>
        </Float>
      ))}
    </group>
  );
}

interface AboutSectionProps {
  show3D: boolean;
}

const AboutSection: React.FC<AboutSectionProps> = ({ show3D }) => {
  const containerRef = useRef<HTMLDivElement>(null);

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
      className="w-full min-h-screen pt-20 md:pt-32 px-4 md:px-8 overflow-y-auto"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        {/* 3D Avatar Section - Only show on larger screens */}
        {show3D && (
          <div className="hidden lg:flex items-center justify-center">
            <div className="w-full h-96">
              <Canvas camera={{ position: [0, 0, 4], fov: 75 }}>
                <ambientLight intensity={0.4} />
                <pointLight
                  position={[5, 5, 5]}
                  intensity={0.8}
                  color="#00D9FF"
                />
                <pointLight
                  position={[-5, -5, -5]}
                  intensity={0.4}
                  color="#FF6B35"
                />

                <Avatar />
                <SkillsVisualization />
              </Canvas>
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="flex flex-col justify-center space-y-6 text-white md:h-auto md:overflow-visible h-[80vh] overflow-y-auto pr-2 pb-4 scrollbar-thin">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Kri$hna Khanal
            </span>
          </h1>

          <h2 className="text-xl md:text-2xl lg:text-3xl text-orange-400 font-semibold">
            Frontend Engineer
          </h2>

          <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-300">
            Passionate about creating immersive digital experiences through
            cutting-edge web technologies. Specializing in React, Next.js, React
            Native, TypeScript, Javascript, Node.js, and MongoDB to build
            interactive and performant applications.
          </p>

          <div className="space-y-4">
            <h3 className="text-lg md:text-xl font-semibold text-cyan-400">
              Experience
            </h3>
            <div className="space-y-3">
              <div className="bg-gray-800 rounded-lg p-3 md:p-4 border-l-4 border-cyan-400">
                <h4 className="font-semibold text-white">
                  Senior Frontend Developer
                </h4>
                <p className="text-orange-400">
                  Aerawat Corp. • 2024 - Present
                </p>
                <p className="text-gray-300 text-sm mt-2">
                  Frontend development for enterprise applications using React,
                  Next.js, TypeScript, and modern web technologies.
                </p>
              </div>

              <div className="bg-gray-800 rounded-lg p-3 md:p-4 border-l-4 border-orange-400">
                <h4 className="font-semibold text-white">Frontend Developer</h4>
                <p className="text-cyan-400">
                  Dogma International • 2022 - 2024
                </p>
                <p className="text-gray-300 text-sm mt-2">
                  Developed responsive web applications and collaborated with
                  design teams to create pixel-perfect UIs. Also worked on
                  mobile applications using React Native.
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg p-3 md:p-4 border-l-4 border-orange-400">
                <h4 className="font-semibold text-white">
                  MERN Stack Developer
                </h4>
                <p className="text-cyan-400">
                  ABS Soft Nepal Pvt.Ltd. • 2021 - 2022
                </p>
                <p className="text-gray-300 text-sm mt-2">
                  Developed responsive web applications and collaborated with
                  design teams to create pixel-perfect UIs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
