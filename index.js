/* jshint node: true */
// 'use strict';

var vulcanize = require('broccoli-vulcanize');
var funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var fs = require('fs');
var htmlAutoprefixer = require('html-autoprefixer');

module.exports = {
  name: 'ember-cli-polymer-toolchain',

  isDevelopingAddon: function() {
    return true;
  },

  contentFor: function(type) {
    if (type === 'head-footer') {
      return [
        '<script src="assets/webcomponentsjs/webcomponents-lite.js"></script>',
        '<script>window.Polymer = window.Polymer || {};window.Polymer.dom = "shadow";</script>',
        '<link rel="import" href="assets/vulcanized.html">'
      ];
    }
  },

  treeForPublic: function(tree) {
    var webcomponents = funnel('bower_components', {
      files: [
        'webcomponentsjs/webcomponents-lite.js',
        'polymer/polymer.html'
      ],
      destDir: '/assets'
    });

    var vulcanized = vulcanize('elements', {
      input: 'index.html',
      output: 'assets/vulcanized.html',
      csp: true,
      inline: true,
      strip: true,
      excludes: [/^data:/, /^http[s]?:/],
      stripExcludes: false,
      stripComments: true,
      inlineScripts: true,
      inlineCss: true,
      implicitStrip: false,
      crisper: true,

      outputHandler: function(filename, data) {
        if (filename.match(/\.html$/)) {
          fs.writeFileSync(filename, htmlAutoprefixer.process(data, null, {browsers: ['last 2 versions'], cascade: false, safe: true}));
        } else {
          fs.writeFileSync(filename, data);
        }
      }
    });

    var trees = [webcomponents, vulcanized];
    if (tree) {
      trees.unshift(tree);
    }

    return mergeTrees(trees);
  }
};
