import React from 'react';
import { Link } from 'react-router-dom';
import { School, GraduationCap, Building, ChevronRight, BarChart, MessageSquare, Lock, Users } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Sentiment-Driven Feedback System
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white opacity-90">
              Collect, analyze, and transform feedback into actionable insights for schools, colleges, and companies.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/school/login" 
                className="btn bg-white text-primary hover:bg-slate-100 focus:ring-white"
              >
                Start with School
              </Link>
              <Link 
                to="/college/login" 
                className="btn bg-accent text-white hover:bg-accent-dark focus:ring-accent"
              >
                Start with College
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Sections */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Institution</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* School Section */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-slate-200">
              <div className="bg-primary-light bg-opacity-10 p-6 flex justify-center">
                <School className="h-16 w-16 text-primary" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">School</h3>
                <p className="text-slate-600 mb-6">
                  Perfect for K-12 schools to collect feedback about events, teaching quality, and overall student experience.
                </p>
                <Link 
                  to="/school/login" 
                  className="inline-flex items-center font-medium text-primary hover:text-primary-dark"
                >
                  Get Started <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>

            {/* College Section */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-slate-200">
              <div className="bg-secondary-light bg-opacity-10 p-6 flex justify-center">
                <GraduationCap className="h-16 w-16 text-secondary" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">College</h3>
                <p className="text-slate-600 mb-6">
                  Ideal for universities and colleges to gather insights from students about courses, facilities, and campus events.
                </p>
                <Link 
                  to="/college/login" 
                  className="inline-flex items-center font-medium text-secondary hover:text-secondary-dark"
                >
                  Get Started <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>

            {/* Company Section */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-slate-200">
              <div className="bg-accent-light bg-opacity-10 p-6 flex justify-center">
                <Building className="h-16 w-16 text-accent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Company</h3>
                <p className="text-slate-600 mb-6">
                  Help your business collect employee feedback and analyze sentiment to improve workplace satisfaction.
                </p>
                <Link 
                  to="/company" 
                  className="inline-flex items-center font-medium text-accent hover:text-accent-dark"
                >
                  Get Started <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-slate-600 text-lg">
              Our sentiment-driven feedback system transforms simple feedback into powerful insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-primary-light bg-opacity-20 p-3 w-14 h-14 flex items-center justify-center mb-4">
                <MessageSquare className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Collect Feedback</h3>
              <p className="text-slate-600">
                Gather detailed feedback through customizable forms for events, courses, and activities.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-secondary-light bg-opacity-20 p-3 w-14 h-14 flex items-center justify-center mb-4">
                <BarChart className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Analyze Sentiment</h3>
              <p className="text-slate-600">
                Our NLP-powered sentiment analysis classifies feedback as positive, negative, or neutral.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-accent-light bg-opacity-20 p-3 w-14 h-14 flex items-center justify-center mb-4">
                <Users className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">User Management</h3>
              <p className="text-slate-600">
                Separate student and admin accounts with specific permissions and access controls.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-success-light bg-opacity-20 p-3 w-14 h-14 flex items-center justify-center mb-4">
                <Lock className="h-7 w-7 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Authentication</h3>
              <p className="text-slate-600">
                Multi-factor authentication and secure password recovery for all users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-secondary to-primary text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Transform Your Feedback Process?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white opacity-90">
            Join thousands of institutions already using our sentiment-driven feedback system to make data-informed decisions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/school/login" 
              className="btn bg-white text-primary hover:bg-slate-100 focus:ring-white"
            >
              Get Started Now
            </Link>
            <a 
              href="#" 
              className="btn bg-transparent border border-white text-white hover:bg-white hover:bg-opacity-10 focus:ring-white"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;