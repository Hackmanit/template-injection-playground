import express from 'express';
import Handlebars from "handlebars";
import ejs from 'ejs';
import _ from 'underscore';
import { createSSRApp } from 'vue';
import { renderToString } from '@vue/server-renderer';
import mustache from 'mustache';
import pug from 'pug';
import hogan from "hogan.js"
import nunjucks from "nunjucks"
import dot from "dot"
import velocity from "velocityjs"
import * as Eta from "eta"
import Twig from "twig"

//import "@angular/compiler"
//import { renderApplication } from "@angular/platform-server"
//import { ngExpressEngine } from '@nguniversal/express-engine';


//import fs from "fs"
const app = express();
const port = 13377;

app.use(express.urlencoded({extended: true}));
/*
app.engine(
    'html',
    ngExpressEngine({
      //bootstrap: ServerAppModule, // Give it a module to bootstrap
    }),
  );
app.set('view engine', 'html');
*/

app.get('/', (req, res) => {
  res.send('Hello World!')
})

function getName(req) {
    let nameParam = ""
    if (req.method == "GET") {
        nameParam = req.query.name
    } else if (req.method == "POST") {
        nameParam = req.body.name
    }
    if (nameParam == null) {
        nameParam = ""
    }
    app.Eng
    return nameParam
}

function getHideError(req) {
    let hideError = req.body.hideError
    if (hideError == null) {
        hideError = ""
    }
    return hideError
}

function getTemplate(nameParam, engine) {
    return `<!DOCTYPE html>
<html>
<head>
    <title>JavaScript ${engine}</title>
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
            <form method="POST" action="${engine}">     
                <label>Name</label>
                <input name="name" type="text" value="" />
                <input type="submit" value="submit" />
            </form>
            <br>
            <p id="rendered">${nameParam}</p>
        </div>
    </div>
</body>
</html>`
}

app.all("/Handlebars", (req, res) => {
    const nameParam = getName(req)
    const template = getTemplate(nameParam, "Handlebars")
    const hideError = getHideError(req)
    try {
        res.send(Handlebars.compile(template)())
    } catch (e) {
        if (hideError == "1") {
            res.send(template)
        } else {
            res.send(e.toString())
        }
    }
})

app.all("/EJS", (req, res) => {
    const nameParam = getName(req)
    const template = getTemplate(nameParam, "EJS")
    const hideError = getHideError(req)
    try {
        res.send(ejs.render(template))
    } catch (e) {
        if (hideError == "1") {
            res.send(template)
        } else {
            res.send(e.toString())
        }
    }
})

app.all("/Underscore", (req, res) => {
    const nameParam = getName(req)
    const template = getTemplate(nameParam, "Underscore")
    const hideError = getHideError(req)
    try {
        res.send(_.template(template)())
    } catch (e) {
        if (hideError == "1") {
            res.send(template)
        } else {
            res.send(e.toString())
        }
    }
})

app.all("/Vuejs", (req, res) => {
    const nameParam = getName(req)
    const hideError = getHideError(req)
    try {
        const app = createSSRApp({
            template: nameParam
        })
        renderToString(app).then((html) => {
            res.send(getTemplate(html, "Vuejs"))
        })
    } catch (e) {
        if (hideError == "1") {
            res.send(getTemplate(nameParam, "Vuejs"))
        } else {
            res.send(e.toString())
        }
    }
})

app.all("/Mustache", (req, res) => {
    const nameParam = getName(req)
    const template = getTemplate(nameParam, "Mustache")
    const hideError = getHideError(req)
    try {
        res.send(mustache.render(template))
    } catch (e) {
        if (hideError == "1") {
            res.send(template)
        } else {
            res.send(e.toString())
        }
    }
})

app.all("/Pug", (req, res) => {
    const nameParam = getName(req)
    const hideError = getHideError(req)
    try {
        const template = pug.compile(nameParam)()
        res.send(getTemplate(template, "Pug"))
    } catch (e) {
        if (hideError == "1") {
            res.send(getTemplate(nameParam, "Pug"))
        } else {
            res.send(e.toString())
        }
    }
})

app.all("/PugInline", (req, res) => {
    const nameParam = "p " + getName(req)
    const hideError = getHideError(req)
    try {
        const template = pug.compile(nameParam)()
        res.send(getTemplate(template, "PugInline"))
    } catch (e) {
        if (hideError == "1") {
            res.send(getTemplate(nameParam, "PugInline"))
        } else {
            res.send(e.toString())
        }
    }
})

/*
app.all("/Angular", (req, res) => {
    const nameParam = getName(req)
    let template = getTemplate(nameParam, "Angular")
    // embed Angular.io
    template = template.replace("<body>", '<body>\n    <app-root></app-root>\n     <script src="/js/runtime.0ae179e60498fc23.js" type="module"></script><script src="/js/polyfills.8507eff7cd3a78d2.js" type="module"></script><script src="/js/main.8832839e2d502e7c.js" type="module"></script>')
    template = template.replace("</body>", "</body>")
    res.send(template)
})*/

// no Serverside Rendering available
app.all("/AngularJS", (req, res) => {
    const nameParam = getName(req)
    let template = getTemplate(nameParam, "AngularJS")
    // declare the whole document as angular app
    template = template.replace("<html>", "<html ng-app>")
    // embed angularjs
    template = template.replace("</head>", '    <script src="/js/angular.min.js"></script>\n</head>')
    res.send(template)
})

app.all("/Hoganjs", (req, res) => {
    const nameParam = getName(req)
    const template = getTemplate(nameParam, "Hoganjs")
    const hideError = getHideError(req)
    try {
        res.send(hogan.compile(template).render())
    } catch (e) {
        if (hideError == "1") {
            res.send(template)
        } else {
            res.send(e.toString())
        }
    }
})

app.all("/Nunjucks", (req, res) => {
    const nameParam = getName(req)
    const template = getTemplate(nameParam, "Nunjucks")
    const hideError = getHideError(req)
    try {
        res.send(nunjucks.renderString(template))
    } catch (e) {
        if (hideError == "1") {
            res.send(template)
        } else {
            res.send(e.toString())
        }
    }
})

app.all("/Dot", (req, res) => {
    const nameParam = getName(req)
    const template = getTemplate(nameParam, "Dot")
    const hideError = getHideError(req)
    try {
        res.send(dot.template(template)())
    } catch (e) {
        if (hideError == "1") {
            res.send(template)
        } else {
            res.send(e.toString())
        }
    }
})

app.all("/Velocityjs", (req, res) => {
    const nameParam = getName(req)
    const template = getTemplate(nameParam, "Velocityjs")
    const hideError = getHideError(req)
    try {
        res.send(velocity.render(template))
    } catch (e) {
        if (hideError == "1") {
            res.send(template)
        } else {
            res.send(e.toString())
        }
    }
})

app.all("/Eta", (req, res) => {
    const nameParam = getName(req)
    const template = getTemplate(nameParam, "Eta")
    const hideError = getHideError(req)
    try {
        res.send(Eta.render(template))
    } catch (e) {
        if (hideError == "1") {
            res.send(template)
        } else {
            res.send(e.toString())
        }
    }
})

app.all("/Twigjs", (req, res) => {
    const nameParam = getName(req)
    const template = getTemplate(nameParam, "Twigjs")
    const hideError = getHideError(req)
    try {
        const output = Twig.twig({data: template}).render({})
        if (output == "") {
            throw new Error("Error compiling twig template")
        }
        res.send(output)
    } catch (e) {
        if (hideError == "1") {
            res.send(template)
        } else {
            res.send(e.toString())
        }
    }
})

app.listen(port, (callback) => {
  console.log(`Express app listening on port ${port}`)
  if (callback) {
    console.log(`received callback ${callback}`)
  }
})
