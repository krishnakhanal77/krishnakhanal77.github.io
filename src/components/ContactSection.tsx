import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Sphere, Box } from "@react-three/drei";
import { gsap } from "gsap";
import * as THREE from "three";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";

function ContactForm3D() {
  const formRef = useRef<THREE.Group>(null);
  const [activeField, setActiveField] = useState<string | null>(null);

  useFrame((state) => {
    if (formRef.current) {
      formRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  const FormField = ({
    position,
    name,
    color,
  }: {
    position: [number, number, number];
    name: string;
    color: string;
  }) => (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
      <group
        position={position}
        onPointerEnter={() => setActiveField(name)}
        onPointerLeave={() => setActiveField(null)}
      >
        <Box scale={[2, 0.3, 0.1]}>
          <meshStandardMaterial
            color={activeField === name ? color : "#4A5568"}
            emissive={activeField === name ? color : "#000000"}
            emissiveIntensity={activeField === name ? 0.2 : 0}
            transparent
            opacity={0.8}
          />
        </Box>
        <Text
          font="/fonts/inter-regular.woff"
          fontSize={0.15}
          color="#FFFFFF"
          anchorX="left"
          anchorY="middle"
          position={[-0.8, 0, 0.1]}
        >
          {name}
        </Text>
      </group>
    </Float>
  );

  return (
    <group ref={formRef}>
      <FormField position={[0, 1, 0]} name="Name" color="#00D9FF" />
      <FormField position={[0, 0.3, 0]} name="Email" color="#FF6B35" />
      <FormField position={[0, -0.4, 0]} name="Subject" color="#10B981" />
      <FormField position={[0, -1.1, 0]} name="Message" color="#8B5CF6" />

      {/* Submit Button */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <group position={[0, -2, 0]}>
          <Box scale={[1.5, 0.4, 0.2]}>
            <meshStandardMaterial
              color="#00D9FF"
              emissive="#00D9FF"
              emissiveIntensity={0.3}
            />
          </Box>
          <Text
            font="/fonts/inter-bold.woff"
            fontSize={0.2}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
            position={[0, 0, 0.15]}
          >
            Send Message
          </Text>
        </group>
      </Float>
    </group>
  );
}

function SocialLinks3D() {
  const socialRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (socialRef.current) {
      socialRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  const SocialSphere = ({
    position,
    color,
    name,
  }: {
    position: [number, number, number];
    color: string;
    name: string;
  }) => (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
      <group position={position}>
        <Sphere scale={0.3}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.4}
            metalness={0.3}
            roughness={0.4}
          />
        </Sphere>
        <Text
          font="/fonts/inter-regular.woff"
          fontSize={0.1}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          position={[0, -0.6, 0]}
        >
          {name}
        </Text>
      </group>
    </Float>
  );

  return (
    <group ref={socialRef} position={[4, 0, 0]}>
      <SocialSphere position={[0, 1.5, 0]} color="#00D9FF" name="LinkedIn" />
      <SocialSphere position={[0, 0.5, 0]} color="#333333" name="GitHub" />
      <SocialSphere position={[0, -0.5, 0]} color="#1DA1F2" name="Twitter" />
      <SocialSphere position={[0, -1.5, 0]} color="#FF6B35" name="Email" />
    </group>
  );
}

interface ContactSectionProps {
  show3D: boolean;
}

const ContactSection: React.FC<ContactSectionProps> = ({ show3D }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen pt-20 md:pt-32 px-4 md:px-8 overflow-y-auto"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
            Get In Touch
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Let's create something amazing together
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 3D Contact Visualization - Only show on larger screens */}
          {show3D && (
            <div className="hidden lg:block lg:sticky lg:top-24 h-[500px]">
              <div className="w-full h-full">
                <Canvas camera={{ position: [0, 0, 6], fov: 75 }}>
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

                  <ContactForm3D />
                  <SocialLinks3D />
                </Canvas>
              </div>
            </div>
          )}

          {/* Contact Form */}
          <div className="flex flex-col space-y-6 pb-12">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>

              {/* Contact Information */}
              <div className="space-y-4 pt-8 border-t border-gray-700 mt-8">
                <h3 className="text-xl font-semibold text-white">
                  Contact Information
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    <span>krishna.khanal@email.com</span>
                  </div>

                  <div className="flex items-center space-x-3 text-gray-300">
                    <Phone className="w-5 h-5 text-orange-400" />
                    <span>+1 (555) 123-4567</span>
                  </div>

                  <div className="flex items-center space-x-3 text-gray-300">
                    <MapPin className="w-5 h-5 text-green-400" />
                    <span>San Francisco, CA</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4 pt-4">
                  <a
                    href="#"
                    className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Github className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="#"
                    className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Linkedin className="w-5 h-5 text-cyan-400" />
                  </a>
                  <a
                    href="#"
                    className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Twitter className="w-5 h-5 text-blue-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
