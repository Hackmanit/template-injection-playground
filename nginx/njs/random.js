/* Documentation

The `random.js` file contains JavaScript code that defines three functions related to handling random engine selection for an NGINX server. Here's the documentation for each function:

- `randomGet(r)`: This function retrieves the currently selected random engine. It reads the contents of the `random.txt` file located at `/etc/nginx/njs/random.txt` using the `fs.readFileSync` method. If the file exists and contains an engine name, it returns the engine as the response. If the file contains the string "None", indicating no engine is currently selected, the function calls the `randowNewWriteFile()` function to choose a new random engine and returns the selected engine. If an error occurs while reading the file, it logs a warning and returns an empty string.

- `randowNewWriteFile()`: This function selects a new random engine from a predefined list of engines. It chooses an engine randomly by generating a random index within the range of the available engines using the `getRandomIntMax(max)` function. Once an engine is selected, it writes the engine name to the `random.txt` file using the `fs.writeFileSync` method. Finally, it returns the selected engine.

- `getRandomIntMax(max)`: This function generates a random integer between 0 (inclusive) and the specified `max` value (exclusive) using the `Math.random()` and `Math.floor()` functions.

- `randomNew(r)`: This function selects a new random engine by calling the `randowNewWriteFile()` function. It then returns a 200 response with the message "successfully chose a new random engine\n" to indicate that a new engine has been selected.

- `randomShow(r)`: This function retrieves the currently selected random engine by reading the contents of the `random.txt` file. If the file is successfully read, it returns a 200 response with the file content as the response body. If an error occurs while reading the file, it logs a warning and returns a 400 response with the error message.

The file exports an object containing the three functions as default exports, allowing them to be imported and used in other JavaScript files.

**************/

var fs = require('fs');
const RANDOM = "/etc/nginx/njs/random.txt"

function randomGet(r) {
    try {
        var engine = fs.readFileSync(RANDOM);
        if (engine == "None") {
            engine = randowNewWriteFile();
        }
        return engine
    } catch (e) {
        r.warn("error readFileSync: "+e.toString());
        return "";
    }
}

function randowNewWriteFile() {
    const engines = [
"ruby:13372/Erb",
"ruby:13372/Erubi",
"ruby:13372/Erubis",
"ruby:13372/Haml",
"ruby:13372/Liquid",
"ruby:13372/Slim",
"ruby:13372/Mustache",
"golang:13370/html-template",
"golang:13370/text-template",
"dotnet:13371/Home/RazorEngine",
//"dotnet:13371/Home/RazorEngineSandbox", Throws error
"dotnet:13371/Home/DotLiquid",
"dotnet:13371/Home/Scriban",
"dotnet:13371/Home/ScribanLiquid",
"dotnet:13371/Home/Fluid",
"elixir:13376/EEx",
//"elixir:13376/LEEx", is safe from user input
//"elixir:13376/HEEx", is safe from user input
"java:13373/Groovy",
"java:13373/Freemarker",
"java:13373/Velocity",
"java:13373/Thymeleaf",
"java:13373/ThymeleafInline",
"php:13374/Blade",
"php:13374/Twig",
"php:13374/TwigSandbox",
"php:13374/Mustache.php",
"php:13374/Smarty",
"php:13374/SmartySecurity",
"php:13374/Latte",
"php:13374/LatteSandbox",
"python:13375/Jinja2",
"python:13375/Jinja2Sandbox",
"python:13375/Tornado",
"python:13375/Mako",
"python:13375/Django",
"python:13375/SimpleTemplateEngine",
"python:13375/Pystache",
"python:13375/Cheetah3",
"python:13375/Chameleon",
"javascript:13377/Handlebars",
"javascript:13377/EJS",
"javascript:13377/Underscore",
//"javascript:13377/Vuejs", might crash playground when throwing an error
"javascript:13377/Mustache",
//"javascript:13377/Angular", not yet implemented
"javascript:13377/Pug",
"javascript:13377/PugInline",
"javascript:13377/Angularjs",
"javascript:13377/Hoganjs",
"javascript:13377/Nunjucks",
"javascript:13377/Dot",
"javascript:13377/Velocityjs",
"javascript:13377/Eta",
"javascript:13377/Twigjs"
    ];
    var randomEngineIndex = getRandomIntMax(engines.length);

    var newEngine = "http://"+engines[randomEngineIndex];
    fs.writeFileSync(RANDOM, newEngine);
    return newEngine
}

function getRandomIntMax(max) {
    return Math.floor(Math.random() * max);
  }

function randomNew(r) {
    randowNewWriteFile();
    return r.return(200, "successfully chose a new random engine\n");
}

function randomShow(r) {
    try {
        return r.return(200, fs.readFileSync(RANDOM));
    } catch (e) {
        r.warn("error readFileSync: "+e.toString());
        return r.return(400, "error readFileSync: "+e.toString());
    }
}


export default {randomGet, randomNew, randomShow};