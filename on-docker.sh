#!/bin/sh

USAGE="Usage: on-docker <PLATFORM> <CMD>\n
PLATFORM := [ win32 | linux ]\n
CMD := [ init | dist ]"

if [ $# -ne 2 ]; then
  echo $USAGE
  exit
fi

docker image build -t npm-electron --build-arg PLATFORM=$1 .
docker run --rm -v $(dirname $(readlink -f $0)):/work npm-electron "build/$2.sh"
