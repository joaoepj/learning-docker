# Learning Docker

This file is a log about Docker CLI commands. It is organized with the most advanced subject at the top. It is meant to be read botton up when one is a beginner and rapidly remember advanced topics as you became more confident.

* ## Doubts

#### How to keep the container running?



#### .env, ARG, VAR, whats the difference?

Here is a nice [article](https://vsupalov.com/docker-arg-env-variable-guide/) to answer that question. Chech it out! 

#### What is a build contexts?

One of the appealing benefits of using containers is the accelerated speed that fixes and features can be moved from dev to prod environments. Is happens that to take full advantage of this benefits you should design your enviorments accordingly ...

docker build -t joao/docker-proj https://github.com/joaoepj/learning-docker.git#:docker-proj

dev-joao:/home/learning-docker/opensergo/dashboard # docker build -t joao/opensergo-dashboard https://github.com/joaoepj/learning-go.gi
t
unable to prepare context: unable to 'git clone' to temporary context directory: error fetching: fatal: couldn't find remote ref master
: exit status 128
dev-joao:/home/learning-docker/opensergo/dashboard # docker build -t joao/opensergo-dashboard https://github.com/opensergo/opensergo-dashboard.git#master
unable to prepare context: unable to 'git clone' to temporary context directory: error fetching: fatal: couldn't find remote ref master
: exit status 128
dev-joao:/home/learning-docker/opensergo/dashboard # docker build -t joao/opensergo-dashboard https://github.com/opensergo/opensergo-dashboard.git#v0.0.3
unable to prepare context: unable to evaluate symlinks in Dockerfile path: lstat /tmp/docker-build-git416582543/Dockerfile: no such file or directory
dev-joao:/home/learning-docker/opensergo/dashboard # docker build -t joao/opensergo-dashboard -f . https://github.com/opensergo/openser
go-dashboard.git#v0.0.3
Sending build context to Docker daemon  5.474MB
Error response from daemon: unexpected error reading Dockerfile: read /var/lib/docker/tmp/docker-builder891977508: is a directory
dev-joao:/home/learning-docker/opensergo/dashboard # ls
Dockerfile
dev-joao:/home/learning-docker/opensergo/dashboard # docker build -t joao/opensergo-dashboard -f Dockerfile https://github.com/openserg
o/opensergo-dashboard.git#v0.0.3
unable to prepare context: unable to evaluate symlinks in Dockerfile path: lstat /tmp/docker-build-git561705133/Dockerfile: no such file or directory
-------
dev-joao:/home/learning-docker/opensergo/dashboard # docker build -t joao/opensergo-dashboard  -f . https://github.com/opensergo/opense
rgo-dashboard
Downloading build context from remote url: https://github.com/opensergo/opensergo-dashboard  192.9kB
Sending build context to Docker daemon  194.6kB
Error response from daemon: dockerfile parse error line 8: unknown instruction: <!DOCTYPE
dev-joao:/home/learning-docker/opensergo/dashboard # docker build -t joao/opensergo-dashboard  -f Dockerfile https://github.com/openser
go/opensergo-dashboard
Downloading build context from remote url: https://github.com/opensergo/opensergo-dashboard  192.9kB
Sending build context to Docker daemon  194.6kB
Error response from daemon: dockerfile parse error line 8: unknown instruction: <!DOCTYPE
dev-joao:/home/learning-docker/opensergo/dashboard # docker build -t joao/opensergo-dashboard  https://github.com/opensergo/opensergo-d
ashboard.git#main
unable to prepare context: unable to evaluate symlinks in Dockerfile path: lstat /tmp/docker-build-git009332291/Dockerfile: no such file or directory
dev-joao:/home/learning-docker/opensergo/dashboard # docker build -t joao/opensergo-dashboard -f Dockerfile https://github.com/openserg
o/opensergo-dashboard.git#main
unable to prepare context: unable to evaluate symlinks in Dockerfile path: lstat /tmp/docker-build-git971331789/Dockerfile: no such file or directory
dev-joao:/home/learning-docker/opensergo/dashboard # docker build -t joao/opensergo-dashboard https://github.com/opensergo/opensergo-da
shboard.git#main -f Dockerfile 
unable to prepare context: unable to evaluate symlinks in Dockerfile path: lstat /tmp/docker-build-git606506385/Dockerfile: no such file or directory

* ## Usefuls Tricks

#### Enforcing CPU and Memory limits for a container

Add constrains under service context

`
service:
  image: nginx
  mem_limit: 512m
  mem_reservation: 128M
  cpus: 0.5
`
or for version 3 and above

`
    deploy:
        resources:
            limits:
              cpus: 0.50
              memory: 512M
            reservations:
              cpus: 0.25
              memory: 128M
`

WELL, IT DOESN'T WORK

Check docker statistics to monitor container's behaviour
> docker stats

#### Filter the output by container's name
> docker ps -f name=jenkins

#### Paginate jq's colored output
> docker inspect jenkins-blueocean | jq -C | less -R

## Docker Arguments and environment variables 
#### Create a script that interprets parameters like testing, offer a bash console for tests and running. Then starts the service accordingly

## Docker Volumes

> docker volume ls

## Docker Networking

#### Listen out of docker-dev.dr.ufu.br
> docker run -p 389:389 -it --rm joao/openldap:2.4.46 /usr/sbin/slapd -d 256 -f /etc/openldap/slapd.conf

## Docker container Lifecycle
### Create or edit a Dockerfile (the container source)
> vi joao/openldap/Dockerfile

### Build an image (the compiled container) 
> docker build -t joao/openldap:2.4.46 joao/openldap/
or
> docker build -t joao/myjenkins-blueocean:2.368 joao/jenkins/

### Run the container (the living container)
> docker run -it joao/openldap:2.4.46 /bin/bash
#### Run it with --rm parameter for self destruction
#### See command results
> docker run -it --rm joao/openldap:2.4.46 more /etc/openldap/slapd.conf
> docker run -it --rm joao/openldap:2.4.46 slaptest

#### Stopping and removing containers
> docker stop openldap
> docker rm openldap

#### At this time, if your container behaves the way you expects, it is a good time to commit your changes

> docker build -t joao/openldap:2.4.46 joao
> docker run -dit --name openldap joao/openldap:2.4.46

> docker network inspect traefik_network | jq .[].Containers | less
> docker image inspect --format="{{.Config.Labels 'org.opensuse.base.created'}}" 7d2b4bee0f83
> docker cp jenkins-blueocean:/var/jenkins_home/secrets/initialAdminPassword -
> docker cp openldap:/etc/openldap/slapd.conf -
> docker container ls --format '{{json .}}' | jq
> docker inspect -f '{{json .Config.Labels}}' jenkins-docker

## Install and run a Jenkins server inside a Docker container
#### Enable docker inside jenkins - To be understood
> docker run   --name jenkins-docker   --rm   --detach   --privileged   --network traefik_network   --network-alias docker   --env DOCKER_TLS_CERTDIR=/certs   --volume jenkins-docker-certs:/certs/client   --volume jenkins-data:/var/jenkins_home --publish 2376:2376   docker:dind   --storage-driver overlay2
#### Create jenkins container
> docker run   --name jenkins-blueocean   --restart=on-failure   --detach   --network traefik_network   --env DOCKER_HOST=tcp://docker:2376   --env DOCKER_CERT_PATH=/certs/client   --env DOCKER_TLS_VERIFY=1   --publish 8080:8080   --publish 50000:50000   --volume jenkins-data:/var/jenkins_home   --volume jenkins-docker-certs:/certs/client:ro   joao/myjenkins-blueocean:2.368

#### Going to swarm

dev-joao:~ # docker swarm init
Swarm initialized: current node (8bztrt6v1dy5k0dzhph7u4np1) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-123wprxumve1ijzhrd9aqb6ifuz29mqj165iefp2iztvw4sz90-7lep64j9mvr4x7fjilk9h3nrz dev-joao:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.

