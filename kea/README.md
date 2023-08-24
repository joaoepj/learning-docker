# Kea DHCP Server

By exploring [jonasal](https://hub.docker.com/u/jonasal) Kea related Docker images I could run a Kea 2.2.0 service and interact with its REST API throughth [Insomnia](https://insomnia.rest/products/insomnia).

In summary, getting information from server's configuration works fine. But setting server's configuration has no effect at all, although server's API response inform success.

Let's see some examples:

#### A successfull case:

```
curl -s -X POST -H "Content-Type: application/json" -d '{ "command": "status-get", "service": [ "dhcp4" ] }'
 http://server-address:8000 | jq
[
  {
    "arguments": {
      "multi-threading-enabled": true,
      "packet-queue-size": 28,
      "packet-queue-statistics": [
        0,
        0,
        0
      ],
      "pid": 1,
      "reload": 14161,
      "sockets": {
        "status": "ready"
      },
      "thread-pool-size": 4,
      "uptime": 14161
    },
    "result": 0
  }
]
```

#### An unsuccessfull case:

In fact, this case not even try to write into server's configuration, it only asks for server's leases. The "command not supported" response leads to another concept, Hook Library, understood as libraries that allows server extension.

```
curl -s -X POST -H "Content-Type: application/json" -d '{ "command": "lease4-get-all", "service": [ "dhcp4"
] }' http://server-address:8000 | jq
[
  {
    "result": 2,
    "text": "'lease4-get-all' command not supported."
  }
]
```

#### Another unsuccessfull case:

I would write that even after I successfuly sent a configurtion through config-set including instructions to load the Lease Hook Library, server could'nt reckognize lease4-get-all or lease4-add commands. But then it magically worked.
```

```
#### Last problem

Can't add another subnet