-- MySQL dump 10.13  Distrib 8.0.26, for macos11.3 (x86_64)
--
-- Host: localhost    Database: inu_events
-- ------------------------------------------------------
-- Server version	8.0.26

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

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '식별자.',
  `content` varchar(1000) COLLATE utf8mb4_general_ci NOT NULL COMMENT '본문.',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '생성 일시.',
  `user_id` int DEFAULT NULL COMMENT '식별자.',
  `event_id` int DEFAULT NULL COMMENT '식별자.',
  PRIMARY KEY (`id`),
  KEY `FK_bbfe153fa60aa06483ed35ff4a7` (`user_id`),
  KEY `FK_d7f6805a4365989dedc7b9d9568` (`event_id`),
  CONSTRAINT `FK_bbfe153fa60aa06483ed35ff4a7` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_d7f6805a4365989dedc7b9d9568` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '식별자.',
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '제목.',
  `host` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '단체. 이 행사 또는 모집을 여는 주체가 누구인가?',
  `category` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '분류.',
  `target` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '대상. 이 행사 또는 모집은 누구를 대상으로 하는 것인가?',
  `start_at` datetime NOT NULL COMMENT '행사 시작 일시.',
  `end_at` datetime DEFAULT NULL COMMENT '행사 종료 일시(없을 수 있음).',
  `contact` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '연락처. 궁금한 부분은 어디로 연락하면 되나?(휴대전화번호, 이메일 등등)',
  `location` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '위치. 장소 또는 링크.',
  `body` varchar(1000) COLLATE utf8mb4_general_ci NOT NULL COMMENT '본문.',
  `image_uuid` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '이미지 식별자.',
  `views` int NOT NULL COMMENT '조회수',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '생성 일시.',
  `user_id` int DEFAULT NULL COMMENT '식별자.',
  PRIMARY KEY (`id`),
  KEY `FK_e6358bd3df1b2874637dca92bcf` (`user_id`),
  CONSTRAINT `FK_e6358bd3df1b2874637dca92bcf` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,'행사임 암튼그럼','나','간식나눔','당신네덜','2022-02-24 04:40:30','2022-03-02 02:02:02','연락하지마~~','hahah','ㅎㅇ헌알호ㅕ먀ㅣㄴ뎌어ㅐㅑㅕㄴ규로다ㅕㅑㄴ',NULL,8,'2022-02-24 04:03:54.877732',1);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_like`
--

DROP TABLE IF EXISTS `event_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_like` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '식별자.',
  `user_id` int DEFAULT NULL COMMENT '식별자.',
  `event_id` int DEFAULT NULL COMMENT '식별자.',
  PRIMARY KEY (`id`),
  KEY `FK_86f4aa4e605bf334d2aaa9c503a` (`user_id`),
  KEY `FK_1676cf3abe123e0fe02586e6b6d` (`event_id`),
  CONSTRAINT `FK_1676cf3abe123e0fe02586e6b6d` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`),
  CONSTRAINT `FK_86f4aa4e605bf334d2aaa9c503a` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_like`
--

LOCK TABLES `event_like` WRITE;
/*!40000 ALTER TABLE `event_like` DISABLE KEYS */;
INSERT INTO `event_like` VALUES (3,1,1);
/*!40000 ALTER TABLE `event_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_notification`
--

DROP TABLE IF EXISTS `event_notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_notification` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '식별자.',
  `set_for` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '알림이 언제 도착해야 하나? 행사 시작 전? 마감 전? [start, end]',
  `sent` tinyint NOT NULL COMMENT '이 알림이 전송되었는가?',
  `user_id` int DEFAULT NULL COMMENT '식별자.',
  `event_id` int DEFAULT NULL COMMENT '식별자.',
  PRIMARY KEY (`id`),
  KEY `FK_85c69fa75640beb5c0a19c27ff3` (`user_id`),
  KEY `FK_c90a88a52bf0b78b8d1301f417e` (`event_id`),
  CONSTRAINT `FK_85c69fa75640beb5c0a19c27ff3` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_c90a88a52bf0b78b8d1301f417e` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_notification`
--

LOCK TABLES `event_notification` WRITE;
/*!40000 ALTER TABLE `event_notification` DISABLE KEYS */;
INSERT INTO `event_notification` VALUES (6,'start',1,1,1);
/*!40000 ALTER TABLE `event_notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '식별자.',
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '가입한 이메일.',
  `nickname` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '사용자 닉네임.',
  `image_uuid` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '사용자 프로필 사진 UUID.',
  `oauth_provider` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '로그인한 방법(카카오, 구글 등).',
  `oauth_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'OAuth로 로그인한 경우, provider가 제공한 식별자.',
  `remember_me_token` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '자동로그인용 토큰.',
  `fcm_token` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'FCM 토큰.',
  `subscribing` tinyint NOT NULL COMMENT '전체 알림 수신 여부.',
  `subscribing_on` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '전체 알림 카테고리 필터(쉼표로 구분).',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '생성 일시.',
  `deleted_at` datetime DEFAULT NULL COMMENT '삭제 일시.',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'potados99@gmail.com','potados',NULL,'google','adad','adad',NULL,1,'총학생회, 간식나눔','2022-02-24 04:03:45.633500',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-24  5:05:05
