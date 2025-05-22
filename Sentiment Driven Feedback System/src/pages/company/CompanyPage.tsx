import React from 'react';
import { Link } from 'react-router-dom';
import { Building, MessageCircle, BarChart2, Users, ChevronRight } from 'lucide-react';

const CompanyPage = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent to-accent-dark text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Corporate Feedback Solutions
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white opacity-90">
              Transform employee feedback into actionable insights with our sentiment-driven analysis platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="mailto:sales@sentifeedback.com" 
                className="btn bg-white text-accent hover:bg-slate-100 focus:ring-white"
              >
                Contact Sales
              </a>
              <a 
                href="#features" 
                className="btn bg-transparent border border-white text-white hover:bg-white hover:bg-opacity-10 focus:ring-white"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Corporate Solutions</h2>
            <p className="text-slate-600 text-lg">
              Our enterprise-grade sentiment analysis platform helps companies better understand employee feedback and improve workplace satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-slate-200">
              <div className="rounded-full bg-accent-light bg-opacity-20 p-3 w-14 h-14 flex items-center justify-center mb-4">
                <MessageCircle className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Feedback Collection</h3>
              <p className="text-slate-600 mb-4">
                Collect feedback through customizable forms, surveys, pulse checks, and integration with existing HR systems.
              </p>
              <a href="#" className="inline-flex items-center font-medium text-accent hover:text-accent-dark">
                Learn more <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-slate-200">
              <div className="rounded-full bg-accent-light bg-opacity-20 p-3 w-14 h-14 flex items-center justify-center mb-4">
                <BarChart2 className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Enterprise Analytics</h3>
              <p className="text-slate-600 mb-4">
                Powerful dashboards with department-level breakdowns, trend analysis, and exportable reports for executive presentations.
              </p>
              <a href="#" className="inline-flex items-center font-medium text-accent hover:text-accent-dark">
                Learn more <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-slate-200">
              <div className="rounded-full bg-accent-light bg-opacity-20 p-3 w-14 h-14 flex items-center justify-center mb-4">
                <Users className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Team Insights</h3>
              <p className="text-slate-600 mb-4">
                Compare team satisfaction across departments, identify issues before they impact retention, and track improvement initiatives.
              </p>
              <a href="#" className="inline-flex items-center font-medium text-accent hover:text-accent-dark">
                Learn more <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Trusted by Leading Companies</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-slate-200 mr-4">
                  <img 
                    src="https://images.pexels.com/photos/5792641/pexels-photo-5792641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Profile" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-slate-500">HR Director, Tech Solutions Inc.</p>
                </div>
              </div>
              <p className="text-slate-600 italic">
                "SentiFeedback has transformed how we understand employee satisfaction. The sentiment analysis gives us insights we never had before."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-slate-200 mr-4">
                  <img 
                    src="https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Profile" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Michael Reynolds</h4>
                  <p className="text-sm text-slate-500">CEO, Global Innovations</p>
                </div>
              </div>
              <p className="text-slate-600 italic">
                "Since implementing SentiFeedback, we've seen a 15% improvement in employee retention and a more positive company culture."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-slate-200 mr-4">
                  <img 
                    src="https://images.pexels.com/photos/5717641/pexels-photo-5717641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Profile" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Laura Chen</h4>
                  <p className="text-sm text-slate-500">People Operations, Future Brands</p>
                </div>
              </div>
              <p className="text-slate-600 italic">
                "The detailed analytics helped us identify specific areas of improvement across departments, which has led to actionable change."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent to-accent-dark text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Transform Your Feedback Process?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white opacity-90">
            Schedule a demo with our team to see how SentiFeedback can help your company gain valuable insights from employee feedback.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="mailto:sales@sentifeedback.com" 
              className="btn bg-white text-accent hover:bg-slate-100 focus:ring-white"
            >
              Request a Demo
            </a>
            <a 
              href="#" 
              className="btn bg-transparent border border-white text-white hover:bg-white hover:bg-opacity-10 focus:ring-white"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>

      {/* Logo Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h3 className="text-lg font-medium text-center text-slate-500 mb-8">Trusted by companies worldwide</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {/* Placeholder for company logos */}
            <div className="w-32 h-12 bg-slate-100 rounded flex items-center justify-center text-slate-400">Logo 1</div>
            <div className="w-32 h-12 bg-slate-100 rounded flex items-center justify-center text-slate-400">Logo 2</div>
            <div className="w-32 h-12 bg-slate-100 rounded flex items-center justify-center text-slate-400">Logo 3</div>
            <div className="w-32 h-12 bg-slate-100 rounded flex items-center justify-center text-slate-400">Logo 4</div>
            <div className="w-32 h-12 bg-slate-100 rounded flex items-center justify-center text-slate-400">Logo 5</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanyPage;