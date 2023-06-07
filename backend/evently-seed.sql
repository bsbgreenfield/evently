INSERT INTO Users (username, password, first_name, last_name, email )
VALUES
('user1', 'password1', 'John', 'Doe', 'john.doe@example.com'),
  ('user2', 'password2', 'Jane', 'Smith', 'jane.smith@example.com'),
  ('user3', 'password3', 'Michael', 'Johnson', 'michael.johnson@example.com'),
  ('user4', 'password4', 'Emily', 'Brown', 'emily.brown@example.com'),
  ('user5', 'password5', 'William', 'Taylor', 'william.taylor@example.com'),
  ('user6', 'password6', 'Olivia', 'Anderson', 'olivia.anderson@example.com'),
  ('user7', 'password7', 'James', 'Martinez', 'james.martinez@example.com'),
  ('user8', 'password8', 'Sophia', 'Wilson', 'sophia.wilson@example.com'),
  ('user9', 'password9', 'Benjamin', 'Lee', 'benjamin.lee@example.com'),
  ('user10', 'password10', 'Ava', 'Thomas', 'ava.thomas@example.com'),
    ('user11', 'password11', 'David', 'Miller', 'david.miller@example.com'),
  ('user12', 'password12', 'Emma', 'Garcia', 'emma.garcia@example.com'),
  ('user13', 'password13', 'Daniel', 'Clark', 'daniel.clark@example.com'),
  ('user14', 'password14', 'Mia', 'Rodriguez', 'mia.rodriguez@example.com'),
  ('user15', 'password15', 'Joseph', 'Lopez', 'joseph.lopez@example.com'),
  ('user16', 'password16', 'Charlotte', 'Harris', 'charlotte.harris@example.com'),
  ('user17', 'password17', 'Alexander', 'Young', 'alexander.young@example.com'),
  ('user18', 'password18', 'Amelia', 'King', 'amelia.king@example.com'),
  ('user19', 'password19', 'Matthew', 'Wright', 'matthew.wright@example.com'),
  ('user20', 'password20', 'Harper', 'Scott', 'harper.scott@example.com');

INSERT INTO Groups (group_name)
VALUES
  ('Family Group'),
  ('Friends Group'),
  ('Work Group');

INSERT INTO Users_Groups (user_id, group_id)
VALUES
  -- User 1 belongs to Group 1 and Group 2
  (1, 1),
  (1, 2),
  -- User 2 belongs to Group 1 and Group 3
  (2, 1),
  (2, 3),
  -- User 3 belongs to Group 2 and Group 3
  (3, 2),
  (3, 3),
  -- User 4 belongs to Group 2 and Group 1
  (4, 2),
  (4, 1),
  -- User 5 belongs to Group 3 and Group 1
  (5, 3),
  (5, 1),
  -- User 6 belongs to Group 3
  (6, 3),
  -- User 7 belongs to Group 1
  (7, 1),
  -- User 8 belongs to Group 2
  (8, 2),
  -- User 9 belongs to Group 3
  (9, 3),
  -- User 10 belongs to Group 1
  (10, 1),
  -- User 11 belongs to Group 2
  (11, 2),
  -- User 12 belongs to Group 3
  (12, 3),
  -- User 13 belongs to Group 1
  (13, 1),
  -- User 14 belongs to Group 2
  (14, 2),
  -- User 15 belongs to Group 3
  (15, 3);

INSERT INTO Events (group_id, event_name, event_date, event_location)
VALUES
  -- Group 1 Events
  (1, 'Event 1', '2023-06-10', 'Location 1'),
  (1, 'Event 2', '2023-06-15', 'Location 2'),
  (1, 'Event 3', '2023-06-20', 'Location 3'),
  -- Group 2 Events
  (2, 'Event 4', '2023-06-12', 'Location 4'),
  (2, 'Event 5', '2023-06-17', 'Location 5'),
  (2, 'Event 6', '2023-06-22', 'Location 6'),
  -- Group 3 Events
  (3, 'Event 7', '2023-06-14', 'Location 7'),
  (3, 'Event 8', '2023-06-19', 'Location 8'),
  (3, 'Event 9', '2023-06-24', 'Location 9'),
  -- Additional Events for each group
  (1, 'Event 10', '2023-06-25', 'Location 10'),
  (1, 'Event 11', '2023-06-27', 'Location 11'),
  (1, 'Event 12', '2023-06-29', 'Location 12');

INSERT INTO Participant (event_id, user_id)
VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (2, 4),
  (2, 5),
  (2, 6),
  (3, 7),
  (3, 8),
  (3, 9),
  (4, 10),
  (4, 11),
  (4, 12),
  (5, 13),
  (5, 14),
  (5, 15),
  (6, 16),
  (6, 17),
  (6, 18),
  (7, 19),
  (7, 20),
  (8, 1),
  (8, 2),
  (9, 3),
  (10, 4),
  (11, 5);

INSERT INTO Invoices (group_id, payer_id, recipient_id, amount, description_text, event_id)
VALUES
  (1, 1, 2, 50, 'Payment for Event 1', 1),
  (1, 3, 1, -20, 'Refund for Event 1', 1),
  (2, 5, 6, 80, 'Payment for Event 2', 2),
  (2, 7, 8, -30, 'Refund for Event 2', 2),
  (3, 10, 12, 70, 'Payment for Event 3', 3),
  (3, 13, 11, -40, 'Refund for Event 3', 3),
  (1, 2, 3, -60, 'Refund for Event 4', 4),
  (2, 4, 5, 90, 'Payment for Event 5', 5),
  (2, 8, 9, -80, 'Refund for Event 6', 6),
  (3, 11, 14, 30, 'Payment for Event 9', 9);

INSERT INTO Messages (group_id, sender_id, content)
VALUES
  (1, 1, 'Hello, how is everyone?' ),
  (1, 2, 'I''m doing great, thanks!' ),
  (1, 3, 'Anyone up for an event this weekend?' ),
  (2, 4, 'I have some exciting news to share!' ),
  (2, 5, 'Tell us, we''re curious!' ),
  (2, 6, 'Can''t wait to hear it!' ),
  (3, 7, 'Reminder: our next meeting is on Friday.' ),
  (3, 8, 'Thanks for the heads up!' ),
  (3, 9, 'I might be late, but I''ll catch up.' ),
  (1, 10, 'Has anyone seen my keys?' ),
  (1, 11, 'Not sure, check the living room.' ),
  (1, 12, 'I''ll help you look for them.' ),
  -- Additional rows for each grou
  (1, 13, 'Let''s plan a group trip!' ),
  (1, 14, 'Great idea! Where should we go?' ),
  (1, 15, 'I suggest visiting the beach.' ),
  (1, 16, 'I''m up for a beach trip!' ),
  (2, 17, 'Who wants to join me for a movie night?' ),
  (2, 18, 'I''m in! What movie are we watching?' ),
  (2, 19, 'I''ll bring the popcorn!' ),
  (2, 20, 'Count me in too!' ),
  (3, 1, 'Let''s organize a potluck dinner.' ),
  (3, 2, 'I''m a great cook, count me in!' ),
  (3, 3, 'I''ll bring my famous dessert.' ),
  (3, 4, 'I''ll make a savory dish.' ),
  (3, 5, 'Looking forward to it!' ),
  -- Additional rows for each grou
  (1, 6, 'We should start a book club.' ),
  (1, 7, 'I''m an avid reader, I''m in!' ),
  (1, 8, 'What genre should we focus on?' ),
  (1, 9, 'I love mystery novels.' ),
  (2, 10, 'Let''s plan a hiking trip!' ),
  (2, 11, 'I know a great trail');
