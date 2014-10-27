var debug = require('debug')('clock-app');
var eventClock = require('./event-clock');

eventClock.at('19:00:30', function() {
    debug('my first custom event is firing!');
});

eventClock.at('19:01', function() {
    debug('my first custom event is firing!');
});
