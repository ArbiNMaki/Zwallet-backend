-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.14-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.1.0.6116
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for revisi_zwallet
CREATE DATABASE IF NOT EXISTS `revisi_zwallet` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `revisi_zwallet`;

-- Dumping structure for table revisi_zwallet.phone_user
CREATE TABLE IF NOT EXISTS `phone_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` varchar(60) NOT NULL,
  `phone` varchar(13) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`) USING BTREE,
  CONSTRAINT `relasi id user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table revisi_zwallet.transaction
CREATE TABLE IF NOT EXISTS `transaction` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `senderId` varchar(60) NOT NULL,
  `receiverId` varchar(60) NOT NULL,
  `amount` varchar(8) NOT NULL,
  `date` datetime NOT NULL,
  `notes` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `senderId` (`senderId`) USING BTREE,
  KEY `receiverId` (`receiverId`) USING BTREE,
  CONSTRAINT `receiver id` FOREIGN KEY (`receiverId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sender id` FOREIGN KEY (`senderId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table revisi_zwallet.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(60) NOT NULL,
  `name` varchar(50) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `phone` varchar(13) NOT NULL,
  `username` varchar(80) NOT NULL,
  `password` varchar(225) NOT NULL,
  `email` varchar(50) NOT NULL,
  `pin` int(7) NOT NULL,
  `saldo` int(10) NOT NULL,
  `image` varchar(200) DEFAULT NULL,
  `role` enum('admin','user') NOT NULL,
  `verification` enum('verified','nothing') NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
