#!/bin/bash

until echo 'quit' | curl telnet://$MYSQL_HOST:3306 > /dev/null 2>&1; do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 1
done

>&2 echo "MySQL is up - executing"
python manage.py makemigrations watchlist
python manage.py migrate
python manage.py runserver 0.0.0.0:8000