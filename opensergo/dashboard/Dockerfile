FROM maven:3.6.3-ibmjava-8-alpine
RUN set -o pipefail && \
    apk update && \
    apk add git gcc g++ 
WORKDIR /home
RUN git clone https://github.com/opensergo/opensergo-dashboard.git && \
    sed -i 's/localhost:3306/ld-mysql:3306/' opensergo-dashboard/opensergo-dashboard-server/src/main/resources/application.yaml
WORKDIR /home/opensergo-dashboard
RUN mvn clean package -D maven.test.skip=true && \
    cd opensergo-dashboard-server/target 
ENTRYPOINT ["tail", "-f", "/dev/null"]
#ENTRYPOINT ["java", "-jar", "opensergo-dashboard.jar"]