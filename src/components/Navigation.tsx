import React, { useState } from "react";
import { User2, FolderKanban, Mail } from "lucide-react";

type Section = "about" | "projects" | "contact";

interface NavigationProps {
  currentSection: Section;
  onSectionChange: (section: Section) => void;
  isMobile: boolean;
}

interface BubbleProps {
  style: React.CSSProperties;
}

const BUBBLE_COLORS = [
  "rgba(34, 211, 238, 0.4)", // cyan
  "rgba(167, 139, 250, 0.4)", // violet
  "rgba(248, 113, 113, 0.4)", // red
  "rgba(74, 222, 128, 0.4)", // green
  "rgba(251, 191, 36, 0.4)", // amber
  "rgba(232, 121, 249, 0.4)", // fuchsia
];

const Bubble: React.FC<BubbleProps> = ({ style }) => (
  <div
    className="absolute rounded-full pointer-events-none"
    style={{
      ...style,
      animation: "bubbleAnimation 1s ease-out forwards",
    }}
  />
);

interface NavItemBubblesState {
  [key: string]: Array<{ id: number; style: React.CSSProperties }>;
}

const Navigation: React.FC<NavigationProps> = ({
  currentSection,
  onSectionChange,
  isMobile,
}) => {
  const [itemBubbles, setItemBubbles] = useState<NavItemBubblesState>({});

  const navItems = [
    {
      key: "about" as Section,
      icon: <User2 className="w-6 h-6 md:w-8 md:h-8" />,
      label: "About",
    },
    {
      key: "projects" as Section,
      icon: <FolderKanban className="w-6 h-6 md:w-8 md:h-8" />,
      label: "Projects",
    },
    {
      key: "contact" as Section,
      icon: <Mail className="w-6 h-6 md:w-8 md:h-8" />,
      label: "Contact",
    },
  ];

  const createBubbles = (
    e: React.MouseEvent<HTMLButtonElement>,
    itemKey: string
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const bubbleCount = 24; // Increased from 12 to 24
    const newBubbles = Array.from({ length: bubbleCount }).map((_, i) => {
      const angle = (i / bubbleCount) * Math.PI * 2;
      const velocity = 2 + Math.random() * 3; // Increased velocity range
      const size = Math.random() * 35 + 20; // Varied size range
      const colorIndex = Math.floor(Math.random() * BUBBLE_COLORS.length);
      const delay = Math.random() * 0.2; // Add slight random delay to each bubble

      return {
        id: Date.now() + i,
        style: {
          left: clickX + "px",
          top: clickY + "px",
          width: size + "px",
          height: size + "px",
          backgroundColor: BUBBLE_COLORS[colorIndex],
          transform: `translate(-50%, -50%) rotate(${angle}rad)`,
          "--angle": angle + "rad",
          "--velocity": velocity,
          "--delay": delay + "s",
          animationDelay: delay + "s",
        } as React.CSSProperties,
      };
    });

    setItemBubbles((prev) => ({
      ...prev,
      [itemKey]: [...(prev[itemKey] || []), ...newBubbles],
    }));

    setTimeout(() => {
      setItemBubbles((prev) => ({
        ...prev,
        [itemKey]: (prev[itemKey] || []).filter(
          (b) => !newBubbles.find((nb) => nb.id === b.id)
        ),
      }));
    }, 1200); // Increased to account for delays
  };

  return (
    <>
      <style>
        {`
          @keyframes bubbleAnimation {
            0% {
              transform: translate(-50%, -50%) rotate(var(--angle)) scale(0.4);
              opacity: 1;
            }
            50% {
              opacity: 0.8;
            }
            100% {
              transform: 
                translate(
                  calc(-50% + cos(var(--angle)) * var(--velocity) * 150px),
                  calc(-50% + sin(var(--angle)) * var(--velocity) * 150px)
                )
                rotate(var(--angle))
                scale(0);
              opacity: 0;
            }
          }
        `}
      </style>
      <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16 md:h-20">
            <div className="flex space-x-8 md:space-x-16">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={(e) => {
                    createBubbles(e, item.key);
                    onSectionChange(item.key);
                  }}
                  title={item.label}
                  className={`
                    relative p-2 md:p-3 rounded-full transition-all duration-300 ease-out
                    hover:scale-110 hover:-translate-y-1 overflow-visible
                    group
                    ${
                      currentSection === item.key
                        ? "text-cyan-400 bg-white/5 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                        : "text-white hover:text-cyan-200 hover:bg-white/5"
                    }
                  `}
                >
                  {item.icon}
                  <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap hidden md:block">
                    {item.label}
                  </span>
                  {itemBubbles[item.key]?.map((bubble) => (
                    <Bubble key={bubble.id} style={bubble.style} />
                  ))}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
