/* Documentation

The `engines.js` file contains JavaScript code that defines a single function, `overview(r)`, which is responsible for generating an HTML page providing an overview of different template engines and their details. Here's the breakdown of the code:

- `overview(r)`: This function takes an NGINX request object (`r`) as its parameter. It generates an HTML response that provides an overview of a specific template engine based on the URI provided in the request. The function performs the following steps:

  - Extracts the engine name from the request URI by removing the "/engine/" prefix.
  - Based on the extracted engine name, the function sets various variables related to the engine's title, description, documentation links, available modes, important notes, and characteristics.
  - The `documentation` variable contains an array of documentation link pairs, where each pair consists of a label and a URL.
  - The `modes` variable contains an array of mode pairs, where each pair consists of a mode name and a corresponding URL.
  - If there is an `important` note or `characteristics` for the engine, they are assigned accordingly.
  - The function constructs an HTML response using template literals, incorporating the engine details obtained from the previous steps.
  - The HTML response includes the engine's title, description, documentation links, available modes, important notes (if any), and characteristics (if any).
  - The response is returned with a 200 status code and the generated HTML content.

The file exports an object containing the `overview` function as the default export, enabling it to be imported and used in other JavaScript files.

************/

function overview(r) {
    var engine = r.uri.replace("/engine/", "")
    var title;
    var description;
    var documentation;
    var modes;
    var important;
    var characteristics; // TODO: Add characterists for template engines, which will be considered in more detail.

    switch (engine) {
        // python
        case 'python/Jinja2':
            title="Jinja2";
            description="Jinja is a fast, expressive, extensible templating engine. Special placeholders in the template allow writing code similar to Python syntax. Then the template is passed data to render the final document.";
            documentation=["Documentation","https://jinja.palletsprojects.com/",
                "PyPI", "https://pypi.org/project/Jinja2/",
                "Download Stats", "https://pepy.tech/project/Jinja2"];
            modes=["Default", "/python/Jinja2",
                "Sandbox", "/python/Jinja2Sandbox"];
            characteristics=`self-object: {{self}}<br>
            config: {{config}}<br>
            request: {{request}}<br>
            comment: {% comment %}<br>
            multiline comment: {# multiline comment #}<br>
            multiply: {{7*7}}<br>
            print string: {{"string"}} or {{'string'}}<br>
            print number: {{1337}}<br>
            print nothing: {{thisdoesnotexist}}`;
            break;
        case 'python/Tornado':
            title="Tornado";
            description="Tornado is the default template engine of the tornado web framework. It's a simple template system that compiles templates to Python code.";
            documentation=["Documentation","https://www.tornadoweb.org/en/stable/template.html",
                "PyPI", "https://pypi.org/project/tornado/",
                "Download Stats", "https://pepy.tech/project/tornado"];
            modes=["Default", "/python/Tornado"];
            characteristics=`comment: {% comment %}<br>
            multiline comment: {# multiline comment #}<br>
            multiply: {{7*7}}<br>
            print string: {{"string"}} or {{'string'}}<br>
            print number: {{1337}}`;
            break;
        case 'python/Mako':
            title="Mako";
            description="Mako is a template library written in Python. It provides a familiar, non-XML syntax which compiles into Python modules for maximum performance. Mako's syntax and API borrows from the best ideas of many others, including Django templates, Cheetah, Myghty, and Genshi. Conceptually, Mako is an embedded Python (i.e. Python Server Page) language, which refines the familiar ideas of componentized layout and inheritance to produce one of the most straightforward and flexible models available, while also maintaining close ties to Python calling and scoping semantics.";
            documentation=["Documentation","https://docs.makotemplates.org/en/latest/",
                "PyPI", "https://pypi.org/project/Mako/",
                "Download Stats", "https://pepy.tech/project/Mako"];
            modes=["Default", "/python/Mako"];
            characteristics=`comment: ## comment<br>
            multiline comment: <%doc> multiline commment </%doc><br>
            multiply: \${7*7}<br>
            print string: \${"string"} or $\{'string'}<br>
            print number: \${1337}`;
            break;
        case 'python/Django':
            title="Django";
            description="Django's template language is designed to strike a balance between power and ease. It's designed to feel comfortable to those used to working with HTML. If you have any exposure to other text-based template languages, such as Smarty or Jinja2, you should feel right at home with Django's templates.";
            documentation=["Documentation","https://docs.djangoproject.com/en/4.1/topics/templates/",
                "PyPI", "https://pypi.org/project/Django/",
                "Download Stats", "https://pepy.tech/project/Django"];
            modes=["Default", "/python/Django"];
            characteristics=`debug: {% debug %}
            lorem: {% lorem %}
            comment: {# comment #}<br>
            multiline comment: {% comment "Optional note" %} multiline comment {% endcomment %}<br>
            print string: {{"string"}} or {{'string'}}<br>`;
            break;
        case 'python/SimpleTemplateEngine':
            title="SimpleTemplate Engine";
            description="The Bottle web framework comes with a fast, powerful and easy to learn built-in template engine called SimpleTemplate or stpl for short.";
            documentation=["Documentation","https://bottlepy.org/docs/dev/stpl.html",
                "PyPI", "https://pypi.org/project/bottle/",
                "Download Stats", "https://pepy.tech/project/bottle"];
            modes=["Default", "/python/SimpleTemplateEngine"];
            characteristics=`multiply: {{7*7}}<br>
            print string: {{"string"}} or {{'string'}}`;
            break;
        case 'python/Pystache':
            title="Pystache";
            description="Pystache is a Python implementation of Mustache. Mustache is a framework-agnostic, logic-free templating system inspired by ctemplate and et by Ivan Formichev. Like ctemplate, Mustache \"emphasizes separating logic from presentation: it is impossible to embed application logic in this template language.\"";
            documentation=["Documentation","https://github.com/sarnold/pystache",
                "PyPI", "https://pypi.org/project/pystache/",
                "Download Stats", "https://pepy.tech/project/pystache"];
            modes=["Default", "/python/Pystache"];
            break;
        case 'python/Cheetah3':
            title="Cheetah3";
            description="Cheetah3 is a free and open source template engine and code-generation tool written in Python. Cheetah can be used unto itself, or incorporated with other technologies and stacks regardless of whether they're written in Python or not.<br>At its core, Cheetah is a domain-specific language for markup generation and templating which allows for full integration with existing Python code but also offers extensions to traditional Python syntax to allow for easier text-generation.";
            documentation=["Documentation","https://cheetahtemplate.org/users_guide/index.html",
                "PyPI", "https://pypi.org/project/Cheetah3/",
                "Download Stats", "https://pepy.tech/project/Cheetah3"];
            modes=["Default", "/python/Cheetah3"];
            characteristics=`comment: ## comment<br>
            multiline comment: #* multiline commment *#<br>
            multiply: \${7*7}<br>
            print string: \${"string"} or $\{'string'}<br>`;
            break;
        case 'python/Chameleon':
            title="Chameleon";
            description="Chameleon is an HTML/XML template engine for Python. It's designed to generate the document output of a web application, typically HTML markup or XML. The template engine compiles templates into Python byte-code and is optimized for speed. For a complex template language, the performance is very good.";
            documentation=["Documentation","https://chameleon.readthedocs.io/en/latest/",
                "PyPI", "https://pypi.org/project/Chameleon/",
                "Download Stats", "https://pepy.tech/project/Chameleon"];
            modes=["Default", "/python/Chameleon"];
            characteristics=`comment: &lt;!--! comment --&gt; or &lt;!--? comment --&gt;<br>
            multiply: \${7*7}<br>
            print string: \${"string"} or $\{'string'}<br>`;
            break;
        // golang
        case 'golang/html-template':
            title="html/template";
            description="Package template (html/template) implements data-driven templates for generating HTML output safe against code injection. It provides the same interface as package text/template and should be used instead of text/template whenever the output is HTML.";
            documentation=["Documentation","https://pkg.go.dev/html/template"];
            modes=["Default", "/golang/html-template"];
            characteristics=`self-object: {{ . }}<br>
            print string: {{"string"}} or {{printf "%s" "string" }} or {{html "string"}} or {{js "string"}}<br>
            alert 1: {{define "T1"}}&lt;script>alert(1)&lt;/script>{{end}} {{template "T1"}}`;
            break;
        case 'golang/text-template':
            title="text/template";
            description="Package template implements data-driven templates for generating textual output. To generate HTML output, see package html/template, which has the same interface as this package but automatically secures HTML output against certain attacks.";
            documentation=["Documentation","https://pkg.go.dev/text/template"];
            modes=["Default", "/golang/text-template"];
            characteristics=`self-object: {{ . }}<br>
            print string: {{"string"}} or {{printf "%s" "string" }} or {{html "string"}} or {{js "string"}}<br>
            alert 1: {{define "T1"}}&lt;script>alert(1)&lt;/script>{{end}} {{template "T1"}}`;
            break;
        // dotnet
        case 'dotnet/RazorEngine':
            title="Razor Engine";
            description="Razor Engine utilizes the Razor parser, that was introduced as part of the ASP.NET MVC and WebPages release by Microsoft.";
            documentation=["Documentation","https://antaris.github.io/RazorEngine/",
                "NuGet Gallery", "https://www.nuget.org/packages/RazorEngine/",
                "NuGet Gallery 2", "https://www.nuget.org/packages/RazorEngine.NetCore"];
            modes=["Default", "/dotnet/RazorEngine",
                "Sandbox", "/dotnet/RazorEngineSandbox"];
            important="Sandbox mode does not work. Throws unexpected error.";
            characteristics=`comment: @* comment<br>
            multiply: @(7*7)<br>
            code execution: @{ C# code }`;
            break;
        case 'dotnet/DotLiquid':
            title="DotLiquid";
            description="DotLiquid is a .Net port of the popular Ruby Liquid templating language. It is a separate project that aims to retain the same template syntax as the original, while using .NET coding conventions where possible.";
            documentation=["Documentation","https://github.com/dotliquid/dotliquid",
                "NuGet Gallery", "https://www.nuget.org/packages/DotLiquid/"];
            modes=["Default", "/dotnet/DotLiquid"];
            characteristics=`comment: {%# comment %}<br>
            multiline comment: {%comment%} multiline comment {%endcomment%}`;
            break;
        case 'dotnet/Scriban':
            title="Scriban";
            description="Scriban is a fast, powerful, safe and lightweight scripting language and engine for .NET, which was primarily developed for text templating with a compatibility mode for parsing liquid templates.";
            documentation=["Documentation","https://github.com/scriban/scriban/tree/master/doc",
                "NuGet Gallery", "https://www.nuget.org/packages/Scriban",
                "NuGet Gallery 2", "https://www.nuget.org/packages/Scriban.Signed"];
            modes=["Default", "/dotnet/Scriban",
                "Liquid support", "/dotnet/ScribanLiquid"];
            characteristics=`multiply: {{ 7*7 }}`;
            break;
        case 'dotnet/Fluid':
            title="Fluid";
            description="Fluid is an open-source .NET template engine based on the Liquid template language.";
            documentation=["Documentation","https://github.com/sebastienros/fluid",
                "NuGet Gallery", "https://www.nuget.org/packages/Fluid.Core"];
            modes=["Default", "/dotnet/Fluid"];
            characteristics=`comment: {%# comment %}<br>
            multiline comment: {%comment%} multiline comment {%endcomment%}`;
            break;
        // ruby
        case 'ruby/Erb':
            title="ERB";
            description="ERB provides an easy to use but powerful templating system for Ruby. Using ERB, actual Ruby code can be added to any plain text document for the purposes of generating document information details and/or flow control.";
            documentation=["Documentation","https://docs.ruby-lang.org/en/master/ERB.html",
            "RubyGems.org", "https://rubygems.org/gems/erb"];
            modes=["Default", "/ruby/Erb"];
            characteristics=`comment: <%# wasd %><br>
            multiply: <%= 7*7 %><br>
            code execution: <% ruby code %>`;
            break;
        case 'ruby/Erubi':
            title="Erubi";
            description="Erubi is a ERB template engine for ruby. It is a simplified fork of Erubis, using the same basic algorithm, with a few differences.";
            documentation=["Documentation","https://github.com/jeremyevans/erubi",
            "RubyGems.org", "https://rubygems.org/gems/erubi"];
            modes=["Default", "/ruby/Erubi"];
            characteristics=`comment: <%# wasd %><br>
            multiply: <%= 7*7 %><br>
            code execution: <% ruby code %>`;
            break;
        case 'ruby/Erubis':
            title="Erubis";
            description="Erubis is an implementation of eRuby.";
            documentation=["Documentation","https://www.rubydoc.info/gems/erubis/",
            "RubyGems.org", "https://rubygems.org/gems/erubis"];
            modes=["Default", "/ruby/Erubis"];
            characteristics=`comment: <%# wasd %><br>
            multiply: <%= 7*7 %><br>
            code execution: <% ruby code %>`;
            break;
        case 'ruby/Haml':
            title="Haml";
            description="Haml is a templating engine for HTML. It's designed to make it both easier and more pleasant to write HTML documents, by eliminating redundancy, reflecting the underlying structure that the document represents, and providing an elegant syntax that's both powerful and easy to understand";
            documentation=["Documentation","https://haml.info/docs/yardoc/",
            "RubyGems.org", "https://rubygems.org/gems/haml"];
            modes=["Default", "/ruby/Haml"];
            characteristics=`comment: / comment or -# comment<br>`;
            break;
        case 'ruby/Liquid':
            title="Liquid";
            description="A secure, non-evaling end user template engine with aesthetic markup.";
            documentation=["Documentation","https://www.rubydoc.info/gems/liquid/",
            "RubyGems.org", "https://rubygems.org/gems/liquid"];
            modes=["Default", "/ruby/Liquid"];
            characteristics=`comment: {%# comment %}<br>
            multiline comment: {%comment%} multiline comment {%endcomment%}`;
            break;
        case 'ruby/Slim':
            title="Slim";
            description="Slim is a template language whose goal is reduce the syntax to the essential parts without becoming cryptic.";
            documentation=["Documentation","https://github.com/slim-template/slim/",
            "RubyGems.org", "https://rubygems.org/gems/slim"];
            modes=["Default", "/ruby/Slim"];
            characteristics=`multiply: #{ 7*7 }`;
            break;
        case 'ruby/Mustache':
            title="Mustache";
            description="Inspired by ctemplate, Mustache is a framework-agnostic way to render logic-free views. As ctemplates says, \"It emphasizes separating logic from presentation: it is impossible to embed application logic in this template language. Think of Mustache as a replacement for your views. Instead of views consisting of ERB or HAML with random helpers and arbitrary logic, your views are broken into two parts: a Ruby class and an HTML template.";
            documentation=["Documentation","http://mustache.github.io/mustache.5.html",
                "RubyGems.org", "https://rubygems.org/gems/mustache"];
            modes=["Default", "/ruby/Mustache"];
            break;
        // php
        case 'php/Blade':
            title="Blade";
            description="Blade is the simple, yet powerful templating engine that is included with Laravel. Unlike some PHP templating engines, Blade does not restrict you from using plain PHP code in your templates. In fact, all Blade templates are compiled into plain PHP code and cached until they are modified, meaning Blade adds essentially zero overhead to your application.";
            documentation=["Documentation","https://laravel.com/docs/master/blade",
                "Packagist", "https://packagist.org/packages/laravel/framework"];
            modes=["Default", "/php/Blade"];
            characteristics=`time: {{ time() }} 
            comment: {{-- comment --}}<br>
            multiply: {{ 7*7}}
            string: {{ "string" }} or {{ 'string' }}`;
            break;
        case 'php/Twig':
            title="Twig";
            description="Twig, the flexible, fast, and secure template engine for PHP. Twig is both designer and developer friendly by sticking to PHP's principles and adding functionality useful for templating environments.";
            documentation=["Documentation","https://twig.symfony.com/doc/3.x/",
                "Packagist", "https://packagist.org/packages/twig/twig"];
            modes=["Default", "/php/Twig",
                "Sandbox", "/php/TwigSandbox"];
            characteristics=`self: {{_self}}<br>
            context: {{_context}}<br>
            charset: {{_charset}<br> 
            comment: {# comment #}<br>
            multiply: {{ 7*7 }}
            string: {{ "string" }} or {{ 'string' }}`;
            break;
        case 'php/Mustache.php':
            title="Mustache.php";
            description="A Mustache implementation in PHP.";
            documentation=["Documentation","https://github.com/bobthecow/mustache.php",
                "Packagist", "https://packagist.org/packages/mustache/mustache"];
            modes=["Default", "/php/Mustache.php"];
            break;
        case 'php/Smarty':
            title="Smarty";
            description="Smarty is a template engine for PHP, facilitating the separation of presentation (HTML/CSS) from application logic. It allows you to write templates, using variables, modifiers, functions and comments";
            documentation=["Documentation","https://smarty-php.github.io/smarty/5.x/",
                "RubyGems.org", "https://packagist.org/packages/smarty/smarty"];
            modes=["Default", "/php/Smarty",
                "Security", "/php/SmartySecurity"];
            characteristics=`time: { time() }<br>
            comment: {# comment #}<br>
            multiply: { 7*7 }<br>
            string: { "string" } or { 'string' }`;
            break;
        case 'php/Latte':
            title="Latte";
            description="Latte is the safest templating system for PHP. You will love its intuitive syntax. A wide range of useful features will make your work much easier. Latte's protection against critical vulnerabilities is very effective and allows you to focus on building quality applications without worrying about their security.";
            documentation=["Documentation","https://latte.nette.org/en/guide",
                "RubyGems.org", "https://packagist.org/packages/latte/latte"];
            modes=["Default", "/php/Latte",
                "Sandbox", "/php/LatteSandbox"];
            characteristics=`comment: {* comment *}<br>
            multiline comment: {/* multiline comment */}<br>
            multiply: {= 7*7 }<br>
            string: {= string }`;
            break;
        // elixir
        case 'elixir/EEx':
            title="EEx";
            description="EEx stands for Embedded Elixir. Embedded Elixir allows you to embed Elixir code inside a string in a robust way.";
            documentation=["Documentation","https://hexdocs.pm/eex/1.14.3/EEx.html"];
            modes=["Default", "/elixir/EEx"];
            characteristics=`Elixir expression: <% inline with output %> or <%= replace with result %><br>
            echo: <%% echo %><br>
            comment: <%# comment %>`;
            break;
        case 'elixir/LEEx':
            title="LEEx";
            description="LEEx stands for LiveEEx and is a feature of the phoenix web framework. They are similar to regular EEx templates except they are designed to minimize the amount of data sent over the wire by splitting static from dynamic parts and also tracking changes. LEEx' successor is called HEEx";
            documentation=["Documentation","https://hexdocs.pm/phoenix_live_view/0.15.7/assigns-eex.html",
                "Hex", "https://hex.pm/packages/phoenix/"];
            modes=["Default", "/elixir/LEEx"];
            important="No dynamic templates possible. User supplied template expressions are not executed.";
            break;
        case 'elixir/HEEx':
            title="HEEx";
            description="Phoenix template language is called HEEx (HTML+EEx). HEEx is a HTML-aware and component-friendly extension of Elixir Embedded language (EEx)";
            documentation=["Documentation","https://hexdocs.pm/phoenix_live_view/0.18.18/Phoenix.Component.html",
                "Hex", "https://hex.pm/packages/phoenix/"];
            modes=["Default", "/elixir/HEEx"];
            important="No dynamic templates possible. User supplied template expressions are not executed.";
            break;
        // java
        case 'java/Groovy':
            title="Apache Groovy";
            description="Apache Groovy is a powerful, optionally typed and dynamic language, with static-typing and static compilation capabilities, for the Java platform aimed at improving developer productivity thanks to a concise, familiar and easy to learn syntax. It integrates smoothly with any Java program, and immediately delivers to your application powerful features, including scripting capabilities, Domain-Specific Language authoring, runtime and compile-time meta-programming and functional programming.";
            documentation=["Documentation","https://groovy-lang.org/templating.html",
                "Maven Repository", "https://mvnrepository.com/artifact/org.apache.groovy/groovy-all",
                "Maven Repository 2", "https://mvnrepository.com/artifact/org.codehaus.groovy/groovy-all"];
            modes=["Default", "/java/Groovy"];
            characteristics=`comment: <% // comment %><br>
            multiply: \${7*7} or <%= 7*7 %>`;
            break;
        case 'java/Freemarker':
            title="Apache FreeMarker";
            description="Apache FreeMarker is a template engine: a Java library to generate text output (HTML web pages, e-mails, configuration files, source code, etc.) based on templates and changing data. Templates are written in the FreeMarker Template Language (FTL), which is a simple, specialized language (not a full-blown programming language like PHP).";
            documentation=["Documentation","https://freemarker.apache.org/docs/index.html",
                "Maven Repository", "https://mvnrepository.com/artifact/org.freemarker/freemarker"];
            modes=["Default", "/java/Freemarker"];
            characteristics=`comment: <#-- comment --><br>
            multiply: \${7*7} or #{7*7} or [=7*7]`;
            break;
        case 'java/Velocity':
            title="Apache Velocity Engine";
            description="The Apache Velocity Engine is a free open-source templating engine. Velocity permits you to use a simple yet powerful template language to reference objects defined in Java code. It is written in 100% pure Java and can be easily embedded into your own applications.";
            documentation=["Documentation","https://velocity.apache.org/engine/2.3/getting-started.html",
                "Maven Repository", "https://mvnrepository.com/artifact/org.apache.velocity/velocity-engine-core",
                "Maven Repository 2", "https://mvnrepository.com/artifact/org.apache.velocity/velocity"];
            modes=["Default", "/java/Velocity"];
            characteristics=`comment: ## comment<br>
            multiline comment: #* multiline comment *#<br>
            multiply: #set( $foo = 7*7) $foo<br>
            print string: #evaluate("string")<br>
            echo: #[[ raw echo ]]#`;
            break;
        case 'java/Thymeleaf':
            title="Thymeleaf";
            description="Thymeleaf is a modern server-side Java template engine for both web and standalone environments.<br>Thymeleaf's main goal is to bring elegant natural templates to your development workflow - HTML that can be correctly displayed in browsers and also work as static prototypes, allowing for stronger collaboration in development teams.<br>With modules for Spring Framework, a host of integrations with your favourite tools, and the ability to plug in your own functionality, Thymeleaf is ideal for modern-day HTML5 JVM web development - although there is much more it can do.";
            documentation=["Documentation","https://www.thymeleaf.org/documentation.html",
                "Maven Repository", "https://mvnrepository.com/artifact/org.thymeleaf/thymeleaf",
                "Maven Repository 2", "https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-thymeleaf",
                "Maven Repository 3", "https://mvnrepository.com/artifact/org.thymeleaf/thymeleaf-spring5"];
            modes=["Default", "/java/Thymeleaf",
                "Inline", "/java/ThymeleafInline"];
            characteristics=`multiply: \${ 7*7 } or [[\${ 7*7 }]] or [(\${ 7*7 })]`;
            break;
        // javascript
        case 'javascript/Handlebars':
            title="Handlebars";
            description="Minimal templating on steroids. Handlebars provides the power necessary to let you build semantic templates effectively with no frustration. Handlebars is largely compatible with Mustache templates. In most cases it is possible to swap out Mustache with Handlebars and continue using your current templates. Handlebars compiles templates into JavaScript functions. This makes the template execution faster than most other template engines.";
            documentation=["Documentation","https://handlebarsjs.com/guide/",
                "npm", "https://www.npmjs.com/package/handlebars"];
            modes=["Default", "/javascript/Handlebars"];
            characteristics=`comment: {{! comment}} or {{!-- comment with mustaches --}}`;
            break;
        case 'javascript/EJS':
            title="EJS";
            description="What is the \"E\" for? \"Embedded?\" Could be. How about \"Effective,\" \"Elegant,\" or just \"Easy\"? EJS is a simple templating language that lets you generate HTML markup with plain JavaScript. No religiousness about how to organize things. No reinvention of iteration and control-flow. It's just plain JavaScript.";
            documentation=["Documentation","https://ejs.co/#docs",
                "npm", "https://www.npmjs.com/package/ejs"];
            modes=["Default", "/javascript/EJS"];
            characteristics=`comment: <%# comment %><br>
            multiply: <%= 7*7 %><br>
            print string: <%= "string" %> or <%= 'string' %> or <%- "unescaped string" %>`;
            break;
        case 'javascript/Underscore':
            title="Underscore.js";
            description="Underscore is a JavaScript library that provides a whole mess of useful functional programming helpers without extending any built-in objects. It's the answer to the question: \"If I sit down in front of a blank HTML page, and want to start being productive immediately, what do I need?\" ... and the tie to go along with jQuery's tux and Backbone's suspenders.";
            documentation=["Documentation","https://underscorejs.org/",
                "npm", "https://www.npmjs.com/package/underscore"];
            modes=["Default", "/javascript/Underscore"];
            characteristics=`comment: <% //comment %><br>
            multiply: <%= 7*7 %><br>
            print string: <%= "string" %> or <%= 'string' %>`;
            break;
        case 'javascript/Vuejs':
            title="Vue";
            description="Vue uses an HTML-based template syntax that allows you to declaratively bind the rendered DOM to the underlying component instance's data. All Vue templates are syntactically valid HTML that can be parsed by spec-compliant browsers and HTML parsers.";
            documentation=["Documentation","https://vuejs.org/guide/essentials/template-syntax.html",
                "npm", "https://www.npmjs.com/package/vue"];
            modes=["Default", "/javascript/Vuejs"];
            important="SyntaxErrors may crash the node.js server!";
            characteristics=`comment: {{ /* comment */ }}<br>
            multiply: {{ 7*7 }}<br>
            print string: {{ "string" }} or {{ 'string' }}`;
            break;
        case 'javascript/Mustache':
            title="Mustache.js";
            description="mustache.js is a zero-dependency implementation of the mustache template system in JavaScript.<br>Mustache is a logic-less template syntax. It can be used for HTML, config files, source code - anything. It works by expanding tags in a template using values provided in a hash or object.<br> We call it \"logic-less\" because there are no if statements, else clauses, or for loops. Instead there are only tags. Some tags are replaced with a value, some nothing, and others a series of values.";
            documentation=["Documentation","https://mustache.github.io/mustache.5.html",
                "npm", "https://www.npmjs.com/package/mustache"];
            modes=["Default", "/javascript/Mustache"];
            break;
        case 'javascript/Angular':
            title="Angular";
            description="Angular is a development platform for building mobile and desktop web applications using TypeScript/JavaScript and other languages. In Angular, a template is a chunk of HTML. Use special syntax within a template to build on many of Angular's features.";
            documentation=["Documentation","https://angular.io/guide/template-syntax",
                "npm", "https://www.npmjs.com/package/@angular/core"];
            modes=["Default", "/javascript/Angular"];
            important="Server-Side Rendering (SSR) is supported; however, it couldn't be implemented in a feasible amount of time. Client-Side Rendering hasn't been implemented, yet.";
            break;
        case 'javascript/Pug':
            title="Pug";
            description="Pug is a high performance template engine heavily influenced by Haml and implemented with JavaScript for Node.js and browsers. This project was formerly known as \"Jade.\" However, it has been revealed to us that \"Jade\" is a registered trademark, and as a result a rename is needed.";
            documentation=["Documentation","https://pugjs.org/api/getting-started.html",
                "npm", "https://www.npmjs.com/package/pug"];
            modes=["Default", "/javascript/Pug",
            "Inline", "/javascript/PugInline"];
            characteristics=`comment: // comment<br>
            multiply: #{7*7}<br>`;
            break;
        case 'javascript/Angularjs':
            title="AngularJS";
            description="AngularJS is a toolset for building the framework most suited to your application development. In AngularJS, templates are written with HTML that contains AngularJS-specific elements and attributes. AngularJS combines the template with information from the model and controller to render the dynamic view that a user sees in the browser.";
            documentation=["Documentation","https://docs.angularjs.org/guide/templates",
                "npm", "https://www.npmjs.com/package/angular"];
            modes=["Default", "/javascript/Angularjs"];
            important="Server-Side Rendering (SSR) is not supported. Hence, it was implemented client-side.";
            characteristics=`multiply: {{ 7*7 }}<br>
            print string: {{ "string" }} or {{ 'string' }}`;
            break;
        case 'javascript/Hoganjs':
            title="Hogan.js";
            description="Hogan.js is a compiler for the Mustache templating language. Hogan.js is a 3.4k JS templating engine developed at Twitter. Use it as a part of your asset packager to compile templates ahead of time or include it in your browser to handle dynamic templates.";
            documentation=["Documentation","http://twitter.github.io/hogan.js/",
                "npm", "https://www.npmjs.com/package/hogan.js"];
            modes=["Default", "/javascript/Hoganjs"];
            break;
        case 'javascript/Nunjucks':
            title="Nunjucks";
            description="Nunjucks - A rich and powerful templating language for JavaScript.";
            documentation=["Documentation","https://mozilla.github.io/nunjucks/templating.html",
                "npm", "https://www.npmjs.com/package/nunjucks"];
            modes=["Default", "/javascript/Nunjucks"];
            characteristics=`comment: {# comment #}<br>
            multiply: {{ 7*7 }}<br>
            print absolute number: {{ -42|abs }}<br>
            print string: {{ "string" }} or {{ 'string' }}`;
            break;
        case 'javascript/Dot':
            title="doT";
            description="Created in search of the fastest and concise JavaScript templating function with emphasis on performance under V8 and nodejs. It shows great performance for both nodejs and browsers.";
            documentation=["Documentation","https://github.com/olado/doT",
                "npm", "https://www.npmjs.com/package/dot"];
            modes=["Default", "/javascript/Dot"];
            characteristics=`comment: /* comment */<br>
            multiply: {{= 7*7 }}<br>
            print string: {{= "string" }} or {{= 'string' }}`;
            break;
        case 'javascript/Velocityjs':
            title="Velocityjs";
            description="Velocityjs is velocity template engine for javascript.";
            documentation=["Documentation","https://github.com/shepherdwind/velocity.js",
                "npm", "https://www.npmjs.com/package/velocityjs"];
            modes=["Default", "/javascript/Velocityjs"];
            characteristics=`comment: ## comment<br>
            multiline comment: #* multiline comment *#<br>
            multiply: #set( $foo = 7*7) $foo<br>
            echo: #[[ raw echo ]]#`;
            break;
        case 'javascript/Eta':
            title="Eta";
            description="Eta is a lightweight and blazing fast embedded JS templating engine that works inside Node, Deno, and the browser. Created by the developers of Squirrelly, it's written in TypeScript and emphasizes phenomenal performance, configurability, and low bundle size.";
            documentation=["Documentation","https://eta.js.org/docs/intro/template-syntax",
                "npm", "https://www.npmjs.com/package/eta"];
            modes=["Default", "/javascript/Eta"];
            characteristics=`comment: <% /* comment */ %><br>
            multiply: <%= 7*7 %><br>
            print string: <%= "name" %> or <%= 'name' %>`;
            break;
        case 'javascript/Twigjs':
            title="Twig.js";
            description="Twig.js is a pure JavaScript implementation of the Twig PHP templating language (https://twig.symfony.com/)<br>The goal is to provide a library that is compatible with both browsers and server side JavaScript environments such as node.js.";
            documentation=["Documentation","https://github.com/twigjs/twig.js/wiki",
                "npm", "https://www.npmjs.com/package/twig"];
            modes=["Default", "/javascript/Twigjs"];
            characteristics=`context: {{_context}}<br>
            comment: {# comment #}<br>
            multiply: {{ 7*7 }}<br>
            print string: {{ "string" }} or {{ 'string' }}`;
            break;
        default:
            r.return(404, "Engine not found: " + engine)
            return;
    }

    var documentationStr = "";
    for (let i = 0; i < documentation.length; i+=2) {
        documentationStr += `<a class="btn" href="${documentation[i+1]}">${documentation[i]}</a><br>`
    } 

    var modesStr = "";
    for (let i = 0; i < modes.length; i+=2) {
        modesStr += `<a class="btn" href="${modes[i+1]}">${modes[i]}</a><br>`
    }

    if (important != undefined) {
        important = `<h2>Important</h2>
        <p>${important}</p>`
    } else {
        important = ""
    }

    if (characteristics != undefined) {
        characteristics = `<h2>Characteristics</h2>
        <p>${characteristics}</p>`
    } else {
        characteristics = ""
    }
    const response = `<!DOCTYPE html>
<html>
<head>
    <title>${title}</title>
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

    <div class="grid-2ndRow">
        <h2>${title}</h2>
        <p>${description}</p>
    </div>
    <div class="grid-documentation">
        <h2>Documentation</h2>
        ${documentationStr}
    </div>
    <div class="grid-modes">
        <h2>Modes</h2>
        ${modesStr}
    </div>
    <div class="grid-4thRow">
        ${important}
        ${characteristics}
    </div>
</div>
</body>
</html>
`

    r.headersOut["Content-Type"] = "text/html";
    r.return(200, response)
}
  
export default {overview};