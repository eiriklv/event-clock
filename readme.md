Event Clock
===================================

#### Introduction:
Create timed event callbacks.

#### Example use:
```js
var eventClock = require('event-clock');

eventClock.at('19:00:30', function() {
    // this will fire at 19:00:30 system time
});

eventClock.at('19:01', function() {
    // this will fire 19:01:00 system time
});
```
