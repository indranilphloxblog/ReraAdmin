
FROM nginx:1.20.1-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY  /web /usr/share/nginx/html
COPY /default.conf  /etc/nginx/conf.d/default.conf


