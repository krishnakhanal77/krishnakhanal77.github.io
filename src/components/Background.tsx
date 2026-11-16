import React, { useEffect, useRef } from "react";

/**
 * Lightweight animated background: a faint dot grid, two slowly drifting
 * gradient glows, and (on pointer devices) a soft spotlight that follows the
 * cursor. Pure CSS + one rAF-throttled listener — no WebGL.
 */
const Background: React.FC = () => {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spotRef.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--x", `${e.clientX}px`);
        el.style.setProperty("--y", `${e.clientY}px`);
        el.style.opacity = "1";
      });
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-gray-950">
      <div className="bg-grid absolute inset-0" />
      <div className="bg-blob bg-blob--cyan" />
      <div className="bg-blob bg-blob--orange" />
      <div ref={spotRef} className="bg-spotlight" />
    </div>
  );
};

export default Background;
