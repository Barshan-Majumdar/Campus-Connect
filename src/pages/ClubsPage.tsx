import { useNavigate } from 'react-router-dom';
import InfoCard from '../components/ui/InfoCard';

// Club images
import roboticImg from '../assets/clubs/robotic.png';
import cycoderImg from '../assets/clubs/cycoder.png';
import refurbishImg from '../assets/clubs/refurbish.png';
import jhankerImg from '../assets/clubs/jhanker.png';
import singingImg from '../assets/clubs/singing.png';

const clubs = [
  { image: roboticImg, title: 'Robotic Club' },
  { image: cycoderImg, title: 'Cycoder Club' },
  { image: refurbishImg, title: 'Refurbish Club' },
  { image: jhankerImg, title: 'Jhanker Club' },
  { image: singingImg, title: 'Singing Club' },
];

const ClubsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative z-10 min-h-screen pt-32 pb-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">

        {/* Top row: 3 cards */}
        <div className="flex flex-wrap justify-center gap-5 md:gap-8 lg:gap-10 mb-8">
          {clubs.slice(0, 3).map((club, i) => (
            <InfoCard
              key={club.title}
              image={club.image}
              title={club.title}
              buttonText="View Details"
              index={i}
              onClick={() => navigate('/events')}
            />
          ))}
        </div>

        {/* Bottom row: 2 cards centered */}
        <div className="flex flex-wrap justify-center gap-5 md:gap-8 lg:gap-10">
          {clubs.slice(3).map((club, i) => (
            <InfoCard
              key={club.title}
              image={club.image}
              title={club.title}
              buttonText="View Details"
              index={i + 3}
              onClick={() => navigate('/events')}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClubsPage;
