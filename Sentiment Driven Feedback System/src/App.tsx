import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import SchoolLoginPage from './pages/school/LoginPage';
import SchoolRegisterPage from './pages/school/RegisterPage';
import SchoolForgotPasswordPage from './pages/school/ForgotPasswordPage';
import SchoolAdminDashboard from './pages/school/AdminDashboard';
import SchoolStudentDashboard from './pages/school/StudentDashboard';
import CollegeLoginPage from './pages/college/LoginPage';
import CollegeRegisterPage from './pages/college/RegisterPage';
import CollegeForgotPasswordPage from './pages/college/ForgotPasswordPage';
import CollegeAdminDashboard from './pages/college/AdminDashboard';
import CollegeStudentDashboard from './pages/college/StudentDashboard';
import CompanyPage from './pages/company/CompanyPage';
import NotFoundPage from './pages/NotFoundPage';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { FeedbackProvider } from './contexts/FeedbackContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <FeedbackProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              
              {/* School Routes */}
              <Route path="school">
                <Route path="login" element={<SchoolLoginPage />} />
                <Route path="register" element={<SchoolRegisterPage />} />
                <Route path="forgot-password" element={<SchoolForgotPasswordPage />} />
                <Route path="admin-dashboard" element={<SchoolAdminDashboard />} />
                <Route path="student-dashboard" element={<SchoolStudentDashboard />} />
              </Route>
              
              {/* College Routes */}
              <Route path="college">
                <Route path="login" element={<CollegeLoginPage />} />
                <Route path="register" element={<CollegeRegisterPage />} />
                <Route path="forgot-password" element={<CollegeForgotPasswordPage />} />
                <Route path="admin-dashboard" element={<CollegeAdminDashboard />} />
                <Route path="student-dashboard" element={<CollegeStudentDashboard />} />
              </Route>
              
              {/* Company Routes */}
              <Route path="company" element={<CompanyPage />} />
              
              {/* 404 - Not Found */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </FeedbackProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;