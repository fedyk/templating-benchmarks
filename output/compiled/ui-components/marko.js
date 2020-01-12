// Compiled using marko@4.18.31 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/dist/html").t(__filename),
    marko_componentType = "/templating-benchmarks$0.0.0/templates/ui-components/template.marko",
    marko_renderer = require("marko/dist/runtime/components/renderer"),
    marko_colors_template = require("./components/marko-colors"),
    marko_loadTag = require("marko/dist/runtime/helpers/load-tag"),
    marko_colors_tag = marko_loadTag(marko_colors_template);

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div class=\"my-app\">");

  marko_colors_tag(data, out, __component, "1");

  out.w("</div>");
}

marko_template._ = marko_renderer(render, {
    e_: true,
    f_: marko_componentType
  });

marko_template.meta = {
    id: "/templating-benchmarks$0.0.0/templates/ui-components/template.marko",
    tags: [
      "./components/marko-colors"
    ]
  };
