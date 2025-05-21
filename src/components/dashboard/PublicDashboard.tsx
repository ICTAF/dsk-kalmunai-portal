
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, FileText, Settings, LogOut, 
  Bell, Download, List, Search, Clock
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface Service {
  id: string;
  name: string;
  department: string;
  description: string;
  documents: string[];
}

interface Token {
  id: string;
  number: number;
  date: string;
  time: string;
  service: string;
  department: string;
  status: 'pending' | 'completed' | 'cancelled';
}

const PublicDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('services');
  
  // Mock data for services
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'Birth Certificate',
      department: 'Birth, Death & Marriage',
      description: 'Application for obtaining a birth certificate.',
      documents: ['Application Form', 'Identification Proof']
    },
    {
      id: '2',
      name: 'Senior Citizen ID',
      department: 'Social Services Office',
      description: 'Application for Senior Citizenship Identity Card.',
      documents: ['Application Form', 'Proof of Age', 'ID Copy']
    },
    {
      id: '3',
      name: 'National ID Card',
      department: 'NIC',
      description: 'Application for National Identity Card.',
      documents: ['Application Form', 'Birth Certificate', 'Photos']
    },
    {
      id: '4',
      name: 'License Renewal',
      department: 'Administrative Division',
      description: 'Renewal of business licenses and permits.',
      documents: ['Application Form', 'Existing License', 'Payments Receipt']
    }
  ]);
  
  // Mock data for tokens
  const [tokens, setTokens] = useState<Token[]>([
    {
      id: 'TKN001',
      number: 12,
      date: '2024-05-25',
      time: '10:30 AM',
      service: 'Birth Certificate',
      department: 'Birth, Death & Marriage',
      status: 'pending'
    },
    {
      id: 'TKN002',
      number: 45,
      date: '2024-05-22',
      time: '02:15 PM',
      service: 'National ID Card',
      department: 'NIC',
      status: 'completed'
    }
  ]);
  
  // Mock data for documents
  const documents = [
    { name: 'Birth Certificate Application.pdf', type: 'application', size: '250 KB' },
    { name: 'Senior Citizen ID Application.pdf', type: 'application', size: '320 KB' },
    { name: 'NIC Application Form.pdf', type: 'application', size: '420 KB' },
    { name: 'Business License Application.pdf', type: 'application', size: '380 KB' },
    { name: 'Guidelines for ID Card.pdf', type: 'guide', size: '1.2 MB' },
  ];
  
  // Book a service
  const bookService = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    
    if (service) {
      const newToken: Token = {
        id: `TKN${(tokens.length + 1).toString().padStart(3, '0')}`,
        number: Math.floor(Math.random() * 100) + 1,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        service: service.name,
        department: service.department,
        status: 'pending'
      };
      
      setTokens([...tokens, newToken]);
      
      toast({
        title: "Service Booked",
        description: `Your ${service.name} service has been successfully booked.`,
      });
      
      // Close the booking modal
      document.getElementById('bookingModal')?.classList.add('hidden');
      
      // Switch to tokens tab
      setActiveTab('tokens');
    }
  };
  
  // Show booking modal
  const showBookingModal = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    
    if (service) {
      const modal = document.getElementById('bookingModal');
      if (modal) {
        const serviceName = modal.querySelector('#service-name');
        const serviceDept = modal.querySelector('#service-department');
        const serviceDesc = modal.querySelector('#service-description');
        const bookButton = modal.querySelector('#book-service-button') as HTMLButtonElement;
        
        if (serviceName) serviceName.textContent = service.name;
        if (serviceDept) serviceDept.textContent = service.department;
        if (serviceDesc) serviceDesc.textContent = service.description;
        if (bookButton) bookButton.onclick = () => bookService(service.id);
        
        modal.classList.remove('hidden');
      }
    }
  };
  
  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <div className="min-h-screen bg-dsk-light flex">
      {/* Sidebar */}
      <div className="w-64 bg-dsk-blue text-white min-h-screen p-4 hidden md:block">
        <div className="flex items-center justify-center mb-8">
          <img 
            src="/lovable-uploads/415a2bd2-6afa-46d6-bf79-eff31006f46a.png" 
            alt="DSK Logo" 
            className="h-16 w-auto bg-white rounded-full p-1"
          />
        </div>
        
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold">Public Dashboard</h2>
          <p className="text-sm text-gray-300 mt-1">Welcome, {user?.name}</p>
        </div>
        
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('services')}
            className={`flex items-center space-x-3 w-full px-4 py-2 rounded-md transition-colors ${
              activeTab === 'services' ? 'bg-dsk-green text-white' : 'hover:bg-white/10'
            }`}
          >
            <Search className="h-5 w-5" />
            <span>Browse Services</span>
          </button>
          
          <button
            onClick={() => setActiveTab('tokens')}
            className={`flex items-center space-x-3 w-full px-4 py-2 rounded-md transition-colors ${
              activeTab === 'tokens' ? 'bg-dsk-green text-white' : 'hover:bg-white/10'
            }`}
          >
            <Calendar className="h-5 w-5" />
            <span>My Tokens</span>
          </button>
          
          <button
            onClick={() => setActiveTab('documents')}
            className={`flex items-center space-x-3 w-full px-4 py-2 rounded-md transition-colors ${
              activeTab === 'documents' ? 'bg-dsk-green text-white' : 'hover:bg-white/10'
            }`}
          >
            <FileText className="h-5 w-5" />
            <span>Documents</span>
          </button>
          
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center space-x-3 w-full px-4 py-2 rounded-md transition-colors ${
              activeTab === 'settings' ? 'bg-dsk-green text-white' : 'hover:bg-white/10'
            }`}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
        </nav>
        
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-4 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Mobile Header */}
        <header className="bg-dsk-blue text-white p-4 md:hidden flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/415a2bd2-6afa-46d6-bf79-eff31006f46a.png" 
              alt="DSK Logo" 
              className="h-10 w-auto bg-white rounded-full p-1"
            />
            <h1 className="font-bold">Public Dashboard</h1>
          </div>
          <button
            onClick={() => document.getElementById('mobileMenu')?.classList.toggle('hidden')}
            className="text-white"
          >
            <List className="h-6 w-6" />
          </button>
        </header>

        {/* Mobile Menu */}
        <div id="mobileMenu" className="hidden bg-dsk-blue text-white p-4 md:hidden">
          <nav className="space-y-3">
            <button
              onClick={() => {
                setActiveTab('services');
                document.getElementById('mobileMenu')?.classList.add('hidden');
              }}
              className="flex items-center space-x-3 w-full px-2 py-2"
            >
              <Search className="h-5 w-5" />
              <span>Browse Services</span>
            </button>
            
            <button
              onClick={() => {
                setActiveTab('tokens');
                document.getElementById('mobileMenu')?.classList.add('hidden');
              }}
              className="flex items-center space-x-3 w-full px-2 py-2"
            >
              <Calendar className="h-5 w-5" />
              <span>My Tokens</span>
            </button>
            
            <button
              onClick={() => {
                setActiveTab('documents');
                document.getElementById('mobileMenu')?.classList.add('hidden');
              }}
              className="flex items-center space-x-3 w-full px-2 py-2"
            >
              <FileText className="h-5 w-5" />
              <span>Documents</span>
            </button>
            
            <button
              onClick={() => {
                setActiveTab('settings');
                document.getElementById('mobileMenu')?.classList.add('hidden');
              }}
              className="flex items-center space-x-3 w-full px-2 py-2"
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </button>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-2 py-2 border-t border-white/20 mt-4 pt-2"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* Browse Services */}
        {activeTab === 'services' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-dsk-blue">Available Services</h2>
            </div>
            
            {/* Search bar */}
            <div className="mb-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search services..."
                className="pl-10 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            
            {/* Services grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-dsk-blue">
                        {service.name}
                      </h3>
                      <span className="text-xs bg-dsk-light text-dsk-blue px-2 py-1 rounded-full">
                        {service.department}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Required Documents:
                      </h4>
                      <ul className="text-sm text-gray-600 list-disc pl-5">
                        {service.documents.map((doc, index) => (
                          <li key={index}>{doc}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <button
                      onClick={() => showBookingModal(service.id)}
                      className="btn-primary w-full"
                    >
                      Book Service
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Service Booking Modal */}
            <div id="bookingModal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
              <div className="bg-white rounded-lg w-full max-w-md p-6 mx-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-dsk-blue">Book Service</h3>
                  <button
                    onClick={() => document.getElementById('bookingModal')?.classList.add('hidden')}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="mb-6">
                  <h4 id="service-name" className="text-xl font-semibold mb-1"></h4>
                  <p id="service-department" className="text-sm text-dsk-green mb-4"></p>
                  <p id="service-description" className="text-gray-600 mb-4"></p>
                  
                  <div className="bg-dsk-light p-4 rounded-md mb-4">
                    <h5 className="font-medium mb-2 text-gray-700">Book Appointment</h5>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Date</label>
                        <input
                          type="date"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          defaultValue={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Time</label>
                        <select className="w-full p-2 border border-gray-300 rounded-md">
                          <option>9:00 AM</option>
                          <option>10:00 AM</option>
                          <option>11:00 AM</option>
                          <option>1:00 PM</option>
                          <option>2:00 PM</option>
                          <option>3:00 PM</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Estimated processing time: 15-30 minutes</span>
                    </div>
                  </div>
                </div>
                
                <button
                  id="book-service-button"
                  className="btn-primary w-full"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* My Tokens */}
        {activeTab === 'tokens' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-dsk-blue">My Service Tokens</h2>
            </div>
            
            {tokens.length > 0 ? (
              <div className="space-y-6">
                {tokens.map((token) => (
                  <div 
                    key={token.id} 
                    className={`bg-white rounded-lg shadow-md overflow-hidden border-l-4 ${
                      token.status === 'pending' ? 'border-dsk-amber' : 
                      token.status === 'completed' ? 'border-green-500' : 'border-red-500'
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex flex-wrap justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <span className="text-3xl font-bold text-dsk-blue mr-3">
                              #{token.number}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              token.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              token.status === 'completed' ? 'bg-green-100 text-green-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {token.status.charAt(0).toUpperCase() + token.status.slice(1)}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold mt-2">
                            {token.service}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {token.department}
                          </p>
                        </div>
                        
                        <div className="mt-2 sm:mt-0 text-right">
                          <div className="text-sm text-gray-600">
                            <span className="inline-block mr-3">
                              <Calendar className="h-4 w-4 inline mr-1" />
                              {new Date(token.date).toLocaleDateString()}
                            </span>
                            <span className="inline-block">
                              <Clock className="h-4 w-4 inline mr-1" />
                              {token.time}
                            </span>
                          </div>
                          
                          <div className="mt-4 space-x-3">
                            <button
                              className="px-3 py-1 text-sm border border-dsk-blue text-dsk-blue rounded-md hover:bg-dsk-blue hover:text-white transition-colors"
                            >
                              View Details
                            </button>
                            {token.status === 'pending' && (
                              <button
                                className="px-3 py-1 text-sm border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors"
                                onClick={() => {
                                  setTokens(
                                    tokens.map(t => 
                                      t.id === token.id ? {...t, status: 'cancelled'} : t
                                    )
                                  );
                                  
                                  toast({
                                    title: "Booking Cancelled",
                                    description: "Your service booking has been cancelled.",
                                    variant: "destructive",
                                  });
                                }}
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {token.status === 'pending' && (
                        <div className="mt-4 p-4 bg-dsk-light rounded-md">
                          <div className="flex items-center">
                            <Bell className="h-5 w-5 text-dsk-amber mr-2" />
                            <p className="text-sm">
                              Please arrive 10 minutes before your scheduled appointment. Bring all required documents to avoid delays.
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {token.status === 'completed' && (
                        <div className="mt-4 p-4 bg-green-50 rounded-md">
                          <div className="flex items-center">
                            <p className="text-sm text-green-700">
                              This service has been successfully completed. Thank you for using our services.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">No Tokens Found</h3>
                <p className="text-gray-500 mb-6">
                  You haven't booked any services yet. Browse available services to book one.
                </p>
                <button
                  onClick={() => setActiveTab('services')}
                  className="btn-primary"
                >
                  Browse Services
                </button>
              </div>
            )}
          </div>
        )}
        
        {/* Documents */}
        {activeTab === 'documents' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-dsk-blue">Documents</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Application Forms</h3>
                
                <div className="space-y-3">
                  {documents
                    .filter(doc => doc.type === 'application')
                    .map((doc, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-dsk-light transition-colors"
                      >
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-dsk-blue mr-3" />
                          <div>
                            <p className="font-medium text-gray-700">{doc.name}</p>
                            <p className="text-xs text-gray-500">{doc.size}</p>
                          </div>
                        </div>
                        <button className="text-dsk-blue hover:text-dsk-green">
                          <Download className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Guides & Resources</h3>
                
                <div className="space-y-3">
                  {documents
                    .filter(doc => doc.type === 'guide')
                    .map((doc, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-dsk-light transition-colors"
                      >
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-dsk-amber mr-3" />
                          <div>
                            <p className="font-medium text-gray-700">{doc.name}</p>
                            <p className="text-xs text-gray-500">{doc.size}</p>
                          </div>
                        </div>
                        <button className="text-dsk-blue hover:text-dsk-green">
                          <Download className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                </div>
                
                <div className="mt-6 p-4 bg-dsk-light rounded-md">
                  <h4 className="font-medium mb-2">Need More Documents?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    If you need additional forms or resources, please contact the relevant department or visit our office.
                  </p>
                  <button
                    onClick={() => setActiveTab('services')}
                    className="btn-outline text-sm"
                  >
                    Browse Services
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Settings */}
        {activeTab === 'settings' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-dsk-blue mb-6">Account Settings</h2>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={user?.name}
                    className="w-full max-w-md p-2 border border-gray-300 rounded-md"
                    readOnly
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user?.email}
                    className="w-full max-w-md p-2 border border-gray-300 rounded-md"
                    readOnly
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ID Card Number
                  </label>
                  <input
                    type="text"
                    value="PUBLIC001"
                    className="w-full max-w-md p-2 border border-gray-300 rounded-md"
                    readOnly
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    NIC
                  </label>
                  <input
                    type="text"
                    value="937080550V"
                    className="w-full max-w-md p-2 border border-gray-300 rounded-md"
                    readOnly
                  />
                </div>
              </div>
              
              <button className="btn-primary mt-6">
                Edit Profile
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Change Password</h3>
              
              <form className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter current password"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter new password"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Confirm new password"
                  />
                </div>
                
                <button 
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    toast({
                      title: "Password Updated",
                      description: "Your password has been successfully updated.",
                    });
                  }}
                >
                  Update Password
                </button>
              </form>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h3 className="text-xl font-semibold mb-4">Notification Settings</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-600">Receive updates via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-dsk-blue"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-gray-600">Receive updates via SMS</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-dsk-blue"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Appointment Reminders</p>
                    <p className="text-sm text-gray-600">Receive reminders for upcoming appointments</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-dsk-blue"></div>
                  </label>
                </div>
              </div>
              
              <button 
                className="btn-primary mt-6"
                onClick={() => {
                  toast({
                    title: "Settings Saved",
                    description: "Your notification preferences have been updated.",
                  });
                }}
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicDashboard;
