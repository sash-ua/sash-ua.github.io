System.config({
  baseURL: "/todo/",
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    "npm:*": "jspm_packages/npm/*",
    "github:*": "jspm_packages/github/*"
  },
  bundles: {
    "js/build.js": [
      "js/main.js",
      "js/controller.js",
      "js/view.js",
      "npm:lodash@4.15.0/lodash.js",
      "js/model.js",
      "npm:normalize.css@4.2.0/normalize.css"
    ]
  },
  separateCSS: true,

  meta: {
    "*.css": {
      "loader": "css/css.js"
    }
  },

  depCache: {
    "js/main.js": [
      "norm/normalize.css"
    ]
  },

  map: {
    "css": "github:systemjs/plugin-css@0.1.27",
    "jq": "npm:jquery@3.1.0",
    "lo": "npm:lodash@4.15.0",
    "norm": "npm:normalize.css@4.2.0"
  }
});
