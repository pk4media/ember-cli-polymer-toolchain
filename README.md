# ember-cli-polymer-toolchain
Ember CLI Toolchain for Polymer 1.X

#Installation

```
ember install ember-cli-polymer-toolchain
```

Then in the root for your project create an ```elements``` folder. All html imports
should be done in ```elements/index.html```. Example file:

```
<link rel="import" href="../bower_components/paper-drawer-panel/paper-drawer-panel.html">
<link rel="import" href="../bower_components/paper-header-panel/paper-header-panel.html">
<link rel="import" href="../bower_components/paper-toolbar/paper-toolbar.html">
```

##Installation locally

In this project's directory make available via npm:
```
npm link
```

In parent app's directory link package:
```
npm link ember-cli-polymer-toolchain
```

Install additional packages in parent app via bower:
```
bower install --save Polymer/polymer
bower install --save webcomponentsjs
```
