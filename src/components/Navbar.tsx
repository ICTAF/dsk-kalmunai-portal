
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/415a2bd2-6afa-46d6-bf79-eff31006f46a.png" 
            alt="Divisional Secretariat Kalmunai" 
            className="h-12 w-auto" 
          />
          <div className="ml-3">
            <h1 className="text-dsk-blue font-bold text-lg md:text-xl">Divisional Secretariat</h1>
            <p className="text-dsk-green text-sm md:text-base">Kalmunai</p>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          <button
            onClick={() => scrollToSection('home')}
            className="nav-link"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="nav-link"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="nav-link"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="nav-link"
          >
            Contact
          </button>
          
          {isAuthenticated ? (
            <Link to="/dashboard" className="btn-primary ml-4">
              Dashboard
            </Link>
          ) : (
            <Link to="/login" className="btn-primary ml-4">
              Login
            </Link>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-dsk-blue" />
          ) : (
            <Menu className="h-6 w-6 text-dsk-blue" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white shadow-md py-4 px-6 animate-fade-in">
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => scrollToSection('home')}
              className="text-left text-dsk-blue py-2 border-b border-gray-100"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-left text-dsk-blue py-2 border-b border-gray-100"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-left text-dsk-blue py-2 border-b border-gray-100"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left text-dsk-blue py-2 border-b border-gray-100"
            >
              Contact
            </button>
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-left text-dsk-blue py-2 border-b border-gray-100"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="text-left text-red-500 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="btn-primary inline-block text-center"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
