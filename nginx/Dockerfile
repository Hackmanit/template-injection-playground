FROM nginx:1.23.3-alpine
EXPOSE 80
WORKDIR /etc/nginx
COPY nginx.conf ./
# nginx needs permissions to write/overwrite settings.cfg
COPY --chown=nginx:nginx njs ./njs
COPY root /var/www/html/