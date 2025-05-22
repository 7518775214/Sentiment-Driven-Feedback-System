import React, { useState } from 'react';
import { format } from 'date-fns';
import { ChevronDown, ChevronUp, Search, Filter } from 'lucide-react';
import { useFeedback } from '../../contexts/FeedbackContext';

interface FeedbackTableProps {
  institutionId: string;
}

const FeedbackTable: React.FC<FeedbackTableProps> = ({ institutionId }) => {
  const [sortField, setSortField] = useState<string>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState<number | ''>('');
  const [filterSentiment, setFilterSentiment] = useState<string>('all');

  const { feedbacks, events } = useFeedback();

  // Filter feedbacks for this institution
  const institutionFeedbacks = feedbacks.filter(feedback => {
    const event = events.find(e => e.id === feedback.eventId);
    return event?.institutionId === institutionId;
  });

  // Apply filters and search
  const filteredFeedbacks = institutionFeedbacks.filter(feedback => {
    const matchesSearch = searchTerm === '' || 
      feedback.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRating = filterRating === '' || feedback.rating === filterRating;
    
    const matchesSentiment = filterSentiment === 'all' || 
      (filterSentiment === 'positive' && feedback.sentimentScore > 0.3) ||
      (filterSentiment === 'neutral' && feedback.sentimentScore >= -0.3 && feedback.sentimentScore <= 0.3) ||
      (filterSentiment === 'negative' && feedback.sentimentScore < -0.3);

    return matchesSearch && matchesRating && matchesSentiment;
  });

  // Sort feedbacks
  const sortedFeedbacks = [...filteredFeedbacks].sort((a, b) => {
    if (sortField === 'createdAt') {
      return sortDirection === 'asc' 
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortField === 'rating') {
      return sortDirection === 'asc' 
        ? a.rating - b.rating
        : b.rating - a.rating;
    }
    if (sortField === 'sentiment') {
      return sortDirection === 'asc'
        ? a.sentimentScore - b.sentimentScore
        : b.sentimentScore - a.sentimentScore;
    }
    return 0;
  });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getSentimentLabel = (score: number) => {
    if (score > 0.3) return { text: 'Positive', class: 'bg-success-light text-success' };
    if (score < -0.3) return { text: 'Negative', class: 'bg-error-light text-error' };
    return { text: 'Neutral', class: 'bg-warning-light text-warning' };
  };

  const renderSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-slate-200">
      {/* Filters */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search feedback..."
                className="pl-10 w-full form-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <select
              className="form-select"
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value === '' ? '' : Number(e.target.value))}
            >
              <option value="">All Ratings</option>
              {[1, 2, 3, 4, 5].map(rating => (
                <option key={rating} value={rating}>{rating} Stars</option>
              ))}
            </select>

            <select
              className="form-select"
              value={filterSentiment}
              onChange={(e) => setFilterSentiment(e.target.value)}
            >
              <option value="all">All Sentiments</option>
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negative</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                Event
              </th>
              <th 
                className="px-6 py-3 text-left text-sm font-semibold text-slate-900 cursor-pointer"
                onClick={() => handleSort('rating')}
              >
                <div className="flex items-center gap-1">
                  Rating
                  {renderSortIcon('rating')}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                Feedback
              </th>
              <th 
                className="px-6 py-3 text-left text-sm font-semibold text-slate-900 cursor-pointer"
                onClick={() => handleSort('sentiment')}
              >
                <div className="flex items-center gap-1">
                  Sentiment
                  {renderSortIcon('sentiment')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-sm font-semibold text-slate-900 cursor-pointer"
                onClick={() => handleSort('createdAt')}
              >
                <div className="flex items-center gap-1">
                  Date
                  {renderSortIcon('createdAt')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {sortedFeedbacks.map((feedback) => {
              const event = events.find(e => e.id === feedback.eventId);
              const sentiment = getSentimentLabel(feedback.sentimentScore);
              
              return (
                <tr key={feedback.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-900">
                    {event?.name}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`h-5 w-5 ${
                            star <= feedback.rating ? 'text-yellow-400' : 'text-slate-200'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-lg">
                      <p className="text-sm text-slate-900">{feedback.description}</p>
                      {feedback.improvement && (
                        <p className="text-sm text-slate-500 mt-1">
                          <strong>Improvement:</strong> {feedback.improvement}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sentiment.class}`}>
                      {sentiment.text}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {format(new Date(feedback.createdAt), 'MMM d, yyyy HH:mm')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {sortedFeedbacks.length === 0 && (
          <div className="text-center py-12">
            <Filter className="mx-auto h-12 w-12 text-slate-400" />
            <h3 className="mt-2 text-sm font-semibold text-slate-900">No results found</h3>
            <p className="mt-1 text-sm text-slate-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>

      {/* Pagination placeholder */}
      <div className="px-4 py-3 border-t border-slate-200">
        <p className="text-sm text-slate-700">
          Showing <span className="font-medium">{sortedFeedbacks.length}</span> results
        </p>
      </div>
    </div>
  );
};

export default FeedbackTable;