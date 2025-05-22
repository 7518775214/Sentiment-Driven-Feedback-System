import React, { useState } from 'react';
import { 
  BarChart, XAxis, YAxis, Bar, Tooltip, ResponsiveContainer, 
  LineChart, Line, CartesianGrid, Legend,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  Calendar, Filter, Download, 
  TrendingUp, MessageSquare, ThumbsUp, ThumbsDown 
} from 'lucide-react';
import { useFeedback } from '../../contexts/FeedbackContext';
import { useAuth } from '../../contexts/AuthContext';

const FeedbackAnalytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('all');
  const [eventFilter, setEventFilter] = useState('all');
  const { user } = useAuth();
  const { getFeedbackSummary, events, feedbacks } = useFeedback();

  const feedbackSummaries = user ? getFeedbackSummary(user.institutionId) : [];
  
  // Calculate overall statistics
  const totalFeedbacks = feedbacks.length;
  const averageRating = feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / totalFeedbacks;
  const positiveFeedbacks = feedbacks.filter(f => f.sentimentScore > 0.3).length;
  const negativeFeedbacks = feedbacks.filter(f => f.sentimentScore < -0.3).length;
  const neutralFeedbacks = totalFeedbacks - positiveFeedbacks - negativeFeedbacks;

  // Prepare data for sentiment trend chart
  const sentimentTrendData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayFeedbacks = feedbacks.filter(f => 
      new Date(f.createdAt).toDateString() === date.toDateString()
    );
    
    return {
      date: date.toLocaleDateString(),
      positive: dayFeedbacks.filter(f => f.sentimentScore > 0.3).length,
      negative: dayFeedbacks.filter(f => f.sentimentScore < -0.3).length,
      neutral: dayFeedbacks.filter(f => f.sentimentScore >= -0.3 && f.sentimentScore <= 0.3).length,
    };
  }).reverse();

  // Prepare data for rating distribution
  const ratingDistribution = Array.from({ length: 5 }, (_, i) => ({
    rating: i + 1,
    count: feedbacks.filter(f => f.rating === i + 1).length,
  }));

  // Prepare data for sentiment distribution
  const sentimentDistribution = [
    { name: 'Positive', value: positiveFeedbacks, color: '#22C55E' },
    { name: 'Neutral', value: neutralFeedbacks, color: '#F59E0B' },
    { name: 'Negative', value: negativeFeedbacks, color: '#EF4444' },
  ];

  // Common chart configurations
  const chartConfig = {
    margin: { top: 20, right: 30, left: 20, bottom: 20 },
  };

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-900">Feedback Analytics</h2>
        
        <div className="flex items-center gap-4">
          <select
            className="form-select"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="all">All Time</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="quarter">Last 90 Days</option>
          </select>

          <select
            className="form-select"
            value={eventFilter}
            onChange={(e) => setEventFilter(e.target.value)}
          >
            <option value="all">All Events</option>
            {events.map(event => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
          </select>

          <button className="btn btn-outline flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Total Feedback</h3>
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <p className="text-3xl font-bold text-slate-900">{totalFeedbacks}</p>
          <p className="text-sm text-slate-500 mt-2">
            From {events.length} events
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Average Rating</h3>
            <TrendingUp className="h-6 w-6 text-secondary" />
          </div>
          <p className="text-3xl font-bold text-slate-900">
            {averageRating.toFixed(1)}
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Out of 5 stars
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Positive Feedback</h3>
            <ThumbsUp className="h-6 w-6 text-success" />
          </div>
          <p className="text-3xl font-bold text-success">
            {((positiveFeedbacks / totalFeedbacks) * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-slate-500 mt-2">
            {positiveFeedbacks} responses
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Negative Feedback</h3>
            <ThumbsDown className="h-6 w-6 text-error" />
          </div>
          <p className="text-3xl font-bold text-error">
            {((negativeFeedbacks / totalFeedbacks) * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-slate-500 mt-2">
            {negativeFeedbacks} responses
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Trend */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Sentiment Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sentimentTrendData} {...chartConfig}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="positive" 
                  stroke="#22C55E" 
                  name="Positive"
                />
                <Line 
                  type="monotone" 
                  dataKey="neutral" 
                  stroke="#F59E0B" 
                  name="Neutral"
                />
                <Line 
                  type="monotone" 
                  dataKey="negative" 
                  stroke="#EF4444" 
                  name="Negative"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Rating Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingDistribution} {...chartConfig}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3366CC" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sentiment Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Sentiment Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {sentimentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Feedback Analysis */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Feedback Analysis</h3>
          <div className="space-y-4">
            {feedbacks.slice(0, 5).map((feedback) => (
              <div 
                key={feedback.id} 
                className="p-4 rounded-lg bg-slate-50 border border-slate-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-600">
                      Rating: {feedback.rating}/5
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      feedback.sentimentScore > 0.3 
                        ? 'bg-success-light text-success'
                        : feedback.sentimentScore < -0.3
                        ? 'bg-error-light text-error'
                        : 'bg-warning-light text-warning'
                    }`}>
                      {feedback.sentimentScore > 0.3 
                        ? 'Positive' 
                        : feedback.sentimentScore < -0.3 
                        ? 'Negative' 
                        : 'Neutral'}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">
                    {new Date(feedback.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-slate-700">{feedback.description}</p>
                {feedback.improvement && (
                  <p className="text-sm text-slate-600 mt-2">
                    <strong>Improvement:</strong> {feedback.improvement}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackAnalytics;