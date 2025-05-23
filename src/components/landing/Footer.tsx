
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dsk-blue text-white">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/415a2bd2-6afa-46d6-bf79-eff31006f46a.png" 
                alt="Divisional Secretariat Kalmunai" 
                className="h-16 w-auto bg-white p-2 rounded-lg" 
              />
            </Link>
            <p className="text-sm text-gray-300 mb-4">
              Providing efficient public services and streamlining administrative processes for the citizens of Kalmunai.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-dsk-amber transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-dsk-amber transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-dsk-amber transition-colors">
                <span className="sr-only">YouTube</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Administrative Division</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Social Services</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Planning Division</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Accounts Division</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Birth, Death & Marriage</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Working Hours</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-300">Monday - Friday:</span>
                <span className="text-white">8:30 AM - 4:30 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-300">Saturday:</span>
                <span className="text-white">Closed</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-300">Sunday:</span>
                <span className="text-white">Closed</span>
              </li>
            </ul>
            
            <h3 className="font-semibold text-lg mb-2 mt-6">Contact</h3>
            <p className="text-gray-300">
              Phone: +94 67 2229047
            </p>
            <p className="text-gray-300">
              Email: info@dskalmunai.gov.lk
            </p>
          </div>
        </div>
        
        <hr className="border-gray-700 my-8" />
        
        <div className="text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Divisional Secretariat Kalmunai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
