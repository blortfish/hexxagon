-- MySQL dump 10.13  Distrib 5.5.47, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: hexxagon
-- ------------------------------------------------------
-- Server version	5.5.47-0+deb8u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `hex_chat`
--

DROP TABLE IF EXISTS `hex_chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hex_chat` (
  `messageid` char(32) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `gameid` char(32) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  `message` text,
  PRIMARY KEY (`messageid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hex_game`
--

DROP TABLE IF EXISTS `hex_game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hex_game` (
  `game_id` char(32) NOT NULL,
  `player1` varchar(255) NOT NULL,
  `player2` varchar(255) DEFAULT NULL,
  `board` text,
  `starttime` datetime DEFAULT NULL,
  `endtime` datetime DEFAULT NULL,
  `turn` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`game_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hex_record`
--

DROP TABLE IF EXISTS `hex_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hex_record` (
  `username` varchar(255) NOT NULL,
  `wins` bigint(20) DEFAULT '0',
  `losses` bigint(20) DEFAULT '0',
  PRIMARY KEY (`username`),
  CONSTRAINT `username` FOREIGN KEY (`username`) REFERENCES `hex_users` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hex_users`
--

DROP TABLE IF EXISTS `hex_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hex_users` (
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `p1` varchar(128) NOT NULL,
  `p2` varchar(128) NOT NULL,
  `current_game` char(32) DEFAULT '0',
  `isonline` bit(1) DEFAULT b'0',
  `last_active` datetime DEFAULT NULL,
  `challenge_from` varchar(255) DEFAULT '0',
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;