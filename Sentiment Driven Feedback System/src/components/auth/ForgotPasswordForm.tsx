import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Phone, Send, ArrowLeft, Key } from 'lucide-react';
import Button from '../common/Button';
import { useAuth } from '../../contexts/AuthContext';

interface ForgotPasswordFormProps {
  institutionType: 'school' | 'college';
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ institutionType }) => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { resetPassword, verifyResetCode, setNewPassword: updatePassword } = useAuth();

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username || !mobileNumber) {
      setError('Username and mobile number are required');
      return;
    }

    setIsLoading(true);

    try {
      const success = await resetPassword(username, mobileNumber);
      
      if (success) {
        setStep(2);
      } else {
        setError('No account found with the provided username and mobile number');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!code) {
      setError('Please enter the verification code');
      return;
    }

    setIsLoading(true);

    try {
      const success = await verifyResetCode(code);
      
      if (success) {
        setStep(3);
      } else {
        setError('Invalid verification code');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!newPassword || !confirmPassword) {
      setError('Please enter and confirm your new password');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const success = await updatePassword(newPassword, confirmPassword);
      
      if (success) {
        // Redirect to login page with a success message
        navigate(`/${institutionType}/login?resetSuccess=true`);
      } else {
        setError('Password reset failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Reset Your Password</h2>
        <p className="text-slate-600 mt-2">
          {step === 1
            ? 'Enter your username and mobile number to receive a verification code'
            : step === 2
            ? 'Enter the verification code sent to your mobile number'
            : 'Create a new password for your account'}
        </p>
      </div>

      {error && (
        <div className="bg-error-light text-error p-3 rounded-md mb-6">
          {error}
        </div>
      )}

      {step === 1 && (
        <form onSubmit={handleSendCode}>
          <div className="mb-5">
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
            <label htmlFor="mobileNumber" className="form-label">
              Mobile Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
              <input
                type="tel"
                id="mobileNumber"
                className="form-input pl-10"
                placeholder="Enter your mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
            leftIcon={<Send className="h-5 w-5" />}
          >
            Send Verification Code
          </Button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyCode}>
          <div className="mb-6">
            <label htmlFor="code" className="form-label">
              Verification Code
            </label>
            <input
              type="text"
              id="code"
              className="form-input"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <p className="text-xs text-slate-500 mt-1">
              A 6-digit code has been sent to your mobile number.
            </p>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
            className="mb-4"
          >
            Verify Code
          </Button>

          <Button
            type="button"
            variant="outline"
            fullWidth
            onClick={() => setStep(1)}
            leftIcon={<ArrowLeft className="h-5 w-5" />}
          >
            Back
          </Button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleResetPassword}>
          <div className="mb-5">
            <label htmlFor="newPassword" className="form-label">
              New Password
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
              <input
                type="password"
                id="newPassword"
                className="form-input pl-10"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
              <input
                type="password"
                id="confirmPassword"
                className="form-input pl-10"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            Reset Password
          </Button>

          <Button
            type="button"
            variant="outline"
            fullWidth
            onClick={() => setStep(2)}
            leftIcon={<ArrowLeft className="h-5 w-5" />}
          >
            Back
          </Button>
        </form>
      )}

      <div className="mt-6 text-center">
        <p className="text-sm text-slate-600">
          Remember your password?{' '}
          <Link
            to={`/${institutionType}/login`}
            className="text-primary hover:text-primary-dark font-medium"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;