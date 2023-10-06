# docker build --progress=plain --no-cache kea/joaoepj/ -t joaoepj/kea-dhcp:1
FROM opensuse/leap
RUN zypper in -y curl tar gzip
RUN zypper in -y gcc-c++ make autoconf automake libtool  
RUN zypper in -y boost_1_75_0-*devel libboost_system1_75_0 libopenssl-devel log4cplus-devel
RUN curl https://dl.cloudsmith.io/public/isc/kea-2-4/raw/versions/2.4.0/kea-2.4.0.tar.gz -o kea-2.4.0.tar.gz
RUN tar xzvf kea-2.4.0.tar.gz
RUN cd kea-2.4.0
RUN autoreconf --install
RUN ./configure CPPFLAGS=-I/usr/lib/hpc/gnu7/boost/1.75.0/include/
RUN make
ENTRYPOINT [ "bash" ]