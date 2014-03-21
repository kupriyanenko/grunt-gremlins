var path = require('path');
var phantomjsBinPath = require('phantomjs').path;
var child_process = require('child_process');

module.exports = function(grunt) {
  grunt.registerMultiTask('gremlins', 'Monkey testing.', function() {
    var done = this.async();
    var options = this.options({});
    var args = [path.resolve(__dirname, './lib/gremlins.js'), options.path, options.test, options.timeout]
    var phantom = child_process.spawn(phantomjsBinPath, args);

    phantom.stdout.on('data', function (data) {
      process.stdout.write(data);
    });

    phantom.stderr.on('data', function (data) {
      process.stderr.write(data);
    });

    phantom.on('close', function (code) {
      if (code) {
        grunt.warn('PhantomJS error.');
      }

      done(code);
    });
  });
};
