/* Documentation

The `endpoints.js` file contains JavaScript code that defines several endpoint functions for an NGINX server. Here's a documentation for the functions in the file:

- `echo(r)`: This function handles HTTP GET and POST requests. It retrieves the value of the query parameter `name` for GET requests, or the value of the form field `name` for POST requests. It applies transformations to the data based on the configuration settings defined in the `settings.cfg` file. The transformed data is then embedded in an HTML template and returned as the response body.

- `getTransformation(r, data)`: This helper function takes an NGINX request object `r` and the data to be transformed. It reads the configuration settings from the `settings.cfg` file and applies transformations to the data accordingly. The transformations include hiding errors, removing specified strings from the data, and HTML encoding. The function returns an array containing the prefix to be used in the transformed data and the transformed data itself.

- `getBodyName(data)`: This helper function extracts the value of the `name` field from the request body data. It is specifically used for POST requests in the `echo` function.

- `otherlocationdirect(r)`: This function handles requests for the `/otherlocationdirect` endpoint. It attempts to read the contents of the `otherlocationdirect.txt` file located at `/etc/nginx/njs/otherlocationdirect.txt` and returns the file content as the response body. If an error occurs while reading the file, it logs a warning and returns a 400 error response.

- `otherlocation(r)`: This function handles requests for the `/otherlocation` endpoint. It attempts to read the contents of the `otherlocation.txt` file located at `/etc/nginx/njs/otherlocation.txt` and returns the file content as the response body. If an error occurs while reading the file, it logs a warning and returns a 400 error response.

The file also exports an object containing the endpoint functions as default exports, allowing them to be imported and used in other JavaScript files.

Note: The documentation assumes that the NGINX server is set up to handle JavaScript-based NGINX modules (njs). The file interacts with file systems and NGINX request objects specific to njs.

***************/

var fs = require('fs');
const OTHERLOCATION = "/etc/nginx/njs/otherlocation.txt"
const OTHERLOCATIONDIRECT = "/etc/nginx/njs/otherlocationdirect.txt"
const CONFIG = "/etc/nginx/njs/settings.cfg"
const LOG = "/etc/nginx/njs/request.log"

function echo(r) {
    var data;
    switch (r.method) {
        case 'GET':
            data = r.variables['arg_name']
            break;
        case 'POST':
            data = getBodyName(r.requestText).replace(/\+/g, ' '); // space is encoded as + and not as %20... hence decoreURI doesn't apply later
            data = getTransformation(r, data)[1] // transform data, only get data and not the prefix
            break;
        default:
            r.warn("Unsupported method: " + r.method)
            return "";
        }
    if (data == null) {
        r.warn("data is null");
        data = ""
    }
    const TEMPLATE = `<!DOCTYPE html>
<html>
<head>
    <title>Echo</title>
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
            <form method="POST" action="/echo/">     
                <label>Name</label>
                <input name="name" type="text" value="" />
                <input type="submit" value="submit" />
            </form>
            <br>
            <p id="rendered">${data}</p>
        </div>
    </div>
</body>
</html>`
    var resp = TEMPLATE
    r.headersOut["Content-Type"] = "text/html";
    r.return(200, resp)
}

function getTransformation(r, data) {
    var prefix = "";
    data = decodeURIComponent(data)
    try {
        const config = JSON.parse(fs.readFileSync(CONFIG));
        if (config['hideError'] == 1) {
            prefix = "hideError=1";
        }
        if (config['removeArray'] != "") {
            const removeArray = config['removeArray']
            for(var x = 0; x < removeArray.length; x++){
                data = data.split(removeArray[x]).join(""); // njs has no replaceAll()
            }
        }
        if (config['htmlEncode'] == 1) {
            data = htmlEnc(data);
        }
    } catch (e) {
        r.warn("Couldn't read or parse file " + e);
        return { prefix, e }
    }
    if (prefix == "") {
        prefix = "name=";
    } else {
        prefix += "&name="
    }
    return [prefix, data]
}

function getBodyName(data) {
    data = ""+data
    const posName = data.indexOf("name=") + 5
    data = data.substring(posName, data.length)
    const posAnd = data.indexOf("&")
    if (posAnd > -1) {
        data = data.substring(0, posAnd)
    }
    return data
}


function otherlocationdirect(r) {
    try {
        return r.return(200, fs.readFileSync(OTHERLOCATIONDIRECT));
    } catch (e) {
        r.warn("error readFileSync: "+e.toString());
        return r.return(400, "error readFileSync: "+e.toString());
    }
}

function otherlocation(r) {
    try {
        return r.return(200, fs.readFileSync(OTHERLOCATION));
    } catch (e) {
        r.warn("error readFileSync: "+e.toString());
        return r.return(400, "error readFileSync: "+e.toString());
    }
}

function resetRequestCount(r) {
    try {
        fs.writeFileSync(LOG, "0");
        return r.return(200, "successfully resetted the request count to 0.\n");
    } catch (e) {
        return r.return(400, "error writeFileSync: "+e.toString());
    }
}

function getRequestCount(r) {
    try {
        return r.return(200, fs.readFileSync(LOG));
    } catch (e) {
        r.warn("error readFileSync: "+e.toString());
        return r.return(400, "error readFileSync: "+e.toString());
    }
}

export default {echo, otherlocationdirect, otherlocation, resetRequestCount, getRequestCount};