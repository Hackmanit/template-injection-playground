package main

import (
	templateHTML "html/template"
	"net/http"
	templateText "text/template"
)

func getTemplate(name string, engine string) string {
	return `<!DOCTYPE html>
<html>
<head>
	<title>Golang ` + engine + `</title>
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
            <form method="POST" action="` + engine + `">     
                <label>Name</label>
                <input name="name" type="text" value="" />
                <input type="submit" value="submit" />
            </form>
            <br>
            <p id="rendered">` + name + `</p>
        </div>
    </div>
</body>
</html>`
}

func handlerText(w http.ResponseWriter, r *http.Request) {
	handler(w, r, "text-template")
}

func handlerHTML(w http.ResponseWriter, r *http.Request) {
	handler(w, r, "html-template")
}

func handler(w http.ResponseWriter, r *http.Request, engine string) {
	r.ParseForm()

	name := ""
	hideError := ""
	switch r.Method {
	case "GET":
		names, _ := r.URL.Query()["name"]
		if len(names) > 0 {
			name = names[0] // choose first name parameter, in case there are multiple
		}
	case "POST":
		name = r.Form.Get("name")
		hideError = r.Form.Get("hideError")
	}
	var tmpl = getTemplate(name, engine)

	if engine == "html-template" {
		t, err := templateHTML.New("main").Parse(tmpl)
		if err != nil {
			if hideError == "1" {
				w.WriteHeader(http.StatusOK)
				w.Header().Set("Content-Type", "text/html")
				w.Write([]byte(getTemplate(name, engine)))
			} else {
				w.WriteHeader(http.StatusOK)
				w.Header().Set("Content-Type", "text/plain")
				w.Write([]byte(err.Error()))
			}
			return
		}
		err = t.Execute(w, "template executed with name "+name)
		if err != nil {
			if hideError == "1" {
				w.WriteHeader(http.StatusOK)
				w.Header().Set("Content-Type", "text/html")
				w.Write([]byte(getTemplate(name, engine)))
			} else {
				w.WriteHeader(http.StatusOK)
				w.Header().Set("Content-Type", "text/plain")
				w.Write([]byte(err.Error()))
			}
		}
	} else if engine == "text-template" {
		t, err := templateText.New("main").Parse(tmpl)
		if err != nil {
			if hideError == "1" {
				w.WriteHeader(http.StatusOK)
				w.Header().Set("Content-Type", "text/html")
				w.Write([]byte(getTemplate(name, engine)))
			} else {
				w.WriteHeader(http.StatusOK)
				w.Header().Set("Content-Type", "text/plain")
				w.Write([]byte(err.Error()))
			}
			return
		}
		err = t.Execute(w, "template executed with name "+name)
		if err != nil {
			if hideError == "1" {
				w.WriteHeader(http.StatusOK)
				w.Header().Set("Content-Type", "text/html")
				w.Write([]byte(getTemplate(name, engine)))
			} else {
				w.WriteHeader(http.StatusOK)
				w.Header().Set("Content-Type", "text/plain")
				w.Write([]byte(err.Error()))
			}
		}
	}
}

func main() {
	http.HandleFunc("/text-template", handlerText)
	http.HandleFunc("/html-template", handlerHTML)
	http.ListenAndServe(":13370", nil)
}
