import Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :phoenix_webapp, PhoenixWebappWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "OKg2ODeQhIB9FHp0X3PEnWSozR2H7aAe8aTYQEgn0R35mpcEN6U8c4ADbooxYnFe",
  server: false

# In test we don't send emails.
config :phoenix_webapp, PhoenixWebapp.Mailer,
  adapter: Swoosh.Adapters.Test

# Disable swoosh api client as it is only required for production adapters.
config :swoosh, :api_client, false

# Print only warnings and errors during test
config :logger, level: :warning

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime
