#!/bin/sh
mkdir -p /run/mysql
chown -R mysql:mysql /run/mysql
mysql_install_db --user=mysql
echo $MYSQL_DATABASE
/usr/bin/mysqld --user=mysql --bootstrap << EOF
USE mysql;
FLUSH PRIVILEGES;
DELETE FROM mysql.user;
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' IDENTIFIED BY '$MYSQL_ROOT_PASSWORD' WITH GRANT OPTION;
GRANT SELECT, SHOW VIEW, PROCESS ON *.* TO '$MYSQL_USER_MONITORING'@'%' IDENTIFIED BY '$MYSQL_PASSWORD_MONITORING' WITH GRANT OPTION;
EOF
exec /usr/bin/mysqld --user=mysql --console