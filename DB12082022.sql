-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 12, 2022 at 04:41 AM
-- Server version: 8.0.13-4
-- PHP Version: 7.2.24-0ubuntu0.18.04.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

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
  `type` int(11) NOT NULL,
  `booking_from` bigint(50) NOT NULL,
  `booking_till` bigint(50) NOT NULL,
  `booked_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `checkout` varchar(30) DEFAULT NULL,
  `charge` int(11) DEFAULT NULL,
  `penalty` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`booking_id`, `parking_id`, `slot_id`, `user_id`, `vehicle_id`, `type`, `booking_from`, `booking_till`, `checkout`, `charge`, `penalty`) VALUES
(98, 4, 6, 3, 7, 0, 1658218089854, 1658241420000, '1658254122558', 65, 0),
(99, 4, 22, 3, 7, 1, 1658334300000, 1658337660000, NULL, 9, 0),
(100, 4, 6, 3, 8, 0, 1658588298441, 1658611620000, '1658793771407', 65, 0),
(101, 4, 6, 3, 7, 0, 1658764886414, 1658768400000, '1658807372087', 10, 0),
(102, 4, 9, 3, 8, 0, 1658771913724, 1658795280000, '1658807981811', 65, 0),
(103, 4, 22, 3, 8, 1, 1658807700000, 1658818500000, NULL, 30, 0),
(104, 4, 6, 3, 8, 0, 1659022823221, 1659046200000, '1659058956102', 65, 0),
(105, 4, 9, 3, 8, 0, 1659024695887, 1659048000000, NULL, NULL, NULL),
(106, 4, 11, 3, 7, 0, 1659024754464, 1659048120000, '1659060796373', 65, 0),
(107, 4, 12, 3, 8, 0, 1659025123280, 1659048360000, '1659061136867', 65, 0),
(108, 8, 6, 3, 7, 0, 1659170001945, 1659196560000, '1659206060633', 148, 0),
(109, 8, 6, 3, 7, 0, 1659170152033, 1659193560000, '1659392979071', 65, 0),
(110, 4, 11, 3, 7, 0, 1659170543770, 1659193920000, '1659206592691', 65, 0),
(111, 4, 6, 3, 7, 0, 1659357184617, 1659380520000, NULL, NULL, NULL),
(112, 4, 11, 3, 7, 0, 1659357490067, 1659380820000, NULL, NULL, NULL),
(113, 8, 12, 3, 7, 0, 1659374881412, 1659398220000, '1659411617716', 130, 0),
(114, 8, 6, 3, 7, 0, 1659375776576, 1659312720000, '1659412362756', -350, 0),
(115, 8, 80, 3, 7, 0, 1659377122872, 1659400500000, '1659496881189', 130, 0),
(116, 8, 80, 3, 7, 0, 1659461052821, 1659484380000, '1659497532391', 130, 0),
(117, 8, 81, 3, 7, 0, 1659461589697, 1659484920000, '1659498497194', 130, 0),
(118, 8, 80, 3, 7, 0, 1659462553094, 2022, '1659498996816', -9219236, 0),
(119, 8, 82, 3, 7, 0, 1659463719452, 1659486660000, '1659499747007', 127, 0),
(120, 8, 85, 3, 7, 0, 1659464597700, 1659487980000, '1659500627611', 130, 0),
(121, 8, 86, 3, 7, 0, 1659484591000, 1659488160000, '1659500826495', 20, 0),
(123, 8, 80, 3, 7, 1, 1659539700000, 1659543300000, '1659558096061', 20, 0),
(124, 8, 80, 3, 7, 1, 1659558600000, 1659562140000, '1659575230288', 20, 0),
(132, 8, 94, 3, 6, 1, 1659544200000, 1659547800000, NULL, 20, 0),
(137, 8, 80, 3, 7, 0, 1659889433000, 1659892980000, '1659908248124', 20, 0),
(141, 8, 81, 3, 7, 0, 1659896316000, 1659899880000, '1659913294550', 20, 0),
(150, 8, 80, 3, 7, 0, 1659905666000, 1659909240000, '1659921932493', 20, 0),
(151, 8, 81, 3, 7, 0, 1659905793000, 1659909360000, '1660180125256', 20, 0),
(152, 8, 94, 3, 7, 1, 1660250400000, 1660254000000, NULL, 20, 0),
(153, 8, 80, 3, 7, 0, 1660164102000, 1660167660000, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `book_request`
--

CREATE TABLE `book_request` (
  `request_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `booking_from` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `booking_till` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `booking_id` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `type` int(11) NOT NULL,
  `req_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `book_request`
--

INSERT INTO `book_request` (`request_id`, `user_id`, `vehicle_id`, `booking_from`, `booking_till`, `booking_id`, `status`, `type`) VALUES
(94, 3, 7, '1658218075211', '1658241420000', 98, 601, 0),
(95, 3, 8, '1658588273889', '1658611620000', 100, 601, 0),
(96, 3, 7, '1658764853845', '1658768400000', NULL, 0, 0),
(97, 3, 7, '1658764853852', '1658768400000', 101, 601, 0),
(98, 3, 8, '1658771887527', '1658795280000', 102, 601, 0),
(99, 3, 8, '1659022810421', '1659046200000', 104, 601, 0),
(100, 3, 8, '1659024662818', '1659048000000', NULL, 102, 0),
(101, 3, 7, '1659024737575', '1659048120000', 106, 601, 0),
(102, 3, 8, '1659025025349', '1659048360000', 107, 601, 0),
(103, 3, 8, '1659025370431', '1659048720000', NULL, 0, 0),
(104, 3, 7, '1659169585519', '1659196560000', 108, 601, 0),
(105, 3, 7, '1659170014718', '1659196560000', NULL, 0, 0),
(106, 3, 7, '1659170144398', '1659193560000', 109, 601, 0),
(107, 3, 7, '1659170537367', '1659193920000', 110, 601, 0),
(108, 3, 7, '1659357159377', '1659380520000', NULL, 302, 0),
(109, 3, 7, '1659357472246', '1659380820000', NULL, 300, 0),
(110, 3, 7, '1659374867526', '1659398220000', 113, 601, 0),
(111, 3, 7, '1659375768758', '1659312720000', 114, 102, 0),
(112, 3, 7, '1659377110012', '1659400500000', 115, 601, 0),
(113, 3, 7, '1659461031730', '1659484380000', 116, 601, 0),
(114, 3, 7, '1659461581660', '1659484920000', 117, 601, 0),
(115, 3, 7, '8/2/2022, 11:18:58 PM', '2022-08-03T00:18', 118, 603, 0),
(116, 3, 7, '1659483111000', '1659486660000', 119, 601, 0),
(117, 3, 7, '1659484385000', '1659487980000', 120, 601, 0),
(118, 3, 7, '1659484591000', '1659488160000', 121, 601, 0),
(119, 3, 7, '1659539700000', '1659543300000', 123, 601, 1),
(120, 3, 7, '1659539700000', '1659543300000', 123, 0, 1),
(121, 3, 7, '1659558600000', '1659562140000', 124, 601, 1),
(122, 3, 7, '8/5/2022, 12:24:35 PM', '2022-08-05T13:24', NULL, 202, 0),
(123, 3, 7, '8/5/2022, 12:32:04 PM', '2022-08-05T13:31', NULL, 202, 0),
(124, 3, 7, '8/5/2022, 12:42:00 PM', '2022-08-05T13:41', NULL, 202, 0),
(125, 3, 7, '8/5/2022, 12:44:09 PM', '2022-08-05T13:44', NULL, 202, 0),
(126, 3, 5, '1659717000000', '1659720600000', NULL, 0, 0),
(127, 3, 7, '1659704029000', '1659707580000', NULL, 302, 0),
(128, 3, 7, '1659704029000', '1659707580000', 133, 601, 1),
(129, 3, 7, '1659726082000', '1659729660000', NULL, 302, 0),
(130, 3, 7, '1659730543000', '1659734100000', NULL, 302, 0),
(131, 3, 7, '1659730695000', '1659734280000', NULL, 302, 0),
(132, 3, 7, '1659889433000', '1659892980000', 137, 601, 0),
(133, 3, 7, '1659892106000', '1659895680000', NULL, 302, 0),
(134, 3, 7, '1659892169000', '1659895740000', NULL, 302, 0),
(135, 3, 7, '1659892287000', '1659895860000', NULL, 302, 0),
(136, 3, 7, '1659896316000', '1659899880000', 141, 601, 0),
(137, 3, 7, '1659898825000', '1659902400000', NULL, 302, 0),
(138, 3, 7, '1659898903000', '1659902460000', NULL, 302, 0),
(139, 3, 7, '1659899124000', '1659902700000', NULL, 302, 0),
(140, 3, 7, '1659899292000', '1659902880000', NULL, 302, 0),
(141, 3, 7, '1659899383000', '1659902940000', NULL, 302, 0),
(142, 3, 7, '1659899474000', '1659903060000', NULL, 302, 0),
(143, 3, 7, '1659900691000', '1659904260000', NULL, 302, 0),
(144, 3, 7, '1659900788000', '1659904380000', NULL, 302, 0),
(145, 3, 7, '1659905666000', '1659909240000', 150, 601, 0),
(146, 3, 7, '1659905793000', '1659909360000', 151, 601, 0),
(147, 3, 7, '1660164102000', '1660167660000', 153, 400, 0);

-- --------------------------------------------------------

--
-- Table structure for table `codes`
--

CREATE TABLE `codes` (
  `id` int(11) NOT NULL,
  `code` int(11) NOT NULL,
  `message` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `floors`
--

INSERT INTO `floors` (`floor_id`, `parking_id`, `floor_no`, `grid_row`, `grid_column`) VALUES
(5, 4, 0, 5, 10),
(6, 4, 1, 2, 1),
(7, 4, 2, 5, 4),
(8, 4, 3, 10, 5),
(9, 8, 0, 3, 10);

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
  `map` varchar(5000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `image_url` varchar(300) NOT NULL,
  `rate` varchar(200) NOT NULL,
  `penalty_rate` varchar(100) NOT NULL,
  `capacity` int(50) NOT NULL,
  `facilities` varchar(300) DEFAULT NULL,
  `upi_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `parking`
--

INSERT INTO `parking` (`parking_id`, `name`, `email`, `mobile`, `mobile2`, `address`, `map`, `image_url`, `rate`, `penalty_rate`, `capacity`, `facilities`, `upi_id`) VALUES
(4, 'Jai Stambh Parking(Multi Level Parking)', 'parking@gmail.com', '9589311256', '09589311256', '', '<iframe src=\"https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d59500.150511062406!2d81.62424998589218!3d21.241387086070166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m3!3m2!1d21.234071999999998!2d81.6802046!4m5!1s0x3a28dd9800f29b11%3A0x44314531e95d5c4f!2s6JVP%2BGJQ%20Multilevel%20Car%20Parking%2C%20jaistambh%20chowk%2C%2C%20Raipur%2C%20Chhattisgarh%20492001!3m2!1d21.243845!2d81.6365991!5e0!3m2!1sen!2sin!4v1658080666038!5m2!1sen!2sin\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>', '1658081035741-Chief Minister inaugurated Collectorate Multi Level Parking in the heart of the capital.jpeg', '10', '30', 500, NULL, '272333.okicici'),
(8, 'Kalinga University', 'kalinga@gmail.com', '9752190950', '9752190950', '', '<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3733110.8978665643!2d78.42296105!3d23.9740114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28c6d85c5435e3%3A0xa9be51774e7a93d2!2sKalinga%20University%20Raipur!5e0!3m2!1sen!2sin!4v1659168439900!5m2!1sen!2sin\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>', '', '20', '100', 100, NULL, 'kalinga@okicici');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `slots`
--

INSERT INTO `slots` (`slot_id`, `parking_id`, `floor_id`, `y`, `x`, `status`, `user_id`, `specially_abled_friendly`, `type`) VALUES
(6, 4, 5, 1, 1, 'free', NULL, 0, 1),
(7, 4, 5, 1, 2, 'free', NULL, 0, 2),
(8, 4, 5, 1, 3, 'free', NULL, 0, 3),
(9, 4, 5, 1, 4, 'free', NULL, 0, 1),
(10, 4, 5, 1, 5, 'free', NULL, 0, 5),
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
(27, 4, 5, 3, 10, 'free', NULL, 0, 3),
(28, 4, 6, 1, 1, 'free', NULL, 0, 4),
(29, 4, 6, 2, 1, 'free', NULL, 0, 1),
(30, 4, 8, 1, 1, 'free', NULL, 0, 0),
(31, 4, 8, 1, 2, 'free', NULL, 0, 0),
(32, 4, 8, 1, 3, 'free', NULL, 0, 0),
(33, 4, 8, 1, 4, 'free', NULL, 0, 0),
(34, 4, 8, 1, 5, 'free', NULL, 0, 0),
(35, 4, 8, 2, 1, 'free', NULL, 0, 0),
(36, 4, 8, 2, 2, 'free', NULL, 0, 0),
(37, 4, 8, 2, 3, 'free', NULL, 0, 0),
(38, 4, 8, 2, 4, 'free', NULL, 0, 0),
(39, 4, 8, 2, 5, 'free', NULL, 0, 0),
(40, 4, 8, 3, 1, 'free', NULL, 0, 0),
(41, 4, 8, 3, 2, 'free', NULL, 0, 0),
(42, 4, 8, 3, 3, 'free', NULL, 0, 0),
(43, 4, 8, 3, 4, 'free', NULL, 0, 0),
(44, 4, 8, 3, 5, 'free', NULL, 0, 0),
(45, 4, 8, 4, 1, 'free', NULL, 0, 0),
(46, 4, 8, 4, 2, 'free', NULL, 0, 0),
(47, 4, 8, 4, 3, 'free', NULL, 0, 0),
(48, 4, 8, 4, 4, 'free', NULL, 0, 0),
(49, 4, 8, 4, 5, 'free', NULL, 0, 0),
(50, 4, 8, 5, 1, 'free', NULL, 0, 0),
(51, 4, 8, 5, 2, 'free', NULL, 0, 0),
(52, 4, 8, 5, 3, 'free', NULL, 0, 0),
(53, 4, 8, 5, 4, 'free', NULL, 0, 0),
(54, 4, 8, 5, 5, 'free', NULL, 0, 0),
(55, 4, 8, 6, 1, 'free', NULL, 0, 0),
(56, 4, 8, 6, 2, 'free', NULL, 0, 0),
(57, 4, 8, 6, 3, 'free', NULL, 0, 0),
(58, 4, 8, 6, 4, 'free', NULL, 0, 0),
(59, 4, 8, 6, 5, 'free', NULL, 0, 0),
(60, 4, 8, 7, 1, 'free', NULL, 0, 0),
(61, 4, 8, 7, 2, 'free', NULL, 0, 0),
(62, 4, 8, 7, 3, 'free', NULL, 0, 0),
(63, 4, 8, 7, 4, 'free', NULL, 0, 0),
(64, 4, 8, 7, 5, 'free', NULL, 0, 0),
(65, 4, 8, 8, 1, 'free', NULL, 0, 0),
(66, 4, 8, 8, 2, 'free', NULL, 0, 0),
(67, 4, 8, 8, 3, 'free', NULL, 0, 0),
(68, 4, 8, 8, 4, 'free', NULL, 0, 0),
(69, 4, 8, 8, 5, 'free', NULL, 0, 0),
(70, 4, 8, 9, 1, 'free', NULL, 0, 0),
(71, 4, 8, 9, 2, 'free', NULL, 0, 0),
(72, 4, 8, 9, 3, 'free', NULL, 0, 0),
(73, 4, 8, 9, 4, 'free', NULL, 0, 0),
(74, 4, 8, 9, 5, 'free', NULL, 0, 0),
(75, 4, 8, 10, 1, 'free', NULL, 0, 0),
(76, 4, 8, 10, 2, 'free', NULL, 0, 0),
(77, 4, 8, 10, 3, 'free', NULL, 0, 0),
(78, 4, 8, 10, 4, 'free', NULL, 0, 0),
(79, 4, 8, 10, 5, 'free', NULL, 0, 0),
(80, 8, 9, 1, 1, 'booked', NULL, 0, 1),
(81, 8, 9, 1, 2, 'free', NULL, 0, 1),
(82, 8, 9, 1, 3, 'free', NULL, 0, 1),
(83, 8, 9, 1, 4, 'free', NULL, 0, 4),
(84, 8, 9, 1, 5, 'free', NULL, 0, 0),
(85, 8, 9, 1, 6, 'free', NULL, 0, 1),
(86, 8, 9, 1, 7, 'free', NULL, 0, 1),
(87, 8, 9, 1, 8, 'free', NULL, 0, 1),
(88, 8, 9, 1, 9, 'free', NULL, 0, 1),
(89, 8, 9, 1, 10, 'free', NULL, 0, 0),
(90, 8, 9, 2, 1, 'free', NULL, 0, 1),
(91, 8, 9, 2, 2, 'free', NULL, 0, 1),
(92, 8, 9, 2, 3, 'free', NULL, 0, 1),
(93, 8, 9, 2, 4, 'free', NULL, 0, 1),
(94, 8, 9, 2, 5, 'free', NULL, 0, 1),
(95, 8, 9, 2, 6, 'free', NULL, 0, 1),
(96, 8, 9, 2, 7, 'free', NULL, 0, 1),
(97, 8, 9, 2, 8, 'free', NULL, 0, 1),
(98, 8, 9, 2, 9, 'free', NULL, 0, 1),
(99, 8, 9, 2, 10, 'free', NULL, 0, 0),
(100, 8, 9, 3, 1, 'free', NULL, 0, 0),
(101, 8, 9, 3, 2, 'free', NULL, 0, 0),
(102, 8, 9, 3, 3, 'free', NULL, 0, 0),
(103, 8, 9, 3, 4, 'free', NULL, 0, 2),
(104, 8, 9, 3, 5, 'free', NULL, 0, 0),
(105, 8, 9, 3, 6, 'free', NULL, 0, 3),
(106, 8, 9, 3, 7, 'free', NULL, 0, 0),
(107, 8, 9, 3, 8, 'free', NULL, 0, 0),
(108, 8, 9, 3, 9, 'free', NULL, 0, 0),
(109, 8, 9, 3, 10, 'free', NULL, 0, 0);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`order_id`, `receipt_id`, `user_id`, `parking_id`, `method`, `amount`, `currency`, `booking_id`, `payment_id`, `timestamp`) VALUES
('order_Jv9hTm8RKuQvDb', 'lXA90MP3KD', 3, 4, 'upi', 6500, 'INR', 98, 'pay_Jv9hdJJ8LuOHRL', '1658218605144'),
('order_Jv9hTUZCkJtpCl', 'a_G7d8D4G', 3, 4, NULL, 6500, 'INR', 98, NULL, '1658218594531'),
('order_Jv9ZH4K1ajCy2i', 'Y6uZkyEaV', 3, 4, NULL, 6500, 'INR', 98, NULL, '1658218128751'),
('order_JvB5ciYrJBOMky', '6u9M4Ypxv', 3, 4, NULL, 6500, 'INR', 98, NULL, '1658223487809'),
('order_JvB5fKzOeGIFXZ', 'EVp_DGPGp', 3, 4, 'upi', 6500, 'INR', 98, 'pay_JvB5oLx7e4f1us', '1658223499808'),
('order_JvBJjpglinSel3', 'dpHT5SNMz', 3, 4, NULL, 900, 'INR', 99, NULL, '1658224289530'),
('order_JvBJjslloV3lw6', 'pcI2alJ3O2', 3, 4, 'upi', 900, 'INR', 99, 'pay_JvBKFyA7Q7pPH1', '1658224320257'),
('order_JvC6IIMH1Hh8Vi', 'ErhPBIx3k', 3, 4, NULL, 6500, 'INR', 98, NULL, '1658227047534'),
('order_JvC6IMgkiEN6fW', '_TzucShFKR', 3, 4, NULL, 6500, 'INR', 98, NULL, '1658227047980'),
('order_JvC6It6FReI2Oh', 'uWvpewVZWP', 3, 4, NULL, 6500, 'INR', 98, NULL, '1658227048057'),
('order_JvC9QtdxycZM4F', '79XY0ffNS', 3, 4, NULL, 6500, 'INR', 98, NULL, '1658227225780'),
('order_JvC9Qzjk4N5EKJ', 'ejxGowD4ib', 3, 4, 'upi', 6500, 'INR', 98, 'pay_JvC9XWX4nF0HSZ', '1658227233177'),
('order_Jxco6BowMKuoyv', '7lOEgaR2j', 3, 4, NULL, 6500, 'INR', 100, NULL, '1658757777816'),
('order_Jxco6D2eJXy32U', 'f4_PKA5vcU', 3, 4, NULL, 6500, 'INR', 100, NULL, '1658757777862'),
('order_Jxco6Jto6R6tIr', 'okE6FvSlGP', 3, 4, 'upi', 6500, 'INR', 100, 'pay_JxcoOskZ4xxxKB', '1658757796349'),
('order_JxgfY3kP8BLZRb', '4SWHU_3K5', 3, 4, NULL, 1000, 'INR', 101, NULL, '1658771378644'),
('order_JxgfYGXzwSTFrK', 'ZDqJRNz5s4', 3, 4, NULL, 1000, 'INR', 101, NULL, '1658771378793'),
('order_JxgfYJbnyI6muv', 'VYl51fut-b', 3, 4, 'upi', 1000, 'INR', 101, 'pay_JxgfliK7TFYXdj', '1658771392507'),
('order_JxgqGquUdXYUpP', '-sr-NXcVo', 3, 4, 'upi', 6500, 'INR', 102, 'pay_JxgqT6WdarlWEO', '1658772000328'),
('order_JxhCOVscGSq2Vv', '4b5hgy3Vr', 3, 4, 'upi', 3000, 'INR', 103, 'pay_JxhCjkTJmPOaVz', '1658773265303'),
('order_Jyq6qS6NygiEVQ', 'NfdfuUABW', 3, 4, 'upi', 6500, 'INR', 104, 'pay_Jyq7Gv1zotXPaO', '1659022989341'),
('order_JyqdEzqE8uHJzG', '2xmPCvsR7', 3, 4, 'upi', 6500, 'INR', 106, 'pay_JyqdP2oxL99UR4', '1659024814442'),
('order_Jyqme4TKJD4lS8', '5rLDAxdGe', 3, 4, 'upi', 6500, 'INR', 107, 'pay_JyqmkTd553rqwz', '1659025345210'),
('order_JzVsftGYSMKlZp', 'gmQU0Op4N', 3, 8, 'upi', 14800, 'INR', 108, 'pay_JzVtGljHmWqhif', '1659170101847'),
('order_JzW23WJH7x93VB', 'fn24T5ZgS', 3, 4, 'upi', 6500, 'INR', 110, 'pay_JzW2CB019UC6vz', '1659170608854'),
('order_K0MxUNCoWXZWHy', '-wPZ2jD3L', 3, 8, 'upi', 6500, 'INR', 109, 'pay_K0Mxi9xGA6Y6Vy', '1659356999754'),
('order_K0qeEhJxcpjXRy', 'lb37gXmmR5', 3, 8, 'upi', 13000, 'INR', 116, 'pay_K0qePWsfj20vWQ', '1659461552028'),
('order_K0qeEPeX2Td7it', 'mPL8eI6v4', 3, 8, NULL, 13000, 'INR', 116, NULL, '1659461540268'),
('order_K0qSjxFjaR2u3J', 'dvCZwinzI', 3, 8, 'upi', 13000, 'INR', 115, 'pay_K0qSyq7hgfBsEY', '1659460902558'),
('order_K0qvB73BHJbQ63', 'G-mpXSZCM', 3, 8, NULL, 13000, 'INR', 117, NULL, '1659462502854'),
('order_K0qvD31h0swt5U', 'FaPX9eWcF', 3, 8, 'upi', 13000, 'INR', 117, 'pay_K0qvNFTuxifVgC', '1659462515291'),
('order_K0raDAoSciUG6G', 'lGjVXRowI', 3, 8, 'upi', 2000, 'INR', 121, 'pay_K0raYeuyXmH7PH', '1659464855054'),
('order_K0rHCEW1f1LVQO', 'oRPW-T6k3', 3, 8, 'upi', 12700, 'INR', 119, 'pay_K0rHY5BD4V6YI7', '1659463774885'),
('order_K0rWhzWMIyotte', 'LKSEBiasD', 3, 8, 'upi', 13000, 'INR', 120, 'pay_K0rZ9pNy7mZoBn', '1659464775031'),
('order_K0SFdSqk8phwSl', 'LBsmvDdbj', 3, 8, 'upi', 13000, 'INR', 113, 'pay_K0SFz4DXmUYjAD', '1659375645599'),
('order_K17fOMsNuoBoqO', '74FCjXllH', 3, 8, 'upi', 2000, 'INR', 123, 'pay_K17fwzMvkzPX6O', '1659521506914'),
('order_K1BjnNYEjhP5VC', 'O7rmUekik', 3, 8, 'upi', 2000, 'INR', 123, 'pay_K1Bk7PmapARA8H', '1659535829948'),
('order_K1CaBxwbTCWotv', 'VlYlg3A9D', 3, 8, 'upi', 2000, 'INR', 124, 'pay_K1Cae1dmDo8adP', '1659538813527'),
('order_K1CiAHiCm0h22r', 'PkzJIMq1O', 3, 8, 'upi', 2000, 'INR', 124, 'pay_K1CnRaNoewStxw', '1659539540561'),
('order_K1Cov9OAhUrNNO', 'MfHRpKQgw', 3, 8, 'upi', 2000, 'INR', 125, 'pay_K1Cp1idzAZTpn4', '1659539630253'),
('order_K1D5jPv83OfvDW', 'xzDN9tavd', 3, 8, 'upi', 2000, 'INR', 126, 'pay_K1D5rwz5cH2NYi', '1659540586885'),
('order_K1D7aoDRcLi5VH', 'cJbTanAlM', 3, 8, 'upi', 2000, 'INR', 127, 'pay_K1D864tH4j7eB6', '1659540713621'),
('order_K1y82BDKJlG42l', 'IvXCABmMU', 3, 8, 'upi', 2000, 'INR', 133, 'pay_K1y8eEiV1dbfqX', '1659706260771'),
('order_K2jH5ot0qKNIMq', 'gPu3LwBkp', 3, 8, NULL, 2000, 'INR', 137, NULL, '1659872254901'),
('order_K2jH6SQqrdlqiC', 'RTJZQ1C21', 3, 8, 'upi', 2000, 'INR', 137, 'pay_K2jHRMpWYzVS0v', '1659872276166'),
('order_K2khwUhX7Rwo6v', 'HlZgm6wRl', 3, 8, 'upi', 2000, 'INR', 141, 'pay_K2kiJXEEgKJo7j', '1659877323986'),
('order_K2nA2c10IfjQAT', '6t1-7q7i-', 3, 8, 'wallet', 2000, 'INR', 150, 'pay_K2nAKmE6mNZrhL', '1659885965917'),
('order_K3yTdorm9mg6q8', 'gOIdXYUIR', 3, 8, 'upi', 2000, 'INR', 151, 'pay_K3yTynoltIRGth', '1660144152578'),
('order_K3yVfi1PTHkVc5', 'IaOJhTlah', 3, 8, 'upi', 2000, 'INR', 152, 'pay_K3yVnnQU7Zk04M', '1660144256166');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `name`, `email`, `mobile`, `mobile_2`, `address`, `role`, `password`) VALUES
(3, 'user', 'user@gmail.com', '9752190950', '8712358865', 'xyz, capital, Raipur', 'user', '$2b$10$YuB4Sjiq4peV179nuygKQOgbjmFEulzfzQAG3UwjUxaWHh/b7/LoC'),
(4, 'parking', 'parking@gmail.com', '9752190951', '8712358865', 'parking, capital, Raipur', 'parking', '$2b$10$KYXHvwnE5nT1uS0uFlEjae67JJCKXYSUTZPE.7IVH4zawqFht0Og6'),
(5, 'ruhi', 'ruhi@gmail.com', '23456789', '123456789', 'xyz, capital, city', 'user', '$2b$10$JmCMaW9agmOT8xeqBI.08uM8QEtMMJO0L7rp6fiUfNuF8RrvCFC3y'),
(6, 'parking', 'Tejas@gmail.com', '9752190951', '8712358865', 'parking, capital, Raipur', 'user', '$2b$10$ETTWUR5.Z3hyzLCJciCty.wusSi2FvS1cXDVZcVmZztvvpbu0kIim'),
(7, 'Kalinga University ', 'Kalingaparking@gmail.com', '975219050', '9752190950', 'Kalinga University, New Raipur', 'user', '$2b$10$F4TzoqynMp2OeMnQ1xIDreN.IyXfKZsjWdcPJgoXXYMwBEL.JBnnS'),
(8, 'kalinga university', 'kalinga@gmail.com', '9752190951', '9752190950', 'Kalinga University, New Raipur', 'parking', '$2b$10$l0UWKmVH.FNlAdOaaSXMPe2xvIfBxOWmkgkrJqQcw4sdO3QPrZLQW');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`vehicle_id`, `type`, `model`, `plate_no`, `color`, `user_id`) VALUES
(5, 'bike', 'honda city', 'cg 90 gh 2321', 'blue', 5),
(6, 'car', 'Swift', 'CG 287899', 'Black', 4),
(7, 'car', 'swift', 'MH13BZ8454', 'gray', 3),
(8, 'bike', 'Bullet', 'CG 25 2666', '#ff0000', 3);

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
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=154;

--
-- AUTO_INCREMENT for table `book_request`
--
ALTER TABLE `book_request`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=148;

--
-- AUTO_INCREMENT for table `codes`
--
ALTER TABLE `codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `floors`
--
ALTER TABLE `floors`
  MODIFY `floor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `slots`
--
ALTER TABLE `slots`
  MODIFY `slot_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `vehicle_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
