FROM node:19-alpine3.16
EXPOSE 13377
WORKDIR /app
COPY express ./
RUN npm install express handlebars ejs underscore vue mustache pug hogan.js nunjucks dot velocityjs eta twig
CMD ["node", "index.js"]