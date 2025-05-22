/*
  # Feedback Analytics Schema

  1. New Tables
    - `feedback`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `event_id` (uuid, references events)
      - `rating` (integer)
      - `description` (text)
      - `improvement` (text)
      - `sentiment_score` (decimal)
      - `created_at` (timestamp)
    
    - `events`
      - `id` (uuid, primary key)
      - `name` (text)
      - `institution_id` (uuid, references institutions)
      - `date` (date)
      - `created_at` (timestamp)
    
    - `institutions`
      - `id` (uuid, primary key)
      - `name` (text)
      - `type` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create institutions table
CREATE TABLE IF NOT EXISTS institutions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('school', 'college')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Institutions are viewable by authenticated users"
  ON institutions
  FOR SELECT
  TO authenticated
  USING (true);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  institution_id uuid REFERENCES institutions(id) ON DELETE CASCADE,
  date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Events are viewable by authenticated users"
  ON events
  FOR SELECT
  TO authenticated
  USING (true);

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  description text NOT NULL,
  improvement text,
  sentiment_score decimal CHECK (sentiment_score >= -1 AND sentiment_score <= 1),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Students can view their own feedback
CREATE POLICY "Users can view their own feedback"
  ON feedback
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Students can insert their own feedback
CREATE POLICY "Users can insert their own feedback"
  ON feedback
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Admins can view all feedback for their institution
CREATE POLICY "Admins can view all feedback"
  ON feedback
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users u
      JOIN institutions i ON i.id = u.raw_user_meta_data->>'institution_id'
      JOIN events e ON e.institution_id = i.id
      WHERE u.id = auth.uid()
      AND u.raw_user_meta_data->>'user_type' = 'admin'
      AND e.id = feedback.event_id
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS feedback_user_id_idx ON feedback(user_id);
CREATE INDEX IF NOT EXISTS feedback_event_id_idx ON feedback(event_id);
CREATE INDEX IF NOT EXISTS feedback_created_at_idx ON feedback(created_at);
CREATE INDEX IF NOT EXISTS events_institution_id_idx ON events(institution_id);