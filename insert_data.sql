-- ใส่ข้อมูลในตาราง users
INSERT INTO users (name, email) VALUES 
('User1', 'user1@example.com'),
('User2', 'user2@example.com'),
('User3', 'user3@example.com'),
('User4', 'user4@example.com'),
('User5', 'user5@example.com'),
('User6', 'user6@example.com'),
('User7', 'user7@example.com'),
('User8', 'user8@example.com'),
('User9', 'user9@example.com'),
('User10', 'user10@example.com');

-- ใส่ข้อมูลในตาราง songs
INSERT INTO songs (name) VALUES 
('Song1'),
('Song2'),
('Song3'),
('Song4'),
('Song5'),
('Song6'),
('Song7'),
('Song8'),
('Song9'),
('Song10'),
('Song11'),
('Song12'),
('Song13'),
('Song14'),
('Song15'),
('Song16'),
('Song17'),
('Song18'),
('Song19'),
('Song20');

-- ใส่ข้อมูลในตาราง user_songs (ผู้ใช้แต่ละคนชอบ 3 เพลง)
INSERT INTO user_songs (user_id, song_id) VALUES 
(1, 1), (1, 2), (1, 3),
(2, 4), (2, 5), (2, 6),
(3, 7), (3, 8), (3, 9),
(4, 10), (4, 11), (4, 12),
(5, 13), (5, 14), (5, 15),
(6, 16), (6, 17), (6, 18),
(7, 19), (7, 20), (7, 1),
(8, 2), (8, 3), (8, 4),
(9, 5), (9, 6), (9, 7),
(10, 8), (10, 9), (10, 10);
