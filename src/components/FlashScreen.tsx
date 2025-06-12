import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, Sphere } from "@react-three/drei";
import { gsap } from "gsap";
import * as THREE from "three";

interface FlashScreenProps {
  isLoading: boolean;
  onComplete: () => void;
}

function AnimatedText() {
  const textRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      particlesRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <>
      <group ref={textRef}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Text
            fontSize={1.5}
            color="#00D9FF"
            anchorX="center"
            anchorY="middle"
            position={[0, 0.5, 0]}
          >
            Kri$hna Khanal
          </Text>
          <Text
            fontSize={0.5}
            color="#FF6B35"
            anchorX="center"
            anchorY="middle"
            position={[0, -0.5, 0]}
          >
            Frontend Engineer
          </Text>
        </Float>
      </group>

      <group ref={particlesRef}>
        {Array.from({ length: 50 }).map((_, i) => (
          <Float key={i} speed={1 + Math.random()} rotationIntensity={0.5}>
            <Sphere
              position={[
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
              ]}
              scale={0.02 + Math.random() * 0.03}
            >
              <meshStandardMaterial
                color={Math.random() > 0.5 ? "#00D9FF" : "#FF6B35"}
                emissive={Math.random() > 0.5 ? "#00D9FF" : "#FF6B35"}
                emissiveIntensity={0.2}
              />
            </Sphere>
          </Float>
        ))}
      </group>
    </>
  );
}

function LoadingIndicator() {
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 2;
    }
  });

  return (
    <group ref={ringRef} position={[0, -3, 0]}>
      <mesh>
        <torusGeometry args={[0.5, 0.05, 8, 16]} />
        <meshStandardMaterial
          color="#00D9FF"
          emissive="#00D9FF"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

const FlashScreen: React.FC<FlashScreenProps> = ({ isLoading, onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-transition after loading is complete
    if (!isLoading) {
      const timer = setTimeout(() => {
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 1,
            onComplete: onComplete,
          });
        }
      }, 1500); // Reduced from 2000ms to 1500ms
      return () => clearTimeout(timer);
    }
  }, [isLoading, onComplete]);

  // Add click to skip functionality
  const handleSkip = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: onComplete,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-screen flex items-center justify-center bg-gray-900 cursor-pointer"
      onClick={handleSkip}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00D9FF" />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.5}
          color="#FF6B35"
        />

        <AnimatedText />
        {isLoading && <LoadingIndicator />}
      </Canvas>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center">
        {isLoading ? (
          <div className="text-white text-lg">Loading Experience...</div>
        ) : (
          <div className="text-gray-400 text-sm">
            Click anywhere to continue
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashScreen;
