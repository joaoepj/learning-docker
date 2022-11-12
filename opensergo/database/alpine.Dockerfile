FROM alpine:3.16
COPY mysql_setup.sh .
RUN chmod +x mysql_setup.sh \
    && apk add --no-cache mysql
VOLUME [ "/var/lib/mysql" ]
CMD [ "./mysql_setup.sh" ]