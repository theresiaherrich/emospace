import { Link } from 'react-router-dom';
import { User, Menu, X } from 'lucide-react';
import Logo from '/assets/logo.svg';
import Button from './button';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogin = () => {
    setIsLogin(!isLogin);
    if (!isLogin) {
      localStorage.setItem('isLogin', 'true');
    } else {
      localStorage.removeItem('isLogin');
    }
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'bg-white bg-opacity-30 shadow-md backdrop-filter backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full mx-auto px-4 md:px-20">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <img className="h-16" src={Logo} alt="Logo" />
          </Link>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          <div className="hidden md:flex items-center gap-10 font-spartan font-semibold text-lg ">
            <Link to="/" className="text-gray-900 hover:text-gray-700">
              Home
            </Link>
            <Link to="/aispace" className="text-gray-900 hover:text-gray-700">
              AISpace
            </Link>
            <Link to="/my-journal" className="text-gray-900 hover:text-gray-700">
              My Journal
            </Link>
            <Link to="/specialist" className="text-gray-900 hover:text-gray-700">
              Specialist
            </Link>

            {isLogin ? (
              <Link to="/user-profile" className="text-gray-900 hover:text-gray-700">
                <User />
              </Link>
            ) : (
              <Link to="/login">
                <Button
                  onClick={handleLogin}
                  className="bg-[#633796] border-[#341A55] text-white hover:bg-[#7a4bb0] px-4 py-0 rounded-3xl font-spartan font-semibold"
                >
                  Log In
                </Button>
              </Link>
            )}
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col gap-4 w-full p-4 font-spartan font-semibold text-base bg-white bg-opacity-30 shadow-md backdrop-filter backdrop-blur-md">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-900">
              Home
            </Link>
            <Link to="/aispace" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-900">
              AISpace
            </Link>
            <Link to="/my-journal" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-900">
              My Journal
            </Link>
            <Link to="/specialist" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-900">
              Specialist
            </Link>
            {isLogin ? (
              <Link to="/user-profile" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-900">
                <User />
              </Link>
            ) : (
              <Link to="/login">
                <Button
                  onClick={() => {
                    handleLogin();
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-[#633796] border-[#341A55] text-white hover:bg-[#7a4bb0] px-4 py-0 rounded-3xl font-spartan font-semibold w-full"
                >
                  Log In
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
