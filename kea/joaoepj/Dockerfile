# docker build --progress=plain --no-cache kea/joaoepj/ -t joaoepj/kea-dhcp:1
FROM opensuse/leap AS build
RUN zypper in -y curl tar gzip iputils vim iproute2 \
    gcc-c++ make autoconf automake libtool pkgconf \  
    boost_1_75_0-*devel libboost_system1_75_0 \
    libboost_*75* libopenssl-devel log4cplus-devel \
    libyang2 libyang-devel libmysqld-devel \
    postgresql15-devel postgresql15-server-devel \
    dhcp-tools dhcp-client
RUN curl https://dl.cloudsmith.io/public/isc/kea-2-4/raw/versions/2.4.0/kea-2.4.0.tar.gz \
    -o kea-2.4.0.tar.gz && tar xzvf kea-2.4.0.tar.gz
WORKDIR /kea-2.4.0
RUN ./configure \
    --with-mysql \
    --with-pgsql  
#    --with-libyang=/usr/lib64 \
#    --with-boost-include=/usr/lib/hpc/gnu7/boost/1.75.0/include
# exceeds paralelism limits in circleci
#RUN make -j ${nproc}
RUN make -j 6
RUN make install && ldconfig
EXPOSE 8000 67/udp
RUN mkdir -p /home/ext_kea_conf
VOLUME /home/ext_kea_conf
RUN sed -i 's/"http-host": "127.0.0.1"/"http-host": "0.0.0.0"/' /usr/local/etc/kea/kea-ctrl-agent.conf
COPY kea-dhcp4.conf /usr/local/etc/kea
#ENTRYPOINT "keactrl" "start"