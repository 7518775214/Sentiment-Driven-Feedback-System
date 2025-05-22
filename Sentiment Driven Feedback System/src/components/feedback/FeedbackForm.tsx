import React, { useState, useEffect } from 'react';
import { Star, Send, ThumbsUp } from 'lucide-react';
import Button from '../common/Button';
import { useFeedback } from '../../contexts/FeedbackContext';
import { useAuth } from '../../contexts/AuthContext';

const FeedbackForm: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [improvement, setImprovement] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { user, institutionType } = useAuth();
  const { events, submitFeedback, getEventsByInstitution } = useFeedback();

  const institutionEvents = user ? getEventsByInstitution(user.institutionId, institutionType as 'school' | 'college') : [];

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleRatingHover = (value: number) => {
    setHoverRating(value);
  };

  const handleRatingLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedEventId) {
      setError('Please select an event');
      return;
    }

    if (rating === 0) {
      setError('Please provide a rating');
      return;
    }

    if (!description) {
      setError('Please provide a description of your experience');
      return;
    }

    setIsLoading(true);

    try {
      const feedbackData = {
        userId: user?.id || '',
        eventId: selectedEventId,
        rating,
        description,
        improvement,
      };

      const success = await submitFeedback(feedbackData);
      
      if (success) {
        setShowThankYou(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setSelectedEventId('');
          setRating(0);
          setDescription('');
          setImprovement('');
          setShowThankYou(false);
        }, 3000);
      } else {
        setError('Failed to submit feedback. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // UI elements for star ratings
  const renderStars = () => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          className={`focus:outline-none transition-colors ${
            (hoverRating || rating) >= i
              ? 'text-yellow-500'
              : 'text-slate-300'
          }`}
          onClick={() => handleRatingChange(i)}
          onMouseEnter={() => handleRatingHover(i)}
          onMouseLeave={handleRatingLeave}
        >
          <Star className="w-8 h-8 fill-current" />
        </button>
      );
    }
    
    return stars;
  };

  // Thank You Modal
  const renderThankYouModal = () => {
    if (!showThankYou) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full animate-slide-in-up">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-success-light">
              <ThumbsUp className="h-8 w-8 text-success" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h3>
            <p className="text-slate-600 mb-6">
              Your valuable feedback has been successfully submitted.
            </p>
            <Button 
              variant="primary" 
              onClick={() => setShowThankYou(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Submit Feedback</h2>

        {error && (
          <div className="bg-error-light text-error p-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="event" className="form-label">
              Select Event
            </label>
            <select
              id="event"
              className="form-select"
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              required
            >
              <option value="">Choose an event</option>
              {institutionEvents.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name} ({new Date(event.date).toLocaleDateString()})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="form-label">Rate your experience</label>
            <div className="flex space-x-2 mt-2">
              {renderStars()}
            </div>
            <div className="text-sm text-slate-500 mt-1">
              {rating === 1 && 'Poor'}
              {rating === 2 && 'Fair'}
              {rating === 3 && 'Good'}
              {rating === 4 && 'Very Good'}
              {rating === 5 && 'Excellent'}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="form-label">
              How was your experience?
            </label>
            <textarea
              id="description"
              rows={4}
              className="form-input"
              placeholder="Please share your detailed experience..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="mb-6">
            <label htmlFor="improvement" className="form-label">
              Suggestions for improvement
            </label>
            <textarea
              id="improvement"
              rows={3}
              className="form-input"
              placeholder="Any tips or suggestions to make this event better?"
              value={improvement}
              onChange={(e) => setImprovement(e.target.value)}
            ></textarea>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
            leftIcon={<Send className="h-5 w-5" />}
          >
            Submit Feedback
          </Button>
        </form>
      </div>

      {renderThankYouModal()}
    </>
  );
};

export default FeedbackForm;