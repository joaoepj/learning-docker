CREATE USER 'user'@'%' IDENTIFIED BY 'opensergo';
GRANT ALL ON opensergo.* TO 'user'@'%';
FLUSH PRIVILEGES;