/* Documentation

The `request.js` file contains JavaScript code that defines two functions related to handling HTTP requests in an NGINX server. Here's the documentation for each function:

- `htmlEnc(s)`: This function performs HTML entity encoding on a given string `s`. It replaces special characters (`&`, `<`, `>`, `'`, `"`) with their corresponding HTML entities. The encoded string is then returned.

- `getPostParam(data, param)`: This function retrieves a specific parameter value from the POST request body data. It takes two arguments: `data`, which represents the request body data, and `param`, which is the name of the parameter to extract. The function searches for the parameter in the data string, extracts its value, and returns it. If the parameter is not found, an empty string is returned.

- `enforceChunked(r)`: This function enforces chunked encoding for the response instead of using the `Content-Length` header. It sets the `Content-Length` header to `undefined`, indicating that the response should be chunked. This is useful when performing body transformations that may alter the response's content length.

- `getTransformation(r, data)`: This function applies transformations to the provided `data` based on the server's configuration. It reads the server's configuration from the file located at `/etc/nginx/njs/settings.cfg` using the `fs.readFileSync` method. The configuration file is expected to be in JSON format. The function then performs the following operations on the `data`:
  - If the special configuration value is set to "headerorigin," the `data` is replaced with the value of the `Origin` header from the request.
  - Otherwise, the `data` is URL-decoded using `decodeURIComponent`.
  - If the length of the `data` exceeds the `lengthLimit` specified in the configuration, the `data` is replaced with an error message indicating the length restriction.
  - If the configuration includes a `removeArray` property with an array of strings, each string is removed from the `data` using the `split` and `join` methods.
  - If the `hideError` configuration is set to 1, a `prefix` value is set to "hideError=1."
  - If the `htmlEncode` configuration is set to 1, the `data` is HTML entity encoded using the `htmlEnc` function.

  The function returns an array with two elements: `prefix` (a string) and the transformed `data`.

- `transform(r)`: This function performs request transformation based on the HTTP method. It first checks the method of the request (`r.method`):
  - If the method is "POST," it retrieves the value of the "name" parameter from the request body using the `getPostParam` function. It replaces any encoded spaces (`+`) with actual spaces.
  - If the method is not supported, it logs a warning and returns an empty string.

  The function then calls the `getTransformation` function to apply transformations to the retrieved `name` value. It receives the transformed `data` as an array `[prefix, transformedData]`. Finally, it URL-encodes the transformed data and concatenates it with the prefix, which forms the transformed request data. The transformed request data is returned.

The file exports an object containing the `transform` and `enforceChunked` functions as default exports, allowing them to be imported and used in other JavaScript files.

**************/

var fs = require('fs');
const CONFIG = "/etc/nginx/njs/settings.cfg"
const LOG = "/etc/nginx/njs/request.log"


function htmlEnc(s) {
    return s.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/'/g, '&#39;')
        .replace(/"/g, '&#34;');
}

function getPostParam(data, param) {
    data = "" + data
    param = param + "="
    const posName = data.indexOf(param) + param.length
    data = data.substring(posName, data.length)
    const posAnd = data.indexOf("&")
    if (posAnd > -1) {
        data = data.substring(0, posAnd)
    }
    return data
}

// enforce chunked encoding, instead of content-length, so that body transformations don't result in incorrect content-length
function enforceChunked(r) {
    r.headersOut['Content-Length'] = undefined;
}

function getTransformation(r, data) {
    var prefix = "";
    try {
        const config = JSON.parse(fs.readFileSync(CONFIG));
        if (config['special'].toLowerCase() == "headerorigin") { // if origin header value shall be used, replace data
            data = "Origin: "+r.headersIn['Origin'];
        } else {
            data = decodeURIComponent(data)
        }
        if (config["lengthLimit"] > 0 && data.length > config["lengthLimit"]) {
            data = "The name must not be longer than " + config["lengthLimit"] + "."
        } else if (config['removeArray'] != "") {
            const removeArray = config['removeArray']
            for (var x = 0; x < removeArray.length; x++) {
                data = data.split(removeArray[x]).join(""); // njs has no replaceAll()
            }
        }
        if (config['hideError'] == 1) {
            prefix = "hideError=1";
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

function transform(r) {
    // increase request count
    var request_count = parseInt(fs.readFileSync(LOG)) + 1;
    fs.writeFileSync(LOG, request_count.toString());

    var name;
    switch (r.method) {
        /* It is not possible to alter the URL / query parameters...
        case 'GET':
            data = r.variables['arg_name']
            r.warn("GET: " + data);
            break;*/
        case 'POST':
            name = getPostParam(r.requestText, "name").replace(/\+/g, ' '); // space is encoded as + and not as %20... hence decoreURI doesn't apply later
            break;
        default:
            r.warn("Unsupported method: " + r.method)
            return "";
    }
    if (name == null) {
        name = ""
    }
    let dataTransformed = getTransformation(r, name) // returns [prefix, name]
    return dataTransformed[0] + encodeURIComponent(dataTransformed[1]);
}

export default { transform, enforceChunked };