FROM coredns/coredns:1.9.4
LABEL Name=joao/coredns Version=0.0.1
WORKDIR .
RUN sudo cat /coredns/plugin.cfg
#RUN apt-get install dash
#RUN sudo ln -s dash /bin/sh
#RUN echo "mysql:github.com/cloud66-oss/coredns_mysql" >> plugin.cfg
#RUN go generate && go build
#ENTRYPOINT [ "/coredns" ]