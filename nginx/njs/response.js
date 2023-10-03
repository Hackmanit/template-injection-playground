/* Documentation

The `response.js` file contains JavaScript code that defines several functions related to transforming and handling HTTP responses in an NGINX server. Here's the documentation for each function:

- `getPostParam(data, param)`: This function retrieves a specific parameter value from the POST request body data. It takes two arguments: `data`, which represents the request body data, and `param`, which is the name of the parameter to extract. The function searches for the parameter in the data string, extracts its value, and returns it. If the parameter is not found, an empty string is returned.

- `transformData(r, data)`: This function applies various transformations to the provided `data` based on the server's configuration. It reads the server's configuration from the file located at `/etc/nginx/njs/settings.cfg` using the `fs.readFileSync` method. The configuration file is expected to be in JSON format. The function performs the following operations on the `data`:
  - It retrieves the CSRF protection configuration from the configuration file.
  - Based on the CSRF protection setting, it obtains a CSRF token using the `getCSRFToken` function.
  - It adds the CSRF token to the `data` by replacing a specific part of the HTML form in the response.
  - If the HTTP method is "POST," it searches for the rendered data within the HTML response by looking for the `<p id="rendered">` element. It extracts the content between the opening and closing tags.
  - Depending on the "special" configuration setting, it performs the following actions:
    - If the setting is "blind," it replaces the rendered data with an empty response or an error message.
    - If the setting is "otherlocationdirect," it replaces the rendered data with a hyperlink to the `/otherlocationdirect/` URL and saves the original rendered data in the file located at `/etc/nginx/njs/otherlocationdirect.txt`.
    - If the setting is "otherlocation," it replaces the rendered data with an empty response and saves the original rendered data in the file located at `/etc/nginx/njs/otherlocation.txt`.
  - The transformed `data` is then returned.

- `replaceRendered(data, replaceWith)`: This function replaces the rendered data within the HTML response with the specified `replaceWith` value. It searches for the `<p id="rendered">...</p>` element and replaces it with a new `<p id="rendered">replaceWith</p>` element.

- `addToken(data, token)`: This function adds a CSRF token to the HTML response. It searches for the closing `</form>` tag within the `data` and appends an input field containing the CSRF token just before the closing tag. The CSRF token is added as a hidden input field with the name `_token` and the value set to the provided `token`.

- `getCSRFToken(force)`: This function retrieves the CSRF token from the file located at `/etc/nginx/njs/csrftoken.txt`. If the token is not found (or `force` is `true`), a new random CSRF token is generated and saved in the file. The function returns the retrieved or newly generated CSRF token.

- `getRandomIntMinMax(min, max)`: This function generates a random integer within the specified range (`min` to `max`, inclusive) and returns the result.

- `removeTemplateIdentifiers(data)`: This function removes specific identifiers from the HTML response to simulate a random template engine. It replaces the `action` attribute value of a form within the response with `/getRandom/` and replaces the `<title>` element's content with "Random Template Engine." The modified `data` is then returned.

- `transform(r, data, flags)`: This function is the main transformation function for HTTP responses. It takes three arguments: `r` (the NGINX request object), `data` (the response data), and `flags` (optional flags for response processing). The function performs the following actions:
  - If the URI of the request includes `/getRandom/`, it calls the `removeTemplateIdentifiers` function to remove specific identifiers from the response data.
  - It retrieves the CSRF protection configuration from the server's configuration file.
  - It compares the CSRF token from the request body (`_token`) with the token retrieved using the `getCSRFToken` function. If the tokens match or CSRF protection is set to "static" or "nonce," the response data is transformed using the `transformData` function.
  - If the method is not "POST" or the CSRF tokens do not match, a warning is logged, and the response data is set to "CSRF Attempt Detected."
  - The transformed response data is sent using `r.sendBuffer(data, flags)`.
  - Finally, `r.done()` is called to indicate that the response processing is complete.

The file exports an object containing the `transform` function as the default export, allowing it to be imported and used in other JavaScript files.

************/

var fs = require('fs');
const CONFIG = "/etc/nginx/njs/settings.cfg"
const CSRFTOKEN = "/etc/nginx/njs/csrftoken.txt"
const OTHERLOCATION = "/etc/nginx/njs/otherlocation.txt"
const OTHERLOCATIONDIRECT = "/etc/nginx/njs/otherlocationdirect.txt"

function transform(r, data, flags) {
    if (r.uri.includes("/getRandom/")) {
        data = removeTemplateIdentifiers(data);
    }

    const config = JSON.parse(fs.readFileSync(CONFIG));
    const csrfProtection = toLowerCase(config['csrfProtection'])

    const _token = getPostParam(r.requestText, "_token");
    const token = fs.readFileSync(CSRFTOKEN)
 
    if (r.method != "POST" || _token == token || (csrfProtection != "static" && csrfProtection != "nonce")) {
        data = transformData(r, data);
    } else {
        r.warn("WARNING: CSRF tokens do not match: _token '" + _token + "' token '" + token+"'")
        data = "CSRF Attempt Detected.";
    }
    r.sendBuffer(data, flags);
    r.done(); //otherwise method is triggered two times!
}

function getPostParam(data, param) {
    data = ""+data
    param = param + "="
    const posName = data.indexOf(param) + param.length
    data = data.substring(posName, data.length)
    const posAnd = data.indexOf("&")
    if (posAnd > -1) {
        data = data.substring(0, posAnd)
    }
    return data
}

function transformData(r, data) {
    const config = JSON.parse(fs.readFileSync(CONFIG));

    let token = ""
    switch (toLowerCase(config['csrfProtection'])) {
        case "static":
            token = getCSRFToken(false)
            data = addToken(data, token);
            break;
        case "nonce":
            token = getCSRFToken(true)
            data = addToken(data, token);
            break;
    }

    if (r.method == "POST") {
        const indexStart = data.indexOf('<p id="rendered">');
        const indexEnd = data.lastIndexOf('</p>')
        let dataRendered = ""
        // was <p id="rendered"> not found? then take everything (in case of error message e.g.)
        if (indexStart == -1) {
            dataRendered = data;
        } else {
            dataRendered = data.substring(indexStart+17, indexEnd);
        }

        switch (toLowerCase(config['special'])) {
            case "blind":
                if (indexStart == -1) {
                    data = replaceRendered(data, "");
                } else {
                    data = "Empty Response"
                }
                break;
            case "otherlocationdirect":
                if (indexStart == -1) {
                    data = '<a class="link" href="/otherlocationdirect/">Check this out!</a>';
                } else {
                    data = replaceRendered(data, '<a class="link" href="/otherlocationdirect/">Check this out!</a>');
                }
                fs.writeFileSync(OTHERLOCATIONDIRECT, dataRendered);
                break;
            case "otherlocation":
                if (indexStart == -1) {
                    data = replaceRendered(data, "");
                } else {
                    data = "Empty Response"
                }
                fs.writeFileSync(OTHERLOCATION, dataRendered);
                break;
        }
    }

    return data;
}

function toLowerCase(data) {
    try {
        return data.toLowerCase()
    } catch (e) {
        return data
    }
}

function replaceRendered(data, replaceWith) {
    // njs doesn't support s flag. ^\x05]* is a workaround for .* which also matches a newline inbetween, as Scriban and HAML add a newline after <p id="rendered">
    return data.replace(/<p id="rendered">[^\x05]*<\/p>/, `<p id="rendered">${replaceWith}</p>`);
}


function addToken(data, token) {
    return data.replace(`</form>`, `  <input type="hidden" name="_token" id="csrf-token" value="${token}"/>\n      </form>`);
}

function getCSRFToken(force) {
    let token
    let empty = false
    if (!force) {
        token = fs.readFileSync(CSRFTOKEN);
        if (token == "None") {
            empty = true
        }
    }
    if (force || empty) {
        token = String(getRandomIntMinMax(100000000000,999999999999))
        fs.writeFileSync(CSRFTOKEN, token);
    }
    return token
}

function getRandomIntMinMax(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max)+1;
    return Math.floor(Math.random() * (max - min) + min);
  }

function removeTemplateIdentifiers(data) {
    data = data.replace(/action=\"[^"]*\"/, `action="/getRandom/"`);
    data = data.replace(/<title>.*<\/title>/, `<title>Random Template Engine</title>`);

    return data;
}

export default {transform};