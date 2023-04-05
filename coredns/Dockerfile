# clone coredns repo to docker host
# enable zones on database
# compile coredns server and copy to image at build
# mount configuration with docker compose
FROM debian:stable-slim
LABEL Name=joao/coredns Version=0.0.1
#RUN echo "mysql:github.com/cloud66-oss/coredns_mysql" >> plugin.cfg
#RUN go generate && go build
COPY coredns /coredns
EXPOSE 53 53/udp
ENTRYPOINT [ "/coredns" ]