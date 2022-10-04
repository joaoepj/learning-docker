# Learning Docker

This file is a log about Docker CLI commands. It is organized with the most advanced subject at the top. It is meant to be read botton up when one is a beginner and rapidly remember advanced topics as you became more confident.

* ## Usefuls Tricks
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

