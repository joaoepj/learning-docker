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
('example.org.', 'foo', 30, '{"text": "hello"}', 'TXT'),
('example.org.', 'foo', 30, '{"host" : "foo.example.org.","priority" : 10}', 'MX'),
('ufu.br.', 'joao', 30, '{"ip": "2.2.2.0"}', 'A'),
('ufu.br.', 'www', 30, '{"ip": "2.2.2.1"}', 'A'),
('ufu.br.', 'ns1', 30, '{"ip": "2.2.2.3"}', 'A'),
('ufu.br.', 'ns2', 30, '{"ip": "2.2.2.4"}', 'A'),
('ufu.br.', 'smtp', 30, '{"ip": "2.2.2.5"}', 'A'),
('ufu.br.', 'web', 30, '{"host": "www.ufu.br."}', 'CNAME'),
('ufu.br.', 'ns1', 30, '{"host": "ns1.ufu.br."}', 'NS'),
('ufu.br.', 'ns2', 30, '{"host": "ns2.ufu.br."}', 'NS'),

('ufu.br.', 'ufu.br', 30, '{"ns": "ns1.ufu.br.", "Mbox": "joao.ufu.br", "refresh": 7200, "retry": 3600, "expire": 21600, "minttl": 3600}', 'SOA'),
('ufu.br.', 'dns', 30, '{"host": "ns1.ufu.br."}', 'CNAME');