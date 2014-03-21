var colors = require('colors');
var page = require('webpage').create();

page.paperSize = { width: '300px', height: '400px' };

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

var errors = [];
var stats = null;
var output = '';
var url = phantom.args[0];
var injectTest = phantom.args[1];
var timeout = phantom.args[2];

page.open(url, function(status) {
  if (status !== 'success') {
    console.error('File opening error.'.error.underline);
    phantom.exit();
  }

  if (injectTest) {
    setTimeout(function() {
      page.injectJs(injectTest);
    }, timeout)
  }
});

page.onInitialized = function() {
  page.injectJs('./client.js');

  if (injectTest) {
    page.injectJs('../../node_modules/gremlins.js/gremlins.min.js');
  }
};

page.onConsoleMessage = function(msg, lineNum, sourceId) {
  output += msg + '\r\n';

  console.log(msg);
};

page.onError = function(msg, trace) {
  var msgStack = [('ERROR: ' + msg).error];
  if (trace && trace.length) {
    msgStack.push('TRACE:'.warn);
    trace.forEach(function(t) {
      msgStack.push((' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function + '")' : '')).warn);
    });
  }

  output += msgStack.join('\n');

  errors.push(msg.error);
  console.error(msgStack.join('\n') + '\r\n');
};

page.onCallback = function(data) {
  // end callback
  if (data.end === true) {
    console.log(('\r\n\r\nDone ' + url + ', statistics:').info.underline);

    // error statistic
    console.log('\r\nErrors: ' + (errors.length).toString()[(errors.length ? 'red' : 'debug')]);
    if (errors.length) {
      errors.forEach(function(error) {
        console.log(error);
      });
    }

    // call statistic
    if (stats) {
      console.log('\r\nUsage:');
      for (var entity in stats) {
        for (var type in stats[entity]) {
          console.log(
            entity, type,
            (stats[entity][type].count).toString().debug, 'times called'
          );
        }
      }
    }

    phantom.exit();
  }
  // statistic logger
  else if (data.stat) {
    stats = stats || {};

    stats[data.stat.entity] = stats[data.stat.entity] || {};
    stats[data.stat.entity][data.stat.type] = stats[data.stat.entity][data.stat.type] || {
      count: 0
    };

    stats[data.stat.entity][data.stat.type].count++;
  }
};
