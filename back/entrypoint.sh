#!/bin/sh
set -e

if [ -z ${TZ+x} ]; then
  echo "Warning : TimeZone is unset !";
else
  ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone ;
fi

exec "$@"
