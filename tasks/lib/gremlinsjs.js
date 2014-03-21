var colors = require('colors');
var page = require('webpage').create();

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

page.open('./examples/basic.html', function(status) {
  if (status !== 'success') {
    console.error('File opening error.'.error.underline);
    phantom.exit();
  }
});

page.onInitialized = function() {
  page.injectJs('./client.js');
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
    console.log('\r\n\r\nDone, statistic:'.info.underline);

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
