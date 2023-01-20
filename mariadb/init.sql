CREATE DATABASE IF NOT EXISTS coredns;
USE coredns;
CREATE TABLE IF NOT EXISTS `coredns_records` (
    `id` INT NOT NULL AUTO_INCREMENT,
	`zone` VARCHAR(255) NOT NULL,
	`name` VARCHAR(255) NOT NULL,
	`ttl` INT DEFAULT NULL,
	`content` TEXT,
	`record_type` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE = INNODB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4;
INSERT INTO coredns_records (zone, name, ttl, content, record_type) VALUES
('example.org.', 'foo', 30, '{"ip": "1.1.1.1"}', 'A'),
('example.org.', 'foo', 60, '{"ip": "1.1.1.0"}', 'A'),
('example.org.', 'foo', 30, '{"text": "hello"}', 'TXT'),
('example.org.', 'foo', 30, '{"host" : "foo.example.org.","priority" : 10}', 'MX');