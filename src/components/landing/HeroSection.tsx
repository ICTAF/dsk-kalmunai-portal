
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home"
      className="min-h-screen pt-20 pb-10 md:pt-32 md:pb-16 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e6eef6 100%)',
      }}
    >
      {/* Background shapes */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-dsk-blue opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-dsk-green opacity-10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-dsk-blue">
              Divisional Secretariat
              <span className="block text-dsk-green mt-2">Kalmunai</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-md md:max-w-xl mx-auto md:mx-0">
              Providing efficient public services and streamlining administrative processes
              for the citizens of Kalmunai.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <Link to="/login" className="btn-primary text-center">
                Access Services
              </Link>
              <button onClick={scrollToServices} className="btn-outline flex items-center justify-center">
                Learn More
                <ChevronDown className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className="relative">
              <div className="glass-card p-6 rounded-2xl">
                <img 
                  src="/lovable-uploads/415a2bd2-6afa-46d6-bf79-eff31006f46a.png" 
                  alt="Divisional Secretariat Kalmunai" 
                  className="w-64 md:w-80 h-auto"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-dsk-amber rounded-full flex items-center justify-center shadow-lg transform rotate-12 opacity-90">
                <span className="text-white font-bold text-lg">DSK</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={scrollToServices}
            className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            <ChevronDown className="h-6 w-6 text-dsk-blue" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
