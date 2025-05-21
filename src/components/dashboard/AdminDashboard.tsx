
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, FileText, Settings, LogOut, 
  Building, FolderPlus, UserPlus, List, Search 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface Department {
  id: string;
  name: string;
  divisions: string[];
  documents?: string[];
}

interface StaffMember {
  id: string;
  name: string;
  email: string;
  username: string;
  role: 'Admin' | 'Staff';
  department: string;
  division: string;
}

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('departments');
  
  // Mock data for departments
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: '1',
      name: 'Administrative Division',
      divisions: ['General Admin', 'Human Resources'],
      documents: ['Guidelines.pdf', 'Procedures.pdf']
    },
    {
      id: '2',
      name: 'Social Services Office',
      divisions: ['Senior Citizens', 'Disability Services', 'Welfare'],
      documents: ['Application Form.pdf']
    },
    {
      id: '3',
      name: 'Planning Division',
      divisions: ['Development Projects', 'Resource Management'],
      documents: []
    },
    {
      id: '4',
      name: 'Accounts Division',
      divisions: ['Payroll', 'Procurement', 'Audit'],
      documents: ['Financial Guidelines.pdf']
    }
  ]);
  
  // Mock data for staff
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@dsk.gov.lk',
      username: 'johnsmith',
      role: 'Admin',
      department: 'Administrative Division',
      division: 'General Admin'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@dsk.gov.lk',
      username: 'sarahjohnson',
      role: 'Staff',
      department: 'Social Services Office',
      division: 'Senior Citizens'
    },
    {
      id: '3',
      name: 'David Lee',
      email: 'david@dsk.gov.lk',
      username: 'davidlee',
      role: 'Staff',
      department: 'Planning Division',
      division: 'Development Projects'
    }
  ]);
  
  // Form state for new department
  const [newDepartment, setNewDepartment] = useState({
    name: '',
    divisions: '',
    documents: null as File | null
  });
  
  // Form state for new staff member
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    role: 'Staff' as 'Admin' | 'Staff',
    department: '',
    division: ''
  });
  
  // Handle department form input change
  const handleDepartmentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewDepartment(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle staff form input change
  const handleStaffChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewStaff(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewDepartment(prev => ({ ...prev, documents: e.target.files![0] }));
    }
  };
  
  // Create new department
  const handleCreateDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newDept: Department = {
      id: (departments.length + 1).toString(),
      name: newDepartment.name,
      divisions: newDepartment.divisions.split(',').map(d => d.trim()),
      documents: newDepartment.documents ? [newDepartment.documents.name] : []
    };
    
    setDepartments([...departments, newDept]);
    
    toast({
      title: "Department Created",
      description: `${newDepartment.name} has been successfully created.`,
    });
    
    setNewDepartment({
      name: '',
      divisions: '',
      documents: null
    });
  };
  
  // Create new staff member
  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newStaffMember: StaffMember = {
      id: (staffMembers.length + 1).toString(),
      name: newStaff.name,
      email: newStaff.email,
      username: newStaff.username,
      role: newStaff.role,
      department: newStaff.department,
      division: newStaff.division
    };
    
    setStaffMembers([...staffMembers, newStaffMember]);
    
    toast({
      title: "Staff Account Created",
      description: `Account for ${newStaff.name} has been successfully created.`,
    });
    
    setNewStaff({
      name: '',
      email: '',
      username: '',
      password: '',
      role: 'Staff',
      department: '',
      division: ''
    });
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
          <h2 className="text-xl font-semibold">Admin Dashboard</h2>
          <p className="text-sm text-gray-300 mt-1">Welcome, {user?.name}</p>
        </div>
        
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('departments')}
            className={`flex items-center space-x-3 w-full px-4 py-2 rounded-md transition-colors ${
              activeTab === 'departments' ? 'bg-dsk-green text-white' : 'hover:bg-white/10'
            }`}
          >
            <Building className="h-5 w-5" />
            <span>Departments</span>
          </button>
          
          <button
            onClick={() => setActiveTab('staff')}
            className={`flex items-center space-x-3 w-full px-4 py-2 rounded-md transition-colors ${
              activeTab === 'staff' ? 'bg-dsk-green text-white' : 'hover:bg-white/10'
            }`}
          >
            <Users className="h-5 w-5" />
            <span>Staff Members</span>
          </button>
          
          <button
            onClick={() => setActiveTab('forms')}
            className={`flex items-center space-x-3 w-full px-4 py-2 rounded-md transition-colors ${
              activeTab === 'forms' ? 'bg-dsk-green text-white' : 'hover:bg-white/10'
            }`}
          >
            <FileText className="h-5 w-5" />
            <span>Online Forms</span>
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
            <h1 className="font-bold">Admin Dashboard</h1>
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
                setActiveTab('departments');
                document.getElementById('mobileMenu')?.classList.add('hidden');
              }}
              className="flex items-center space-x-3 w-full px-2 py-2"
            >
              <Building className="h-5 w-5" />
              <span>Departments</span>
            </button>
            
            <button
              onClick={() => {
                setActiveTab('staff');
                document.getElementById('mobileMenu')?.classList.add('hidden');
              }}
              className="flex items-center space-x-3 w-full px-2 py-2"
            >
              <Users className="h-5 w-5" />
              <span>Staff Members</span>
            </button>
            
            <button
              onClick={() => {
                setActiveTab('forms');
                document.getElementById('mobileMenu')?.classList.add('hidden');
              }}
              className="flex items-center space-x-3 w-full px-2 py-2"
            >
              <FileText className="h-5 w-5" />
              <span>Online Forms</span>
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

        {/* Department Management */}
        {activeTab === 'departments' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-dsk-blue">Department Management</h2>
              <button
                onClick={() => document.getElementById('newDepartmentModal')?.classList.remove('hidden')}
                className="btn-primary flex items-center"
              >
                <FolderPlus className="h-4 w-4 mr-2" />
                Add Department
              </button>
            </div>
            
            {/* Search bar */}
            <div className="mb-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search departments..."
                className="pl-10 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            
            {/* Departments list */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Divisions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Documents
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {departments.map((dept) => (
                    <tr key={dept.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {dept.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dept.divisions.join(', ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dept.documents && dept.documents.length > 0 ? (
                          <ul>
                            {dept.documents.map((doc, index) => (
                              <li key={index} className="text-dsk-blue hover:underline">
                                <a href="#">{doc}</a>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-gray-400">No documents</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-dsk-blue hover:text-dsk-green mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-800">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* New Department Modal */}
            <div id="newDepartmentModal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
              <div className="bg-white rounded-lg w-full max-w-md p-6 mx-4">
                <h3 className="text-lg font-bold mb-4 text-dsk-blue">Create New Department</h3>
                
                <form onSubmit={handleCreateDepartment}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Department Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newDepartment.name}
                      onChange={handleDepartmentChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Divisions (comma-separated)
                    </label>
                    <textarea
                      name="divisions"
                      value={newDepartment.divisions}
                      onChange={handleDepartmentChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows={2}
                      required
                    ></textarea>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Document (optional)
                    </label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => document.getElementById('newDepartmentModal')?.classList.add('hidden')}
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                    >
                      Create Department
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        
        {/* Staff Management */}
        {activeTab === 'staff' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-dsk-blue">Staff Management</h2>
              <button
                onClick={() => document.getElementById('newStaffModal')?.classList.remove('hidden')}
                className="btn-primary flex items-center"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add Staff
              </button>
            </div>
            
            {/* Search bar */}
            <div className="mb-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search staff members..."
                className="pl-10 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            
            {/* Staff list */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {staffMembers.map((staff) => (
                    <tr key={staff.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {staff.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {staff.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          staff.role === 'Admin' 
                            ? 'bg-dsk-blue text-white' 
                            : 'bg-dsk-green text-white'
                        }`}>
                          {staff.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {staff.department} - {staff.division}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-dsk-blue hover:text-dsk-green mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-800">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* New Staff Modal */}
            <div id="newStaffModal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
              <div className="bg-white rounded-lg w-full max-w-md p-6 mx-4">
                <h3 className="text-lg font-bold mb-4 text-dsk-blue">Create New Staff Account</h3>
                
                <form onSubmit={handleCreateStaff}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newStaff.name}
                      onChange={handleStaffChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={newStaff.email}
                      onChange={handleStaffChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={newStaff.username}
                      onChange={handleStaffChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={newStaff.password}
                      onChange={handleStaffChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <select
                      name="role"
                      value={newStaff.role}
                      onChange={handleStaffChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="Staff">Staff</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Department
                    </label>
                    <select
                      name="department"
                      value={newStaff.department}
                      onChange={handleStaffChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.name}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Division
                    </label>
                    <input
                      type="text"
                      name="division"
                      value={newStaff.division}
                      onChange={handleStaffChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => document.getElementById('newStaffModal')?.classList.add('hidden')}
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
          </div>
        )}
        
        {/* Online Forms */}
        {activeTab === 'forms' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-dsk-blue mb-6">Online Forms Management</h2>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Create Online Forms</h3>
              <p className="text-gray-600 mb-6">
                This feature allows you to create custom online forms for various services. 
                Forms can be accessed by public users and staff members.
              </p>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      This feature is currently under development and will be available soon.
                    </p>
                  </div>
                </div>
              </div>
              
              <button className="btn-primary opacity-50 cursor-not-allowed">
                Create New Form
              </button>
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

export default AdminDashboard;
