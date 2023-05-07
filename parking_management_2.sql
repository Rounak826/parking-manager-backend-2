-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 07, 2023 at 01:06 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `parking_management_2`
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
  `type` int(11) NOT NULL,
  `booking_from` bigint(50) NOT NULL,
  `booking_till` bigint(50) NOT NULL,
  `booked_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `checkout` varchar(30) DEFAULT NULL,
  `charge` int(11) DEFAULT NULL,
  `penalty` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `book_request`
--

CREATE TABLE `book_request` (
  `request_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `booking_from` varchar(50) NOT NULL,
  `booking_till` varchar(50) NOT NULL,
  `booking_id` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `type` int(11) NOT NULL,
  `req_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `codes`
--

CREATE TABLE `codes` (
  `id` int(11) NOT NULL,
  `code` int(11) NOT NULL,
  `message` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `codes`
--

INSERT INTO `codes` (`id`, `code`, `message`) VALUES
(1, 0, 'Request Created'),
(2, 100, 'Processing Request\r\n'),
(3, 102, 'Invalid Request\n'),
(4, 201, 'Slot found'),
(5, 202, 'No Slot found\r\n'),
(6, 300, 'Verifying Vehicle Details\r\n'),
(7, 301, 'Vehicle Verified\r\n'),
(8, 302, 'Vehicle Not Verified\r\n'),
(9, 400, 'Slot Allotted successfully'),
(10, 500, 'Checkout Initiated\r\n'),
(11, 501, 'Checkout Done'),
(12, 502, 'Checkout Failed'),
(13, 600, 'Payment Initiated'),
(14, 601, 'Payment Done'),
(15, 602, 'Payment Failed'),
(16, 603, 'Payment Not Required'),
(17, 700, 'Request Completed');

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
(10, 1, 0, 4, 4),
(14, 1, 1, 5, 5);

-- --------------------------------------------------------

--
-- Table structure for table `parking`
--

CREATE TABLE `parking` (
  `parking_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `mobile` varchar(200) NOT NULL,
  `address` varchar(200) NOT NULL,
  `map` varchar(5000) NOT NULL,
  `image_url` varchar(300) DEFAULT NULL,
  `rate` varchar(200) NOT NULL,
  `penalty_rate` varchar(100) NOT NULL,
  `capacity` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `parking`
--

INSERT INTO `parking` (`parking_id`, `name`, `email`, `mobile`, `address`, `map`, `image_url`, `rate`, `penalty_rate`, `capacity`) VALUES
(1, 'kalinga Parking', 'kalinga@gmail.com', '9752190559', 'New Raipur', 'sad', '', '10', '100', 50),
(2, 'Magneto Mall', 'Magneto@gmail.com', '9752190559', 'Telibandha', 'sad', '', '10', '100', 50);

-- --------------------------------------------------------

--
-- Table structure for table `slots`
--

CREATE TABLE `slots` (
  `slot_id` int(11) NOT NULL,
  `slot_name` varchar(50) DEFAULT NULL,
  `parking_id` int(11) NOT NULL,
  `floor_id` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  `x` int(11) NOT NULL,
  `type` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `slots`
--

INSERT INTO `slots` (`slot_id`, `slot_name`, `parking_id`, `floor_id`, `y`, `x`, `type`) VALUES
(1, NULL, 1, 10, 0, 0, 1),
(2, NULL, 1, 10, 0, 1, 0),
(3, NULL, 1, 10, 0, 2, 0),
(4, NULL, 1, 10, 0, 3, 1),
(5, NULL, 1, 10, 1, 0, 1),
(6, NULL, 1, 10, 1, 1, 0),
(7, NULL, 1, 10, 1, 2, 0),
(8, NULL, 1, 10, 1, 3, 1),
(9, NULL, 1, 10, 2, 0, 0),
(10, NULL, 1, 10, 2, 1, 0),
(11, NULL, 1, 10, 2, 2, 0),
(12, NULL, 1, 10, 2, 3, 1),
(13, NULL, 1, 10, 3, 0, 1),
(14, NULL, 1, 10, 3, 1, 1),
(15, NULL, 1, 10, 3, 2, 1),
(16, NULL, 1, 10, 3, 3, 20),
(17, NULL, 1, 14, 0, 0, 0),
(18, NULL, 1, 14, 0, 1, 0),
(19, NULL, 1, 14, 0, 2, 0),
(20, NULL, 1, 14, 0, 3, 0),
(21, NULL, 1, 14, 0, 4, 0),
(22, NULL, 1, 14, 1, 0, 0),
(23, NULL, 1, 14, 1, 1, 0),
(24, NULL, 1, 14, 1, 2, 0),
(25, NULL, 1, 14, 1, 3, 0),
(26, NULL, 1, 14, 1, 4, 0),
(27, NULL, 1, 14, 2, 0, 0),
(28, NULL, 1, 14, 2, 1, 0),
(29, NULL, 1, 14, 2, 2, 1),
(30, NULL, 1, 14, 2, 3, 1),
(31, NULL, 1, 14, 2, 4, 0),
(32, NULL, 1, 14, 3, 0, 0),
(33, NULL, 1, 14, 3, 1, 0),
(34, NULL, 1, 14, 3, 2, 1),
(35, NULL, 1, 14, 3, 3, 1),
(36, NULL, 1, 14, 3, 4, 0),
(37, NULL, 1, 14, 4, 0, 0),
(38, NULL, 1, 14, 4, 1, 0),
(39, NULL, 1, 14, 4, 2, 0),
(40, NULL, 1, 14, 4, 3, 0),
(41, NULL, 1, 14, 4, 4, 0);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `order_id` varchar(100) NOT NULL,
  `receipt_id` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `parking_id` int(11) NOT NULL,
  `method` varchar(100) DEFAULT NULL,
  `amount` int(11) NOT NULL,
  `currency` varchar(100) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `payment_id` varchar(100) DEFAULT NULL,
  `timestamp` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `email` varchar(200) NOT NULL,
  `mobile` varchar(200) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `role` varchar(100) NOT NULL DEFAULT 'user',
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `name`, `email`, `mobile`, `address`, `role`, `password`) VALUES
(1, NULL, 'kalinga@gmail.com', NULL, NULL, 'parking', '$2b$10$KVv24OFofrp60dTTyHKdkecUZVtlcn.jKRHNy2vgb9h1gZ1mP91..'),
(2, NULL, 'magneto@gmail.com', NULL, NULL, 'parking', '$2b$10$1lmb6p1Fz6MARzWJEBgrd.0pYpAhLfhf2CXuyYS6LcLsUpGXKcCFC');

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
(1, 'car', 'swift dzire', 'CG 28 J4458', 'white', 1);

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
-- Indexes for table `codes`
--
ALTER TABLE `codes`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`order_id`);

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
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `book_request`
--
ALTER TABLE `book_request`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `codes`
--
ALTER TABLE `codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `floors`
--
ALTER TABLE `floors`
  MODIFY `floor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `slots`
--
ALTER TABLE `slots`
  MODIFY `slot_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `vehicle_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
