Event Clock [![Build Status](https://github.com/eiriklv/event-clock/workflows/CI/badge.svg)](https://github.com/eiriklv/event-clock/actions)
===================================

#### Introduction:
Create timed event callbacks.

#### Example use:
```javascript
var EventClock = require('event-clock');

EventClock.on('19:00:30', function () {
  // this will fire at 19:00:30 system time
});

var cb = function () {
  // this will fire 19:01:00 system time
}

EventClock.on('19:01', cb);

// removable with:
EventClock.off('19:01', cb);

// stop clock
EventClock.stop();
```

#### Development:
```
npm install
npm test
```
