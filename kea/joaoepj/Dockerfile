# docker build --progress=plain --no-cache kea/joaoepj/ -t joaoepj/kea-dhcp:1
FROM opensuse/leap AS build
RUN zypper in -y curl tar gzip iputils \
    gcc-c++ make autoconf automake libtool pkgconf \  
    boost_1_75_0-*devel libboost_system1_75_0 \
    libboost_*75* libopenssl-devel log4cplus-devel \
    libyang2 libyang-devel libmysqld-devel \
    postgresql15-devel postgresql15-server-devel 
RUN curl https://dl.cloudsmith.io/public/isc/kea-2-4/raw/versions/2.4.0/kea-2.4.0.tar.gz \
    -o kea-2.4.0.tar.gz && tar xzvf kea-2.4.0.tar.gz
RUN cd kea-2.4.0 && ./configure \
    --with-mysql \
    --with-pgsql  
#    --with-libyang=/usr/lib64 \
#    --with-boost-include=/usr/lib/hpc/gnu7/boost/1.75.0/include
RUN make -j $(nproc)
RUN make install
#ENTRYPOINT [ "bash" ]