FROM gnuoctave/octave:latest
LABEL Name=joao/gnuoctave Version=0.0.1
USER root
RUN adduser jovyan
RUN apt-get -y update && apt-get install -y qtbase5-dev qt5-qmake
WORKDIR /home
COPY app/hello.m .
RUN ls /home
ENTRYPOINT [ "/bin/bash" ]