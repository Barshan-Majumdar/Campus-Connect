import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import InfoCard from '../components/ui/InfoCard';

// Event images
import uiuxImg from '../assets/events/uiux.png';
import hackathonImg from '../assets/events/hackathon.png';
import circuitronixImg from '../assets/events/circuitronix.png';
import blusterImg from '../assets/events/bluster.png';
import chessImg from '../assets/events/chess.png';

const activeEvents = [
  { image: uiuxImg, title: 'UI/UX Designing' },
  { image: hackathonImg, title: 'Hackathon' },
  { image: circuitronixImg, title: 'Circuitronix' },
  { image: blusterImg, title: 'The Bluster' },
  { image: chessImg, title: 'Chess Competition' },
];

const EventsPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTitleRef = useRef<HTMLHeadingElement>(null);
  const upcomingTitleRef = useRef<HTMLHeadingElement>(null);
  const comingSoonRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      activeTitleRef.current,
      { y: -40, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, delay: 0.2 }
    )
      .fromTo(
        dividerRef.current,
        { width: 0, opacity: 0 },
        { width: '120px', opacity: 1, duration: 0.6 },
        '-=0.3'
      )
      .fromTo(
        upcomingTitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '+=0.4'
      )
      .fromTo(
        comingSoonRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.3'
      );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative z-10 min-h-screen pt-32 pb-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Active Events Section */}
        <div className="text-center mb-10">
          <h2
            ref={activeTitleRef}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-glow italic opacity-0"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Active Events
          </h2>
          <div
            ref={dividerRef}
            className="h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent mx-auto mt-3 opacity-0"
            style={{ width: 0 }}
          />
        </div>

        {/* Active Events Cards */}
        <div className="flex flex-wrap justify-center gap-5 md:gap-6 lg:gap-8 mb-16">
          {activeEvents.map((event, i) => (
            <InfoCard
              key={event.title}
              image={event.image}
              title={event.title}
              buttonText="View Event"
              index={i}
            />
          ))}
        </div>

        {/* Upcoming Events Section */}
        <div className="text-center mt-8">
          <h2
            ref={upcomingTitleRef}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-glow italic opacity-0"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Upcoming Events
          </h2>
          <div className="h-[2px] w-[120px] bg-gradient-to-r from-transparent via-sky-400 to-transparent mx-auto mt-3" />
          <p
            ref={comingSoonRef}
            className="font-rajdhani text-lg md:text-xl text-slate-400 mt-6 opacity-0 tracking-wider"
          >
            Coming Soon ...
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
