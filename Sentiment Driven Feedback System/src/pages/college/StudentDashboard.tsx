import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Clock, School } from 'lucide-react';
import FeedbackForm from '../../components/feedback/FeedbackForm';
import { useAuth } from '../../contexts/AuthContext';

const StudentDashboard = () => {
  const { user, isAuthenticated, userType } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated or not a student
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/college/login');
    } else if (userType !== 'student') {
      navigate('/college/login?type=student');
    }
  }, [isAuthenticated, userType, navigate]);

  if (!isAuthenticated || userType !== 'student') {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-secondary to-secondary-dark text-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome, {user?.fullName}!</h1>
              <p className="mt-1 opacity-90">Student Dashboard</p>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-5 rounded-lg shadow-md border border-slate-200">
            <div className="flex items-start">
              <div className="bg-secondary-light bg-opacity-20 p-3 rounded-full mr-4">
                <School className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Your College</h3>
                <p className="text-slate-600">{user?.institutionName}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-md border border-slate-200">
            <div className="flex items-start">
              <div className="bg-secondary-light bg-opacity-20 p-3 rounded-full mr-4">
                <Clock className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Last Login</h3>
                <p className="text-slate-600">{new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Event Feedback</h2>
        <div className="mb-8">
          <FeedbackForm />
        </div>

        {/* Instructions */}
        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
          <h3 className="text-lg font-semibold mb-3">How Your Feedback Helps</h3>
          <p className="text-slate-600 mb-4">
            Your honest feedback helps us improve college events, courses, and facilities. All feedback is analyzed using sentiment analysis to identify areas where we excel and areas that need improvement.
          </p>
          <h4 className="font-medium text-slate-800 mb-2">Guidelines for providing effective feedback:</h4>
          <ul className="list-disc list-inside text-slate-600 space-y-1">
            <li>Be specific about what worked well and what didn't</li>
            <li>Focus on the event and not on specific individuals</li>
            <li>Provide constructive suggestions for improvement</li>
            <li>Share your honest experience to help make future events better</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;