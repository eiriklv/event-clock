var debug = require('debug')('clock-app');
var eventClock = require('./index');

eventClock.at('23:40:55', function() {
    debug('my first custom event is firing!');
});

eventClock.at('23:41', function() {
    debug('my first custom event is firing!');
});
