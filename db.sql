use POS;
DROP TABLE IF EXISTS `stock`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `rtkls`;
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

CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `manufacturer_id` int(11) NOT NULL,
  `items` json NOT NULL,
  `cost` decimal(9,2) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_orders_1_idx` (`manufacturer_id`),
  CONSTRAINT `fk_orders_1` FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);


CREATE TABLE `rtkls` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `R` varchar(30) NOT NULL,
  `manufacturer_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `price` decimal(9,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `R._UNIQUE` (`R`),
  KEY `fk_rtkls_1_idx` (`manufacturer_id`),
  CONSTRAINT `fk_rtkls_1` FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO `rtkls` VALUES (1,'0100',1,'2018-10-01 00:00:00','2018-10-01 00:00:00',5.6),(2,'0111',1,'2018-10-01 00:00:00',NULL,6);


CREATE TABLE `stock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `color` varchar(45) NOT NULL,
  `R` int(11) NOT NULL,
  `size` int(4) NOT NULL,
  `date_arrived` datetime DEFAULT NULL,
  `order_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_stock_1_idx` (`R`),
  KEY `fk_stock_2` (`order_id`),
  CONSTRAINT `fk_stock_1` FOREIGN KEY (`R`) REFERENCES `rtkls` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_stock_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
