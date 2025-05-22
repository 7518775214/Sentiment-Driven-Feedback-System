import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Phone, Mail, Lock, Eye, EyeOff, School, UserPlus } from 'lucide-react';
import Button from '../common/Button';
import { useAuth, mockInstitutions } from '../../contexts/AuthContext';

interface RegisterFormProps {
  userType: 'student' | 'admin';
  institutionType: 'school' | 'college';
}

const RegisterForm: React.FC<RegisterFormProps> = ({ userType, institutionType }) => {
  const [institutionId, setInstitutionId] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [adminCode, setAdminCode] = useState('');
  
  const navigate = useNavigate();
  const { register } = useAuth();

  // Admin code is only required for admin registration
  const isAdminCodeRequired = userType === 'admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password strength
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    // Validate admin code if required
    if (isAdminCodeRequired && adminCode !== 'ADMIN123') {
      setError('Invalid admin authorization code');
      return;
    }

    setIsLoading(true);

    try {
      const userData = {
        username,
        fullName,
        email,
        password,
        mobileNumber,
        institutionId,
        institutionName: mockInstitutions.find(i => i.id === institutionId)?.name || '',
        userType,
        institutionType,
      };

      const success = await register(userData);
      
      if (success) {
        // Redirect to appropriate login page based on user type
        navigate(`/${institutionType}/login?type=${userType}&registered=true`);
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
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
          Create {userType === 'student' ? 'Student' : 'Admin'} Account
        </h2>
        <p className="text-slate-600 mt-2">
          Fill in your details to create a new account
        </p>
      </div>

      {error && (
        <div className="bg-error-light text-error p-3 rounded-md mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="mobileNumber" className="form-label">
              Mobile Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
              <input
                type="tel"
                id="mobileNumber"
                className="form-input pl-10"
                placeholder="Enter mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
              <input
                type="email"
                id="email"
                className="form-input pl-10"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <div>
            <label htmlFor="password" className="form-label">
              Create Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="form-input pl-10"
                placeholder="Enter password"
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

          <div>
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                className="form-input pl-10"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <div>
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
              <input
                type="text"
                id="username"
                className="form-input pl-10"
                placeholder="Choose username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <div className="relative">
              <UserPlus className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
              <input
                type="text"
                id="fullName"
                className="form-input pl-10"
                placeholder="Enter full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {isAdminCodeRequired && (
          <div className="mt-5">
            <label htmlFor="adminCode" className="form-label">
              Admin Authorization Code
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
              <input
                type="text"
                id="adminCode"
                className="form-input pl-10"
                placeholder="Enter admin code"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                required
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              This code is provided by existing admins to prevent unauthorized access.
            </p>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isLoading}
          className="mt-6"
          leftIcon={<UserPlus className="h-5 w-5" />}
        >
          Sign Up
        </Button>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            Already have an account?{' '}
            <Link
              to={`/${institutionType}/login?type=${userType}`}
              className="text-primary hover:text-primary-dark font-medium"
            >
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;