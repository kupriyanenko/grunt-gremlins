grunt-gremlins
============

[![NPM version](https://badge.fury.io/js/grunt-gremlins.png)](http://badge.fury.io/js/grunt-gremlins)

Grunt task for monkey testing library [gremlins.js](https://github.com/marmelab/gremlins.js)

_If you haven't used [grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](https://github.com/cowboy/grunt/blob/master/docs/getting_started.md) guide._

### Getting Started

From the same directory as your project's Gruntfile and package.json, install this plugin with the following command:

```
$ npm install grunt-gremlins --save
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-gremlins');
```

### Overview

Inside your `Gruntfile.js` file add a section named `gremlins`.

#### Config Example

Example requirejs jsttojs config:

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

### License

Copyright (c) 2012 Alexey Kupriyanenko a.kupriyanenko@gmail.com

grunt-jsttojs is released under the MIT license.
