# Sentiment-Driven Feedback System

A comprehensive feedback management system designed for educational institutions (schools and colleges) with built-in sentiment analysis capabilities. This modern web application helps institutions collect, analyze, and derive actionable insights from student feedback.

## 🌟 Features

### For Students
- Secure authentication system with email/password
- Intuitive feedback submission for various events
- Rating system with detailed feedback options
- Improvement suggestions capability
- User-friendly dashboard interface

### For Administrators
- Comprehensive analytics dashboard
- Real-time sentiment analysis of feedback
- Visual data representation with charts and graphs
- Detailed feedback management system
- Event-wise feedback tracking
- Export capabilities for data analysis

### Technical Features
- Sentiment analysis for feedback processing
- Real-time data visualization
- Responsive design for all devices
- Role-based access control
- Secure authentication system

## 🚀 Technologies Used

- **Frontend:**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Recharts for data visualization
  - Lucide React for icons

- **Backend:**
  - Supabase for database and authentication
  - PostgreSQL with Row Level Security
  - Real-time subscriptions

- **Development:**
  - Vite
  - ESLint
  - TypeScript

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sentiment-driven-feedback-system.git
```

2. Install dependencies:
```bash
cd sentiment-driven-feedback-system
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── admin/         # Admin-specific components
│   ├── auth/          # Authentication components
│   ├── common/        # Shared components
│   └── feedback/      # Feedback-related components
├── contexts/          # React contexts
├── layouts/           # Layout components
└── pages/            # Page components
    ├── school/       # School-specific pages
    └── college/      # College-specific pages
```

## 🔒 Security Features

- Row Level Security (RLS) policies
- Secure authentication system
- Role-based access control
- Protected routes
- Input validation and sanitization

## 📊 Analytics Features

- Sentiment trend analysis
- Rating distribution visualization
- Feedback summary statistics
- Event-wise analytics
- Real-time data updates

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Supabase](https://supabase.io/) for backend services
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Recharts](https://recharts.org/) for charts
- [Lucide](https://lucide.dev/) for icons

## 🔮 Future Enhancements

- Mobile application support
- Advanced analytics features
- Integration with learning management systems
- AI-powered feedback analysis
- Customizable dashboard widgets
- Automated reporting system

## 📧 Contact

For any queries or support, please contact:
- Email: support@sentifeedback.com
- Website: https://sentifeedback.com

---
Made with ❤️ by Your Team Name