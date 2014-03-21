grunt-gremlins
============

[![NPM version](https://badge.fury.io/js/grunt-gremlins.png)](http://badge.fury.io/js/grunt-gremlins)

Grunt task for monkey testing library [gremlins.js](https://github.com/marmelab/gremlins.js)

![](https://raw.githubusercontent.com/kupriyanenko/grunt-gremlins/gh-pages/img/screenshot.png)

_If you haven't used [grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](https://github.com/cowboy/grunt/blob/master/docs/getting_started.md) guide._

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
$ npm install grunt-gremlins --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-gremlins');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.2](https://github.com/gruntjs/grunt-contrib-clean/tree/grunt-0.3-stable).*

## Gremlins task

Inside your `Gruntfile.js` file add a section named `gremlins`.

#### Config Example

Example gremlins config:

```javascript
  gremlins: {
    local: {
      options: {
        path: "./examples/basic.html"
      }
    },
    external: {
      options: {
        path: "https://google.com",
        timeout: 1000,
        test: __dirname + "/examples/test.gremlins.js"
      }
    }
  }
```
