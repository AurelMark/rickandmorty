const path = require("path");

function resolvePath(appPath) {
  return path.join(__dirname, "..", appPath);
}

module.exports = {
  appBuild: resolvePath("build"),
  appPublic: resolvePath("public"),
  appHTML: resolvePath("public/index.html"),
  appNodeModules: resolvePath("node_modules"),
  appEntryJS: resolvePath("src/index.jsx"),
  alias: {
    images: resolvePath("src/assets/images"),
    assets: resolvePath("src/assets"),
    reducers: resolvePath("src/redux/reducers"),
    actions: resolvePath("src/redux/actions"),
    actionCreators: resolvePath("src/redux/actionCreators"),
    actionTypes: resolvePath("src/redux/actionTypes"),
    api: resolvePath("src/api"),
    components: resolvePath("src/components"),
    pages: resolvePath("src/components/pages"),
    utils: resolvePath("src/utils"),
    styles: resolvePath("src/styles"),
    translations: resolvePath("src/translations"),
    services: resolvePath("src/services"),
    routes: resolvePath("src/routes")
  }
};
