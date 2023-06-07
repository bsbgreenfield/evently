INSERT INTO Users (id, username, password, first_name, last_name, email )
VALUES
(1, 'user1', 'password1', 'John', 'Doe', 'john.doe@example.com'),
  (2, 'user2', 'password2', 'Jane', 'Smith', 'jane.smith@example.com'),
  (3, 'user3', 'password3', 'Michael', 'Johnson', 'michael.johnson@example.com'),
  (4, 'user4', 'password4', 'Emily', 'Brown', 'emily.brown@example.com'),
  (5, 'user5', 'password5', 'William', 'Taylor', 'william.taylor@example.com'),
  (6, 'user6', 'password6', 'Olivia', 'Anderson', 'olivia.anderson@example.com'),
  (7, 'user7', 'password7', 'James', 'Martinez', 'james.martinez@example.com'),
  (8, 'user8', 'password8', 'Sophia', 'Wilson', 'sophia.wilson@example.com'),
  (9, 'user9', 'password9', 'Benjamin', 'Lee', 'benjamin.lee@example.com'),
  (10, 'user10', 'password10', 'Ava', 'Thomas', 'ava.thomas@example.com'),
    (11, 'user11', 'password11', 'David', 'Miller', 'david.miller@example.com'),
  (12, 'user12', 'password12', 'Emma', 'Garcia', 'emma.garcia@example.com'),
  (13, 'user13', 'password13', 'Daniel', 'Clark', 'daniel.clark@example.com'),
  (14, 'user14', 'password14', 'Mia', 'Rodriguez', 'mia.rodriguez@example.com'),
  (15, 'user15', 'password15', 'Joseph', 'Lopez', 'joseph.lopez@example.com'),
  (16, 'user16', 'password16', 'Charlotte', 'Harris', 'charlotte.harris@example.com'),
  (17, 'user17', 'password17', 'Alexander', 'Young', 'alexander.young@example.com'),
  (18, 'user18', 'password18', 'Amelia', 'King', 'amelia.king@example.com'),
  (19, 'user19', 'password19', 'Matthew', 'Wright', 'matthew.wright@example.com'),
  (20, 'user20', 'password20', 'Harper', 'Scott', 'harper.scott@example.com');

INSERT INTO Groups (id, group_name)
VALUES
  (1, 'Family Group'),
  (2, 'Friends Group'),
  (3, 'Work Group');

INSERT INTO Users_Groups (id, user_id, group_id)
VALUES
  -- User 1 belongs to Group 1 and Group 2
  (1, 1, 1),
  (2, 1, 2),
  -- User 2 belongs to Group 1 and Group 3
  (3, 2, 1),
  (4, 2, 3),
  -- User 3 belongs to Group 2 and Group 3
  (5, 3, 2),
  (6, 3, 3),
  -- User 4 belongs to Group 2 and Group 1
  (7, 4, 2),
  (8, 4, 1),
  -- User 5 belongs to Group 3 and Group 1
  (9, 5, 3),
  (10, 5, 1),
  -- User 6 belongs to Group 3
  (11, 6, 3),
  -- User 7 belongs to Group 1
  (12, 7, 1),
  -- User 8 belongs to Group 2
  (13, 8, 2),
  -- User 9 belongs to Group 3
  (14, 9, 3),
  -- User 10 belongs to Group 1
  (15, 10, 1),
  -- User 11 belongs to Group 2
  (16, 11, 2),
  -- User 12 belongs to Group 3
  (17, 12, 3),
  -- User 13 belongs to Group 1
  (18, 13, 1),
  -- User 14 belongs to Group 2
  (19, 14, 2),
  -- User 15 belongs to Group 3
  (20, 15, 3);

INSERT INTO Events (id, group_id, event_name, event_date, event_location)
VALUES
  -- Group 1 Events
  (1, 1, 'Event 1', '2023-06-10', 'Location 1'),
  (2, 1, 'Event 2', '2023-06-15', 'Location 2'),
  (3, 1, 'Event 3', '2023-06-20', 'Location 3'),
  -- Group 2 Events
  (4, 2, 'Event 4', '2023-06-12', 'Location 4'),
  (5, 2, 'Event 5', '2023-06-17', 'Location 5'),
  (6, 2, 'Event 6', '2023-06-22', 'Location 6'),
  -- Group 3 Events
  (7, 3, 'Event 7', '2023-06-14', 'Location 7'),
  (8, 3, 'Event 8', '2023-06-19', 'Location 8'),
  (9, 3, 'Event 9', '2023-06-24', 'Location 9'),
  -- Additional Events for each group
  (10, 1, 'Event 10', '2023-06-25', 'Location 10'),
  (11, 2, 'Event 11', '2023-06-27', 'Location 11'),
  (12, 3, 'Event 12', '2023-06-29', 'Location 12');

INSERT INTO Participant (id, event_id, user_id)
VALUES
  (1, 1, 1),
  (2, 1, 2),
  (3, 1, 3),
  (4, 2, 4),
  (5, 2, 5),
  (6, 2, 6),
  (7, 3, 7),
  (8, 3, 8),
  (9, 3, 9),
  (10, 4, 10),
  (11, 4, 11),
  (12, 4, 12),
  (13, 5, 13),
  (14, 5, 14),
  (15, 5, 15),
  (16, 6, 16),
  (17, 6, 17),
  (18, 6, 18),
  (19, 7, 19),
  (20, 7, 20),
  (21, 8, 1),
  (22, 8, 2),
  (23, 9, 3),
  (24, 10, 4),
  (25, 11, 5);

INSERT INTO Invoices (id, group_id, payer_id, recipient_id, amount, description_text, event_id)
VALUES
  (1, 1, 1, 2, 50, 'Payment for Event 1', 1),
  (2, 1, 3, 1, -20, 'Refund for Event 1', 1),
  (3, 2, 5, 6, 80, 'Payment for Event 2', 2),
  (4, 2, 7, 8, -30, 'Refund for Event 2', 2),
  (5, 3, 10, 12, 70, 'Payment for Event 3', 3),
  (6, 3, 13, 11, -40, 'Refund for Event 3', 3),
  (7, 1, 2, 3, -60, 'Refund for Event 4', 4),
  (8, 2, 4, 5, 90, 'Payment for Event 5', 5),
  (9, 2, 8, 9, -80, 'Refund for Event 6', 6),
  (10, 3, 11, 14, 30, 'Payment for Event 9', 9);

INSERT INTO Messages (id, group_id, sender_id, content)
VALUES
  (1, 1, 1, 'Hello, how is everyone?' ),
  (2, 1, 2, 'I''m doing great, thanks!' ),
  (3, 1, 3, 'Anyone up for an event this weekend?' ),
  (4, 2, 4, 'I have some exciting news to share!' ),
  (5, 2, 5, 'Tell us, we''re curious!' ),
  (6, 2, 6, 'Can''t wait to hear it!' ),
  (7, 3, 7, 'Reminder: our next meeting is on Friday.' ),
  (8, 3, 8, 'Thanks for the heads up!' ),
  (9, 3, 9, 'I might be late, but I''ll catch up.' ),
  (10, 1, 10, 'Has anyone seen my keys?' ),
  (11, 1, 11, 'Not sure, check the living room.' ),
  (12, 1, 12, 'I''ll help you look for them.' ),
  -- Additional rows for each grou
  (13, 1, 13, 'Let''s plan a group trip!' ),
  (14, 1, 14, 'Great idea! Where should we go?' ),
  (15, 1, 15, 'I suggest visiting the beach.' ),
  (16, 1, 16, 'I''m up for a beach trip!' ),
  (17, 2, 17, 'Who wants to join me for a movie night?' ),
  (18, 2, 18, 'I''m in! What movie are we watching?' ),
  (19, 2, 19, 'I''ll bring the popcorn!' ),
  (20, 2, 20, 'Count me in too!' ),
  (21, 3, 1, 'Let''s organize a potluck dinner.' ),
  (22, 3, 2, 'I''m a great cook, count me in!' ),
  (23, 3, 3, 'I''ll bring my famous dessert.' ),
  (24, 3, 4, 'I''ll make a savory dish.' ),
  (25, 3, 5, 'Looking forward to it!' ),
  -- Additional rows for each grou
  (26, 1, 6, 'We should start a book club.' ),
  (27, 1, 7, 'I''m an avid reader, I''m in!' ),
  (28, 1, 8, 'What genre should we focus on?' ),
  (29, 1, 9, 'I love mystery novels.' ),
  (30, 2, 10, 'Let''s plan a hiking trip!' ),
  (31, 2, 11, 'I know a great trail');
