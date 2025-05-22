import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, BarChart2, Users, Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">SentiFeedback</h3>
            <p className="text-slate-400 mb-4">
              Advanced sentiment-driven feedback system for educational institutions and companies.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/school/login" className="text-slate-400 hover:text-white transition-colors">School</Link>
              </li>
              <li>
                <Link to="/college/login" className="text-slate-400 hover:text-white transition-colors">College</Link>
              </li>
              <li>
                <Link to="/company" className="text-slate-400 hover:text-white transition-colors">Company</Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Features</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                <span className="text-slate-400">Feedback Collection</span>
              </li>
              <li className="flex items-center space-x-2">
                <BarChart2 className="h-4 w-4 text-primary" />
                <span className="text-slate-400">Sentiment Analysis</span>
              </li>
              <li className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-slate-400">User Management</span>
              </li>
              <li className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-slate-400">Secure Authentication</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <address className="not-italic text-slate-400 space-y-2">
              <p>123 Feedback Avenue</p>
              <p>Analytics City, AC 12345</p>
              <p className="mt-4">
                <a href="mailto:info@sentifeedback.com" className="hover:text-white transition-colors">
                  info@sentifeedback.com
                </a>
              </p>
              <p>
                <a href="tel:+11234567890" className="hover:text-white transition-colors">
                  +1 (123) 456-7890
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400">© 2025 SentiFeedback. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Cookie Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;