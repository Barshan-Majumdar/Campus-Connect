import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  Rocket, Code, Music, Trophy, Calendar, Users,
  Sparkles, Zap, BookOpen, Palette, Gamepad2,
  Globe, Star, Mic,
} from 'lucide-react';

// Images
import concertImg from '../assets/landing/concert.png';
import partyImg from '../assets/landing/party.png';

/* ── Floating Icon Orb ── */
const FloatingIcon = ({
  icon: Icon,
  color,
  x,
  y,
  size = 28,
  delay = 0,
  floatClass = 'animate-float',
}: {
  icon: typeof Rocket;
  color: string;
  x: string;
  y: string;
  size?: number;
  delay?: number;
  floatClass?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, scale: 0.3, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, delay, ease: 'back.out(1.7)' }
    );
  }, []);

  return (
    <div
      ref={ref}
      className={`absolute z-10 flex items-center justify-center rounded-2xl opacity-0 transition-transform duration-500 hover:scale-125 ${floatClass}`}
      style={{
        left: x,
        top: y,
        width: size * 2.2,
        height: size * 2.2,
        background: `linear-gradient(135deg, ${color}20, ${color}08)`,
        border: `1px solid ${color}40`,
        backdropFilter: 'blur(6px)',
        boxShadow: `0 0 20px 4px ${color}25, inset 0 0 15px ${color}10`,
      }}
    >
      <Icon size={size} color={color} strokeWidth={1.5} />
    </div>
  );
};

/* ── Hovering Image with dark overlay + glow ── */
const GlowImage = ({
  src,
  alt,
  className = '',
  style,
  glowColor = 'rgba(0,180,255,0.3)',
  rotation = 0,
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  glowColor?: string;
  rotation?: number;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 40, scale: 0.88, rotate: rotation - 4 },
      { opacity: 1, y: 0, scale: 1, rotate: rotation, duration: 1, delay, ease: 'power3.out' }
    );
  }, [rotation, delay]);

  return (
    <div
      ref={ref}
      className={`group absolute z-10 rounded-xl overflow-hidden opacity-0 transition-all duration-500 hover:scale-[1.06] hover:-translate-y-1 hover:z-30 ${className}`}
      style={{
        ...style,
        transform: `rotate(${rotation}deg)`,
        border: `1.5px solid ${glowColor}`,
        boxShadow: `0 0 25px 3px ${glowColor}, 0 10px 40px rgba(0,0,0,0.6)`,
      }}
    >
      {/* Dark overlay — always present, lightens on hover */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/15 transition-all duration-500 z-10" />
      {/* Shimmer sweep on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20 pointer-events-none" />
      {/* Glow intensify on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 30px ${glowColor}`,
        }}
      />
      <img src={src} alt={alt} className="w-full h-full object-cover block" loading="lazy" />
    </div>
  );
};

/* ── Main Landing Page ── */
const HomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      line1Ref.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, delay: 0.15 }
    )
      .fromTo(
        line2Ref.current,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.9 },
        '-=0.5'
      )
      .fromTo(
        taglineRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '+=0.3'
      );
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative z-10 w-full h-screen overflow-hidden"
    >
      {/* ── HEADING — top-left ── */}
      <div className="absolute top-[13%] left-[3%] z-20 select-none">
        <h1
          ref={line1Ref}
          className="font-black leading-[1.05] tracking-tight opacity-0"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(2.2rem, 5.5vw, 6rem)',
            color: '#ffffff',
            textShadow: '0 0 30px rgba(255,255,255,0.08)',
          }}
        >
          Discover What's
        </h1>
        <h2
          ref={line2Ref}
          className="font-black leading-none tracking-tighter opacity-0"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(3rem, 8vw, 9rem)',
            color: '#7dd3fc',
            textShadow: '0 0 40px rgba(0,180,255,0.25), 0 0 80px rgba(0,150,255,0.1)',
            WebkitTextStroke: '1px rgba(56,189,248,0.3)',
          }}
        >
          COOKING!!!
        </h2>
      </div>

      {/* ══════════════════════════════════════
          DARK THEMED IMAGES — with glow + hover
          ══════════════════════════════════════ */}

      {/* Concert — top-right, tilted */}
      <GlowImage
        src={concertImg}
        alt="Live Concert"
        className="top-[6%] right-[3%]"
        style={{ width: 'clamp(160px, 22vw, 300px)', height: 'clamp(100px, 14vw, 200px)' }}
        glowColor="rgba(168,85,247,0.35)"
        rotation={7}
        delay={0.7}
      />

      {/* Party — below concert, tilted opposite */}
      <GlowImage
        src={partyImg}
        alt="Campus Party"
        className="top-[28%] right-[12%]"
        style={{ width: 'clamp(140px, 20vw, 270px)', height: 'clamp(90px, 13vw, 180px)' }}
        glowColor="rgba(236,72,153,0.3)"
        rotation={-4}
        delay={0.9}
      />


      {/* ══════════════════════════════════════
          FLOATING ICONS — scattered
          ══════════════════════════════════════ */}

      {/* Top area */}
      <FloatingIcon icon={Rocket}   color="#f97316" x="60%" y="10%" size={30} delay={0.6} floatClass="animate-float" />
      <FloatingIcon icon={Music}    color="#ec4899" x="68%" y="48%" size={22} delay={0.7} floatClass="animate-float" />
      <FloatingIcon icon={Code}     color="#3b82f6" x="90%" y="55%" size={26} delay={0.8} floatClass="animate-float-slow" />

      {/* Right side */}
      <FloatingIcon icon={Trophy}   color="#eab308" x="88%" y="30%" size={28} delay={1.0} floatClass="animate-float-slow" />
      <FloatingIcon icon={Globe}    color="#06b6d4" x="82%" y="72%" size={24} delay={1.1} floatClass="animate-float" />

      {/* Bottom */}
      <FloatingIcon icon={Calendar} color="#f59e0b" x="75%" y="82%" size={26} delay={1.2} floatClass="animate-float-slow" />
      <FloatingIcon icon={Gamepad2} color="#8b5cf6" x="55%" y="75%" size={22} delay={1.3} floatClass="animate-float" />
      <FloatingIcon icon={BookOpen} color="#10b981" x="15%" y="62%" size={24} delay={1.1} floatClass="animate-float-slow" />

      {/* Left side */}
      <FloatingIcon icon={Users}    color="#14b8a6" x="5%"  y="72%" size={28} delay={1.0} floatClass="animate-float" />
      <FloatingIcon icon={Palette}  color="#f472b6" x="20%" y="80%" size={24} delay={1.3} floatClass="animate-float-slow" />
      <FloatingIcon icon={Sparkles} color="#fbbf24" x="8%"  y="48%" size={20} delay={1.1} floatClass="animate-float" />
      <FloatingIcon icon={Zap}      color="#facc15" x="3%"  y="35%" size={22} delay={0.9} floatClass="animate-float-slow" />
      <FloatingIcon icon={Mic}      color="#c084fc" x="18%" y="40%" size={20} delay={1.0} floatClass="animate-float" />
      <FloatingIcon icon={Star}     color="#38bdf8" x="35%" y="55%" size={18} delay={1.2} floatClass="animate-float-slow" />

      {/* ── TAGLINE — bottom center ── */}
      <p
        ref={taglineRef}
        className="absolute bottom-[4%] left-1/2 -translate-x-1/2 z-20 font-bold italic whitespace-nowrap opacity-0"
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 'clamp(1rem, 2.8vw, 2.4rem)',
          background: 'linear-gradient(90deg, #a855f7, #d946ef, #ec4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        "Easy Scheduling Ahead"
      </p>
    </div>
  );
};

export default HomePage;
