FROM elixir:1.14.3-alpine
EXPOSE 13376
WORKDIR /app
COPY phoenix_webapp ./
RUN mix local.hex --force
RUN mix deps.get
RUN mix local.rebar --force
RUN mix do compile

ENTRYPOINT ["mix", "phx.server"]