#!/bin/bash

# Start the first process
/usr/local/sbin/kea-dhcp4 -c /usr/local/etc/kea/kea-dhcp4.conf &

# Start the second process
/usr/local/sbin/kea-ctrl-agent -c /usr/local/etc/kea/kea-ctrl-agent.conf &

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?