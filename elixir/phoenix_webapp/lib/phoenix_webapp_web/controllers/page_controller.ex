defmodule PhoenixWebappWeb.PageController do
  alias Module.Types.Helpers
  use PhoenixWebappWeb, :controller
  use PhoenixWebappWeb, :live_view

  def getParam(_params, param) do
    if is_nil(_params[param]) do
      ""
    else
      _params[param]
    end
  end

  def getTemplate(name, engine) do
"""
<!DOCTYPE html>
<html>
<head>
  <title>Elixir #{engine}</title>
  <link rel="stylesheet" href="/css/stylesheet.css" type="text/css">
  <link rel="icon" type="image/x-icon" href="/images/favicon.ico">
</head>
<body>
  <div class="grid-container">
    <div class="grid-header-heading">
      <a class="heading" href="/index.html">Template Injection Playground</a>
    </div>
    <div class="grid-header-rest">
      <a class="header-link" href="/engines.html">Template Engines</a>
      <a class="header-link" href="/all.html">All Engines</a>
      <a class="header-link" href="/config.html">Config</a>
      <a class="header-link" href="/links.html">Links</a>
      <a class="header-link" href="/random.html">Random</a>
    </div>

    <div class="grid-template">
      <form method="POST" action="#{engine}">
        <label>Name</label>
        <input name="name" type="text" value="" />
        <input type="submit" value="submit" />
      </form>
      <br>
      <p id="rendered">#{name}</p>
    </div>
  </div>
</body>
</html>
"""
  end

  def eex(conn, params) do
    name = getParam(params, "name")
    hideError = getParam(params, "hideError")

    templateString = getTemplate(name, "EEx")

    try do
      template = EEx.eval_string(templateString)
      html conn, template
    rescue
      e ->
        if hideError == "1" do
          html conn, templateString
        else
          html conn, e
        end
    end
  end

  def leex(conn, params) do #HEEx new, LEEx alt
  name = getParam(params, "name")
  templateString = getTemplate(name, "LEEx")

  assigns = %{
    template: templateString
  }

  template = ~L"""
  <%= raw @template %>
  """
#  |> Phoenix.HTML.Engine.encode_to_iodata!()
#  |> Phoenix.HTML.raw()
#  |> Phoenix.HTML.safe_to_string()
 #templateRaw = Phoenix.HTML.safe_to_string({:safe,template})
  #|> Phoenix.HTML.Engine.encode_to_iodata!()
  |> Phoenix.HTML.Safe.to_iodata()
  |> List.to_string()
  #|> IO.iodata_to_binary()
  html conn, template
end

  def heex(conn, params) do #HEEx new, LEEx alt
  name = getParam(params, "name")
  templateString = getTemplate(name, "HEEx")

  assigns = %{
    template: templateString
  }

  template = ~H"""
  <%= raw @template %>
  """
  |> Phoenix.HTML.Engine.encode_to_iodata!()
  #|> Phoenix.HTML.Safe.to_iodata()
  |> List.to_string()
  html conn, template
  end
end
