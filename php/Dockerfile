FROM composer:2.5.4 as build
COPY example-app /app/
RUN composer install --prefer-dist --no-dev --optimize-autoloader --no-interaction

FROM php:8.1.16-fpm-alpine3.17 as production
EXPOSE 13374

ENV APP_ENV=production
ENV APP_DEBUG=false

# RUN docker-php-ext-configure opcache --enable-opcache && \
#    docker-php-ext-install pdo pdo_mysql
# COPY docker/php/conf.d/opcache.ini /usr/local/etc/php/conf.d/opcache.ini

COPY --from=build /app /var/www/html
# COPY docker/000-default.conf /etc/apache2/sites-available/000-default.conf
# COPY .env.prod /var/www/html/.env

ENTRYPOINT ["php", "artisan", "serve", "--host=0.0.0.0", "--port=13374"]