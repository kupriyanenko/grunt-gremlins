// custom logger for gremlins
var customLogger = {
    log: function() {
        window.callPhantom({
            stat: {
                entity: arguments[0],
                type: arguments[1],
                value: arguments[2]
            }
        });
        console.log.apply(console, arguments);
    },
    info: function() {
        console.info.apply(console, arguments);
    },
    warn: function() {
        console.warn.apply(console, arguments);
    },
    error: function() {
        console.error.apply(console, arguments);
    }
};

// test runner
window.phantomHorde = function(horde, options) {
    horde.logger(customLogger);

    horde.unleash(options);

    horde.after(function() {
        window.callPhantom({ end: true });
    });
};

// onerror fix
window.onerror = function() {
	void 0;
};

// bind for phantom
if (!('bind' in Function.prototype)) {
  Function.prototype.bind = function() {
    var funcObj = this;
    var extraArgs = Array.prototype.slice.call(arguments);
    var thisObj = extraArgs.shift();
    return function() {
      return funcObj.apply(thisObj, extraArgs.concat(Array.prototype.slice.call(arguments)));
    };
  };
}

// requestAnimationFrame for phantom
var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;

(function() {
    var lastTime = 0;
 
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());
