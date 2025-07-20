import { NavLink } from 'react-router-dom';
import Logo2 from '../assets/logo2.png'; 

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-teal-600 font-semibold"
      : "text-gray-700 hover:text-teal-600";

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-8xl mx-7 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <img src={Logo2} alt="SehatSathi Logo" className="w-15" />
          <h1 className="text-xl font-bold text-teal-600">
            <NavLink to="/">SehatSathi</NavLink>
          </h1>
        </div>

        <nav className="hidden md:flex gap-6 text-sm">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/assistant" className={linkClass}>Assistant</NavLink>
          <NavLink to="/scanner" className={linkClass}>Scanner</NavLink>
          <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
          <NavLink to="/offline" className={linkClass}>Offline</NavLink>
        </nav>

        <div className="flex gap-4 text-sm">
          <NavLink to="/login" className="text-teal-600 hover:underline">Login</NavLink>
          <NavLink to="/signup" className="bg-teal-600 text-white px-4 py-1 rounded hover:bg-teal-700">Sign Up</NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
