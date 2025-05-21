
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('public');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password, role);
      
      toast({
        title: "Login Successful",
        description: `Welcome back! You are logged in as ${role}.`,
      });
      
      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'staff') {
        navigate('/staff/dashboard');
      } else {
        navigate('/public/dashboard');
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Test credentials for demo purposes
  const fillTestCredentials = (selectedRole: UserRole) => {
    setRole(selectedRole);
    
    if (selectedRole === 'admin') {
      setEmail('admin@dsk.gov.lk');
      setPassword('admin123');
    } else if (selectedRole === 'staff') {
      setEmail('staff@dsk.gov.lk');
      setPassword('staff123');
    } else {
      setEmail('public@dsk.gov.lk');
      setPassword('public123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-dsk-light">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-dsk-blue p-6 flex justify-between items-center">
            <button
              onClick={() => navigate('/')}
              className="text-white flex items-center hover:underline"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </button>
            <img 
              src="/lovable-uploads/415a2bd2-6afa-46d6-bf79-eff31006f46a.png" 
              alt="DSK Logo" 
              className="h-12 w-auto bg-white rounded-full p-1"
            />
          </div>
          
          {/* Login Form */}
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-dsk-blue">Login to DSK Portal</h1>
              <p className="text-gray-600 mt-2">
                Access services provided by the Divisional Secretariat Kalmunai
              </p>
            </div>
            
            <form onSubmit={handleSubmit}>
              {/* Role Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Role</label>
                <div className="grid grid-cols-3 gap-3">
                  {['public', 'staff', 'admin'].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => fillTestCredentials(r as UserRole)}
                      className={`py-2 px-4 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dsk-blue transition-colors ${
                        role === r
                          ? 'bg-dsk-blue text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Email */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-dsk-blue focus:border-dsk-blue"
                  placeholder="Enter your email"
                />
              </div>
              
              {/* Password */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <a href="#" className="text-xs text-dsk-blue hover:underline">
                    Forgot password?
                  </a>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-dsk-blue focus:border-dsk-blue"
                  placeholder="Enter your password"
                />
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-dsk-blue text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dsk-blue transition-colors ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-opacity-90'
                }`}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            
            <p className="mt-6 text-center text-sm text-gray-500">
              Note: For demonstration purposes, use the pre-filled credentials.
            </p>
            
            <div className="mt-4 bg-gray-50 p-3 rounded-md border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Pre-filled Credentials:</h3>
              <div className="text-xs space-y-1 text-gray-600">
                <p><strong>Admin:</strong> admin@dsk.gov.lk / admin123</p>
                <p><strong>Staff:</strong> staff@dsk.gov.lk / staff123</p>
                <p><strong>Public:</strong> public@dsk.gov.lk / public123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
