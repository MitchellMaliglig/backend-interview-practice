-- data.sql

INSERT INTO users (username, email) VALUES
('john_doe', 'john@example.com'),
('jane_smith', 'jane@example.com');

INSERT INTO posts (user_id, title, content) VALUES
(1, 'First Post', 'This is the content of the first pizza.'),
(2, 'Hello World', 'This is Jane''s first pizza.');

