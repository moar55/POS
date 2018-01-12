USE POS;



CREATE TABLE adonis_schema (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  name varchar(255) DEFAULT NULL,
  batch int(11) DEFAULT NULL,
  migration_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ;


INSERT INTO `adonis_schema` VALUES (1,'1503248427885_user',1,'2018-01-07 17:12:57'),(2,'1503248427886_token',1,'2018-01-07 17:12:58');

DROP TABLE IF EXISTS `manufacturers`;

CREATE TABLE `manufacturers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
);

INSERT INTO `manufacturers` VALUES (1,'Bellino','2018-01-10 18:55:00','2018-01-10 18:55:00');

DROP TABLE IF EXISTS `rtkls`;

CREATE TABLE `rtkls` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `R` varchar(100) DEFAULT NULL,
  `manufacturer_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `price` double NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `R._UNIQUE` (`R`),
  KEY `fk_rtkls_1_idx` (`manufacturer_id`),
  CONSTRAINT `fk_rtkls_1` FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO `rtkls` VALUES (1,'0100',1,'2018-10-01 00:00:00','2018-10-01 00:00:00',5.6),(2,'0111',1,'2018-10-01 00:00:00',NULL,6);

DROP TABLE IF EXISTS `stock`;
CREATE TABLE `stock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `color` varchar(45) NOT NULL,
  `R` int(11) NOT NULL,
  `size` int(4) NOT NULL,
  `date_arrived` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_stock_1_idx` (`R`),
  CONSTRAINT `fk_stock_1` FOREIGN KEY (`R`) REFERENCES `rtkls` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

INSERT INTO `stock` VALUES (1,'blue',1,20,'2018-11-10 00:00:00'),(2,'blue',1,15,'2018-11-10 00:00:00'),(3,'green',1,16,'2018-11-10 00:00:00'),(4,'blue',1,20,'2018-11-10 00:00:00'),(5,'green',1,15,'2018-11-10 00:00:00'),(6,'blue',2,17,'2018-11-10 00:00:00');





DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(80) NOT NULL,
  `password` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`)
);
