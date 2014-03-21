var phantomjsBinPath = require('phantomjs').path;
var child_process = require('child_process');

module.exports = function(grunt) {
  grunt.registerMultiTask('gremlinsjs', 'Monkey testing.', function() {
    var done = this.async();
    var options = this.options({});
    var phantom = child_process.spawn(phantomjsBinPath, ['./tasks/lib/gremlinsjs.js']);

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
