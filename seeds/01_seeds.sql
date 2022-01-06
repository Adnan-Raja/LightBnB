INSERT INTO users (name, email, password)
VALUES ('John', 'john@abc.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Mike', 'Mike@abc.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Ryan', 'Ryan@abc.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, active, province, city, country, street, post_code) 
VALUES ('title1', 'description', 1, 'https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg', 'https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&h=350', 13562, 6, 9, 2, true, 'Prince Edward Island', 'Summerside', 'Canada', '893 Petmi Glen', '94780'),
('title2', 'description', 2, 'https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg', 'https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&h=350', 13562, 6, 9, 2, true, 'Prince Edward Island', 'Summerside', 'Canada', '893 Petmi Glen', '94780'),
('title3', 'description', 3, 'https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg', 'https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&h=350', 13562, 6, 9, 2, true, 'Prince Edward Island', 'Summerside', 'Canada', '893 Petmi Glen', '94780');

INSERT INTO reservations (guest_id, property_id, start_date, end_date)
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14');

INSERT INTO property_reviews (
guest_id, property_id, reservation_id, rating, message) 
VALUES (1, 1, 1, 5, 'message'),
(2, 2, 2, 4, 'message'),
(3, 3, 3, 5, 'message');