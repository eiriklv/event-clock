var util = require('util');
var events = require('events');
var createDebug = require('debug');
var moment = require('moment');

var EventEmitter = events.EventEmitter;
var debug = createDebug('eventclock');

var validFormats = [
  (new RegExp(/^([0-9]{2}):([0-9]{2})$/)),
  (new RegExp(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/))
];

function EventClock () {
  this.timer = setInterval(this.tick.bind(this), 1000);

  debug('inited EventClock');
}

util.inherits(EventClock, EventEmitter);

EventClock.prototype.at = function (time, callback) {
  time = this.parseInput(time);

  if (time) {
    this.on(time, callback);
  }
};

EventClock.prototype.parseInput = function (input) {
  var valid = validFormats
    .map(function (regex) {
      return regex.test(input);
    })
    .reduce(function (a, b) {
      return a || b;
    });

  var parsedTime = moment(input, 'HH:mm:ss').format('HH:mm:ss');

  return valid && parsedTime !== 'Invalid date' ? parsedTime : null;
};

EventClock.prototype.tick = function () {
  var now = moment().format('HH:mm:ss');

  debug(now);

  this.emit(now);
};

module.exports = new EventClock();
