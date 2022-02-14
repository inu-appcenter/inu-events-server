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
  `content` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '생성 일시.',
  `user_id` int DEFAULT NULL COMMENT '식별자.',
  `event_id` int DEFAULT NULL COMMENT '식별자.',
  PRIMARY KEY (`id`),
  KEY `FK_bbfe153fa60aa06483ed35ff4a7` (`user_id`),
  KEY `FK_d7f6805a4365989dedc7b9d9568` (`event_id`),
  CONSTRAINT `FK_bbfe153fa60aa06483ed35ff4a7` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_d7f6805a4365989dedc7b9d9568` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (4,'저 같은 바보도 받아주나요?ㅜㅜ','2022-02-14 14:36:11.347047',4,2),(5,'센터장님 졸업축하드려요~','2022-02-14 14:36:29.006064',4,2),(6,'나는 언제 졸업하지;;','2022-02-14 14:36:40.256912',4,2),(7,'앱센터 최고쵝오~~','2022-02-14 14:37:02.501262',4,2);
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
  `host` varchar(255) NOT NULL COMMENT '단체.',
  `category` varchar(255) NOT NULL COMMENT '분류.',
  `title` varchar(255) NOT NULL COMMENT '제목.',
  `body` varchar(255) NOT NULL COMMENT '본문.',
  `image_uuid` varchar(255) DEFAULT NULL COMMENT '이미지 식별자.',
  `submission_url` varchar(255) DEFAULT NULL COMMENT '신청 URL.',
  `start_at` datetime DEFAULT NULL COMMENT '행사 시작 일시.',
  `end_at` datetime DEFAULT NULL COMMENT '행사 종료 일시.',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '생성 일시.',
  `user_id` int DEFAULT NULL COMMENT '식별자.',
  PRIMARY KEY (`id`),
  KEY `FK_e6358bd3df1b2874637dca92bcf` (`user_id`),
  CONSTRAINT `FK_e6358bd3df1b2874637dca92bcf` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (2,'인천대 앱센터','동아리','인천대 앱센터에서 14기 신입멤버를 모집합니다.','앱센터 드루와~~~ 요기에는 멋진 사람들이 많이 있숴여~ 또 나만 못하지 나만;;','1ec8d561-aa27-6100-12b7-85812b0d8e38','https://github.com/inu-appcenter','2022-02-15 17:57:32','2022-03-15 17:57:32','2022-02-14 14:33:12.986782',4),(3,'정보기술대학','스포츠대회','정보대 스포츠 대회 열리니까 마니마니 참여해주세용','정보대 학생만 참여바람 ㅎㅎㅎ','1ec8d5ff-0983-6840-f409-f47499562311',' https://github.com/inu-appcenter','2022-03-20 12:30:00','2022-03-22 20:30:00','2022-02-14 15:34:04.942351',5);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '식별자.',
  `email` varchar(255) NOT NULL COMMENT '가입한 이메일.',
  `nickname` varchar(255) NOT NULL COMMENT '사용자 닉네임.',
  `oauth_provider` varchar(255) NOT NULL COMMENT '로그인한 방법(카카오, 구글 등).',
  `oauth_id` varchar(255) NOT NULL COMMENT 'OAuth로 로그인한 경우, provider가 제공한 식별자.',
  `remember_me_token` varchar(255) NOT NULL COMMENT '자동로그인용 토큰.',
  `fcm_token` varchar(255) DEFAULT NULL COMMENT 'FCM 토큰.',
  `subscribing` tinyint NOT NULL COMMENT '전체 알림 수신 여부.',
  `subscribing_on` varchar(255) DEFAULT NULL COMMENT '전체 알림 키워드 필터(쉼표로 구분).',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '생성 일시.',
  `deleted_at` datetime DEFAULT NULL COMMENT '삭제 일시.',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'dustndus8@gmail.com','haha-1644569851727','google','103482248074097229495','1ec8d8df-5c05-6310-3508-08f4b3c9d02c',NULL,0,NULL,'2022-02-11 17:57:31.743727',NULL),(2,'robolindasoo@gmail.com','haha-1644570531138','google','101733002371971132910','1ec8d540-65e8-65f0-3461-6de9d564e736',NULL,0,NULL,'2022-02-11 18:08:51.140723',NULL),(3,'jhg34100@gmail.com','haha-1644645296860','google','102390204795141181459','1ec8c2b5-7fdd-6ca0-af56-a202fcc45436',NULL,0,NULL,'2022-02-12 14:54:56.862958',NULL),(4,'selenium3425@gmail.com','haha-1644815930592','google','114295479731429206524','1ec8d603-38f5-6110-4928-b89d3ff54c37',NULL,0,NULL,'2022-02-14 14:18:50.595023',NULL),(5,'skh979778@gmail.com','seokahi','google','108584578302456193564','1ec8d5e5-a04d-60b0-edaa-0b4a2a9bb77c',NULL,0,NULL,'2022-02-14 15:21:31.826408',NULL);
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

-- Dump completed on 2022-02-14 22:17:40
