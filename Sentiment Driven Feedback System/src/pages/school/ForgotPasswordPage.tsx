import React from 'react';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';

const ForgotPasswordPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Reset Password</h1>
          <p className="text-slate-600">Recover access to your school account</p>
        </div>

        <ForgotPasswordForm institutionType="school" />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;