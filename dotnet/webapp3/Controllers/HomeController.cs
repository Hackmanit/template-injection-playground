using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using webapp3.Models;
using System.Web;
using RazorEngine;
using RazorEngine.Templating;
using RazorEngine.Configuration;
using TemplateScriban = Scriban.Template;
using Fluid;
using TemplateDotLiquid = DotLiquid.Template;
using System.Xml.Linq;

namespace webapp3.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index(string name)
        {
            

            return View();
        }

        public IActionResult RazorEngine(string name, string hideError)
        {
            if (HttpContext.Request.Method == "GET")
            {
                name = HttpContext.Request.Query["name"].ToString();
            }

            var cacheProvidxer = new InvalidatingCachingProvider();
            var config = new TemplateServiceConfiguration();
            config.CachingProvider = cacheProvidxer;
            var service = RazorEngineService.Create(config);
            Engine.Razor = service;

            /* GOOD
             * string template = "Hello @Model.Name,"+name+" welcome to RazorEngine!";
             *
             * ViewBag.RenderedTemplate = Engine.Razor.RunCompile(template, "name", null, new { Name = name });
            */

            // Bad
            string template = name;

            if (template != null)
            {
                try
                {
                    ViewBag.RenderedTemplate = Engine.Razor.RunCompile(template, "templateName", modelType: null);
                }
                catch (Exception ex)
                {
                    if (hideError == "1") {
                        ViewBag.RenderedTemplate = name;
                    } else {
                        ViewBag.RenderedTemplate = ex.ToString();
                    }
                }
            }
            cacheProvidxer.InvalidateAll();

            return View();
        }

        // https://antaris.github.io/RazorEngine/Isolation.html 
        // Throws Error: #0 5.909 /app/Controllers/HomeController.cs(84,27): error CS0103: The name 'IsolatedRazorEngineService' does not exist in the current context [/app/webapp3.csproj]
        /*
        public IActionResult RazorEngineSandbox(string name, string hideError)
        {
            if (HttpContext.Request.Method == "GET")
            {
                name = HttpContext.Request.Query["name"].ToString();
            }

            var cacheProvidxer = new InvalidatingCachingProvider();
            var config = new TemplateServiceConfiguration();
            config.CachingProvider = cacheProvidxer;
            var service = IsolatedRazorEngineService.Create();
            Engine.Razor = service;

            string template = name;

            if (template != null)
            {
                try
                {
                    ViewBag.RenderedTemplate = Engine.Razor.RunCompile(template, "templateName", modelType: null);
                }
                catch (Exception ex)
                {
                    if (hideError == "1") {
                        ViewBag.RenderedTemplate = name;
                    } else {
                        ViewBag.RenderedTemplate = ex.ToString();
                    }
                }
            }
            cacheProvidxer.InvalidateAll();

            return View();
        }
        */

        public IActionResult DotLiquid(string name, string hideError)
        {
            if (HttpContext.Request.Method == "GET")
            {
                name = HttpContext.Request.Query["name"].ToString();
            }

            if (name != null)
            {
                try
                {
                    var template = TemplateDotLiquid.Parse(name);
                    ViewBag.RenderedTemplate = template.Render();
                }
                catch (Exception ex)
                {
                    if (hideError == "1") {
                        ViewBag.RenderedTemplate = name;
                    } else {
                        ViewBag.RenderedTemplate = ex.ToString();
                    }                }
            }

            return View();
        }

        public IActionResult Scriban(string name, string hideError)
        {
            if (HttpContext.Request.Method == "GET")
            {
                name = HttpContext.Request.Query["name"].ToString();
            }

            if (name != null)
            {
                try
                {
                    var template = TemplateScriban.Parse(name);
                    ViewBag.RenderedTemplate = template.Render();
                }
                catch (Exception ex)
                {
                    if (hideError == "1") {
                        ViewBag.RenderedTemplate = name;
                    } else {
                        ViewBag.RenderedTemplate = ex.ToString();
                    }
                }
            }

            return View();
        }

        public IActionResult ScribanLiquid(string name, string hideError)
        {
            if (HttpContext.Request.Method == "GET")
            {
                name = HttpContext.Request.Query["name"].ToString();
            }

            if (name != null)
            {
                try
                {
                    var template = TemplateScriban.ParseLiquid(name);
                    ViewBag.RenderedTemplate = template.Render();
                }
                catch (Exception ex)
                {
                    if (hideError == "1") {
                        ViewBag.RenderedTemplate = name;
                    } else {
                        ViewBag.RenderedTemplate = ex.ToString();
                    }                }
            }

            return View();
        }

        public IActionResult Fluid(string name, string hideError)
        {
            if (HttpContext.Request.Method == "GET")
            {
                name = HttpContext.Request.Query["name"].ToString();
            }

            if (name != null)
            {
                try
                {
                    var parser = new FluidParser();
                    var template = parser.Parse(name);
                    ViewBag.RenderedTemplate = template.Render();
                }
                catch (Exception ex)
                {
                    if (hideError == "1") {
                        ViewBag.RenderedTemplate = name;
                    } else {
                        ViewBag.RenderedTemplate = ex.ToString();
                    }               }
            }

            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}