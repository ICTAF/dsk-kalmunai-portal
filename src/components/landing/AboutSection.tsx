
import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section 
      id="about" 
      className="py-20"
      style={{
        background: 'linear-gradient(109.6deg, rgba(223,234,247,1) 11.2%, rgba(244,248,252,1) 91.1%)',
      }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col-reverse md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12 mt-10 md:mt-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-dsk-blue">About Us</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              The Divisional Secretariat of Kalmunai serves as the primary administrative unit for the Kalmunai division, 
              providing essential government services to the local community.
            </p>
            
            <p className="text-lg text-gray-700 mb-6">
              Our mission is to ensure efficient, transparent, and accessible public services while promoting 
              sustainable development and improving the quality of life for all citizens in our division.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center p-4 bg-white rounded-lg shadow-md">
                <h4 className="text-dsk-blue font-bold text-xl mb-2">Vision</h4>
                <p className="text-gray-600">A prosperous community with excellent service delivery</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-md">
                <h4 className="text-dsk-green font-bold text-xl mb-2">Mission</h4>
                <p className="text-gray-600">To provide efficient and transparent public services</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <img 
                src="/lovable-uploads/b4741576-8f51-4850-8b61-9b9b2ee99f8a.png" 
                alt="Sri Lanka Government Logo" 
                className="w-52 h-auto"
              />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-dsk-amber opacity-20"></div>
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-dsk-blue opacity-20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
