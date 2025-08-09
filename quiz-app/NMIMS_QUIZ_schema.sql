-- NMIMS_QUIZ: Complete MySQL Schema for Quiz App

CREATE DATABASE IF NOT EXISTS NMIMS_QUIZ;
USE NMIMS_QUIZ;

-- Users table (hosts and participants)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role ENUM('host', 'participant') NOT NULL DEFAULT 'participant',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quizzes table
CREATE TABLE quizzes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    negative_marking BOOLEAN DEFAULT FALSE,
    team_mode BOOLEAN DEFAULT FALSE,
    status ENUM('draft', 'active', 'completed') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Quiz sessions (each time a quiz is run)
CREATE TABLE quiz_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NOT NULL,
    host_id INT NOT NULL,
    status ENUM('waiting', 'active', 'completed') DEFAULT 'waiting',
    started_at TIMESTAMP NULL,
    ended_at TIMESTAMP NULL,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE,
    FOREIGN KEY (host_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Participants in a session
CREATE TABLE session_participants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id INT NOT NULL,
    user_id INT NOT NULL,
    join_code VARCHAR(10),
    score INT DEFAULT 0,
    streak INT DEFAULT 0,
    accuracy FLOAT DEFAULT 0,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES quiz_sessions(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Questions for each quiz
CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NOT NULL,
    type ENUM('multiple-choice', 'true-false', 'short-answer') NOT NULL,
    question TEXT NOT NULL,
    correct_answer VARCHAR(255),
    time_limit INT DEFAULT 30,
    points INT DEFAULT 100,
    category VARCHAR(100),
    media_type ENUM('image', 'video'),
    media_url VARCHAR(255),
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

-- Options for multiple-choice questions
CREATE TABLE options (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT NOT NULL,
    option_text VARCHAR(255) NOT NULL,
    option_index INT NOT NULL,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- Answers given by participants (with timing, streak, points, etc.)
CREATE TABLE answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_participant_id INT NOT NULL,
    question_id INT NOT NULL,
    selected_option VARCHAR(255),
    is_correct BOOLEAN,
    time_taken INT, -- seconds
    points_awarded INT,
    streak_at_time INT,
    answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_participant_id) REFERENCES session_participants(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- Historical performance for analytics
CREATE TABLE participant_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    quiz_id INT NOT NULL,
    total_sessions INT DEFAULT 0,
    total_score INT DEFAULT 0,
    total_correct INT DEFAULT 0,
    total_questions INT DEFAULT 0,
    best_streak INT DEFAULT 0,
    last_played TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
); 