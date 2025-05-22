import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

// Types
interface Event {
  id: string;
  name: string;
  institutionId: string;
  institutionType: 'school' | 'college';
  date: string;
}

interface Feedback {
  id: string;
  userId: string;
  eventId: string;
  rating: number;
  description: string;
  improvement: string;
  sentimentScore: number;
  createdAt: string;
}

interface FeedbackContextType {
  events: Event[];
  feedbacks: Feedback[];
  getEventsByInstitution: (institutionId: string, institutionType: 'school' | 'college') => Event[];
  submitFeedback: (feedback: Omit<Feedback, 'id' | 'sentimentScore' | 'createdAt'>) => Promise<boolean>;
  getFeedbackSummary: (institutionId: string) => FeedbackSummary[];
  getUserFeedback: (userId: string) => Feedback[];
}

interface FeedbackSummary {
  eventId: string;
  eventName: string;
  averageRating: number;
  feedbackCount: number;
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  recentFeedback: Feedback[];
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

// Mock data
const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Annual Sports Day',
    institutionId: '1',
    institutionType: 'school',
    date: '2025-06-15',
  },
  {
    id: '2',
    name: 'Science Fair',
    institutionId: '1',
    institutionType: 'school',
    date: '2025-07-20',
  },
  {
    id: '3',
    name: 'College Fest',
    institutionId: '3',
    institutionType: 'college',
    date: '2025-08-10',
  },
];

export const FeedbackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events] = useState<Event[]>(mockEvents);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(() => {
    const stored = localStorage.getItem('feedbacks');
    return stored ? JSON.parse(stored) : [];
  });
  const { user } = useAuth();

  useEffect(() => {
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  const getEventsByInstitution = (institutionId: string, institutionType: 'school' | 'college') => {
    return events.filter(
      (event) => event.institutionId === institutionId && event.institutionType === institutionType
    );
  };

  const submitFeedback = async (
    feedbackData: Omit<Feedback, 'id' | 'sentimentScore' | 'createdAt'>
  ): Promise<boolean> => {
    try {
      // Simple sentiment analysis based on keywords
      const text = feedbackData.description.toLowerCase();
      const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic'];
      const negativeWords = ['bad', 'poor', 'terrible', 'awful', 'horrible', 'disappointing'];
      
      let sentimentScore = 0;
      positiveWords.forEach(word => {
        if (text.includes(word)) sentimentScore += 0.2;
      });
      negativeWords.forEach(word => {
        if (text.includes(word)) sentimentScore -= 0.2;
      });
      
      // Clamp between -1 and 1
      sentimentScore = Math.max(-1, Math.min(1, sentimentScore));

      const newFeedback: Feedback = {
        id: Math.random().toString(36).substr(2, 9),
        sentimentScore,
        createdAt: new Date().toISOString(),
        ...feedbackData,
      };

      setFeedbacks(prev => [...prev, newFeedback]);
      return true;
    } catch (err) {
      console.error('Error submitting feedback:', err);
      return false;
    }
  };

  const getFeedbackSummary = (institutionId: string): FeedbackSummary[] => {
    return events
      .filter(event => event.institutionId === institutionId)
      .map(event => {
        const eventFeedbacks = feedbacks.filter(f => f.eventId === event.id);
        
        const totalRating = eventFeedbacks.reduce((sum, f) => sum + f.rating, 0);
        const averageRating = eventFeedbacks.length > 0 ? totalRating / eventFeedbacks.length : 0;
        
        const sentimentBreakdown = {
          positive: eventFeedbacks.filter(f => f.sentimentScore > 0.3).length,
          neutral: eventFeedbacks.filter(f => f.sentimentScore >= -0.3 && f.sentimentScore <= 0.3).length,
          negative: eventFeedbacks.filter(f => f.sentimentScore < -0.3).length,
        };
        
        const recentFeedback = [...eventFeedbacks]
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5);
        
        return {
          eventId: event.id,
          eventName: event.name,
          averageRating,
          feedbackCount: eventFeedbacks.length,
          sentimentBreakdown,
          recentFeedback,
        };
      });
  };

  const getUserFeedback = (userId: string): Feedback[] => {
    return feedbacks.filter(feedback => feedback.userId === userId);
  };

  const value = {
    events,
    feedbacks,
    getEventsByInstitution,
    submitFeedback,
    getFeedbackSummary,
    getUserFeedback,
  };

  return <FeedbackContext.Provider value={value}>{children}</FeedbackContext.Provider>;
};

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};