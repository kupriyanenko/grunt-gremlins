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
_Run this task with the `grunt gremlins` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

#### path (required)
Type: `String`

Path to local html page or external web page

#### test
Type: `String`

Path to js file with gremlins test

#### timeout
Type: `Number`

Needed only if `test` defined. Timeout for test injecting.

### Usage Examples

There are three formats you can use to run this task.

#### Test application with inluding tests

_Grunt task_:
```js
gremlins: {
  options: {
    path: './examples/basic.html'
  }
}
```

_./examples/basic.html_:
```html
<!doctype html>
<html lang="en">
<script src="../node_modules/gremlins.js/gremlins.min.js"></script>
<body>
  <p>Lorem ipsum dolor sit amet.</p>
  <script>
  var horde = gremlins.createHorde()
    .gremlin(gremlins.species.clicker());

  if (window.phantomHorde) {
    window.phantomHorde(horde, { nb: 20 });
  } else {
    horde.unleash({ nb: 20 });
  }
  </script>
</body>
</html>
```

#### Test application with injected tests in page

_Grunt task_:
```js
gremlins: {
  options: {
    path: './examples/basic.html',
    test: __dirname + '/examples/test.gremlins.js'
  }
}
```

_/examples/test.gremlins.js_:
```js
var horde = gremlins.createHorde()
    .gremlin(gremlins.species.clicker())
    .gremlin(gremlins.species.scroller())
    .mogwai(gremlins.mogwais.gizmo())
    .mogwai(gremlins.mogwais.fps());

window.phantomHorde(horde, { nb: 20 });
```

#### Specific targets with per target options

_Grunt task_:
```js
gremlins: {
  local: {
    path: './examples/basic.html'
  },
  external: {
    options: {
      path: 'https://google.com',
      test: __dirname + '/examples/test.gremlins.js',
      timeout: 1000
    }
  }
}
```