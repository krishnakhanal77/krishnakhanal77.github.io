import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere, Box, Torus, Octahedron } from "@react-three/drei";
import * as THREE from "three";

const LeftAnimations: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const spiralRef = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Group>(null);

  // Generate spiral animation elements
  const spiralElements = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        angle: (i / 20) * Math.PI * 4,
        radius: 2 + i * 0.3,
        height: i * 0.5 - 5,
        color: i % 3 === 0 ? "#00D9FF" : i % 3 === 1 ? "#FF6B35" : "#10B981",
        scale: 0.1 + (i % 5) * 0.02,
      })),
    []
  );

  // Generate orbiting elements
  const orbitElements = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        radius: 3 + i * 0.8,
        speed: 0.5 + i * 0.1,
        color: ["#00D9FF", "#FF6B35", "#10B981", "#8B5CF6"][i % 4],
        scale: 0.15 + Math.random() * 0.1,
        offset: (i / 8) * Math.PI * 2,
      })),
    []
  );

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Main group gentle movement
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.5;
      groupRef.current.rotation.y = time * 0.1;
    }

    // Spiral animation
    if (spiralRef.current) {
      spiralRef.current.rotation.y = time * 0.3;
      spiralRef.current.children.forEach((child, i) => {
        const element = spiralElements[i];
        const animatedRadius = element.radius + Math.sin(time + i) * 0.2;
        child.position.x =
          Math.cos(element.angle + time * 0.2) * animatedRadius;
        child.position.z =
          Math.sin(element.angle + time * 0.2) * animatedRadius;
        child.position.y = element.height + Math.sin(time * 2 + i) * 0.3;
      });
    }

    // Orbital animation
    if (orbitRef.current) {
      orbitRef.current.children.forEach((child, i) => {
        const element = orbitElements[i];
        const angle = time * element.speed + element.offset;
        child.position.x = Math.cos(angle) * element.radius;
        child.position.z = Math.sin(angle) * element.radius;
        child.position.y = Math.sin(time + i) * 1.5;
        child.rotation.x = time + i;
        child.rotation.y = time * 0.5 + i;
      });
    }
  });

  return (
    <group ref={groupRef} position={[-8, 0, -5]}>
      {/* Spiral Animation */}
      <group ref={spiralRef}>
        {spiralElements.map((element, i) => (
          <Float key={element.id} speed={1 + i * 0.1} rotationIntensity={0.2}>
            {i % 4 === 0 ? (
              <Sphere scale={element.scale}>
                <meshStandardMaterial
                  color={element.color}
                  emissive={element.color}
                  emissiveIntensity={0.3}
                  transparent
                  opacity={0.8}
                />
              </Sphere>
            ) : i % 4 === 1 ? (
              <Box scale={element.scale}>
                <meshStandardMaterial
                  color={element.color}
                  emissive={element.color}
                  emissiveIntensity={0.2}
                  transparent
                  opacity={0.7}
                />
              </Box>
            ) : i % 4 === 2 ? (
              <Octahedron scale={element.scale}>
                <meshStandardMaterial
                  color={element.color}
                  emissive={element.color}
                  emissiveIntensity={0.25}
                  transparent
                  opacity={0.75}
                />
              </Octahedron>
            ) : (
              <Torus
                args={[element.scale * 2, element.scale * 0.5, 8, 16]}
                scale={0.5}
              >
                <meshStandardMaterial
                  color={element.color}
                  emissive={element.color}
                  emissiveIntensity={0.4}
                  transparent
                  opacity={0.6}
                />
              </Torus>
            )}
          </Float>
        ))}
      </group>

      {/* Orbital Animation */}
      <group ref={orbitRef} position={[0, 2, 0]}>
        {orbitElements.map((element) => (
          <Float key={element.id} speed={2} rotationIntensity={0.3}>
            <Sphere scale={element.scale}>
              <meshStandardMaterial
                color={element.color}
                emissive={element.color}
                emissiveIntensity={0.4}
                metalness={0.3}
                roughness={0.4}
              />
            </Sphere>
          </Float>
        ))}
      </group>

      {/* Pulsing Central Core */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
        <group>
          <Sphere scale={0.3}>
            <meshStandardMaterial
              color="#FFFFFF"
              emissive="#00D9FF"
              emissiveIntensity={0.5}
              transparent
              opacity={0.9}
            />
          </Sphere>

          {/* Outer glow rings */}
          {[1, 1.5, 2].map((scale, i) => (
            <Torus key={i} args={[scale * 0.4, 0.02, 8, 32]} scale={scale}>
              <meshStandardMaterial
                color="#00D9FF"
                emissive="#00D9FF"
                emissiveIntensity={0.6 - i * 0.2}
                transparent
                opacity={0.3 - i * 0.1}
              />
            </Torus>
          ))}
        </group>
      </Float>

      {/* Floating Energy Particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Float
          key={`particle-${i}`}
          speed={1 + Math.random()}
          rotationIntensity={0.1}
        >
          <Sphere
            position={[
              (Math.random() - 0.5) * 12,
              (Math.random() - 0.5) * 8,
              (Math.random() - 0.5) * 6,
            ]}
            scale={0.03 + Math.random() * 0.02}
          >
            <meshStandardMaterial
              color={Math.random() > 0.5 ? "#00D9FF" : "#FF6B35"}
              emissive={Math.random() > 0.5 ? "#00D9FF" : "#FF6B35"}
              emissiveIntensity={0.8}
              transparent
              opacity={0.7}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
};

export default LeftAnimations;
