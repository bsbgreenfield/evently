--users 
CREATE TABLE Users (
  id serial PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  username VARCHAR(50) NOT NULL,
  password TEXT NOT NULL,
  icon TEXT 
);

-- Group Table
CREATE TABLE Groups (
  id serial PRIMARY KEY,
  group_name VARCHAR(100) NOT NULL,
  icon TEXT
);

-- User_Group Table
CREATE TABLE Users_Groups (
  id serial PRIMARY KEY,
  user_id INT NOT NULL,
  group_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (group_id) REFERENCES Groups(id) ON DELETE CASCADE
);

-- Event Table
CREATE TABLE Events (
  id serial PRIMARY KEY,
  group_id INT,
  event_name VARCHAR(100) NOT NULL,
  event_date DATE NOT NULL,
  event_location TEXT,
  FOREIGN KEY (group_id) REFERENCES Groups(id) ON DELETE CASCADE
);
CREATE TABLE Invites (
  id serial PRIMARY KEY,
  from_user INT,
  to_user INT,
  group_id INT,
  FOREIGN KEY (from_user) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (to_user) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (group_id) REFERENCES Groups(id) ON DELETE CASCADE
);

-- Participant Table
CREATE TABLE Participant (
  id serial PRIMARY KEY,
  event_id INT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (event_id) REFERENCES Events(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Balance Sheet Table
CREATE TABLE Invoices (
  id serial PRIMARY KEY,
  group_id INT,
  payer_id INT NOT NULL,
  recipient_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  description_text TEXT,
  event_id INT,
  FOREIGN KEY (group_id) REFERENCES Groups(id) ON DELETE CASCADE,
  FOREIGN KEY (payer_id) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (recipient_id) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (event_id) REFERENCES Events(id) ON DELETE CASCADE
);

-- Photo Table
CREATE TABLE Media (
  id serial PRIMARY KEY,
  poster_id INT NOT NULL, 
  group_id INT NOT NULL,
  event_id INT,
  photo_url VARCHAR(200),
  caption VARCHAR(200),
  FOREIGN KEY (group_id) REFERENCES Groups(id) ON DELETE CASCADE,
  FOREIGN KEY (event_id) REFERENCES Events(id) ON DELETE CASCADE,
  FOREIGN KEY (poster_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Message Table
CREATE TABLE Messages (
  id serial PRIMARY KEY,
  group_id INT NOT NULL,
  sender_id INT NOT NULL,
  content TEXT NOT NULL,
  timestamp text,
  FOREIGN KEY (group_id) REFERENCES Groups(id) ON DELETE CASCADE,
  FOREIGN KEY (sender_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Poll Table
CREATE TABLE Polls (
  id serial PRIMARY KEY,
  group_id INT NOT NULL,
  poll_question VARCHAR(200) NOT NULL,
  FOREIGN KEY (group_id) REFERENCES Groups(id) ON DELETE CASCADE
);

CREATE TABLE Options (
  id serial PRIMARY KEY,
  poll_id INT NOT NULL,
  option_text VARCHAR(200) NOT NULL,
  event_id INT,
  FOREIGN KEY (poll_id) REFERENCES Polls(id) ON DELETE CASCADE,
  FOREIGN KEY (event_id) REFERENCES Events(id) ON DELETE CASCADE
);
-- Vote Table
CREATE TABLE Vote (
  id serial PRIMARY KEY,
  poll_id INT NOT NULL,
  user_id INT NOT NULL,
  option_id INT NOT NULL,
  FOREIGN KEY (poll_id) REFERENCES Polls(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (option_id) REFERENCES Options(id) ON DELETE CASCADE
);

-- Poll Option Table
