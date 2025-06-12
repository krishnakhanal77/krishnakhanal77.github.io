import React, { useRef, useMemo, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Background3D: React.FC = () => {
  const particlesRef = useRef<THREE.Group>(null);
  const starsRef = useRef<THREE.Points>(null);
  const mouseStarsRef = useRef<THREE.Points>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  // Mouse tracking
  const handleMouseMove = useCallback((event: MouseEvent) => {
    mousePosition.current = {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1
    };
  }, []);

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Generate twinkling stars
  const starsGeometry = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    const colors = new Float32Array(2000 * 3);
    const sizes = new Float32Array(2000);

    for (let i = 0; i < 2000; i++) {
      // Random positions in a large sphere
      const radius = 100 + Math.random() * 200;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Random colors (white, cyan, orange variations)
      const colorChoice = Math.random();
      if (colorChoice < 0.6) {
        // White stars
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 1;
      } else if (colorChoice < 0.8) {
        // Cyan stars
        colors[i * 3] = 0;
        colors[i * 3 + 1] = 0.85;
        colors[i * 3 + 2] = 1;
      } else {
        // Orange stars
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 0.42;
        colors[i * 3 + 2] = 0.21;
      }

      sizes[i] = Math.random() * 3 + 1;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    return geometry;
  }, []);

  // Generate mouse-following stars
  const mouseStarsGeometry = useMemo(() => {
    const positions = new Float32Array(100 * 3);
    const colors = new Float32Array(100 * 3);
    const sizes = new Float32Array(100);

    for (let i = 0; i < 100; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      // Cyan color for mouse stars
      colors[i * 3] = 0;
      colors[i * 3 + 1] = 0.85;
      colors[i * 3 + 2] = 1;

      sizes[i] = Math.random() * 2 + 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    return geometry;
  }, []);

  // Floating particles for depth
  const particles = useMemo(() => 
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80
      ] as [number, number, number],
      scale: 0.02 + Math.random() * 0.04,
      color: Math.random() > 0.7 ? "#00D9FF" : Math.random() > 0.5 ? "#FF6B35" : "#4A5568",
      speed: 0.5 + Math.random() * 1.5
    })), []
  );

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Rotate main particle group
    if (particlesRef.current) {
      particlesRef.current.rotation.x = time * 0.02;
      particlesRef.current.rotation.y = time * 0.01;
    }

    // Animate twinkling stars
    if (starsRef.current) {
      const positions = starsRef.current.geometry.attributes.position.array as Float32Array;
      const sizes = starsRef.current.geometry.attributes.size.array as Float32Array;

      for (let i = 0; i < positions.length / 3; i++) {
        // Gentle rotation
        const angle = time * 0.001 + i * 0.01;
        const radius = Math.sqrt(positions[i * 3] ** 2 + positions[i * 3 + 2] ** 2);
        positions[i * 3] = radius * Math.cos(angle);
        positions[i * 3 + 2] = radius * Math.sin(angle);

        // Twinkling effect
        sizes[i] = (Math.sin(time * 2 + i * 0.5) + 1) * 2 + 0.5;
      }

      starsRef.current.geometry.attributes.position.needsUpdate = true;
      starsRef.current.geometry.attributes.size.needsUpdate = true;
    }

    // Mouse-following stars
    if (mouseStarsRef.current) {
      const positions = mouseStarsRef.current.geometry.attributes.position.array as Float32Array;
      const targetX = mousePosition.current.x * viewport.width * 0.5;
      const targetY = mousePosition.current.y * viewport.height * 0.5;

      for (let i = 0; i < positions.length / 3; i++) {
        // Move towards mouse position with some randomness
        const offsetX = (Math.sin(time + i) * 2);
        const offsetY = (Math.cos(time + i * 1.5) * 2);
        
        positions[i * 3] = THREE.MathUtils.lerp(
          positions[i * 3], 
          targetX + offsetX, 
          0.02
        );
        positions[i * 3 + 1] = THREE.MathUtils.lerp(
          positions[i * 3 + 1], 
          targetY + offsetY, 
          0.02
        );
        
        // Gentle Z movement
        positions[i * 3 + 2] = Math.sin(time + i * 0.5) * 5;
      }

      mouseStarsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.1} />
      <pointLight position={[20, 20, 20]} intensity={0.3} color="#00D9FF" />
      <pointLight position={[-20, -20, -20]} intensity={0.2} color="#FF6B35" />

      {/* Twinkling stars background */}
      <Points ref={starsRef} geometry={starsGeometry}>
        <PointMaterial
          transparent
          vertexColors
          size={2}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Mouse-following stars */}
      <Points ref={mouseStarsRef} geometry={mouseStarsGeometry}>
        <PointMaterial
          transparent
          vertexColors
          size={3}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Floating particles for depth */}
      <group ref={particlesRef}>
        {particles.map((particle) => (
          <Float 
            key={particle.id} 
            speed={particle.speed} 
            rotationIntensity={0.1}
            floatIntensity={0.3}
          >
            <Sphere position={particle.position} scale={particle.scale}>
              <meshStandardMaterial
                color={particle.color}
                emissive={particle.color}
                emissiveIntensity={0.2}
                transparent
                opacity={0.4}
              />
            </Sphere>
          </Float>
        ))}
      </group>

      {/* Additional atmospheric effects */}
      <group>
        {/* Large ambient spheres */}
        <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.1}>
          <Sphere position={[30, 20, -40]} scale={8}>
            <meshStandardMaterial
              color="#00D9FF"
              transparent
              opacity={0.03}
              emissive="#00D9FF"
              emissiveIntensity={0.05}
            />
          </Sphere>
        </Float>
        
        <Float speed={0.3} rotationIntensity={0.05} floatIntensity={0.1}>
          <Sphere position={[-25, -15, -35]} scale={6}>
            <meshStandardMaterial
              color="#FF6B35"
              transparent
              opacity={0.04}
              emissive="#FF6B35"
              emissiveIntensity={0.06}
            />
          </Sphere>
        </Float>
      </group>
    </>
  );
};

export default Background3D;