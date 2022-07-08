-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 08, 2022 at 09:03 AM
-- Server version: 8.0.13-4
-- PHP Version: 7.2.24-0ubuntu0.18.04.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `FD2e9bxeWt`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `booking_id` int(11) NOT NULL,
  `parking_id` int(11) NOT NULL,
  `slot_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `booking_from` bigint(50) NOT NULL,
  `booking_till` bigint(50) NOT NULL,
  `booked_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`booking_id`, `parking_id`, `slot_id`, `user_id`, `vehicle_id`, `booking_from`, `booking_till`) VALUES
(29, 4, 23, 2, 6, 1657231200000, 1657234800000),
(30, 1, 23, 2, 6, 1658268000000, 1658358000000),
(31, 4, 22, 3, 6, 1657231200000, 1657234800000);

-- --------------------------------------------------------

--
-- Table structure for table `book_request`
--

CREATE TABLE `book_request` (
  `request_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `booking_from` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `booking_till` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `req_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `book_request`
--

INSERT INTO `book_request` (`request_id`, `user_id`, `vehicle_id`, `booking_from`, `booking_till`, `status`, `type`) VALUES
(1, 2, 1, '2022-07-5 15:30:00', '2022-07-5 20:30:00', 1, 1),
(2, 4, 1, '2022-07-5 15:30:00', '2022-07-5 20:30:00', 0, 1),
(3, 3, 5, '2022-07-5 15:30:00', '2022-07-5 20:30:00', 0, 1),
(4, 5, 5, '2022-07-5 15:30:00', '2022-07-5 20:30:00', 0, 1),
(5, 3, 5, '2022-07-5 15:30:00', '2022-07-5 20:30:00', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `floors`
--

CREATE TABLE `floors` (
  `floor_id` int(11) NOT NULL,
  `parking_id` int(11) NOT NULL,
  `floor_no` int(11) NOT NULL,
  `grid_row` int(11) NOT NULL,
  `grid_column` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `floors`
--

INSERT INTO `floors` (`floor_id`, `parking_id`, `floor_no`, `grid_row`, `grid_column`) VALUES
(5, 4, 0, 5, 10);

-- --------------------------------------------------------

--
-- Table structure for table `parking`
--

CREATE TABLE `parking` (
  `parking_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `mobile` varchar(200) NOT NULL,
  `mobile2` varchar(200) NOT NULL,
  `address` varchar(200) NOT NULL,
  `map` varchar(200) NOT NULL,
  `image_url` varchar(300) NOT NULL,
  `rate` varchar(200) NOT NULL,
  `penalty_rate` varchar(100) NOT NULL,
  `capacity` int(50) NOT NULL,
  `facilities` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `upi_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `parking`
--

INSERT INTO `parking` (`parking_id`, `name`, `email`, `mobile`, `mobile2`, `address`, `map`, `image_url`, `rate`, `penalty_rate`, `capacity`, `facilities`, `upi_id`) VALUES
(3, 'Test Parking', 'parking@gmail.com', '7889878156', '8544885513', 'Magneto Mall , arang road, telibandha', 'https://maps.google.com', 'https://xyzclkcalknnalds.com/adasda.jpg', '10', '100', 60, NULL, 'xyz@ok.icici'),
(4, 'Test Parking', 'parking@gmail.com', '7889878156', '8544885513', 'Magneto Mall , arang road, telibandha', 'https://maps.google.com', 'https://xyzclkcalknnalds.com/adasda.jpg', '10', '100', 60, '24/7, Fire System, Multilevel, CCTV', 'xyz@ok.icici');

-- --------------------------------------------------------

--
-- Table structure for table `slots`
--

CREATE TABLE `slots` (
  `slot_id` int(11) NOT NULL,
  `parking_id` int(11) NOT NULL,
  `floor_id` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  `x` int(11) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'free',
  `user_id` int(11) DEFAULT NULL,
  `specially_abled_friendly` tinyint(4) NOT NULL DEFAULT '0',
  `type` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `slots`
--

INSERT INTO `slots` (`slot_id`, `parking_id`, `floor_id`, `y`, `x`, `status`, `user_id`, `specially_abled_friendly`, `type`) VALUES
(6, 4, 5, 1, 1, 'free', NULL, 0, 1),
(7, 4, 5, 1, 2, 'free', NULL, 0, 1),
(8, 4, 5, 1, 3, 'free', NULL, 0, 1),
(9, 4, 5, 1, 4, 'free', NULL, 0, 1),
(10, 4, 5, 1, 5, 'free', NULL, 0, 0),
(11, 4, 5, 1, 6, 'free', NULL, 0, 1),
(12, 4, 5, 1, 7, 'free', NULL, 0, 1),
(13, 4, 5, 1, 8, 'free', NULL, 0, 1),
(14, 4, 5, 1, 9, 'free', NULL, 0, 1),
(15, 4, 5, 1, 10, 'free', NULL, 0, 1),
(16, 4, 5, 2, 1, 'free', NULL, 0, 1),
(17, 4, 5, 2, 2, 'free', NULL, 0, 1),
(18, 4, 5, 2, 3, 'free', NULL, 0, 1),
(19, 4, 5, 2, 4, 'free', NULL, 0, 1),
(20, 4, 5, 2, 5, 'free', NULL, 0, 0),
(21, 4, 5, 2, 6, 'free', NULL, 0, 1),
(22, 4, 5, 2, 7, 'free', NULL, 0, 1),
(23, 4, 5, 2, 8, 'free', NULL, 0, 1),
(24, 4, 5, 2, 9, 'free', NULL, 0, 1),
(25, 4, 5, 2, 10, 'free', NULL, 0, 1),
(26, 4, 5, 3, 1, 'free', NULL, 0, 2),
(27, 4, 5, 3, 10, 'free', NULL, 0, 3);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `mobile` varchar(200) NOT NULL,
  `mobile_2` varchar(200) NOT NULL,
  `address` varchar(200) NOT NULL,
  `role` varchar(100) NOT NULL DEFAULT 'user',
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `name`, `email`, `mobile`, `mobile_2`, `address`, `role`, `password`) VALUES
(3, 'user', 'user@gmail.com', '9752190950', '8712358865', 'xyz, capital, Raipur', 'user', '$2b$10$YuB4Sjiq4peV179nuygKQOgbjmFEulzfzQAG3UwjUxaWHh/b7/LoC'),
(4, 'parking', 'parking@gmail.com', '9752190951', '8712358865', 'parking, capital, Raipur', 'parking', '$2b$10$KYXHvwnE5nT1uS0uFlEjae67JJCKXYSUTZPE.7IVH4zawqFht0Og6'),
(5, 'ruhi', 'ruhi@gmail.com', '23456789', '123456789', 'xyz, capital, city', 'user', '$2b$10$JmCMaW9agmOT8xeqBI.08uM8QEtMMJO0L7rp6fiUfNuF8RrvCFC3y'),
(6, 'parking', 'Tejas@gmail.com', '9752190951', '8712358865', 'parking, capital, Raipur', 'user', '$2b$10$ETTWUR5.Z3hyzLCJciCty.wusSi2FvS1cXDVZcVmZztvvpbu0kIim');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `vehicle_id` int(11) NOT NULL,
  `type` varchar(100) NOT NULL,
  `model` varchar(200) NOT NULL,
  `plate_no` varchar(100) NOT NULL,
  `color` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`vehicle_id`, `type`, `model`, `plate_no`, `color`, `user_id`) VALUES
(5, 'bike', 'honda city', 'cg 90 gh 2321', 'blue', 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`booking_id`);

--
-- Indexes for table `book_request`
--
ALTER TABLE `book_request`
  ADD PRIMARY KEY (`request_id`);

--
-- Indexes for table `floors`
--
ALTER TABLE `floors`
  ADD PRIMARY KEY (`floor_id`);

--
-- Indexes for table `parking`
--
ALTER TABLE `parking`
  ADD PRIMARY KEY (`parking_id`);

--
-- Indexes for table `slots`
--
ALTER TABLE `slots`
  ADD PRIMARY KEY (`slot_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`vehicle_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `book_request`
--
ALTER TABLE `book_request`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `floors`
--
ALTER TABLE `floors`
  MODIFY `floor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `slots`
--
ALTER TABLE `slots`
  MODIFY `slot_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `vehicle_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
