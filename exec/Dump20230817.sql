-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: ssafy207.duckdns.org    Database: eoullim
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.20.04.1

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
-- Table structure for table `animon`
--

DROP TABLE IF EXISTS `animon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animon` (
  `animon_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `body_image_path` varchar(255) NOT NULL,
  `head_image_path` varchar(255) NOT NULL,
  PRIMARY KEY (`animon_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animon`
--

LOCK TABLES `animon` WRITE;
/*!40000 ALTER TABLE `animon` DISABLE KEYS */;
INSERT INTO `animon` VALUES (1,'panda','panda_body','panda_head'),(2,'dog','dog_body','dog_head'),(3,'cat','cat_body','cat_head'),(4,'tiger','tiger_body','tiger_head');
/*!40000 ALTER TABLE `animon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `child`
--

DROP TABLE IF EXISTS `child`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `child` (
  `child_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `birth` date NOT NULL,
  `grade` varchar(255) NOT NULL,
  `school` varchar(255) NOT NULL,
  `gender` char(1) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `animon_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`child_id`),
  KEY `FK39jowutu0ytw4qkq6m03gb8gq` (`animon_id`),
  KEY `FKoxyi4aau8vh1s4ioardckmqdv` (`user_id`),
  CONSTRAINT `FK39jowutu0ytw4qkq6m03gb8gq` FOREIGN KEY (`animon_id`) REFERENCES `animon` (`animon_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKoxyi4aau8vh1s4ioardckmqdv` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `child`
--

LOCK TABLES `child` WRITE;
/*!40000 ALTER TABLE `child` DISABLE KEYS */;
INSERT INTO `child` VALUES (104,'첫째아이','2014-05-05','3','수진','M','OFF',1,57),(105,'둘째아이','2016-05-05','1','태평','M','OFF',2,57),(106,'홍길동','1997-06-10','1','치평','M','OFF',1,59),(107,'김성준','2023-08-16','2','장덕','M','OFF',1,60),(108,'오영재','2023-08-09','3','일곡','M','OFF',4,61),(109,'유저첫째','2014-05-05','3','장덕','M','OFF',2,58),(110,'이춘향','1999-08-10','3','운천','W','OFF',3,59),(113,'연석아들','2016-05-05','1','성남서','M','OFF',4,62),(114,'연석따님','2016-05-05','3','서울장충','W','OFF',3,62),(115,'거부기','2023-08-02','3','서일','W','OFF',1,61),(116,'홍길똥','1900-01-01','3','금구','M','OFF',1,63),(117,'하닯아','2023-08-16','2','세종','M','OFF',1,65),(118,'개똥이','1900-02-02','1','장덕','W','OFF',3,66),(119,'김범창','2015-08-17','1','곡란','M','OFF',1,67),(120,'셋째아이','2010-12-19','2','태을','W','OFF',1,57),(121,'김범창','2018-04-03','1','장덕','M','OFF',1,68);
/*!40000 ALTER TABLE `child` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `child_animon`
--

DROP TABLE IF EXISTS `child_animon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `child_animon` (
  `child_animon_id` int NOT NULL AUTO_INCREMENT,
  `child_id` int DEFAULT NULL,
  `animon_id` int DEFAULT NULL,
  PRIMARY KEY (`child_animon_id`),
  KEY `FK85xo20v4r04anfd15mlciohp9` (`animon_id`),
  KEY `FK8y634mv093t8jtovg09hxvf6y` (`child_id`),
  CONSTRAINT `FK85xo20v4r04anfd15mlciohp9` FOREIGN KEY (`animon_id`) REFERENCES `animon` (`animon_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK8y634mv093t8jtovg09hxvf6y` FOREIGN KEY (`child_id`) REFERENCES `child` (`child_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=571 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `child_animon`
--

LOCK TABLES `child_animon` WRITE;
/*!40000 ALTER TABLE `child_animon` DISABLE KEYS */;
INSERT INTO `child_animon` VALUES (507,104,1),(508,104,2),(509,104,3),(510,104,4),(511,105,1),(512,105,2),(513,105,3),(514,105,4),(515,106,1),(516,106,2),(517,106,3),(518,106,4),(519,107,1),(520,107,2),(521,107,3),(522,107,4),(523,108,1),(524,108,2),(525,108,3),(526,108,4),(527,109,1),(528,109,2),(529,109,3),(530,109,4),(531,110,1),(532,110,2),(533,110,3),(534,110,4),(535,113,1),(536,113,2),(537,113,3),(538,113,4),(539,114,1),(540,114,2),(541,114,3),(542,114,4),(543,115,1),(544,115,2),(545,115,3),(546,115,4),(547,116,1),(548,116,2),(549,116,3),(550,116,4),(551,117,1),(552,117,2),(553,117,3),(554,117,4),(555,118,1),(556,118,2),(557,118,3),(558,118,4),(559,119,1),(560,119,2),(561,119,3),(562,119,4),(563,120,1),(564,120,2),(565,120,3),(566,120,4),(567,121,1),(568,121,2),(569,121,3),(570,121,4);
/*!40000 ALTER TABLE `child_animon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friendship`
--

DROP TABLE IF EXISTS `friendship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friendship` (
  `friendship_id` int NOT NULL AUTO_INCREMENT,
  `my_id` int NOT NULL,
  `friend_id` int NOT NULL,
  PRIMARY KEY (`friendship_id`),
  KEY `child2_constraint` (`friend_id`),
  KEY `child1_constraint` (`my_id`),
  CONSTRAINT `child1_constraint` FOREIGN KEY (`my_id`) REFERENCES `child` (`child_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `child2_constraint` FOREIGN KEY (`friend_id`) REFERENCES `child` (`child_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friendship`
--

LOCK TABLES `friendship` WRITE;
/*!40000 ALTER TABLE `friendship` DISABLE KEYS */;
INSERT INTO `friendship` VALUES (96,110,106),(97,106,110),(98,108,107),(99,105,109),(100,109,105),(101,106,108),(102,108,106),(103,110,108),(104,108,110),(105,115,110),(106,110,115),(107,106,115),(108,115,106),(109,110,104),(110,104,110),(111,117,104),(112,104,117),(113,119,110),(114,110,119),(115,120,110),(116,110,120),(117,109,107),(118,121,110),(119,110,121),(120,106,121),(121,121,106);
/*!40000 ALTER TABLE `friendship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `record_info`
--

DROP TABLE IF EXISTS `record_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `record_info` (
  `record_id` int NOT NULL AUTO_INCREMENT,
  `video_path` varchar(255) NOT NULL,
  `master_id` int DEFAULT NULL,
  `participant_id` int DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `guide_seq` varchar(255) DEFAULT NULL,
  `timeline` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`record_id`),
  KEY `record_info_ibfk_1` (`master_id`),
  KEY `record_info_ibfk_2` (`participant_id`),
  CONSTRAINT `record_info_ibfk_1` FOREIGN KEY (`master_id`) REFERENCES `child` (`child_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `record_info_ibfk_2` FOREIGN KEY (`participant_id`) REFERENCES `child` (`child_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1383 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `record_info`
--

LOCK TABLES `record_info` WRITE;
/*!40000 ALTER TABLE `record_info` DISABLE KEYS */;
INSERT INTO `record_info` VALUES (1242,'https://i9c207.p.ssafy.io/openvidu/recordings/110_20230816022314/str_CAM_HZhS_con_PTO4pjUofn.webm',106,110,'2023-08-16 11:23:52','',''),(1243,'https://i9c207.p.ssafy.io/openvidu/recordings/110_20230816022314/str_CAM_ZXTU_con_LCahYz6zCH.webm',110,106,'2023-08-16 11:23:52','',''),(1244,'https://i9c207.p.ssafy.io/openvidu/recordings/107_20230816022254/str_CAM_TFhf_con_OPi1XITc6f.webm',107,108,'2023-08-16 11:26:13','',''),(1245,'https://i9c207.p.ssafy.io/openvidu/recordings/107_20230816022254/str_CAM_Ez92_con_ZFqzziMdsM.webm',108,107,'2023-08-16 11:26:13','',''),(1246,'https://i9c207.p.ssafy.io/openvidu/recordings/107_20230816022617/str_CAM_OVN5_con_KRoXPHD1Iy.webm',107,108,'2023-08-16 11:26:59','',''),(1247,'https://i9c207.p.ssafy.io/openvidu/recordings/107_20230816022617/str_CAM_CCuj_con_OQ0tbIynkG.webm',108,107,'2023-08-16 11:26:59','',''),(1248,'https://i9c207.p.ssafy.io/openvidu/recordings/107_20230816022704/str_CAM_MQJ7_con_Q3QyZIJEvW.webm',107,108,'2023-08-16 11:27:55','',''),(1249,'https://i9c207.p.ssafy.io/openvidu/recordings/107_20230816022704/str_CAM_AkMa_con_TZ1scd92ur.webm',108,107,'2023-08-16 11:27:55','',''),(1250,'https://i9c207.p.ssafy.io/openvidu/recordings/107_20230816024949/str_CAM_YDpg_con_Si9lm9HELK.webm',108,107,'2023-08-16 11:50:17','',''),(1251,'https://i9c207.p.ssafy.io/openvidu/recordings/107_20230816024949/str_CAM_Yw1j_con_Lo8VVfFiGs.webm',107,108,'2023-08-16 11:50:17','',''),(1252,'https://i9c207.p.ssafy.io/openvidu/recordings/107_20230816025021/str_CAM_GqRQ_con_OHueiSaHxq.webm',107,108,'2023-08-16 11:50:33','',''),(1253,'https://i9c207.p.ssafy.io/openvidu/recordings/107_20230816025021/str_CAM_Y57v_con_Wv9agTOoA4.webm',108,107,'2023-08-16 11:50:33','',''),(1254,'https://i9c207.p.ssafy.io/openvidu/recordings/113_20230816025942/str_CAM_PzuI_con_MXTeanYSW7.webm',107,113,'2023-08-16 12:00:25','',''),(1255,'https://i9c207.p.ssafy.io/openvidu/recordings/113_20230816025942/str_CAM_SUvM_con_IXhlfwmoqf.webm',113,107,'2023-08-16 12:00:25','',''),(1256,'https://i9c207.p.ssafy.io/openvidu/recordings/113_20230816030103/str_CAM_NABC_con_IEiMdel9MU.webm',107,113,'2023-08-16 12:01:39','',''),(1257,'https://i9c207.p.ssafy.io/openvidu/recordings/113_20230816030103/str_CAM_Y3iZ_con_DmcpgrKsxs.webm',113,107,'2023-08-16 12:01:39','',''),(1258,'https://i9c207.p.ssafy.io/openvidu/recordings/113_20230816030142/str_CAM_AmJ7_con_RxWKSzgFaT.webm',113,107,'2023-08-16 12:01:46','',''),(1259,'https://i9c207.p.ssafy.io/openvidu/recordings/109_20230816030018/str_CAM_JqMz_con_WySwb0aMIz.webm',109,105,'2023-08-16 12:02:09','',''),(1260,'https://i9c207.p.ssafy.io/openvidu/recordings/109_20230816030018/str_CAM_MBuZ_con_PaDFLg3Z4U.webm',105,109,'2023-08-16 12:02:09','',''),(1261,'https://i9c207.p.ssafy.io/openvidu/recordings/107_20230816030148/str_CAM_MbFK_con_Wwxta3cwRX.webm',113,107,'2023-08-16 12:02:32','',''),(1262,'https://i9c207.p.ssafy.io/openvidu/recordings/107_20230816030148/str_CAM_NQrb_con_PbHHXCFnYP.webm',107,113,'2023-08-16 12:02:32','',''),(1263,'https://i9c207.p.ssafy.io/openvidu/recordings/109_20230816030323/str_CAM_CnV1_con_X9m4bp3OnK.webm',105,109,'2023-08-16 12:03:59','',''),(1264,'https://i9c207.p.ssafy.io/openvidu/recordings/109_20230816030323/str_CAM_Sm6g_con_GT418H892m.webm',109,105,'2023-08-16 12:03:59','',''),(1265,'https://i9c207.p.ssafy.io/openvidu/recordings/105_20230816030454/str_CAM_SCBE_con_PNOWKNEHSS.webm',105,109,'2023-08-16 12:08:34','11 8 7 9 13 ','31630 63886 102553 134579 176107 '),(1266,'https://i9c207.p.ssafy.io/openvidu/recordings/105_20230816030454/str_CAM_EovZ_con_KLSAfInQwR.webm',109,105,'2023-08-16 12:08:34','11 8 7 9 13 ','31630 63886 102553 134579 176107 '),(1267,'https://i9c207.p.ssafy.io/openvidu/recordings/106_20230816034821/str_CAM_EtF2_con_Nkcz5MzaQ1.webm',106,110,'2023-08-16 12:48:50','',''),(1268,'https://i9c207.p.ssafy.io/openvidu/recordings/106_20230816034821/str_CAM_QtYs_con_VpjlqVfnMO.webm',110,106,'2023-08-16 12:48:50','',''),(1269,'https://i9c207.p.ssafy.io/openvidu/recordings/110_20230816034856/str_CAM_SBpx_con_KJm5dB56CH.webm',106,110,'2023-08-16 12:49:14','',''),(1270,'https://i9c207.p.ssafy.io/openvidu/recordings/110_20230816034856/str_CAM_K9ap_con_NIh4Y6sB0F.webm',110,106,'2023-08-16 12:49:14','',''),(1271,'https://i9c207.p.ssafy.io/openvidu/recordings/110_20230816034928/str_CAM_J02X_con_Cxm7Tb0t1Y.webm',110,106,'2023-08-16 12:49:39','',''),(1272,'https://i9c207.p.ssafy.io/openvidu/recordings/110_20230816034928/str_CAM_X0DR_con_J3xto4vICc.webm',106,110,'2023-08-16 12:49:39','',''),(1273,'https://i9c207.p.ssafy.io/openvidu/recordings/106_20230816035055/str_CAM_COnU_con_RgmIjRAzy0.webm',108,106,'2023-08-16 12:51:19','',''),(1274,'https://i9c207.p.ssafy.io/openvidu/recordings/106_20230816035055/str_CAM_NPfl_con_BVirDCjTjt.webm',106,108,'2023-08-16 12:51:19','',''),(1275,'https://i9c207.p.ssafy.io/openvidu/recordings/106_20230816035125/str_CAM_Cy4M_con_WUDVK3ofTw.webm',108,106,'2023-08-16 12:51:40','',''),(1276,'https://i9c207.p.ssafy.io/openvidu/recordings/106_20230816035125/str_CAM_AUti_con_BIjpAMbEGP.webm',106,108,'2023-08-16 12:51:40','',''),(1277,'https://i9c207.p.ssafy.io/openvidu/recordings/108_20230816035200/str_CAM_DQdg_con_WYxrlsfxH6.webm',108,106,'2023-08-16 12:52:17','',''),(1278,'https://i9c207.p.ssafy.io/openvidu/recordings/108_20230816035200/str_CAM_JOZA_con_Vkpr75xWWE.webm',106,108,'2023-08-16 12:52:17','',''),(1279,'https://i9c207.p.ssafy.io/openvidu/recordings/108_20230816035641/str_CAM_QcHc_con_Fd2gETSCzD.webm',108,106,'2023-08-16 12:58:46','',''),(1280,'https://i9c207.p.ssafy.io/openvidu/recordings/108_20230816035641/str_CAM_E5iV_con_Ek7PtN5Bgr.webm',106,108,'2023-08-16 12:58:46','',''),(1281,'https://i9c207.p.ssafy.io/openvidu/recordings/108_20230816035843/str_CAM_LYi8_con_HosVVU13fC.webm',106,108,'2023-08-16 12:59:02','',''),(1282,'https://i9c207.p.ssafy.io/openvidu/recordings/108_20230816035843/str_CAM_KAZA_con_Vj41ydOZdV.webm',108,106,'2023-08-16 12:59:02','',''),(1283,'https://i9c207.p.ssafy.io/openvidu/recordings/110_20230816035933/str_CAM_USrL_con_ZnfqKPy7k8.webm',108,110,'2023-08-16 13:00:09','',''),(1284,'https://i9c207.p.ssafy.io/openvidu/recordings/110_20230816035933/str_CAM_LsMG_con_CRsawjn0Yv.webm',110,108,'2023-08-16 13:00:09','',''),(1285,'https://i9c207.p.ssafy.io/openvidu/recordings/108_20230816040237/str_CAM_RBhb_con_N3L5MqdufG.webm',110,108,'2023-08-16 13:05:16',NULL,NULL),(1286,'https://i9c207.p.ssafy.io/openvidu/recordings/108_20230816040237/str_CAM_F7RJ_con_NCBlH4YRS4.webm',108,110,'2023-08-16 13:05:16',NULL,NULL),(1287,'https://i9c207.p.ssafy.io/openvidu/recordings/108_20230816041031/str_CAM_XsqY_con_UC0LP5hGT6.webm',108,110,'2023-08-16 13:10:41','',''),(1288,'https://i9c207.p.ssafy.io/openvidu/recordings/108_20230816041031/str_CAM_KHsz_con_QkxbB66t8s.webm',110,108,'2023-08-16 13:10:41','',''),(1289,'https://i9c207.p.ssafy.io/openvidu/recordings/115_20230816041123/str_CAM_B0Ka_con_BubPSxkZ37.webm',115,110,'2023-08-16 13:11:37','',''),(1290,'https://i9c207.p.ssafy.io/openvidu/recordings/115_20230816041123/str_CAM_X6F2_con_FU0LwGAfa8.webm',110,115,'2023-08-16 13:11:37','',''),(1291,'https://i9c207.p.ssafy.io/openvidu/recordings/115_20230816041240/str_CAM_Py1Z_con_IUM6EZ2WLA.webm',115,106,'2023-08-16 13:12:56','',''),(1292,'https://i9c207.p.ssafy.io/openvidu/recordings/115_20230816041240/str_CAM_D6B6_con_I48W8KiiTH.webm',106,115,'2023-08-16 13:12:56','',''),(1293,'https://i9c207.p.ssafy.io/openvidu/recordings/106_20230816041326/str_CAM_LGUz_con_NcJjRtn7aq.webm',106,115,'2023-08-16 13:13:33','',''),(1294,'https://i9c207.p.ssafy.io/openvidu/recordings/106_20230816041326/str_CAM_SoiT_con_PMqhSRzmrV.webm',115,106,'2023-08-16 13:13:33','',''),(1295,'https://i9c207.p.ssafy.io/openvidu/recordings/108_20230816041923/str_CAM_HDpl_con_HF5LtL3BO3.webm',108,110,'2023-08-16 13:19:30','',''),(1296,'https://i9c207.p.ssafy.io/openvidu/recordings/108_20230816041923/str_CAM_MGVS_con_Cuk5LnopNe.webm',110,108,'2023-08-16 13:19:30','',''),(1297,'https://i9c207.p.ssafy.io/openvidu/recordings/106_20230816041940/str_CAM_BYFS_con_Swyk1T5ETg.webm',106,108,'2023-08-16 13:19:47','',''),(1298,'https://i9c207.p.ssafy.io/openvidu/recordings/106_20230816041940/str_CAM_IEQC_con_V32pKGd8SM.webm',108,106,'2023-08-16 13:19:47','',''),(1299,'https://i9c207.p.ssafy.io/openvidu/recordings/109_20230816052710/str_CAM_PM24_con_A91gGDRgUo.webm',105,109,'2023-08-16 14:29:04','',''),(1300,'https://i9c207.p.ssafy.io/openvidu/recordings/105_20230816052901/str_CAM_Fgxu_con_CUJ91lvaRi.webm',105,109,'2023-08-16 14:33:47','3 ','147833 '),(1301,'https://i9c207.p.ssafy.io/openvidu/recordings/105_20230816052901/str_CAM_OQiE_con_DJeukzlPWj.webm',109,105,'2023-08-16 14:33:47','3 ','147833 '),(1302,'https://i9c207.p.ssafy.io/openvidu/recordings/105_20230816053429/str_CAM_MPzE_con_Qmtd9PFO8y.webm',105,109,'2023-08-16 14:36:37','4 ','56996 '),(1303,'https://i9c207.p.ssafy.io/openvidu/recordings/105_20230816053429/str_CAM_ZNTK_con_SwhzZJVkYS.webm',109,105,'2023-08-16 14:36:37','4 ','56996 '),(1304,'https://i9c207.p.ssafy.io/openvidu/recordings/105_20230816053643/str_CAM_Ha9w_con_B6Gj1XhHYg.webm',105,109,'2023-08-16 14:41:18','9 11 5 10 ','31467 85188 142158 180413 '),(1305,'https://i9c207.p.ssafy.io/openvidu/recordings/105_20230816053643/str_CAM_K2YR_con_QMeibc4AG8.webm',109,105,'2023-08-16 14:41:18','9 11 5 10 ','31467 85188 142158 180413 '),(1306,'https://i9c207.p.ssafy.io/openvidu/recordings/104_20230816083955/str_CAM_ZeW1_con_GHL31Y0dXr.webm',110,104,'2023-08-16 17:42:46','4 2 ','35470 71645 '),(1307,'https://i9c207.p.ssafy.io/openvidu/recordings/104_20230816083955/str_CAM_Glqb_con_RGjukAQqVO.webm',104,110,'2023-08-16 17:42:46','4 2 ','35470 71645 '),(1308,'https://i9c207.p.ssafy.io/openvidu/recordings/110_20230816084302/str_CAM_PCVI_con_JF8OVM6ZWq.webm',110,104,'2023-08-16 17:43:17','',''),(1309,'https://i9c207.p.ssafy.io/openvidu/recordings/110_20230816084302/str_CAM_UEbt_con_Uh33MsR7xw.webm',104,110,'2023-08-16 17:43:17','',''),(1310,'https://i9c207.p.ssafy.io/openvidu/recordings/104_20230816084348/str_CAM_NGS9_con_IUWkUgrHfH.webm',104,110,'2023-08-16 17:43:57','',''),(1311,'https://i9c207.p.ssafy.io/openvidu/recordings/104_20230816084348/str_CAM_RpxT_con_CSG9F9cHsQ.webm',110,104,'2023-08-16 17:43:57','',''),(1312,'https://i9c207.p.ssafy.io/openvidu/recordings/110_20230817014221/str_CAM_Qvec_con_UZj1NY5jnU.webm',106,110,'2023-08-17 10:42:46','',''),(1313,'https://i9c207.p.ssafy.io/openvidu/recordings/110_20230817014221/str_CAM_N0kV_con_DIeyaJ15Iu.webm',110,106,'2023-08-17 10:42:46','',''),(1314,'https://i9c207.p.ssafy.io/openvidu/recordings/117_20230817014449/str_CAM_TUXD_con_VuhlP4mrQj.webm',117,104,'2023-08-17 10:46:47','9 3 ','38693 87315 '),(1315,'https://i9c207.p.ssafy.io/openvidu/recordings/117_20230817014449/str_CAM_NdbE_con_Zhg5ulDpCl.webm',104,117,'2023-08-17 10:46:47','9 3 ','38693 87315 '),(1316,'https://i9c207.p.ssafy.io/openvidu/recordings/119_20230817020050/str_CAM_TM2W_con_JzFlMcpJp9.webm',119,110,'2023-08-17 11:01:13','',''),(1317,'https://i9c207.p.ssafy.io/openvidu/recordings/119_20230817020050/str_CAM_BWH5_con_VuXi1Gxzz0.webm',110,119,'2023-08-17 11:01:13','',''),(1318,'https://i9c207.p.ssafy.io/openvidu/recordings/119_20230817020120/str_CAM_Cwr3_con_NpJYDd46c3.webm',119,110,'2023-08-17 11:01:36','',''),(1319,'https://i9c207.p.ssafy.io/openvidu/recordings/119_20230817020120/str_CAM_GpM1_con_P0nit0MsaN.webm',110,119,'2023-08-17 11:01:36','',''),(1320,'https://i9c207.p.ssafy.io/openvidu/recordings/119_20230817020201/str_CAM_ZaIf_con_JtM7kUgFzr.webm',110,119,'2023-08-17 11:02:09','',''),(1321,'https://i9c207.p.ssafy.io/openvidu/recordings/119_20230817020201/str_CAM_JtS3_con_IeRbWYuDGo.webm',119,110,'2023-08-17 11:02:09','',''),(1322,'https://i9c207.p.ssafy.io/openvidu/recordings/110_20230817020859/str_CAM_RAkd_con_ReLaCrC86f.webm',110,119,'2023-08-17 11:09:11','',''),(1323,'https://i9c207.p.ssafy.io/openvidu/recordings/110_20230817020918/str_CAM_Wh4K_con_GF3R6BuUfX.webm',110,119,'2023-08-17 11:09:51','',''),(1324,'https://i9c207.p.ssafy.io/openvidu/recordings/110_20230817020918/str_CAM_HOPn_con_DIMJW8k5S7.webm',119,110,'2023-08-17 11:09:51','',''),(1325,'https://i9c207.p.ssafy.io/openvidu/recordings/110_20230817021322/str_CAM_Atui_con_Go3DfF8QiR.webm',119,110,'2023-08-17 11:17:15','',''),(1326,'https://i9c207.p.ssafy.io/openvidu/recordings/110_20230817021322/str_CAM_Y1Cp_con_NoqEHus5xC.webm',110,119,'2023-08-17 11:17:15','',''),(1327,'https://i9c207.p.ssafy.io/openvidu/recordings/110_20230817021702/str_CAM_Z2A6_con_N6CyEUeCi3.webm',110,119,'2023-08-17 11:17:24','',''),(1328,'https://i9c207.p.ssafy.io/openvidu/recordings/110_20230817021702/str_CAM_QLNE_con_CdbdqPYN17.webm',119,110,'2023-08-17 11:17:24','',''),(1329,'https://i9c207.p.ssafy.io/openvidu/recordings/119_20230817021737/str_CAM_F7hO_con_GFvFlRMcjp.webm',110,119,'2023-08-17 11:19:09','',''),(1330,'https://i9c207.p.ssafy.io/openvidu/recordings/119_20230817021737/str_CAM_IilS_con_AMfm2V73xK.webm',119,110,'2023-08-17 11:19:09','',''),(1331,'https://i9c207.p.ssafy.io/openvidu/recordings/119_20230817021910/str_CAM_B7Zg_con_Y46dEaFxz0.webm',119,110,'2023-08-17 11:26:52','',''),(1332,'https://i9c207.p.ssafy.io/openvidu/recordings/119_20230817021910/str_CAM_FyxR_con_DbhcrzLXUs.webm',110,119,'2023-08-17 11:26:52','',''),(1333,'https://i9c207.p.ssafy.io/openvidu/recordings/119_20230817022629/str_CAM_ZVzq_con_Z63xwUTQ3r.webm',110,119,'2023-08-17 11:29:55','',''),(1334,'https://i9c207.p.ssafy.io/openvidu/recordings/119_20230817022629/str_CAM_UkNU_con_I2MkOK5Bxr.webm',119,110,'2023-08-17 11:29:55','',''),(1335,'https://i9c207.p.ssafy.io/openvidu/recordings/119_20230817022948/str_CAM_D6u7_con_OuOXi1OZ3D.webm',119,110,'2023-08-17 11:34:04','',''),(1336,'https://i9c207.p.ssafy.io/openvidu/recordings/119_20230817022948/str_CAM_EgOS_con_IwwNZzoQCQ.webm',110,119,'2023-08-17 11:34:04','',''),(1337,'https://i9c207.p.ssafy.io/openvidu/recordings/119_20230817023352/str_CAM_YESv_con_NiwnLeJBPn.webm',110,119,'2023-08-17 11:38:18','',''),(1338,'https://i9c207.p.ssafy.io/openvidu/recordings/119_20230817023352/str_CAM_JWVi_con_AfS1yIYGm0.webm',119,110,'2023-08-17 11:38:18','',''),(1339,'https://i9c207.p.ssafy.io/openvidu/recordings/119_20230817024603/str_CAM_RA0r_con_YreoTFGQKo.webm',119,110,'2023-08-17 11:46:20','',''),(1340,'https://i9c207.p.ssafy.io/openvidu/recordings/119_20230817024603/str_CAM_XauI_con_FAGSdmDO18.webm',110,119,'2023-08-17 11:46:20','',''),(1341,'https://i9c207.p.ssafy.io/openvidu/recordings/107_20230817024710/str_CAM_HWhP_con_UwSXtasTyi.webm',110,107,'2023-08-17 11:47:36','',''),(1342,'https://i9c207.p.ssafy.io/openvidu/recordings/107_20230817024710/str_CAM_WyPL_con_R9XvpG1V1e.webm',107,110,'2023-08-17 11:47:36','',''),(1343,'https://i9c207.p.ssafy.io/openvidu/recordings/119_20230817024723/str_CAM_EDo5_con_Bf6wGXaQWz.webm',110,119,'2023-08-17 11:48:10','',''),(1344,'https://i9c207.p.ssafy.io/openvidu/recordings/119_20230817024723/str_CAM_IScW_con_UAfPnV6i5K.webm',119,110,'2023-08-17 11:48:10','',''),(1345,'https://i9c207.p.ssafy.io/openvidu/recordings/110_20230817024815/str_CAM_Oahw_con_MjB60yjiym.webm',119,110,'2023-08-17 11:48:33','',''),(1346,'https://i9c207.p.ssafy.io/openvidu/recordings/110_20230817024815/str_CAM_Jy7m_con_NC6994ZeFO.webm',110,119,'2023-08-17 11:48:33','',''),(1347,'https://i9c207.p.ssafy.io/openvidu/recordings/110_20230817025107/str_CAM_Qfto_con_AQwhTH21PA.webm',119,110,'2023-08-17 11:51:31','',''),(1348,'https://i9c207.p.ssafy.io/openvidu/recordings/110_20230817025107/str_CAM_AZFe_con_YZRjYLG4mi.webm',110,119,'2023-08-17 11:51:31','',''),(1349,'https://i9c207.p.ssafy.io/openvidu/recordings/119_20230817025303/str_CAM_ZbVH_con_M5PZHJYsbZ.webm',119,110,'2023-08-17 11:53:18','',''),(1350,'https://i9c207.p.ssafy.io/openvidu/recordings/119_20230817025303/str_CAM_QuB7_con_ZfJwKRKzwJ.webm',110,119,'2023-08-17 11:53:18','',''),(1351,'https://i9c207.p.ssafy.io/openvidu/recordings/119_20230817025327/str_CAM_AZia_con_BEBoKNUWHr.webm',110,119,'2023-08-17 11:53:50','',''),(1352,'https://i9c207.p.ssafy.io/openvidu/recordings/119_20230817025327/str_CAM_RsV5_con_MjjKSgXwOJ.webm',119,110,'2023-08-17 11:53:50','',''),(1353,'https://i9c207.p.ssafy.io/openvidu/recordings/119_20230817025427/str_CAM_PhWV_con_MY9TtHqILw.webm',119,110,'2023-08-17 11:54:53','',''),(1354,'https://i9c207.p.ssafy.io/openvidu/recordings/119_20230817025427/str_CAM_TN2J_con_LE3TiwlPkc.webm',110,119,'2023-08-17 11:54:53','',''),(1355,'https://i9c207.p.ssafy.io/openvidu/recordings/120_20230817030745/str_CAM_N4xd_con_La23Dji9Dy.webm',120,110,'2023-08-17 12:08:09','',''),(1356,'https://i9c207.p.ssafy.io/openvidu/recordings/120_20230817030745/str_CAM_EFbW_con_V9PkEgqc1r.webm',110,120,'2023-08-17 12:08:09','',''),(1357,'https://i9c207.p.ssafy.io/openvidu/recordings/120_20230817030818/str_CAM_HGOC_con_FJbnH6agbJ.webm',120,110,'2023-08-17 12:08:55','',''),(1358,'https://i9c207.p.ssafy.io/openvidu/recordings/120_20230817030818/str_CAM_TFCm_con_CWZHLnQpvR.webm',110,120,'2023-08-17 12:08:55','',''),(1359,'https://i9c207.p.ssafy.io/openvidu/recordings/110_20230817030900/str_CAM_BStL_con_YCDpS5mpLG.webm',110,120,'2023-08-17 12:09:17','',''),(1360,'https://i9c207.p.ssafy.io/openvidu/recordings/110_20230817030900/str_CAM_FD04_con_FdmUq33i5X.webm',120,110,'2023-08-17 12:09:17','',''),(1361,'https://i9c207.p.ssafy.io/openvidu/recordings/110_20230817030950/str_CAM_SjEA_con_Ya7SGA01fx.webm',110,120,'2023-08-17 12:09:59','',''),(1362,'https://i9c207.p.ssafy.io/openvidu/recordings/110_20230817030950/str_CAM_F30c_con_TyAqjCGgUE.webm',120,110,'2023-08-17 12:09:59','',''),(1363,'https://i9c207.p.ssafy.io/openvidu/recordings/107_20230817042951/str_CAM_Tqaq_con_NDW3nx0xNW.webm',109,107,'2023-08-17 13:30:17','',''),(1364,'https://i9c207.p.ssafy.io/openvidu/recordings/107_20230817042951/str_CAM_JzZp_con_LVR746a494.webm',107,109,'2023-08-17 13:30:17','',''),(1365,'https://i9c207.p.ssafy.io/openvidu/recordings/110_20230817043051/str_CAM_Z0iM_con_SsOXiQlBCF.webm',121,110,'2023-08-17 13:35:37','3 7 2 12 13 ','76009 116261 147227 180505 213573 '),(1366,'https://i9c207.p.ssafy.io/openvidu/recordings/110_20230817043051/str_CAM_M7qg_con_IEpypf1Ifm.webm',110,121,'2023-08-17 13:35:37','3 7 2 12 13 ','76009 116261 147227 180505 213573 '),(1367,'https://i9c207.p.ssafy.io/openvidu/recordings/121_20230817043539/str_CAM_CBOA_con_R3koic7Saj.webm',110,121,'2023-08-17 13:36:09','',''),(1368,'https://i9c207.p.ssafy.io/openvidu/recordings/121_20230817043539/str_CAM_M9xN_con_U4Fk2XFqUY.webm',121,110,'2023-08-17 13:36:09','',''),(1369,'https://i9c207.p.ssafy.io/openvidu/recordings/121_20230817043614/str_CAM_AYZ4_con_NlJn7SR4Ro.webm',110,121,'2023-08-17 13:36:50','',''),(1370,'https://i9c207.p.ssafy.io/openvidu/recordings/121_20230817043614/str_CAM_EbDi_con_KiyeDvGsFI.webm',121,110,'2023-08-17 13:36:50','',''),(1371,'https://i9c207.p.ssafy.io/openvidu/recordings/106_20230817043800/str_CAM_WzZJ_con_WY6AGHbizZ.webm',121,106,'2023-08-17 13:38:30','',''),(1372,'https://i9c207.p.ssafy.io/openvidu/recordings/106_20230817043800/str_CAM_DWFO_con_C9LR95vG7g.webm',106,121,'2023-08-17 13:38:30','',''),(1373,'https://i9c207.p.ssafy.io/openvidu/recordings/121_20230817043845/str_CAM_Aszm_con_Af4C7fdWOh.webm',106,121,'2023-08-17 13:39:09','',''),(1374,'https://i9c207.p.ssafy.io/openvidu/recordings/121_20230817043845/str_CAM_REt5_con_X2HVq7KAvy.webm',121,106,'2023-08-17 13:39:09','',''),(1375,'https://i9c207.p.ssafy.io/openvidu/recordings/106_20230817043935/str_CAM_IHws_con_EDNZ3VTqlZ.webm',106,121,'2023-08-17 13:40:10','',''),(1376,'https://i9c207.p.ssafy.io/openvidu/recordings/106_20230817043935/str_CAM_ZMw1_con_LvlF1qSmLe.webm',121,106,'2023-08-17 13:40:10','',''),(1377,'https://i9c207.p.ssafy.io/openvidu/recordings/121_20230817044511/str_CAM_JO2o_con_MkknQmELuI.webm',121,121,'2023-08-17 13:46:17','',''),(1378,'https://i9c207.p.ssafy.io/openvidu/recordings/121_20230817044511/str_CAM_JO2o_con_MkknQmELuI.webm',121,121,'2023-08-17 13:46:17','',''),(1379,'https://i9c207.p.ssafy.io/openvidu/recordings/121_20230817044511/str_CAM_OTAR_con_JjFgSxxX9P.webm',121,121,'2023-08-17 13:46:17','',''),(1380,'https://i9c207.p.ssafy.io/openvidu/recordings/121_20230817044511/str_CAM_OTAR_con_JjFgSxxX9P.webm',121,121,'2023-08-17 13:46:17','',''),(1381,'https://i9c207.p.ssafy.io/openvidu/recordings/121_20230817044654/str_CAM_Toyh_con_O3gFfziGnx.webm',121,106,'2023-08-17 13:50:13','9 8 3 6 13 ','25848 71838 102672 136062 166383 '),(1382,'https://i9c207.p.ssafy.io/openvidu/recordings/121_20230817044654/str_CAM_Pwws_con_OuReZs8IM8.webm',106,121,'2023-08-17 13:50:13','9 8 3 6 13 ','25848 71838 102672 136062 166383 ');
/*!40000 ALTER TABLE `record_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK_lqjrcobrh9jc8wpcar64q1bfh` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (57,'test','테스트','$2a$10$bQvG2L47ZNg2ipsEsFBu2unkyVjcqJWmZpsHpmiK3269XHuY75Agu','01000000000','USER'),(58,'user','유저','$2a$10$C5.g2uFtu7XZnU0Ydi06NuH6uebaXdwJYxOgc5sju8Ufl0B1zyuwC','01012345678','USER'),(59,'blue4683','안경준','$2a$10$G5U0.TcK0LzRqSc1pU52cuqu9BmCjoRq8cqYu422NGhJmbHb1Kzjm','01046205738','USER'),(60,'pang','김성준','$2a$10$cOyZFWoiA7g7oO.aeFbe1Onm/emhz9c1Z9PlxiBL9YwCqPOcqcfV.','01035828505','USER'),(61,'turtle','오영재','$2a$10$AqhmGv9V0hUyivRUFleAVula39ZjYbdHx.jofSiucMhZF9.WUabAq','01012345678','USER'),(62,'yoo','유연석','$2a$10$SJPQdbW6SxsqRyjbm0OHF.69irNMz/AM77rxFJbmURC.Yyu13hh/S','01066079912','USER'),(63,'sinsin','신신신','$2a$10$rGBNSMgkN4KIYLevw79z2.zImYV86ogboc.QOzLcciBxriC7SOZ1m','01000000000','USER'),(64,'ssafy','홍길동','$2a$10$.q38LdNjInxI0RUzTlKQk.JjsWFSE7m4wXvAT2/HhQr1y8tap0cai','01012345678','USER'),(65,'testtest','김김김','$2a$10$Au4iCWnmY4ypA2NRBUNnL.sgn3ZrUUdRT.xBRbMwa.3mv7KVk7mvC','01012345678','USER'),(66,'wlstlr2','개똥이','$2a$10$m49ieHJSagbO9ucx2lykm.52EtGoauD3v82MhlzLvUWNIXwr8Hs6G','01052662626','USER'),(67,'test01','신규람','$2a$10$VFMKGZwzYV2pAwRrHPOeDesSinvHy.eVi/cCbqx7nLP3DNR1r/7nG','01023459876','USER'),(68,'tldus207','박시연','$2a$10$juL/FgoQUcLeC5sN7Q8BCe/AgDBYZpgnjbeG5iNKV3xlbSvPq30ci','01076767676','USER');
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

-- Dump completed on 2023-08-17 14:01:15
