from flask import Flask, render_template_string, request
from tornado import template as template_tornado
from mako import template as template_mako
from django.template import Engine, Context
from django.conf import settings
from bottle import SimpleTemplate
from Cheetah.Template import Template as template_cheetah
from chameleon import PageTemplate
from jinja2.sandbox import SandboxedEnvironment
from pystache import render as pystache_render

app = Flask(__name__)

def getTemplate(name, engine):
  return """
<!DOCTYPE html>
<html>
<head>
  <title>Python {}</title>
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
      <a class="header-link" href="/config.html">Config</a>
      <a class="header-link" href="/links.html">Links</a>
      <a class="header-link" href="/random.html">Random</a>
    </div>

    <div class="grid-template">
      <form method="POST" action="{}">     
        <label>Name</label>
        <input name="name" type="text" value="" />
        <input type="submit" value="submit" />
      </form>
      <br>
      <p id="rendered">{}</p>
    </div>
  </div>
</body>
</html>""".format(engine,engine,name)

def getName(request):
  name = ""
  if request.method == "POST":
    name = request.form.get("name", default="", type=str)
  else:
    name = request.args.get("name", default="", type=str)
  return name

def getHideError(request):
  hideError = ""
  if request.method == "POST":
    hideError = request.form.get("hideError", default="", type=str)
  return hideError

@app.route('/Jinja2', methods=['GET','POST'])
def jinja2():
  hideError = getHideError(request)
  templateString = getTemplate(getName(request), "Jinja2")
  try:
    return render_template_string(templateString)
  except Exception as e:
    if hideError == "1":
      return templateString
    else:
      return repr(e)

@app.route('/Jinja2Sandbox', methods=['GET','POST'])
def jinja2sandbox():
  hideError = getHideError(request)
  templateString = getTemplate(getName(request), "Jinja2Sandbox")
  try:
    env = SandboxedEnvironment()
    return env.from_string(templateString).render()
  except Exception as e:
    if hideError == "1":
      return templateString
    else:
      return repr(e)

@app.route('/Tornado', methods=['GET','POST'])
def tornado():
  hideError = getHideError(request)
  templateString = getTemplate(getName(request), "Tornado")
  try:
    template = template_tornado.Template(templateString)
    return template.generate()
  except Exception as e:
    if hideError == "1":
      return templateString
    else:
      return repr(e)


@app.route('/Mako', methods=['GET','POST'])
def mako():
  hideError = getHideError(request)
  templateString = getTemplate(getName(request), "Mako")
  try:
    template = template_mako.Template(templateString)
    return template.render()
  except Exception as e:
    if hideError == "1":
      return templateString
    else:
      return repr(e)

@app.route('/Django', methods=['GET','POST'])
def django():
  hideError = getHideError(request)
  templateString = getTemplate(getName(request), "Django")
  try:
    template = Engine().from_string(templateString)
    return template.render(Context())
  except Exception as e:
    if hideError == "1":
      return templateString
    else:
      return repr(e)

@app.route('/SimpleTemplateEngine', methods=['GET','POST'])
def simpleTemplateEngine():
  hideError = getHideError(request)
  templateString = getTemplate(getName(request), "SimpleTemplateEngine")
  try:
    template = SimpleTemplate(templateString)
    return template.render()
  except Exception as e:
    if hideError == "1":
      return templateString
    else:
      return repr(e)

@app.route('/Pystache', methods=['GET','POST'])
def pystache():
  hideError = getHideError(request)
  templateString = getTemplate(getName(request), "Pystache")
  try:
    template = pystache_render(templateString)
    return str(template)
  except Exception as e:
    if hideError == "1":
      return templateString
    else:
      return repr(e)

@app.route('/Cheetah3', methods=['GET','POST'])
def cheetah3():
  hideError = getHideError(request)
  templateString = getTemplate(getName(request), "Cheetah3")
  try:
    template = template_cheetah(templateString)
    return str(template)
  except Exception as e:
    if hideError == "1":
      return templateString
    else:
      return repr(e)

@app.route('/Chameleon', methods=['GET','POST'])
def chameleon():
  hideError = getHideError(request)
  templateString = getTemplate(getName(request), "Chameleon")
  try:
    template = PageTemplate(templateString)
    return template.render()
  except Exception as e:
    if hideError == "1":
      return templateString
    else:
      return repr(e)

if __name__=="__main__":
  app.debug = True
  settings.configure()
  settings.DEBUG = True
  
  app.run(host = "0.0.0.0",port = 13375)