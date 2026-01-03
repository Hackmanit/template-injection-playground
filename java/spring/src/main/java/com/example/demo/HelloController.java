package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.io.StringWriter;
import java.io.StringReader;
import java.util.HashMap;

import org.apache.velocity.runtime.resource.loader.StringResourceLoader;
import org.apache.velocity.runtime.resource.util.StringResourceRepository;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.app.Velocity;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.tools.generic.ClassTool;
import org.apache.velocity.tools.generic.DateTool;

import freemarker.template.Configuration;
import freemarker.template.Template;

import groovy.lang.Writable;
import groovy.text.SimpleTemplateEngine;

import org.thymeleaf.TemplateEngine;
import org.thymeleaf.templateresolver.StringTemplateResolver;

@RestController
public class HelloController {

	@GetMapping("/")
	public String index() {
		return "Greetings from Spring Boot!";
	}

  String getTemplate(String name, String engine) {
    String template = 
"""
<!DOCTYPE html>
<html>
<head>
  <title>Java """ + engine + """
  </title>
  <link rel=\"stylesheet\" href=\"/css/stylesheet.css\" type=\"text/css\"> 
  <link rel=\"icon\" type=\"image/x-icon\" href=\"/images/favicon.ico\">
</head>
<body>
  <div class=\"grid-container\">
    <div class=\"grid-header-heading\">
      <a class=\"heading\" href=\"/index.html\">Template Injection Playground</a>
    </div>
    <div class=\"grid-header-rest\">
      <a class=\"header-link\" href=\"/engines.html\">Template Engines</a>
	  <a class=\"header-link\" href=\"/all.html\">All Engines</a>
      <a class=\"header-link\" href=\"/config.html\">Config</a>
      <a class=\"header-link\" href=\"/links.html\">Links</a>
      <a class=\"header-link\" href=\"/random.html\">Random</a>
    </div>

    <div class=\"grid-template\">
      <form method=\"POST\" action=\"""" + engine + """
      \">     
        <label>Name</label>
        <input name=\"name\" type=\"text\" value=\"\" />
        <input type=\"submit\" value=\"submit\" />
      </form>
      <br>
      <p id=\"rendered\">""" + name + """
      </p>
    </div>
  </div>
</body>
</html>""";
    return template;
  }

  @RequestMapping("/Velocity")
	String velocity(@RequestParam(required = false) String name, @RequestParam(required = false) String hideError) {
		if (name == null) {
			name = "";
		}
    if (hideError == null) {
			hideError = "";
		}

		String templateString = getTemplate(name, "Velocity");

    try {
      // https://stackoverflow.com/a/35775745, shortened and replaced deprecated stuff
      VelocityEngine engine = new VelocityEngine();
      engine.setProperty(Velocity.RESOURCE_LOADERS, "string");
      engine.addProperty("resource.loader.string.class", StringResourceLoader.class.getName());
      engine.addProperty("resource.loader.string.repository.static", "false");
      engine.init();

      StringResourceRepository repo = (StringResourceRepository) engine.getApplicationAttribute(StringResourceLoader.REPOSITORY_NAME_DEFAULT);
      repo.putStringResource("newTemplate", templateString);

      VelocityContext context = new VelocityContext();
      context.put("name", "World");
      context.put("class", new ClassTool());
      context.put("date", new DateTool());

      org.apache.velocity.Template template = engine.getTemplate("newTemplate");
      StringWriter writer = new StringWriter();
      template.merge(context, writer);

      return writer.toString();
		} catch (Exception e) {
      if (hideError == "1") {
        return templateString;
      } else {
			  return e.toString();
      }
		}
  }

  @RequestMapping("/Freemarker")
	String freemarker(@RequestParam(required = false) String name, @RequestParam(required = false) String hideError) {
		if (name == null) {
			name = "";
		}
    if (hideError == null) {
			hideError = "";
		}

		String templateString = getTemplate(name, "Freemarker");

    try {
      // See For VERSION differences: https://freemarker.apache.org/docs/api/freemarker/template/Configuration.html#Configuration-freemarker.template.Version-
      Template template = new Template("name", new StringReader(templateString), new Configuration(Configuration.VERSION_2_3_32));
      StringWriter writer = new StringWriter();
      template.process(new HashMap<String, Object>(), writer);

      return writer.toString();
		} catch (Exception e) {
      if (hideError == "1") {
        return templateString;
      } else {
			  return e.toString();
      }
		}
  }

  @RequestMapping("/Groovy")
	String groovy(@RequestParam(required = false) String name, @RequestParam(required = false) String hideError) {
		if (name == null) {
			name = "";
		}
    if (hideError == null) {
			hideError = "";
		}

    String templateString = getTemplate(name, "Groovy");

    try {
      Writable template = new SimpleTemplateEngine().createTemplate(templateString).make();
      return template.toString();
		} catch (Exception e) {
      if (hideError == "1") {
        return templateString;
      } else {
			  return e.toString();
      }		
    }
  }

  @RequestMapping("/Thymeleaf")
	String thymeleaf(@RequestParam(required = false) String name, @RequestParam(required = false) String hideError) {
    if (name == null) {
			name = "";
		}
    if (hideError == null) {
			hideError = "";
		}
    String templateString = getTemplate(name, "Thymeleaf");

    try {
      TemplateEngine templateEngine = new TemplateEngine();
      templateEngine.setTemplateResolver(new StringTemplateResolver());
      return templateEngine.process(templateString, new org.thymeleaf.context.Context());
		} catch (Exception e) {
			if (hideError == "1") {
        return templateString;
      } else {
			  return e.toString();
      }
		}
  }

  @RequestMapping("/ThymeleafInline") // [[]] oder [()] https://www.acunetix.com/blog/web-security-zone/exploiting-ssti-in-thymeleaf/
	String thymeleafInline(@RequestParam(required = false) String name, @RequestParam(required = false) String hideError) {
    if (name == null || name == "") { // Thymeleaf with Attribute Throws Error if null or empty
			return getTemplate("", "ThymeleafInline");
		}
    if (hideError == null) {
			hideError = "";
		}
    name = "<a th:text=\""+name+"\">";
    String templateString = getTemplate(name, "ThymeleafInline");

    try {
      TemplateEngine templateEngine = new TemplateEngine();
      templateEngine.setTemplateResolver(new StringTemplateResolver());
      return templateEngine.process(templateString, new org.thymeleaf.context.Context());
		} catch (Exception e) {
      if (hideError == "1") {
        return templateString;
      } else {
			  return e.toString();
      }
		}
  }


}
