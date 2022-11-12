CREATE USER 'opensergo'@'opensergo-dashboard' IDENTIFIED BY 'opensergo';
GRANT ALL PRIVILEGES ON *.* TO 'opensergo'@'opensergo-dashboard';
FLUSH PRIVILEGES;