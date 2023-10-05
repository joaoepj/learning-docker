# docker build --progress=plain --no-cache kea/joaoepj/ -t joaoepj/kea-dhcp:1
FROM opensuse/leap
RUN zypper in -y bash gcc-c++ make autoconf automake libopenssl-devel \
libtool curl tar gzip log4cplus-devel
RUN curl https://dl.cloudsmith.io/public/isc/kea-2-4/raw/versions/2.4.0/kea-2.4.0.tar.gz -o kea-2.4.0.tar.gz
RUN tar xzvf kea-2.4.0.tar.gz
RUN cd kea-2.4.0
RUN autoreconf --install
RUN ./configure
RUN make
ENTRYPOINT [ "bash" ]