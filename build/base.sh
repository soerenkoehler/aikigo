#!/bin/sh

if [ -z "$PLATFORM" ]; then
    PLATFORM=win32
fi

rm -r /work/app/node_modules/*
cp -r /work/app .

cd app

INSTALL="npm install --platform=$PLATFORM --no-optional --no-bin-link"
$INSTALL
