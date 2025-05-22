import React, { useState } from 'react';
import { BarChart, XAxis, YAxis, Bar, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { MessageCircle, AlertCircle, CheckCircle, Search } from 'lucide-react';
import { useFeedback } from '../../contexts/FeedbackContext';
import { useAuth } from '../../contexts/AuthContext';

const SentimentDashboard: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const { user } = useAuth();
  const { getFeedbackSummary, events } = useFeedback();

  const feedbackSummaries = user ? getFeedbackSummary(user.institutionId) : [];
  
  // Get selected event summary or use the first one
  const activeSummary = selectedEventId
    ? feedbackSummaries.find(summary => summary.eventId === selectedEventId)
    : feedbackSummaries[0];

  const handleEventChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEventId(e.target.value);
  };

  // Sentiment color mapping
  const sentimentColors = {
    positive: '#22C55E', // success
    neutral: '#F59E0B',  // warning
    negative: '#EF4444', // error
  };

  // Prepare data for rating distribution chart
  const ratingData = [
    { name: '1 Star', value: 0 },
    { name: '2 Stars', value: 0 },
    { name: '3 Stars', value: 0 },
    { name: '4 Stars', value: 0 },
    { name: '5 Stars', value: 0 },
  ];

  if (activeSummary) {
    // Count ratings from recent feedback as a sample
    activeSummary.recentFeedback.forEach(feedback => {
      const ratingIndex = feedback.rating - 1;
      if (ratingIndex >= 0 && ratingIndex < 5) {
        ratingData[ratingIndex].value += 1;
      }
    });
  }

  // Prepare data for sentiment pie chart
  const sentimentData = activeSummary ? [
    { name: 'Positive', value: activeSummary.sentimentBreakdown.positive },
    { name: 'Neutral', value: activeSummary.sentimentBreakdown.neutral },
    { name: 'Negative', value: activeSummary.sentimentBreakdown.negative },
  ] : [];

  // Overall sentiment score calculation based on breakdown
  const getSentimentScore = () => {
    if (!activeSummary) return 0;
    
    const total = activeSummary.sentimentBreakdown.positive + 
                 activeSummary.sentimentBreakdown.neutral + 
                 activeSummary.sentimentBreakdown.negative;
    
    if (total === 0) return 0;
    
    return ((activeSummary.sentimentBreakdown.positive * 100) / total).toFixed(1);
  };

  // Get sentiment status
  const getSentimentStatus = () => {
    const score = parseFloat(getSentimentScore());
    
    if (score >= 70) return { label: 'Positive', color: sentimentColors.positive, icon: <CheckCircle /> };
    if (score >= 40) return { label: 'Neutral', color: sentimentColors.neutral, icon: <AlertCircle /> };
    return { label: 'Negative', color: sentimentColors.negative, icon: <MessageCircle /> };
  };

  const sentimentStatus = getSentimentStatus();

  // No data available message
  if (!activeSummary) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <AlertCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">No Feedback Data Available</h3>
        <p className="text-slate-600 mb-4">
          There is no feedback data available for analysis yet. Once students submit feedback, insights will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Feedback Analysis Dashboard</h2>
        
        <div className="w-full sm:w-auto mt-3 sm:mt-0">
          <select
            className="form-select"
            value={selectedEventId || activeSummary.eventId}
            onChange={handleEventChange}
          >
            {feedbackSummaries.map(summary => (
              <option key={summary.eventId} value={summary.eventId}>
                {summary.eventName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Average Rating Card */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Average Rating</p>
              <h3 className="text-3xl font-bold mt-1">{activeSummary.averageRating.toFixed(1)}</h3>
            </div>
            <div className="flex -ml-1">
              {[1, 2, 3, 4, 5].map(star => (
                <Star 
                  key={star}
                  filled={star <= Math.round(activeSummary.averageRating)}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-2">From {activeSummary.feedbackCount} responses</p>
        </div>

        {/* Sentiment Score Card */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Overall Sentiment</p>
          <div className="flex items-center mt-1">
            <h3 className="text-3xl font-bold">{getSentimentScore()}%</h3>
            <span 
              className="ml-2 flex items-center text-sm font-medium rounded-full px-2 py-0.5"
              style={{ color: sentimentStatus.color }}
            >
              {React.cloneElement(sentimentStatus.icon as React.ReactElement, { className: 'h-4 w-4 mr-1' })}
              {sentimentStatus.label}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5 mt-2">
            <div 
              className="h-2.5 rounded-full" 
              style={{ 
                width: `${getSentimentScore()}%`,
                backgroundColor: sentimentStatus.color
              }}
            ></div>
          </div>
        </div>

        {/* Feedback Count Card */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Total Feedbacks</p>
          <h3 className="text-3xl font-bold mt-1">{activeSummary.feedbackCount}</h3>
          <div className="flex justify-between text-sm text-slate-500 mt-2">
            <span className="flex items-center">
              <span className="h-2.5 w-2.5 rounded-full bg-success mr-1"></span>
              {activeSummary.sentimentBreakdown.positive} Positive
            </span>
            <span className="flex items-center">
              <span className="h-2.5 w-2.5 rounded-full bg-warning mr-1"></span>
              {activeSummary.sentimentBreakdown.neutral} Neutral
            </span>
            <span className="flex items-center">
              <span className="h-2.5 w-2.5 rounded-full bg-error mr-1"></span>
              {activeSummary.sentimentBreakdown.negative} Negative
            </span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Rating Distribution Chart */}
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <h3 className="text-lg font-semibold mb-4">Rating Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={ratingData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3366CC" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sentiment Breakdown Chart */}
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <h3 className="text-lg font-semibold mb-4">Sentiment Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {sentimentData.map((entry, index) => {
                    let color;
                    if (entry.name === 'Positive') color = sentimentColors.positive;
                    else if (entry.name === 'Neutral') color = sentimentColors.neutral;
                    else color = sentimentColors.negative;
                    
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Feedback */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Feedback</h3>
        
        <div className="overflow-hidden rounded-lg border border-slate-200">
          {activeSummary.recentFeedback.length > 0 ? (
            <ul className="divide-y divide-slate-200">
              {activeSummary.recentFeedback.map((feedback) => {
                let sentimentBadge;
                if (feedback.sentimentScore > 0.3) {
                  sentimentBadge = <span className="badge badge-success">Positive</span>;
                } else if (feedback.sentimentScore >= -0.3) {
                  sentimentBadge = <span className="badge badge-warning">Neutral</span>;
                } else {
                  sentimentBadge = <span className="badge badge-error">Negative</span>;
                }
                
                return (
                  <li key={feedback.id} className="p-4 hover:bg-slate-50">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center mb-1">
                          <div className="flex mr-2">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star 
                                key={star}
                                filled={star <= feedback.rating}
                                small
                              />
                            ))}
                          </div>
                          {sentimentBadge}
                        </div>
                        <p className="text-slate-700">{feedback.description}</p>
                        {feedback.improvement && (
                          <p className="text-slate-500 text-sm mt-1">
                            <strong>Suggestions:</strong> {feedback.improvement}
                          </p>
                        )}
                      </div>
                      <div className="text-xs text-slate-400">
                        {new Date(feedback.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="p-8 text-center">
              <Search className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-1">No Feedback Yet</h4>
              <p className="text-slate-500">
                There is no feedback submitted for this event yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Star component
const Star: React.FC<{ filled: boolean; small?: boolean }> = ({ filled, small = false }) => {
  const size = small ? 'h-4 w-4' : 'h-5 w-5';
  
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      className={`${size} ${filled ? 'text-yellow-500 fill-current' : 'text-slate-300 fill-current'}`}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
};

export default SentimentDashboard;