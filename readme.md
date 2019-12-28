Event Clock
===================================

#### Introduction:
Create timed event callbacks.

#### Example use:
```javascript
var EventClock = require('event-clock');

EventClock.at('19:00:30', function () {
  // this will fire at 19:00:30 system time
});

EventClock.at('19:01', function () {
  // this will fire 19:01:00 system time
});

// stop clock
clearInterval(EventClock.timer);
```

#### Development:
```
npm install
npm test
```
