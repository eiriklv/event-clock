var debug = require('debug')('clock-app');
var EventClock = require('./event-clock');

EventClock.at('19:00:30', function () {
  debug('my first custom event is firing!');
});

EventClock.at('19:01', function () {
  debug('my first custom event is firing!');
});

clearInterval(EventClock.timer);
