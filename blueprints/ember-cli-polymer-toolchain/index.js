/* global module */

module.export = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addBowerPackagesToProject([
      { name: 'Polymer/polymer', target: "1.0.8"}
    ]);
  }
};
