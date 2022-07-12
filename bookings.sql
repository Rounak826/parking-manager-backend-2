-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 12, 2022 at 12:19 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `parking_management`
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
  `booked_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `checkout` varchar(30) DEFAULT NULL,
  `charge` int(11) DEFAULT NULL,
  `penalty` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`booking_id`, `parking_id`, `slot_id`, `user_id`, `vehicle_id`, `booking_from`, `booking_till`, `booked_at`, `checkout`, `charge`, `penalty`) VALUES
(29, 4, 23, 2, 6, 1657231200000, 1657234800000, '2022-07-08 09:09:24', NULL, NULL, NULL),
(30, 1, 23, 2, 6, 1658268000000, 1658358000000, '2022-07-08 09:09:24', NULL, NULL, NULL),
(31, 4, 7, 3, 6, 1657231200000, 1657234800000, '2022-07-08 09:09:24', '1657594573811', 10, 100),
(46, 4, 7, 3, 5, 1657440295162, 1657033200000, '2022-07-10 08:04:55', '1657589675081', -1131, 2147483647),
(47, 4, 23, 3, 6, 1657557000000, 1657560600000, '2022-07-11 16:29:15', '1657594741102', 10, 1048),
(48, 3, 6, 3, 2, 1657557892965, 1657558800000, '2022-07-11 16:44:52', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`booking_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
