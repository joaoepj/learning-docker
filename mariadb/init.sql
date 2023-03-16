CREATE DATABASE IF NOT EXISTS coredns;

USE coredns;

DROP TABLE coredns_records; 

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
('example.org.', 'bar', 30, '{"ip": "3.3.3.1"}', 'A'),
('example.org.', 'bar', 60, '{"ip": "3.3.3.0"}', 'A'),

('example.org.', 'foo', 30, '{"text": "hello"}', 'TXT'),
('example.org.', 'foo', 30, '{"host" : "foo.example.org.","priority" : 10}', 'MX'),
('example.org.', 'joao', 30, '{"ip": "2.2.2.0"}', 'A'),
('example.org.', 'www', 30, '{"ip": "2.2.2.1"}', 'A'),
('example.org.', 'ns1', 30, '{"ip": "2.2.2.3"}', 'A'),
('example.org.', 'ns2', 30, '{"ip": "2.2.2.4"}', 'A'),
('example.org.', 'smtp', 30, '{"ip": "2.2.2.5"}', 'A'),
('example.org.', 'web', 30, '{"host": "www.example.org."}', 'CNAME'),
('example.org.', 'ns1', 30, '{"host": "ns1.example.org."}', 'NS'),
('example.org.', 'ns2', 30, '{"host": "ns2.example.org."}', 'NS'),

('example.org.', 'example.org', 30, '{"ns": "ns1.example.org.", "Mbox": "joao.example.org", "refresh": 7200, "retry": 3600, "expire": 21600, "minttl": 3600}', 'SOA'),
('example.org.', 'dns', 30, '{"host": "ns1.example.org."}', 'CNAME');