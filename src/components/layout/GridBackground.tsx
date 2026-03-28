import { useRef, useEffect, useCallback } from 'react';

const GridBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const perspRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const flatDotsRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Move the glow spotlight
    if (glowRef.current) {
      glowRef.current.style.left = `${x}px`;
      glowRef.current.style.top = `${y}px`;
      glowRef.current.style.opacity = '1';
    }

    // Calculate offset from center (normalized -1 to 1)
    const cx = (x / rect.width - 0.5) * 2;
    const cy = (y / rect.height - 0.5) * 2;

    // Shift the perspective grid slightly (small radius ~15px)
    const shiftX = cx * 15;
    const shiftY = cy * 10;

    if (perspRef.current) {
      perspRef.current.style.transform =
        `perspective(500px) rotateX(60deg) translate(${shiftX}px, ${shiftY}px)`;
    }
    if (dotsRef.current) {
      dotsRef.current.style.transform =
        `perspective(500px) rotateX(60deg) translate(${shiftX}px, ${shiftY}px)`;
    }

    // Shift flat dots very subtly
    if (flatDotsRef.current) {
      flatDotsRef.current.style.transform = `translate(${cx * 6}px, ${cy * 6}px)`;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '0';
    // Reset grid position smoothly
    if (perspRef.current) {
      perspRef.current.style.transform = 'perspective(500px) rotateX(60deg)';
    }
    if (dotsRef.current) {
      dotsRef.current.style.transform = 'perspective(500px) rotateX(60deg)';
    }
    if (flatDotsRef.current) {
      flatDotsRef.current.style.transform = 'translate(0, 0)';
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <div ref={containerRef} className="grid-background">
      {/* Flat dot grid */}
      <div
        ref={flatDotsRef}
        className="grid-flat-dots"
        style={{ transition: 'transform 0.15s ease-out' }}
      />
      {/* Perspective grid lines */}
      <div
        ref={perspRef}
        className="grid-perspective"
        style={{ transition: 'transform 0.15s ease-out' }}
      />
      {/* Glowing dots at intersections */}
      <div
        ref={dotsRef}
        className="grid-dots"
        style={{ transition: 'transform 0.15s ease-out' }}
      />
      {/* Horizon glow line */}
      <div className="grid-horizon-glow" />

      {/* Mouse-following glow spotlight */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute z-[1] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
        style={{
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,200,255,0.12) 0%, rgba(0,150,255,0.05) 40%, transparent 70%)',
          opacity: 0,
        }}
      />
    </div>
  );
};

export default GridBackground;
