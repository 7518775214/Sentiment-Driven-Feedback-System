import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, School } from 'lucide-react';
import Button from '../common/Button';
import { useAuth, mockInstitutions } from '../../contexts/AuthContext';

interface LoginFormProps {
  userType: 'student' | 'admin';
  institutionType: 'school' | 'college';
}

const LoginForm: React.FC<LoginFormProps> = ({ userType, institutionType }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [institutionId, setInstitutionId] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [currentCaptcha, setCurrentCaptcha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  useEffect(() => {
    // Generate initial CAPTCHA
    setCurrentCaptcha(generateCaptcha());
  }, []);

  const refreshCaptcha = () => {
    setCurrentCaptcha(generateCaptcha());
    setCaptcha(''); // Clear user input
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate captcha
    if (captcha !== currentCaptcha) {
      setError('Invalid captcha code. Please try again.');
      refreshCaptcha();
      return;
    }

    // Validate fields
    if (!username || !password || !institutionId) {
      setError('All fields are required');
      return;
    }

    setIsLoading(true);

    try {
      const success = await login(username, password, userType, institutionType, institutionId);
      
      if (success) {
        // Redirect based on user type
        if (userType === 'student') {
          navigate(`/${institutionType}/student-dashboard`);
        } else {
          navigate(`/${institutionType}/admin-dashboard`);
        }
      } else {
        setError('Invalid username or password');
        refreshCaptcha();
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      refreshCaptcha();
    } finally {
      setIsLoading(false);
    }
  };

  // Filter institutions by type
  const filteredInstitutions = mockInstitutions.filter(
    (institution) => institution.type === institutionType
  );

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          {userType === 'student' ? 'Student Login' : 'Admin Login'}
        </h2>
        <p className="text-slate-600 mt-2">
          Sign in to your account to continue
        </p>
      </div>

      {error && (
        <div className="bg-error-light text-error p-3 rounded-md mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="institution" className="form-label">
            Select {institutionType === 'school' ? 'School' : 'College'}
          </label>
          <div className="relative">
            <School className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
            <select
              id="institution"
              className="form-select pl-10"
              value={institutionId}
              onChange={(e) => setInstitutionId(e.target.value)}
              required
            >
              <option value="">Select {institutionType === 'school' ? 'school' : 'college'}</option>
              {filteredInstitutions.map((institution) => (
                <option key={institution.id} value={institution.id}>
                  {institution.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              id="username"
              className="form-input pl-10"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="form-input pl-10"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="captcha" className="form-label">
            Captcha
          </label>
          <div className="flex space-x-3">
            <div className="relative flex-1">
              <div className="bg-slate-100 p-2 rounded-md text-center font-mono w-full select-none">
                {currentCaptcha}
              </div>
              <button
                type="button"
                onClick={refreshCaptcha}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
              >
                ↻
              </button>
            </div>
            <input
              type="text"
              id="captcha"
              className="form-input w-1/2"
              placeholder="Enter captcha"
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value.toUpperCase())}
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isLoading}
          className="mb-4"
        >
          Sign In
        </Button>

        <div className="flex justify-between text-sm">
          <Link 
            to={`/${institutionType}/forgot-password`} 
            className="text-primary hover:text-primary-dark"
          >
            Forgot Password?
          </Link>
          <Link 
            to={`/${institutionType}/register`} 
            className="text-primary hover:text-primary-dark"
          >
            Create Account
          </Link>
        </div>
      </form>

      <div className="mt-6 pt-6 border-t border-slate-200 text-center">
        <p className="text-sm text-slate-600">
          {userType === 'student' ? 'Are you an admin?' : 'Are you a student?'}
          <Link 
            to={`/${institutionType}/login?type=${userType === 'student' ? 'admin' : 'student'}`} 
            className="ml-1 text-primary hover:text-primary-dark"
          >
            {userType === 'student' ? 'Admin Login' : 'Student Login'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;