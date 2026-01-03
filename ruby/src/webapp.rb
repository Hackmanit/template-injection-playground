require "sinatra"
require "tilt"
require "mustache"

set :port, 13372
set :bind, "0.0.0.0"

get "/Slim" do
    getSlimRender(params["name"], nil)
end

post "/Slim" do
    getSlimRender(params["name"], params["hideError"])
end

get "/Erubi" do
    getErubiRender(params["name"], nil)
end

post "/Erubi" do
    getErubiRender(params["name"], params["hideError"])
end

get "/Erubis" do
    getErubisRender(params["name"], nil)
end

post "/Erubis" do
    getErubisRender(params["name"], params["hideError"])
end

get "/Erb" do
    getErbRender(params["name"], nil)
end

post "/Erb" do
    getErbRender(params["name"], params["hideError"])
end

get "/Haml" do
    getHamlRender(params["name"], nil)
end

post "/Haml" do
    getHamlRender(params["name"], params["hideError"])
end

get "/Liquid" do
    getLiquidRender(params["name"], nil)
end

post "/Liquid" do
    getLiquidRender(params["name"], params["hideError"])
end

get "/Mustache" do
    getMustacheRender(params["name"], nil)
end

post "/Mustache" do
    getMustacheRender(params["name"], params["hideError"])
end

def getTemplate(name, path)
    return '<!DOCTYPE html>
<html>
<head>
    <title>Ruby ' + path + '</title>
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
            <form method="POST" action="/ruby/' + path + '">     
                <label>Name</label>
                <input name="name" type="text" value="" />
                <input type="submit" value="submit" />
            </form>
            <br>
            <p id="rendered">' + name + '</p>
        </div>
    </div>
</body>
</html>'
end

def getSlimRender(name, hideError)
    if name == nil
        name = ""
    end
    if hideError == nil
        hideError = ""
    end
    template = getTemplate(name, "Slim")
    begin
        return Tilt['slim'].new { template }.render()
    rescue => error
        if hideError == "1"
            return template
        else
            return error.message
        end
    end
end

def getErubisRender(name, hideError)
    if name == nil
        name = ""
    end
    if hideError == nil
        hideError = ""
    end
    template = getTemplate(name, "Erubis")
    begin
        return Tilt['erubis'].new { template }.render()
    rescue => error
        if hideError == "1"
            return template
        else
            return error.message
        end
    end
end

def getErubiRender(name, hideError)
    if name == nil
        name = ""
    end
    if hideError == nil
        hideError = ""
    end
    template = getTemplate(name, "Erubi")
    begin
        return Tilt['erubi'].new { template }.render()
    rescue => error
        if hideError == "1"
            return template
        else
            return error.message
        end
    end
end

def getErbRender(name, hideError)
    if name == nil
        name = ""
    end
    if hideError == nil
        hideError = ""
    end
    template = getTemplate(name, "Erb")
    begin
        return Tilt['erb'].new { template }.render()
    rescue => error
        if hideError == "1"
            return template
        else
            return error.message
        end
    end
end

def getHamlRender(name, hideError)
    if name == nil
        name = ""
    end
    if hideError == nil
        hideError = ""
    end
    begin
        template = Tilt['haml'].new { name }.render()
        return getTemplate(template, "Haml")
    rescue => error
        if hideError == "1"
            return getTemplate(name, "Haml")
        else
            return error.message
        end
    end
end

def getLiquidRender(name, hideError)
    if name == nil
        name = ""
    end
    if hideError == nil
        hideError = ""
    end
    template = getTemplate(name, "Liquid")
    begin
        return Tilt['liquid'].new { template }.render()
    rescue => error
        if hideError == "1"
            return template
        else
            return error.message
        end
    end
end

def getMustacheRender(name, hideError)
    if name == nil
        name = ""
    end
    if hideError == nil
        hideError = ""
    end
    template = getTemplate(name, "Mustache")
    begin
        return Mustache.render(template)
    rescue => error
        if hideError == "1"
            return template
        else
            return error.message
        end
    end
end
