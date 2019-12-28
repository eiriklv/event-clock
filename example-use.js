var EventClock = require('.');

EventClock.on('19:00:30', function () {
  console.log('my first custom event is firing!');
});

EventClock.on('19:01', function () {
  console.log('my second custom event is firing!');
});
