
import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, color }) => {
  return (
    <div className="feature-card group hover:transform hover:scale-105 transition-all duration-300" style={{ borderColor: color }}>
      <div className="mb-4 text-3xl" style={{ color }}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const ServicesSection: React.FC = () => {
  const services = [
    {
      title: "Administrative Division",
      description: "Issuing of permits, certifying documents, renewing licenses, and collecting revenue.",
      icon: "🏛️",
      color: "#1e5b94"
    },
    {
      title: "Social Services Division",
      description: "Provision of aids and equipment, issuing Senior Citizenship Identity Cards, and providing dry rations.",
      icon: "🤝",
      color: "#106e42"
    },
    {
      title: "Planning Division",
      description: "Identifying development needs, evaluating project progress, and maintaining resource profiles.",
      icon: "📋",
      color: "#d3a04d"
    },
    {
      title: "Accounts Division",
      description: "Preparing procurement plans, handling payments, conducting surveys, and preparing financial statements.",
      icon: "💼",
      color: "#1e5b94"
    },
    {
      title: "Birth, Death & Marriage",
      description: "Registration and issuance of birth, death, and marriage certificates.",
      icon: "📜",
      color: "#106e42"
    },
    {
      title: "NIC Services",
      description: "Application processing and issuance of National Identity Cards.",
      icon: "🪪",
      color: "#d3a04d"
    },
  ];

  return (
    <section id="services" className="py-20 bg-dsk-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dsk-blue">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer a comprehensive range of public services across various departments to meet the needs of our citizens.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              title={service.title} 
              description={service.description} 
              icon={service.icon}
              color={service.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
