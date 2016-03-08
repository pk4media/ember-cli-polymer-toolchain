/* global module */

module.export = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addBowerPackagesToProject([
      { name: "Polymer/polymer", target: "^1.0.8"},
      { name: "webcomponentsjs", target: "^0.7.8"},
      { name: "web-animations-js", target: "^2.1.4"}
    ]);
  }
};
