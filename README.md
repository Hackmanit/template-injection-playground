[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)

# Template Injection Playground

With the *Template Injection Playground* a large number of the **most relevant template engines** (as of September 2023) can be tested for **template injection** possibilities. For this purpose, simple web pages are provided, each of which uses one of the template engines. Furthermore, **various optional security measures** such as sandboxes, encodings, and denylists can be activated.

The Template Injection Playground was developed by [Hackmanit](https://hackmanit.de) and [Maximilian Hildebrand](https://www.github.com/m10x).

- [Features](#features)
- [Implemented Template Engines](#implemented-template-engines)
- [Prerequisites](#prerequisites)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)
- [Background Information](#background-information)
- [License](#license)

## Features
- A total of **46 template engines** for eight different programming languages are implemented.
- Each template engine can be customized with:
    - Various optional countermeasures such as **sandboxing**, **encoding**, **denylisting**, and **hiding error messages**.
    - Various optional special cases such as **header injection**, **the template engine output is hidden**, or **the template engine output is not displayed in the response but in another place**.
- For each template engine an overview page exists which contains:
    - Links to **documentation** and **interesting blog posts** (such as exploit research).
    - Links to simple web pages using the template engine.
    - A **cheat sheet with special features** of the template engine and/or **helpful template expressions** (not for all template engines).
- To simulate a **black box scenario**, a web page which chooses a **random template engine**.
- Request counter in order to measure the number of requests a scanner sends.

## Implemented Template Engines
### .NET
- DotLiquid
- Fluid
- Scriban
- Razor Engine
### Elixir
- EEx
- LEEx
- HEEx
### Go
- html/template
- text/template
### Java
- Freemarker
- Groovy
- Thymeleaf
- Velocity
### JavaScript
- Angular.js
- Dot
- EJS
- Eta
- Handlebars
- Hogan.js
- Mustache
- Nunjucks
- Pug
- Twig.js
- Underscore
- Velocity.js
- Vue.js
### PHP
- Blade
- Latte
- Mustache.php
- Smarty
- Twig
### Python
- Chameleon
- Cheetah3
- Django
- Jinja2
- Mako
- Pystache
- SimpleTemplate Engine
- Tornado
### Ruby
- ERB
- Erubi
- Erubis
- Haml
- Liquid
- Mustache
- Slim

## Prerequisites
- Install [Docker Compose](https://docs.docker.com/compose/install/).
- Download or clone this repository.

## Usage
1. Build the servers *(only needed at first launch or when changes have been made)*: `docker compose build`
2. Start the servers and the playground: `docker compose up`
3. Access the playground at [http://127.0.0.1:13370](http://127.0.0.1:13370) and start playing around.

## Troubleshooting
- `Error starting userland proxy: listen tcp4 127.0.0.1:13370: bind: address already in use`
    - Another service already uses the port that the playground wants to use. In this case, either the other service must be stopped or the port of the playground must be changed. The port of the playground can be customized in the [docker-compose.yml](docker-compose.yml) file: Change the port `13370` to any free port for the service `nginx`.
- `Secure Connection Failed`, `This site can’t provide a secure connection` or something similar.
    - The Playground does not support HTTPS and can therefore only be accessed using HTTP. Check that the URL starts with `http://` and not `https://` when accessing the playground.
- `nginx: [emerg] host not found in upstream "FOO" in /etc/nginx/nginx.conf:BAR`
    - Sometimes a container does not spin up properly. Try `docker compose up` again.

## Background Information
A blog post providing more information about template injection and [TInjA – the Template INJection Analyzer](https://github.com/Hackmanit/TInjA) can be found here:

[Soon to be released](https://www.hackmanit.de/en/blog-en/)

The Template Injection Playground was developed as a part of a master's thesis by Maximilian Hildebrand.
You can find results of the master's thesis publicly available here:
- [Template Injection Table](https://github.com/Hackmanit/template-injection-table)
- [Template Injection Playground](https://github.com/Hackmanit/template-injection-playground)
- [TInjA – the Template INJection Analyzer](https://github.com/Hackmanit/TInjA)
- [Master's Thesis (PDF)](https://www.hackmanit.de/images/download/thesis/Improving-the-Detection-and-Identification-of-Template-Engines-for-Large-Scale-Template-Injection-Scanning-Maximilian-Hildebrand-Master-Thesis-Hackmanit.pdf)

## License
The Template Injection Playground was developed by [Hackmanit](https://hackmanit.de) and [Maximilian Hildebrand](https://www.github.com/m10x) as a part of his master's thesis. The Template Injection Playground is licensed under the [Apache License, Version 2.0](license.txt).

<a href="https://hackmanit.de"><img src="https://www.hackmanit.de/templates/hackmanit-v2/img/wbm_hackmanit.png" width="30%"></a>
