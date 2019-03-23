#!/bin/sh

docker image build -t npm-electron --build-arg PLATFORM=$1 .
docker run --rm -v $(dirname $(readlink -f $0)):/work npm-electron "$@"
