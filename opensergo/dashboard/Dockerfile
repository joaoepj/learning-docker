FROM maven:3.6.3-ibmjava-8-alpine

ENV PACKAGES="\
    gcc \
    g++ \
    jq \
    py-pip \
    "
ENV DATABASE_HOST="localhost"

RUN set -o pipefail \
    && apk add --update $PACKAGES \
    && pip install yq \
    && rm /var/cache/apk/* \
    && mkdir -p /home/opensergo-dashboard 

WORKDIR /home/opensergo-dashboard
COPY . .
RUN yq -i -y ' \
    .spring.datasource.password = "d0cker" \
    ' opensergo-dashboard-server/src/main/resources/application.yaml
RUN mvn clean package -D maven.test.skip=true && \
    cd opensergo-dashboard-server/target 
#ENTRYPOINT ["tail", "-f", "/dev/null"]
#ENTRYPOINT ["java", "-jar", "opensergo-dashboard.jar"]
