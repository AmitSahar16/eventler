-- Sample user data
INSERT INTO users (id, email, username, password)
VALUES ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'test@eventler.com', 'testuser', 'hashedpassword');

-- Sample user preferences
INSERT INTO user_preferences (user_id, budget, location, event_type, atmosphere, transportation)
VALUES ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 100, 'Tel Aviv', 'outdoor', 'casual', 'public');
