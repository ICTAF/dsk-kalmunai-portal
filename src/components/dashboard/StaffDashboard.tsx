
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UserPlus, FileText, Settings, LogOut, QrCode,
  Search, Printer, User, List
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface PublicUser {
  id: string;
  name: string;
  nic: string;
  dob: string;
  address: string;
  mobile: string;
  email?: string;
  services?: string[];
}

const StaffDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('publicAccounts');
  
  // Mock data for public users
  const [publicUsers, setPublicUsers] = useState<PublicUser[]>([
    {
      id: 'PUBLIC001',
      name: 'S.L.Farhana',
      nic: '937080550V',
      dob: '7/26/1993',
      address: 'Kalmunai',
      mobile: '0771234567',
      services: ['NIC Application', 'Birth Certificate']
    },
    {
      id: 'PUBLIC002',
      name: 'Ahmed Khan',
      nic: '861234567V',
      dob: '5/12/1986',
      address: '15 Main St, Kalmunai',
      mobile: '0777654321',
      services: ['Senior Citizen Card']
    },
    {
      id: 'PUBLIC003',
      name: 'Mary Silva',
      nic: '905678901V',
      dob: '10/30/1990',
      address: '42 Beach Rd, Kalmunai',
      mobile: '0765432109',
      services: []
    }
  ]);
  
  // Form state for new public user
  const [newUser, setNewUser] = useState({
    name: '',
    nic: '',
    dob: '',
    address: '',
    mobile: '',
    email: ''
  });
  
  // Handle user form input change
  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };
  
  // Create new public user
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPublicUser: PublicUser = {
      id: `PUBLIC${(publicUsers.length + 1).toString().padStart(3, '0')}`,
      name: newUser.name,
      nic: newUser.nic,
      dob: newUser.dob,
      address: newUser.address,
      mobile: newUser.mobile,
      email: newUser.email,
      services: []
    };
    
    setPublicUsers([...publicUsers, newPublicUser]);
    
    toast({
      title: "Public Account Created",
      description: `Account for ${newUser.name} has been successfully created.`,
    });
    
    setNewUser({
      name: '',
      nic: '',
      dob: '',
      address: '',
      mobile: '',
      email: ''
    });
    
    // Close the modal
    document.getElementById('newPublicModal')?.classList.add('hidden');
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

  // Generate and print ID card
  const printIdCard = (userId: string) => {
    const selectedUser = publicUsers.find(u => u.id === userId);
    
    if (selectedUser) {
      // In a real application, you would use a modal or redirect to a print page
      // For this demo, we'll just show a toast
      toast({
        title: "ID Card Generated",
        description: `ID card for ${selectedUser.name} is ready for printing.`,
      });
      
      // Show the ID card modal
      document.getElementById('idCardModal')?.classList.remove('hidden');
    }
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
          <h2 className="text-xl font-semibold">Staff Dashboard</h2>
          <p className="text-sm text-gray-300 mt-1">Welcome, {user?.name}</p>
          <p className="text-xs text-gray-300 mt-1">{user?.department}</p>
        </div>
        
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('publicAccounts')}
            className={`flex items-center space-x-3 w-full px-4 py-2 rounded-md transition-colors ${
              activeTab === 'publicAccounts' ? 'bg-dsk-green text-white' : 'hover:bg-white/10'
            }`}
          >
            <User className="h-5 w-5" />
            <span>Public Accounts</span>
          </button>
          
          <button
            onClick={() => setActiveTab('idCards')}
            className={`flex items-center space-x-3 w-full px-4 py-2 rounded-md transition-colors ${
              activeTab === 'idCards' ? 'bg-dsk-green text-white' : 'hover:bg-white/10'
            }`}
          >
            <QrCode className="h-5 w-5" />
            <span>ID Card Generator</span>
          </button>
          
          <button
            onClick={() => setActiveTab('scanner')}
            className={`flex items-center space-x-3 w-full px-4 py-2 rounded-md transition-colors ${
              activeTab === 'scanner' ? 'bg-dsk-green text-white' : 'hover:bg-white/10'
            }`}
          >
            <Search className="h-5 w-5" />
            <span>ID Card Scanner</span>
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
            <h1 className="font-bold">Staff Dashboard</h1>
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
                setActiveTab('publicAccounts');
                document.getElementById('mobileMenu')?.classList.add('hidden');
              }}
              className="flex items-center space-x-3 w-full px-2 py-2"
            >
              <User className="h-5 w-5" />
              <span>Public Accounts</span>
            </button>
            
            <button
              onClick={() => {
                setActiveTab('idCards');
                document.getElementById('mobileMenu')?.classList.add('hidden');
              }}
              className="flex items-center space-x-3 w-full px-2 py-2"
            >
              <QrCode className="h-5 w-5" />
              <span>ID Card Generator</span>
            </button>
            
            <button
              onClick={() => {
                setActiveTab('scanner');
                document.getElementById('mobileMenu')?.classList.add('hidden');
              }}
              className="flex items-center space-x-3 w-full px-2 py-2"
            >
              <Search className="h-5 w-5" />
              <span>ID Card Scanner</span>
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

        {/* Public Accounts Management */}
        {activeTab === 'publicAccounts' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-dsk-blue">Public Accounts Management</h2>
              <button
                onClick={() => document.getElementById('newPublicModal')?.classList.remove('hidden')}
                className="btn-primary flex items-center"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Create Account
              </button>
            </div>
            
            {/* Search bar */}
            <div className="mb-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search public accounts by name or NIC..."
                className="pl-10 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            
            {/* Public accounts list */}
            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      NIC
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {publicUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.nic}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.address}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.mobile}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          className="text-dsk-blue hover:text-dsk-green mr-3"
                          onClick={() => printIdCard(user.id)}
                        >
                          Generate ID
                        </button>
                        <button className="text-dsk-green hover:text-dsk-green mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-800">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* New Public Account Modal */}
            <div id="newPublicModal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
              <div className="bg-white rounded-lg w-full max-w-md p-6 mx-4">
                <h3 className="text-lg font-bold mb-4 text-dsk-blue">Create New Public Account</h3>
                
                <form onSubmit={handleCreateUser}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newUser.name}
                      onChange={handleUserChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      NIC Number
                    </label>
                    <input
                      type="text"
                      name="nic"
                      value={newUser.nic}
                      onChange={handleUserChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="text"
                      name="dob"
                      value={newUser.dob}
                      onChange={handleUserChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="MM/DD/YYYY"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={newUser.address}
                      onChange={handleUserChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      name="mobile"
                      value={newUser.mobile}
                      onChange={handleUserChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={newUser.email}
                      onChange={handleUserChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => document.getElementById('newPublicModal')?.classList.add('hidden')}
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                    >
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* ID Card Modal */}
            <div id="idCardModal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
              <div className="bg-white rounded-lg w-full max-w-lg p-6 mx-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-dsk-blue">ID Card Preview</h3>
                  <button
                    onClick={() => document.getElementById('idCardModal')?.classList.add('hidden')}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="border-2 border-gray-300 rounded-lg p-4 mb-6">
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <div className="bg-white p-4">
                      {/* ID Card Design based on uploaded template */}
                      <div className="border-2 border-black rounded-lg overflow-hidden">
                        <header className="bg-white p-3 flex items-center space-x-3 border-b border-gray-300">
                          <img 
                            src="/lovable-uploads/b4741576-8f51-4850-8b61-9b9b2ee99f8a.png" 
                            alt="Sri Lanka Emblem" 
                            className="h-10 w-auto"
                          />
                          <div className="text-center flex-1">
                            <h3 className="font-bold text-lg">Divisional Secretariate</h3>
                            <h4 className="text-base">Kalmunai</h4>
                          </div>
                        </header>
                        
                        <div className="p-4 flex flex-col md:flex-row">
                          <div className="flex-1">
                            <table className="w-full">
                              <tbody>
                                <tr>
                                  <td className="py-1 font-semibold">Name:</td>
                                  <td className="py-1">S.L.Farhana</td>
                                </tr>
                                <tr>
                                  <td className="py-1 font-semibold">NIC:</td>
                                  <td className="py-1">937080550V</td>
                                </tr>
                                <tr>
                                  <td className="py-1 font-semibold">DOB:</td>
                                  <td className="py-1">7/26/1993</td>
                                </tr>
                                <tr>
                                  <td className="py-1 font-semibold">Place:</td>
                                  <td className="py-1">Kalmunai</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          
                          <div className="mt-4 md:mt-0">
                            <div className="border border-gray-300 rounded-md p-2 h-32 w-32 flex items-center justify-center">
                              <div className="text-center">
                                <div className="border-2 border-black h-24 w-24 mx-auto grid place-items-center">
                                  <span className="text-xs">QR Code</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <button className="btn-primary flex items-center">
                    <Printer className="h-4 w-4 mr-2" />
                    Print ID Card
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* ID Card Generator */}
        {activeTab === 'idCards' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-dsk-blue mb-6">ID Card Generator</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Generate ID Cards</h3>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Public Users
                  </label>
                  
                  <div className="border border-gray-300 rounded-md p-3 max-h-60 overflow-y-auto">
                    {publicUsers.map((user) => (
                      <div key={user.id} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id={`user-${user.id}`}
                          className="h-4 w-4 text-dsk-blue focus:ring-dsk-blue border-gray-300 rounded"
                        />
                        <label htmlFor={`user-${user.id}`} className="ml-2 text-sm text-gray-700">
                          {user.name} - {user.nic}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    className="btn-outline"
                    onClick={() => {
                      toast({
                        title: "ID Cards Selected",
                        description: "Please preview before printing.",
                      });
                    }}
                  >
                    Select All
                  </button>
                  
                  <button
                    className="btn-primary flex items-center"
                    onClick={() => {
                      document.getElementById('idCardModal')?.classList.remove('hidden');
                    }}
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Generate & Print
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">ID Card Preview</h3>
                
                <div className="border-2 border-gray-300 rounded-lg p-4 h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <QrCode className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                    <p>Select a user to preview ID card</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">ID Card Settings</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-dsk-blue focus:ring-dsk-blue border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm">Include QR Code</span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-dsk-blue focus:ring-dsk-blue border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm">Include Divisional Secretary Logo</span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-dsk-blue focus:ring-dsk-blue border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm">Print Double-sided</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* ID Card Scanner */}
        {activeTab === 'scanner' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-dsk-blue mb-6">ID Card Scanner</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Scan QR Code</h3>
                
                <div className="border-2 border-dsk-blue border-dashed rounded-lg p-4 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <Search className="h-12 w-12 mx-auto mb-3 text-dsk-blue" />
                    <p className="text-gray-500">Place QR code in front of camera to scan</p>
                    <button className="mt-4 px-4 py-2 bg-dsk-blue text-white rounded-md hover:bg-opacity-90">
                      Start Camera
                    </button>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Manual Lookup</h4>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      className="flex-1 p-2 border border-gray-300 rounded-md"
                      placeholder="Enter ID or NIC number"
                    />
                    <button className="btn-primary">
                      Search
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Public User Details</h3>
                
                <div className="border border-gray-300 rounded-lg p-6">
                  <div className="text-center mb-6">
                    <User className="h-16 w-16 p-2 rounded-full bg-gray-100 mx-auto" />
                    <h4 className="text-lg font-medium mt-2">Scan a QR code to view details</h4>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 border-b border-gray-200 py-2">
                      <span className="text-gray-600">ID:</span>
                      <span className="col-span-2 font-medium">-</span>
                    </div>
                    <div className="grid grid-cols-3 border-b border-gray-200 py-2">
                      <span className="text-gray-600">Name:</span>
                      <span className="col-span-2 font-medium">-</span>
                    </div>
                    <div className="grid grid-cols-3 border-b border-gray-200 py-2">
                      <span className="text-gray-600">NIC:</span>
                      <span className="col-span-2 font-medium">-</span>
                    </div>
                    <div className="grid grid-cols-3 border-b border-gray-200 py-2">
                      <span className="text-gray-600">Services:</span>
                      <span className="col-span-2 font-medium">-</span>
                    </div>
                  </div>
                </div>
                
                <button className="btn-primary w-full mt-6" disabled>
                  Update Services
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Settings */}
        {activeTab === 'settings' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-dsk-blue mb-6">Account Settings</h2>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
              
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
                    Role
                  </label>
                  <input
                    type="text"
                    value={user?.role}
                    className="w-full max-w-md p-2 border border-gray-300 rounded-md"
                    readOnly
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={user?.department}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffDashboard;
