import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCog, Building, Clock } from 'lucide-react';
import SentimentDashboard from '../../components/admin/SentimentDashboard';
import FeedbackAnalytics from '../../components/admin/FeedbackAnalytics';
import FeedbackTable from '../../components/admin/FeedbackTable';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard = () => {
  const { user, isAuthenticated, userType } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated or not an admin
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/college/login');
    } else if (userType !== 'admin') {
      navigate('/college/login?type=admin');
    }
  }, [isAuthenticated, userType, navigate]);

  if (!isAuthenticated || userType !== 'admin') {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-secondary to-secondary-dark text-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
              <UserCog className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome, {user?.fullName}!</h1>
              <p className="mt-1 opacity-90">Administrator Dashboard</p>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-5 rounded-lg shadow-md border border-slate-200">
            <div className="flex items-start">
              <div className="bg-secondary-light bg-opacity-20 p-3 rounded-full mr-4">
                <Building className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Institution</h3>
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

        {/* Feedback Analytics */}
        <div className="mb-8">
          <FeedbackAnalytics />
        </div>

        {/* Sentiment Analysis Dashboard */}
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Detailed Feedback Analysis</h2>
        <div className="mb-8">
          <SentimentDashboard />
        </div>

        {/* Feedback Table */}
        <h2 className="text-2xl font-bold text-slate-900 mb-6">All Feedback Entries</h2>
        <div className="mb-8">
          <FeedbackTable institutionId={user?.institutionId || ''} />
        </div>

        {/* How It Works */}
        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
          <h3 className="text-lg font-semibold mb-3">Understanding Sentiment Analysis</h3>
          <p className="text-slate-600 mb-4">
            Our system uses Natural Language Processing (NLP) to analyze feedback text and detect sentiment. This helps identify what aspects of courses, events, and campus life are well-received and what needs improvement.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="bg-white p-4 rounded border border-slate-200">
              <h4 className="font-medium text-slate-800 mb-2">1. Feedback Collection</h4>
              <p className="text-sm text-slate-600">Students submit feedback through forms, rating events and providing comments.</p>
            </div>
            
            <div className="bg-white p-4 rounded border border-slate-200">
              <h4 className="font-medium text-slate-800 mb-2">2. Preprocessing</h4>
              <p className="text-sm text-slate-600">Text is cleaned and normalized to prepare for analysis.</p>
            </div>
            
            <div className="bg-white p-4 rounded border border-slate-200">
              <h4 className="font-medium text-slate-800 mb-2">3. Sentiment Analysis</h4>
              <p className="text-sm text-slate-600">NLP models classify feedback as positive, negative, or neutral.</p>
            </div>
            
            <div className="bg-white p-4 rounded border border-slate-200">
              <h4 className="font-medium text-slate-800 mb-2">4. Actionable Insights</h4>
              <p className="text-sm text-slate-600">Dashboard visualizations help you understand what works and what needs improvement.</p>
            </div>
          </div>
          
          <p className="text-slate-600">
            Use these insights to make data-driven decisions about academic programs, campus events, and facilities to improve student experience and satisfaction.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;