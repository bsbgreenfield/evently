--users 
CREATE TABLE Users (
  id INT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  icon TEXT 
);

-- Group Table
CREATE TABLE Groups (
  id INT PRIMARY KEY,
  group_name VARCHAR(100) NOT NULL,
  icon TEXT
);

-- User_Group Table
CREATE TABLE Users_Groups (
  id INT PRIMARY KEY,
  user_id INT NOT NULL,
  group_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(id),
  FOREIGN KEY (group_id) REFERENCES Groups(id)
);

-- Event Table
CREATE TABLE Events (
  id INT PRIMARY KEY,
  group_id INT NOT NULL,
  event_name VARCHAR(100) NOT NULL,
  event_date DATE NOT NULL,
  event_location TEXT,
  FOREIGN KEY (group_id) REFERENCES Groups(id)
);

-- Participant Table
CREATE TABLE Participant (
  id INT PRIMARY KEY,
  event_id INT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (event_id) REFERENCES Events(id),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Balance Sheet Table
CREATE TABLE Invoices (
  id INT PRIMARY KEY,
  group_id INT,
  payer_id INT NOT NULL,
  recipient_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  description_text TEXT,
  event_id INT,
  FOREIGN KEY (group_id) REFERENCES Groups(id),
  FOREIGN KEY (payer_id) REFERENCES Users(id),
  FOREIGN KEY (recipient_id) REFERENCES Users(id),
  FOREIGN KEY (event_id) REFERENCES Events(id)
);

-- Photo Table
CREATE TABLE Media (
  id INT PRIMARY KEY,
  poster_id INT NOT NULL, 
  group_id INT NOT NULL,
  event_id INT,
  photo_url VARCHAR(200),
  caption VARCHAR(200),
  FOREIGN KEY (group_id) REFERENCES Groups(id),
  FOREIGN KEY (event_id) REFERENCES Events(id),
  FOREIGN KEY (poster_id) REFERENCES Users(id)
);

-- Message Table
CREATE TABLE Messages (
  id INT PRIMARY KEY,
  group_id INT NOT NULL,
  sender_id INT NOT NULL,
  content TEXT NOT NULL,
  timestamp text,
  FOREIGN KEY (group_id) REFERENCES Groups(id),
  FOREIGN KEY (sender_id) REFERENCES Users(id)
);

-- Poll Table
CREATE TABLE Polls (
  id INT PRIMARY KEY,
  group_id INT NOT NULL,
  poll_question VARCHAR(200) NOT NULL,
  FOREIGN KEY (group_id) REFERENCES Groups(id)
);

-- Vote Table
CREATE TABLE Vote (
  vote_id INT PRIMARY KEY,
  poll_id INT NOT NULL,
  user_id INT NOT NULL,
  option_id INT NOT NULL,
  FOREIGN KEY (poll_id) REFERENCES Polls(id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (option_id) REFERENCES Options(id)
);

-- Poll Option Table
CREATE TABLE Options (
  id INT PRIMARY KEY,
  poll_id INT NOT NULL,
  option_text VARCHAR(200) NOT NULL,
  event_id INT,
  FOREIGN KEY (poll_id) REFERENCES Polls(id),
  FOREIGN KEY (event_id) REFERENCES Events(id)
);