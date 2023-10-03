<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Blade;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

function getTemplate(string $name, string $engine) {
    $template = <<<HEREA
<!DOCTYPE html>
<html>
<head>
    <title>PHP $engine</title>
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
            <form method="POST" action="$engine">     
                <label>Name</label>
                <input name="name" type="text" value="" />
                <input type="submit" value="submit" />
            </form>
            <br>
            <p id="rendered">$name</p>
        </div>
    </div>
</body>
</html>
HEREA;
    return $template;
}

function getParam(Request $request, string $paramName) {
    $param = $request->input($paramName);
    if (is_null($param)) {
        $param = "";
    }
    return $param;
}

Route::match(['get', 'post'] ,'/Blade', function (Request $request) {
    $name = getParam($request, "name");
    $hideError = getParam($request, "hideError");
    $template = getTemplate($name, "Blade");

    try {
        return Blade::render($template);
    } catch (Exception $e) {
        if ($hideError == "1") {
            return $template;
        } else {
            return $e->getMessage();
        }
    }
});

Route::match(['get', 'post'] ,'/Twig', function (Request $request) {
    $name = getParam($request, "name");
    $hideError = getParam($request, "hideError");
    $template = getTemplate($name, "Twig");

    try {
        $loader = new \Twig\Loader\ArrayLoader([
            'index' => $template,
        ]);
        $twig = new \Twig\Environment($loader);
        
        return $twig->render('index', []);
    } catch (Exception $e) {
        if ($hideError == "1") {
            return $template;
        } else {
            return $e->getMessage();
        }
    }
});

// https://twig.symfony.com/doc/3.x/api.html#sandbox-extension
Route::match(['get', 'post'] ,'/TwigSandbox', function (Request $request) {
    $name = getParam($request, "name");
    $hideError = getParam($request, "hideError");
    $template = getTemplate($name, "TwigSandbox");

    try {
        $loader = new \Twig\Loader\ArrayLoader([
            'index' => $template,
        ]);
        $twig = new \Twig\Environment($loader);
        $tags = ['if'];
        $filters = ['upper'];
        $methods = [
            'Article' => ['getTitle', 'getBody'],
        ];
        $properties = [
            'Article' => ['title', 'body'],
        ];
        $functions = ['range'];
        $policy = new \Twig\Sandbox\SecurityPolicy($tags, $filters, $methods, $properties, $functions);
        $sandbox = new \Twig\Extension\SandboxExtension($policy, true);
        $twig->addExtension($sandbox);
        
        return $twig->render('index', []);
    } catch (Exception $e) {
        if ($hideError == "1") {
            return $template;
        } else {
            return $e->getMessage();
        }
    }
});

Route::match(['get', 'post'] ,'/Mustache.php', function (Request $request) {
    $name = getParam($request, "name");
    $hideError = getParam($request, "hideError");
    $template = getTemplate($name, "Mustache.php");

    try {
        $m = new Mustache_Engine();
        return $m->render($template);
    } catch (Exception $e) {
        if ($hideError == "1") {
            return $template;
        } else {
            return $e->getMessage();
        }
    }
});


Route::match(['get', 'post'] ,'/Smarty', function (Request $request) {
    $name = getParam($request, "name");
    $hideError = getParam($request, "hideError");
    $template = getTemplate($name, "Smarty");

    try {
        $smarty = new Smarty();
        $smarty->enableSecurity();
        return $smarty->fetch('eval:'.$template);
    } catch (Exception $e) {
        if ($hideError == "1") {
            return $template;
        } else {
            return $e->getMessage();
        }
    }
});

Route::match(['get', 'post'] ,'/SmartySecurity', function (Request $request) {
    $name = getParam($request, "name");
    $hideError = getParam($request, "hideError");
    $template = getTemplate($name, "SmartySecurity");

    try {
        $smarty = new Smarty();
        return $smarty->fetch('eval:'.$template);
    } catch (Exception $e) {
        if ($hideError == "1") {
            return $template;
        } else {
            return $e->getMessage();
        }
    }
});

Route::match(['get', 'post'] ,'/Latte', function (Request $request) {
    $name = getParam($request, "name");
    $hideError = getParam($request, "hideError");
    $template = getTemplate($name, "Latte");

    try {
        $latte = new Latte\Engine;
        $latte->setLoader(new Latte\Loaders\StringLoader([
            'main.file' => $template,
        ]));
        return $latte->renderToString('main.file', []);
    } catch (Exception $e) {
    if ($hideError == "1") {
        return $template;
    } else {
        return $e->getMessage();
    }
}
});

Route::match(['get', 'post'] ,'/LatteSandbox', function (Request $request) {
    $name = getParam($request, "name");
    $hideError = getParam($request, "hideError");
    $template = getTemplate($name, "LatteSandbox");

    try {
        $latte = new Latte\Engine;
        $policy = Latte\Sandbox\SecurityPolicy::createSafePolicy();
        $latte->setPolicy($policy);
        $latte->setLoader(new Latte\Loaders\StringLoader([
            'main.file' => $template,
        ]));
        return $latte->renderToString('main.file', []);
    } catch (Exception $e) {
    if ($hideError == "1") {
        return $template;
    } else {
        return $e->getMessage();
    }
}
});