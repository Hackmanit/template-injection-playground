/* Documentation

The `config.js` file contains JavaScript code that defines two functions related to the configuration of an NGINX server. Here's a documentation for the functions in the file:

- `isValidJSON(text)`: This function checks whether a given text is valid JSON by attempting to parse it using `JSON.parse()`. If the parsing succeeds, the function returns `true`; otherwise, it returns `false`.

- `setConfig(r)`: This function handles an NGINX request `r` for setting the server configuration. It expects the request body to contain a JSON object representing the new configuration. The function first checks if the request body is valid JSON using the `isValidJSON` function. If it is valid, the function writes the JSON configuration to the `settings.cfg` file located at `/etc/nginx/njs/settings.cfg` using the `fs.writeFileSync` method. It returns a 200 response with the message "successfully saved config\n" to indicate that the configuration was saved successfully. If the request body is not valid JSON, it logs a warning and returns a 400 response with the message "not valid JSON\n".

- `getConfig(r)`: This function handles an NGINX request `r` for retrieving the server configuration. It attempts to read the contents of the `settings.cfg` file located at `/etc/nginx/njs/settings.cfg` using the `fs.readFileSync` method. If the file is successfully read, it returns a 200 response with the file content as the response body. If an error occurs while reading the file, it logs a warning and returns a 400 response with the error message.

The file also exports an object containing the two functions as default exports, allowing them to be imported and used in other JavaScript files.

***********/

var fs = require('fs');
const CONFIG = "/etc/nginx/njs/settings.cfg";

function isValidJSON(text) {
    try {
        JSON.parse(text);
        return true;
    } catch (e) {
        return false;
    }
}
  
function setConfig(r) {
    if (isValidJSON(r.requestText)) {
        fs.writeFileSync(CONFIG, r.requestText);
        return r.return(200, "successfully saved config\n");
    } else {
        r.warn("not valid JSON\n");
        return r.return(400, "not valid JSON\n");
    }
}

function getConfig(r) {
    try {
        return r.return(200, fs.readFileSync(CONFIG));
    } catch (e) {
        r.warn("error readFileSync: "+e.toString());
        return r.return(400, "error readFileSync: "+e.toString());
    }
}

export default {setConfig, getConfig};