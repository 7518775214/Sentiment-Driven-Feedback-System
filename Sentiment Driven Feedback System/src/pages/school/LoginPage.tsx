import React from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userType = searchParams.get('type') === 'admin' ? 'admin' : 'student';
  const isRegistered = searchParams.get('registered') === 'true';
  const isResetSuccess = searchParams.get('resetSuccess') === 'true';

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {isRegistered && (
          <div className="bg-success-light text-success p-4 rounded-md mb-6 text-center">
            Account created successfully! Please log in with your credentials.
          </div>
        )}

        {isResetSuccess && (
          <div className="bg-success-light text-success p-4 rounded-md mb-6 text-center">
            Password reset successful! Please log in with your new password.
          </div>
        )}

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">School Feedback System</h1>
          <p className="text-slate-600">Sign in to access the school feedback portal</p>
        </div>

        <LoginForm userType={userType} institutionType="school" />
      </div>
    </div>
  );
};

export default LoginPage;