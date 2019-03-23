FROM alpine
ARG PLATFORM

RUN apk update && apk add npm

WORKDIR /npm-tmp

COPY build build
