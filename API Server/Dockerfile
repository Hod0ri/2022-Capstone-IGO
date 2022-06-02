# 베이스 이미지
FROM python:3.9-slim

RUN apt-get update

# basic setting 
WORKDIR /home/API_Server
COPY requirements.txt /home/API_Server/

# pip install
RUN pip3 install psycopg2-binary
RUN pip3 install wheel
RUN pip3 install -r requirements.txt 

# 데베 연결 선행 필수 <- Dockerfile에서 판단 불가능
# Database Migration
# RUN python manage.py makemigrations
# RUN python manage.py migrate

# using port
EXPOSE 8000
# check starting postgresql
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /