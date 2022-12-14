CREATE TABLE `application`
(
    `id`   bigint(20) NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    `sha256` char(64) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uniq_name` (`name`)
) DEFAULT CHARSET=utf8mb4;

CREATE TABLE `metadata`
(
    `id`   bigint(20) NOT NULL AUTO_INCREMENT,
    `sha256` char(64) NOT NULL,
    `app_name` varchar(100) NOT NULL,
    `metadata` mediumtext NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uniq_name` (`app_name`)
) DEFAULT CHARSET=utf8mb4;

