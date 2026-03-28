import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface InfoCardProps {
  image: string;
  title: string;
  buttonText: string;
  index?: number;
  onClick?: () => void;
}

const InfoCard = ({ image, title, buttonText, index = 0, onClick }: InfoCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { y: 60, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        delay: 0.15 * index,
        ease: 'power3.out',
      }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className="glass-card flex flex-col items-center p-5 md:p-6 gap-4 w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px] opacity-0 cursor-pointer"
      onClick={onClick}
    >
      <img
        src={image}
        alt={title}
        className="w-[130px] h-[130px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px] rounded-2xl object-cover border-2 border-purple-500/30 bg-purple-900/30"
        loading="lazy"
      />
      <h3
        className="text-base md:text-lg font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-400 leading-tight"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        {title}
      </h3>
      <button className="view-btn" onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
};

export default InfoCard;
