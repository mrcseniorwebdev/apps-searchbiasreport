-- MariaDB dump 10.19  Distrib 10.8.3-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: searchbiasreport
-- ------------------------------------------------------
-- Server version	10.8.3-MariaDB-1:10.8.3+maria~jammy

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `campaigns`
--

DROP TABLE IF EXISTS `campaigns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campaigns` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `cname` varchar(255) NOT NULL,
  `link` text DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaigns`
--

LOCK TABLES `campaigns` WRITE;
/*!40000 ALTER TABLE `campaigns` DISABLE KEYS */;
INSERT INTO `campaigns` VALUES
(4,'Raphael Warnock Google Search bias','https://mrc7.s3.amazonaws.com/sbr/raphael%2Bwarnock%2Bgoogle%2Bsearch%2Bbias.zip'),
(5,'Georgia runoff Google search bias','https://mrc7.s3.amazonaws.com/sbr/georgia%2Brunoff%2Bgoogle%2Bsearch%2Bbias.zip'),
(7,'Google Shilling Chinese Propaganda','https://mrc7.s3.amazonaws.com/sbr/google%2Bshilling%2Bchinese%2Bpropaganda.zip'),
(10,'Pro-life queries','https://mrc7.s3.amazonaws.com/sbr/pro%2Blife%2Bqueries.zip'),
(11,'Antifa Queries','https://mrc7.s3.amazonaws.com/sbr/antifa%2Bqueries.zip'),
(13,'Project Veritas','https://mrc7.s3.amazonaws.com/sbr/project%2Bveritas.zip'),
(19,'MRC Free Speech America','https://mrc7.s3.amazonaws.com/sbr/mrc%2Bfree%2Bspeech%2Bamerica.zip'),
(21,'MRC Free Speech America Take 2','https://mrc7.s3.amazonaws.com/sbr/mrc%2Bfree%2Bspeech%2Bamerica%2Btake%2B2.zip'),
(22,'Easter ','https://mrc7.s3.amazonaws.com/sbr/easter%2B.zip'),
(27,'MRC Free Speech America Take 3','https://mrc7.s3.amazonaws.com/sbr/mrc%2Bfree%2Bspeech%2Bamerica%2Btake%2B3.zip'),
(29,'What holiday is today?','https://mrc7.s3.amazonaws.com/sbr/what%2Bholiday%2Bis%2Btoday%2B.zip'),
(30,'What holiday is today? Take 2','https://mrc7.s3.amazonaws.com/sbr/what%2Bholiday%2Bis%2Btoday%2B%2Btake%2B2.zip'),
(31,'What holiday is today Take 3','https://mrc7.s3.amazonaws.com/sbr/what%2Bholiday%2Bis%2Btoday%2Btake%2B3.zip'),
(32,'MRC Free Speech America Take 4','https://mrc7.s3.amazonaws.com/sbr/mrc%2Bfree%2Bspeech%2Bamerica%2Btake%2B4.zip'),
(33,'Leftist news sites','https://mrc7.s3.amazonaws.com/sbr/leftist%2Bnews%2Bsites.zip'),
(34,'Presidential Campaigns 1','https://mrc7.s3.amazonaws.com/sbr/presidential%2Bcampaigns%2B1.zip'),
(35,'Presidential Campaigns test','https://mrc7.s3.amazonaws.com/sbr/presidential%2Bcampaigns%2Btest.zip'),
(36,'Federalist Search Check','https://mrc7.s3.amazonaws.com/sbr/federalist%2Bsearch%2Bcheck.zip'),
(37,'Test of hunter biden joe biden an absolute wall','https://mrc7.s3.amazonaws.com/sbr/test%2Bof%2Bhunter%2Bbiden%2Bjoe%2Bbiden%2Ban%2Babsolute%2Bwall.zip'),
(38,'Hunter Biden Laptop Test','https://mrc7.s3.amazonaws.com/sbr/hunter%2Bbiden%2Blaptop%2Btest.zip'),
(39,'Presidential Campaign Websites Test','https://mrc7.s3.amazonaws.com/sbr/presidential%2Bcampaign%2Bwebsites%2Btest.zip'),
(40,'[Name] Presidential campaign website','https://mrc7.s3.amazonaws.com/sbr/%2Bname%2B%2Bpresidential%2Bcampaign%2Bwebsite.zip'),
(41,'Chris Christie','https://mrc7.s3.amazonaws.com/sbr/chris%2Bchristie.zip'),
(42,'GOP Presidential candidates test','https://mrc7.s3.amazonaws.com/sbr/gop%2Bpresidential%2Bcandidates%2Btest.zip'),
(43,'Republican presidential campaign websites','https://mrc7.s3.amazonaws.com/sbr/republican%2Bpresidential%2Bcampaign%2Bwebsites.zip'),
(44,'Presidential Campaign Websites part 2 ','https://mrc7.s3.amazonaws.com/sbr/presidential%2Bcampaign%2Bwebsites%2Bpart%2B2%2B.zip'),
(45,'Chase Oliver/Libertarian campaign websites','https://mrc7.s3.amazonaws.com/sbr/chase%2Boliver%2Blibertarian%2Bcampaign%2Bwebsites.zip'),
(46,'Pro-life study','https://mrc7.s3.amazonaws.com/sbr/pro%2Blife%2Bstudy.zip'),
(47,'Abortion regret searchers','https://mrc7.s3.amazonaws.com/sbr/abortion%2Bregret%2Bsearchers.zip');
/*!40000 ALTER TABLE `campaigns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobs` (
  `jid` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) NOT NULL,
  `query` text NOT NULL,
  `siteurl` text NOT NULL,
  `completed` int(11) NOT NULL,
  PRIMARY KEY (`jid`)
) ENGINE=InnoDB AUTO_INCREMENT=286 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES
(10,4,'Raphael Warnock Senate race 2022','warnockforgeorgia',1),
(11,5,'Raphael Warnock Georgia Senate race 2022','https://warnockforgeorgia.com/',1),
(12,5,'Herschel Walker Georgia Senate race 2022','https://www.teamherschel.com/',1),
(14,7,'Native Americans killed','https://www.fmprc.gov.cn/mfa_eng/wjdt_665385/2649_665393/202203/t20220302_10647120.html',1),
(25,10,'Pro life','',1),
(26,10,'Pro choice','',1),
(27,10,'Pro abortion','',1),
(28,10,'Pregnancy','',1),
(29,10,'Pregnant','',1),
(30,10,'March For Life','https://marchforlife.org/',1),
(31,10,'Live Action','https://www.liveaction.org/',1),
(32,10,'Students for Life','https://studentsforlife.org/',1),
(33,10,'What is an abortion','',1),
(34,10,'Planned Parenthood','https://www.plannedparenthood.org/',1),
(35,10,'Anti abortion','',1),
(36,11,'Antifa','',1),
(37,11,'Antifa riot','',1),
(38,11,'Antifa cop','',1),
(39,11,'Antifa Atlanta','',1),
(40,11,'Atlanta cop death','',1),
(41,11,'Antifa cop death','',1),
(43,13,'Pfizer Project Veritas','',1),
(83,19,'MRC Free Speech America','',1),
(85,21,'MRC Free Speech America','',1),
(86,22,'Is Jesus the Son of God?','',1),
(87,22,'Is religion good?','',1),
(88,22,'Is Jesus Good?','',1),
(89,22,'Is Religion Good?','',1),
(90,22,'Is Israel a good country?','',1),
(91,22,'Did the Exodus really happen?','',1),
(92,22,'Did the Resurrection really happen?','',1),
(114,27,'MRC Free Speech America ','',1),
(116,29,'What holiday is today','',1),
(117,30,'What Holiday is today?','',1),
(118,31,'What holiday is today?','',1),
(119,32,'MRC Free Speech America','',1),
(120,33,'Jacobin','',1),
(121,33,'Mother Jones','',1),
(122,33,'BuzzFeedNews','',1),
(123,33,'USA Today','',1),
(124,34,'Trump vs. Biden 2024 AND Biden vs. Trump 2024','',1),
(125,34,'presidential election 2024','',1),
(126,34,'Donald Trump','',1),
(127,34,'Ron DeSantis','',1),
(128,34,'Vivek Ramaswamy','',1),
(129,34,'Mike Pence','',1),
(130,34,'Niki Haley','',1),
(131,34,'Tim Scott','',1),
(132,34,'Chris Christie','',1),
(133,34,'Presidential campaign websites','',1),
(134,35,'presidential campaign websites','',1),
(135,36,'hunter biden joe biden \"an absolute wall\"','',1),
(136,37,'hunter biden joe biden \"an absolute wall\" ','',1),
(137,37,'Joe Biden \"an absolute wall\"','',1),
(138,37,'Hunter Biden \"an absolute wall\"','',1),
(139,38,'hunter biden joe biden relationship','',1),
(140,38,'joe biden\'s response to hunter biden allegations','',1),
(141,38,'hunter biden and joe biden business ties','',1),
(142,38,'joe biden stance on hunter\'s business ventures','',1),
(143,38,'hunter biden joe biden Ukraine connection','',1),
(144,38,'how did joe biden defend hunter biden?','',1),
(145,38,'joe biden\'s view on hunter\'s controversies','',1),
(146,38,'hunter biden joe biden\'s involvement in China','',1),
(147,38,'does joe biden support hunter\'s decisions?','',1),
(148,38,'joe biden on hunter biden laptop controversy','',1),
(149,38,'hunter biden and joe biden energy company','',1),
(150,38,'joe biden\'s reaction to hunter biden scandal','',1),
(151,38,'hunter biden\'s relationship with joe biden','',1),
(152,38,'joe biden\'s statements on hunter\'s dealings','',1),
(153,38,'hunter biden and joe biden family ties','',1),
(154,38,'how close are hunter and joe biden?','',1),
(155,38,'joe biden\'s perspective on hunter\'s book','',1),
(156,38,'hunter biden joe biden email leak','',1),
(157,38,'were joe and hunter biden involved in same businesses?','',1),
(158,38,'joe biden comments about hunter biden\'s art','',1),
(159,38,'hunter biden\'s dealings and joe biden\'s knowledge','',1),
(160,38,'does joe biden distance himself from hunter\'s issues?','',1),
(161,38,'hunter biden joe biden board membership','',1),
(162,38,'joe biden\'s position on hunter\'s foreign connections','',1),
(163,38,'hunter biden and joe biden Russia links','',1),
(164,38,'how often do joe and hunter biden communicate?','',1),
(165,38,'joe biden\'s response to hunter\'s interviews','',1),
(166,38,'hunter biden joe biden influence','',1),
(167,38,'did joe biden help hunter biden\'s career?','',1),
(168,38,'joe biden\'s perspective on hunter\'s rehab','',1),
(169,38,'hunter biden joe biden family support','',1),
(170,38,'is joe biden aware of hunter\'s business?','',1),
(171,38,'joe biden and hunter biden money ties','',1),
(172,38,'was joe biden involved in hunter\'s deals?','',1),
(173,38,'hunter biden joe biden Burisma','',1),
(174,38,'joe biden\'s comments about hunter\'s career choices','',1),
(175,38,'did hunter biden benefit from joe biden\'s position?','',1),
(176,38,'how did joe biden react to hunter\'s memoir?','',1),
(177,38,'hunter biden\'s reputation and joe biden\'s presidency','',1),
(178,38,'joe biden\'s take on hunter\'s controversies','',1),
(179,38,'hunter biden and joe biden family business','',1),
(180,38,'did joe biden influence hunter\'s career?','',1),
(181,38,'hunter biden joe biden conflict of interest','',1),
(182,38,'joe biden\'s quotes about hunter\'s struggles','',1),
(183,38,'was joe biden part of hunter\'s deals?','',1),
(184,38,'hunter biden\'s relationship with joe biden\'s administration','',1),
(185,38,'did joe biden defend hunter\'s business choices?','',1),
(186,38,'joe biden and hunter biden transparency','',1),
(187,38,'hunter biden\'s influence on joe biden\'s decisions','',1),
(188,38,'was joe biden aware of hunter\'s foreign dealings?','',1),
(189,38,'joe biden\'s reaction to hunter biden news','',1),
(190,38,'how did hunter biden affect joe biden\'s campaign?','',1),
(191,38,'joe biden\'s statement on hunter biden\'s business','',1),
(192,38,'was joe biden involved in hunter\'s Ukraine dealings?','',1),
(193,38,'hunter biden joe biden father son bond','',1),
(194,38,'did joe biden ever comment on hunter\'s addiction?','',1),
(195,38,'hunter biden\'s impact on joe biden\'s image','',1),
(196,38,'joe biden\'s thoughts on hunter\'s art sales','',1),
(197,38,'does hunter biden influence joe biden\'s policies?','',1),
(198,38,'joe biden and hunter biden shared business interests','',1),
(199,38,'hunter biden\'s role in joe biden\'s presidency','',1),
(200,38,'how supportive is joe biden of hunter\'s choices?','',1),
(201,38,'hunter biden\'s interaction with joe biden\'s staff','',1),
(202,38,'did joe biden have a say in hunter\'s business ventures?','',1),
(203,38,'hunter biden joe biden financial ties','',1),
(204,38,'how does joe biden view hunter\'s media coverage?','',1),
(205,38,'hunter biden\'s influence on joe biden\'s career','',1),
(206,38,'what does joe biden think about hunter\'s deals?','',1),
(207,38,'hunter biden and joe biden shared experiences','',1),
(208,38,'joe biden\'s comments on hunter biden\'s life','',1),
(209,38,'does hunter biden get special treatment from joe biden?','',1),
(210,38,'joe biden and hunter biden meetings','',1),
(211,38,'how often does joe biden mention hunter in speeches?','',1),
(212,38,'hunter biden\'s involvement in joe biden\'s campaign','',1),
(213,38,'what did joe biden say about hunter\'s challenges?','',1),
(214,38,'hunter biden joe biden memoir reflections','',1),
(215,38,'how involved is joe biden in hunter\'s life?','',1),
(216,38,'hunter biden\'s influence on joe biden\'s decisions','',1),
(217,38,'did joe biden ever talk about hunter\'s past?','',1),
(218,38,'hunter biden and joe biden shared memories','',1),
(219,38,'how does joe biden feel about hunter\'s media attention?','',1),
(220,38,'hunter biden\'s relationship with joe biden\'s policies','',1),
(221,38,'did joe biden ever comment on hunter\'s art?','',1),
(222,38,'joe biden\'s insights on hunter\'s business ethics','',1),
(223,38,'hunter biden\'s reflections on joe biden\'s leadership','',1),
(224,38,'was joe biden involved in hunter\'s rehab?','',1),
(225,38,'how did joe biden support hunter through tough times?','',1),
(226,38,'joe biden\'s perspective on hunter\'s decisions','',1),
(227,38,'hunter biden\'s connection to joe biden\'s advisors','',1),
(228,38,'does joe biden consult hunter on foreign policy?','',1),
(229,38,'hunter biden joe biden campaign ties','',1),
(230,38,'joe biden\'s thoughts on hunter\'s public image','',1),
(231,38,'was hunter biden influenced by joe biden\'s career?','',1),
(232,38,'hunter biden\'s contributions to joe biden\'s legacy','',1),
(233,38,'did joe biden ever address hunter\'s controversies in interviews?','',1),
(234,38,'hunter biden joe biden family dynamics','',1),
(235,38,'how has joe biden\'s presidency affected hunter\'s career?','',1),
(236,38,'joe biden\'s take on hunter\'s business ethics','',1),
(237,38,'hunter biden\'s reflections on joe biden\'s values','',1),
(238,38,'joe biden\'s comments on hunter biden\'s future','',1),
(239,39,'presidential campaign websites','',1),
(240,39,'Republican pesidential campaign websites','',1),
(241,39,'Democrat presidential campaign websites','',1),
(242,39,'Donald Trump presidential race 2024','',1),
(243,39,'Donald Trump','',1),
(244,39,'Ron DeSantis presidential race 2024','',1),
(245,39,'Ron DeSantis','',1),
(246,39,'Vivek Ramaswamy presidential race 2024','',1),
(247,39,'Vivek Ramaswamy','',1),
(248,39,'Nikki Haley presidential race 2024','',1),
(249,39,'Nikki Haley','',1),
(250,39,'Mike Pence presidential race 2024','',1),
(251,39,'Mike Pence','',1),
(252,39,'Tim Scott presidential race 2024','',1),
(253,39,'Tim Scott','',1),
(254,39,'Chris Christie presidential race 2024','',1),
(255,39,'Chris Christie','',1),
(256,39,'Joe Biden presidential race 2024','',1),
(257,39,'Joe Biden','',1),
(258,39,'Marianne Williamson presidential race 2024','',1),
(259,39,'Marianne Williamson','',1),
(260,39,'Robert F. Kennedy Jr. presidential race 2024','',1),
(261,39,'Robert F. Kennedy Jr.','',1),
(262,40,'Joe Biden presidential campaign website','https://joebiden.com/',1),
(263,40,'Marianne Williamson presidential campaign website','https://marianne2024.com/',1),
(264,40,'Robert F. Kennedy Jr. presidential campaign website','https://www.kennedy24.com/',1),
(265,40,'Donald Trump presidential campaign website','https://www.donaldjtrump.com/',1),
(266,40,'Vivek Ramaswamy presidential campaign website','https://www.vivek2024.com/',1),
(267,40,'Ron DeSantis presidential campaign website','https://rondesantis.com/',1),
(268,40,'Nikki Haley presidential campaign website','https://nikkihaley.com/',1),
(269,40,'Mike Pence presidential campaign website','https://mikepence2024.com/',1),
(270,40,'Tim Scott presidential campaign website','https://votetimscott.com/',1),
(271,40,'Chris Christie','https://chrischristie.com/',1),
(272,41,'Chris Christie presidential campaign website','https://chrischristie.com/',1),
(273,42,'Republican presidential candidates ','',1),
(274,42,'Democrat presidential candidates','',1),
(275,43,'Republican presidential campaign websites','',1),
(276,44,'Presidential campaign websites','',1),
(277,44,'Democrat presidential campaign Websites','',1),
(278,44,'Republican presidential campaign websites','',1),
(279,45,'Libertarian presidential campaign websites','https://www.votechaseoliver.com/',1),
(280,45,'Presidential campaign websites','https://www.votechaseoliver.com/',1),
(281,46,'Study: Women did not regret having baby','',1),
(282,47,'Study women do not regret having baby','',1),
(283,47,'Do women regret abortion?','',1),
(284,47,'Do women regret having baby?','',1),
(285,47,'Will I regret my abortion?','',1);
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `gid` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'111001625214665764471','jjones@mrc.org','Josh Jones','https://lh3.googleusercontent.com/a/ALm5wu1PihHFQO8ySThfsND2gLSdkJBnM0xT2V8iT2Ls=s96-c'),
(4,'107051372276639056530','bbradley@mrc.org','Brian Bradley','https://lh3.googleusercontent.com/a/ALm5wu3NBR7gmB4a2uYTnaf3pCUiwUB_d6GizLV7R5bZ=s96-c'),
(5,'107027317192398098465','gpariseau@mrc.org','Gabriela Pariseau','https://lh3.googleusercontent.com/a/ALm5wu1a8ovciF-JABTzsp_UvDTaXh-N885GAi8q99lq4g=s96-c'),
(6,'104276687315208893304','mmorris@mrc.org','Michael Morris','https://lh3.googleusercontent.com/a/AGNmyxYMvWW2Oi4rPTMgI2Ng5bGn-LjV8v99voHrm5Um=s96-c'),
(7,NULL,'dschneider@mrc.org',NULL,NULL),
(8,'108732723522592395746','epairel@mrc.org','Eric Pairel','https://lh3.googleusercontent.com/a/ALm5wu1p278e-QuLnCDEfzlTvdTDn64vdU0zbI--ezuECA=s96-c'),
(9,'112760136567791334073','lcornelio@mrc.org','Luis Cornelio','https://lh3.googleusercontent.com/a/AGNmyxYl0xX_OxYT41TeokAl_yB1rHOSTpH2wblktv9y=s96-c'),
(10,'106653349382238216450','mgladson@mrc.org','Milani Gladson','https://lh3.googleusercontent.com/a/AAcHTtcIqf7pliTqMShLpioz1gAqFkJzduTodpKy9NHjJIXB=s96-c');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-23 18:10:08
