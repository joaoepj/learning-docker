FROM golang:1.16.6-alpine

RUN apk update && apk add git

WORKDIR /code

COPY . .
RUN go env -w GOPROXY=https://goproxy.io,direct
RUN go env -w GO111MODULE=on
RUN go build -o hello-client ./hello/client
RUN go build -o hello-server  ./hello