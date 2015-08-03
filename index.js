/* jshint node: true */
// 'use strict';

var vulcanize = require('broccoli-vulcanize');
var funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-polymer-toolchain',

  isDevelopingAddon: function() {
    return true;
  },

  contentFor: function(type) {
    if (type === 'head-footer') {
      return [
        '<script src="webcomponents-lite.js"></script>',
        '<script>',
        'window.Polymer = window.Polymer || {};',
        'window.Polymer.dom = ' + '"shadow"' + ';',
        '</script>',
        '<link rel="import" href="' + this.parent.pkg.name + '-vulcanized.html">'
      ];
    }
  },

  treeForPublic: function(tree) {
    var webcomponents = funnel('bower_components/webcomponentsjs', {
      srcDir: '/',
      files: ['webcomponents-lite.js'],
      destDir: '/'
    });

    var vulcanized = vulcanize('elements', {
      input: 'index.html',
      output: 'assets/'+ this.parent.pkg.name + '-vulcanized.html',
      csp: true,
      inline: true,
      strip: true,
      excludes: [/^data:/, /^http[s]?:/],
      stripExcludes: false,
      stripComments: true,
      inlineScripts: true,
      inlineCss: true,
      implicitStrip: false
    });

    var polymer = funnel('bower_components', {
      srcDir: '',
      files: [
      'webcomponentsjs/webcomponents-lite.js'
      ],
      destDir: '/assets'
    });


    var trees = [polymer, webcomponents, vulcanized];
    if (tree) {
      trees.unshift(tree);
    }

    return mergeTrees(trees);
  }
};
