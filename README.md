[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)

# Template Injection Playground

With the *Template Injection Playground* a large number of the **most relevant template engines** can be tested for **template injections**. For this purpose, simple web pages are provided, each of which uses one of the template engines. Furthermore, **various optional security measures** such as sandboxes, encodings and denylists can be activated.

- [Features](#features)
- [Implemented Template Engines](#implemented-template-engines)
- [Prerequisites](#prerequisites)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)

## Features
- A total of **46 template engines** for 8 different programming languages are implemented
- Each template engine can be customized
    - Various optional countermeasures like **sandboxing**, **encoding**, **denylisting** and **hiding error messages**
    - Various optional special cases like **header injection**, **template engine output is hidden** or **not displayed in the response but in another place**
- Each template engine has an overview page which contains:
    - Links to **documentation** and **interesting blog posts** (such as exploit research)
    - Links to simple web pages using the template engine
    - A **cheat sheet with special features** of the template engine and/or **helpful template expressions**. (not for all template engines)
- To simulate a **black box scenario**, a web page which chooses a **random template engine**.
- Request counter in order to measure the number of requests a scanner sends.

## Implemented Template Engines
### Javascript
- Handlebars
- EJS
- Underscore
- Vue.js
- Mustache
- Pug
- Angular.js
- Hogan.js
- Nunjucks
- Dot
- Velocity.js
- Eta
- Twig.js
### Python
- Jinja2
- Tornado
- Mako
- Django
- SimpleTemplate Engine
- Pystache
- Cheetah3
- Chameleon
### Java
- Groovy
- Freemarker
- Velocity
- Thymeleaf
### PHP
- Blade
- Twig
- Mustache.php
- Smarty
- Latte
### Ruby
- ERB
- Erubi
- Erubis
- Haml
- Liquid
- Slim
- Mustache
### Dotnet
- Razor Engine
- DotLiquid
- Scriban
- Fluid
### Golang
- html/template
- text/template
### Elixir
- EEx

## Prerequisites
- [install docker compose](https://docs.docker.com/compose/install/)
- download/clone this repository

## Usage
1. `docker compose build` to build the servers 
2. `docker compose up` to start the servers and the playground
3. open [http://127.0.0.1:13370](http://127.0.0.1:13370)

Step 1 only needs to be done once, except when changes have been made

## Troubleshooting
- `Error starting userland proxy: listen tcp4 127.0.0.1:13370: bind: address already in use`
    - a service already occupies the port that the playground wants to use. In this case, either the service must be stopped or the port of the playground must be changed. The port of the playground can be customized in the docker-compose.yaml file. In this case, the port 13370 must be changed for the service nginx.
- `Secure Connection Failed`, `This site can’t provide a secure connection` or something similar
    - The Playground does not support HTTPS and can therefore only be accessed with HTTP. Check that the URL starts with `http://` and not `https://`.