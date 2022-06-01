CREATE DATABASE  IF NOT EXISTS `Groupomania` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `Groupomania`;
-- MySQL dump 10.13  Distrib 8.0.29, for macos12 (x86_64)
--
-- Host: localhost    Database: Groupomania
-- ------------------------------------------------------
-- Server version	5.7.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

CREATE TABLE `Post` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `Content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `userId` varchar(255) NOT NULL,
  `Date` date DEFAULT NULL,
  `Hours` time DEFAULT NULL,
  `NameUser` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `FirstNameUser` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `imageUrlUser` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `_id` (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8;


CREATE TABLE `User` (
  `_id` int(30) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `FirstName` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `City` varchar(255) NOT NULL,
  `Adress` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Grade` varchar(255) NOT NULL DEFAULT 'Utilisateur',
  `Birthday` date NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `Password` varchar(255) NOT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;

 INSERT INTO `User` (`_id`,`Name`,`FirstName`,`City`,`Adress`,`Email`,`Grade`,`Birthday`,`imageUrl`,`Password`) VALUES (39,'ADMIN','COMPTE','Strasbourg','32 rue de paris','sebastien.pro210@gmail.com','admin','2001-05-26','http://localhost:3000/images/3.jpg1654028084957.jpeg','$2b$10$KpL/1Zq7i4L8ThTIqOnLC.SJ610gzt0dVQNhEed5uTuX4Qn0K.CUa');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-31 22:22:48
