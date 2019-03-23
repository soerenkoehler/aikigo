#!/bin/sh

. build/base.sh

echo --- build dist ---

ELECTRON=/npm-tmp/app/node_modules/electron/dist
APP=resources/app

mkdir -p "$ELECTRON/$APP"
cd "$ELECTRON/$APP"

find /npm-tmp/app -not -path "*node_modules*" -not -path "/npm-tmp/app" | xargs -i cp -r {} .
$INSTALL --no-save --prod

rm -r /work/dist
cp -r $ELECTRON /work