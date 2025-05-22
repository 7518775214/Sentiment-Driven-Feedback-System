import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import RegisterForm from '../../components/auth/RegisterForm';
import { useAuth } from '../../contexts/AuthContext';

const RegisterPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userType = searchParams.get('type') === 'admin' ? 'admin' : 'student';
  const { isAuthenticated, userType: currentUserType } = useAuth();

  // If already authenticated, redirect to appropriate dashboard
  if (isAuthenticated) {
    if (currentUserType === 'admin') {
      return <Navigate to="/college/admin-dashboard" />;
    }
    return <Navigate to="/college/student-dashboard" />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {userType === 'admin' ? 'Create Admin Account' : 'Create Student Account'}
          </h1>
          <p className="text-slate-600">
            {userType === 'admin' 
              ? 'Register as an administrator to manage the college feedback system'
              : 'Register to access the college feedback system'}
          </p>
        </div>

        <RegisterForm userType={userType} institutionType="college" />
      </div>
    </div>
  );
};

export default RegisterPage;