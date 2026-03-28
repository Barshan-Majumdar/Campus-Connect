import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#080c18]/70">
      <div className="flex items-center justify-between px-6 py-4 md:px-12 lg:px-16 max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 no-underline">
          <span
            className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-300 tracking-wider"
            style={{ fontFamily: "'Orbitron', sans-serif", textShadow: '0 0 20px rgba(0,180,255,0.3)' }}
          >
            Campus Connect
          </span>
        </NavLink>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 md:gap-10 text-sm md:text-base">
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/events"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Events
          </NavLink>
          <NavLink
            to="/clubs"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Clubs
          </NavLink>
        </div>
      </div>

      {/* Glowing underline */}
      <div
        className="w-full h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent 5%, rgba(0,180,255,0.4) 30%, rgba(0,200,255,0.6) 50%, rgba(0,180,255,0.4) 70%, transparent 95%)',
          boxShadow: '0 0 12px 2px rgba(0,180,255,0.15)',
        }}
      />
    </nav>
  );
};

export default Navbar;
