/*
SQLyog  v12.2.6 (64 bit)
MySQL - 5.5.53 : Database - daya
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`daya` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `daya`;

/*Table structure for table `jurisdictions` */

DROP TABLE IF EXISTS `jurisdictions`;

CREATE TABLE `jurisdictions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT '',
  `code` varchar(100) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `jurisdictions` */

insert  into `jurisdictions`(`id`,`name`,`code`) values 
(1,'页面-增加','web_add'),
(2,'页面-修改','web_edit'),
(3,'页面-删除','web_remove'),
(4,'管理员','admin'),
(5,'管理员-管理员列表','admin_list'),
(6,'管理员-角色列表','admin_role'),
(7,'管理员-权限列表','admin_jurisdiction');

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT '',
  `is_delete` tinyint(3) DEFAULT '0' COMMENT '0正常 1删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `roles` */

insert  into `roles`(`id`,`name`,`is_delete`) values 
(1,'超级管理员',0),
(2,'普通管理员',0);

/*Table structure for table `roles_jurisdictions` */

DROP TABLE IF EXISTS `roles_jurisdictions`;

CREATE TABLE `roles_jurisdictions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) DEFAULT '0',
  `jurisdiction_id` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  KEY `jurisdiction_id` (`jurisdiction_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

/*Data for the table `roles_jurisdictions` */

insert  into `roles_jurisdictions`(`id`,`role_id`,`jurisdiction_id`) values 
(15,1,1),
(16,1,2),
(17,1,3),
(18,1,4),
(19,1,5),
(20,1,6),
(21,1,7),
(31,2,4),
(32,2,5);

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `iospush` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` tinyint(4) DEFAULT '0' COMMENT '0 正常  1删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`name`,`email`,`password`,`remember_token`,`iospush`,`created_at`,`updated_at`,`status`) values 
(1,'秦华鹏','13402527@qq.com','$2y$10$BgQ9T.4ge.dcDXwmUsUTxOKx11E4Wgi8OQ5m/azfe7THDgu0uSs4a','gk0sNn6zex0xCl56sNyRqb98pMz79JNcdJNXPDC8dotY5X6BtGKyyQhWVRDT',NULL,'2018-08-01 00:15:54','2018-09-13 13:00:04',0),
(14,'admin','admin','$2y$10$wsSOdrmtoOa7Ak8fD5t50OmQmVhJvPzNZ7LgIQs1ZtzIO2qm9Hete',NULL,NULL,'2018-09-11 23:35:58',NULL,0),
(15,'admin01','admin01','$2y$10$Vt/Lr5EJ4v81dt6m6g4D0O./ky2n/A.zwjYpDy8Jt6PKx4Rtr.u9y','yr7Z363Y2OuFSajfDByGsavvHlgCMHuE3yYbmcLFNN9PXqQNx4XLlvkUkq82',NULL,'2018-09-11 23:37:02','2018-09-13 13:00:28',0),
(16,'admin02','admin02','$2y$10$a6iAXusvX7gkKNkINzBPDe34YiPC0nn9m2JKoSUGELntBfyAJFQcK',NULL,NULL,'2018-09-11 23:40:22',NULL,0),
(17,'admin03','admin03','$2y$10$1MB9hhP82hFVyGGiWtKmxus7Kj0BNkAqlViwW8f240G6u16Ap6aSS',NULL,NULL,'2018-09-11 23:42:02',NULL,0),
(18,'admin04','admin04','$2y$10$xFYQRbkrFjHMbiiPgC6CV..0F5oxQTUH5CUV7oeroNBzY7MoaIoqe',NULL,NULL,'2018-09-11 23:42:32',NULL,0);

/*Table structure for table `users_roles` */

DROP TABLE IF EXISTS `users_roles`;

CREATE TABLE `users_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT '0',
  `role_id` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `role_id` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `users_roles` */

insert  into `users_roles`(`id`,`user_id`,`role_id`) values 
(1,1,1),
(2,14,1),
(3,15,2),
(4,16,2),
(5,17,2),
(6,18,2);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
