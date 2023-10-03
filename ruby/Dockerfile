FROM ruby:3.2.1
# alpine lacks required development tools
EXPOSE 13372

WORKDIR /app

COPY src ./

RUN bundle install

EXPOSE 13372

CMD [ "ruby", "webapp.rb" ]