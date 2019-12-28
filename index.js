var events = require('events');
var createDebug = require('debug');

var EventEmitter = events.EventEmitter;
var debug = createDebug('eventclock');

var validFormats = [
  (new RegExp(/^([0-9]{2}):([0-9]{2})$/)),
  (new RegExp(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/))
];

function EventClock () {
  this.emitter = new EventEmitter();
  this.timer = setInterval(this.tick.bind(this), 1000);

  debug('init');
}

EventClock.prototype.parseInput = function (input) {
  var valid = validFormats
    .map(function (regex) {
      return regex.test(input);
    })
    .reduce(function (a, b) {
      return a || b;
    });

  if (input.length === 5) {
    input = input + ':00';
  }

  return valid ? input : null;
};

EventClock.prototype.tick = function () {
  var now = (new Date()).toTimeString().substr(0, 8);

  debug(now, 'tick');

  this.emitter.emit(now);
};

EventClock.prototype.on = function (time, callback) {
  time = this.parseInput(time);

  if (time) {
    this.emitter.on(time, callback);

    debug(time, 'callback registered');
  }
};

EventClock.prototype.at = EventClock.prototype.on;

EventClock.prototype.off = function (time, callback) {
  time = this.parseInput(time);

  if (time) {
    this.emitter.off(time, callback);

    debug(time, 'callback removed');
  }
};

module.exports = new EventClock();
