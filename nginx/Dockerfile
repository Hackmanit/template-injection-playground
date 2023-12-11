FROM nginx:1.23.3-alpine
EXPOSE 80
WORKDIR /etc/nginx
COPY --chown=nginx:nginx nginx.conf ./
# nginx needs permissions to write/overwrite settings.cfg
COPY --chown=nginx:nginx njs ./njs
COPY --chown=nginx:nginx root /var/www/html/