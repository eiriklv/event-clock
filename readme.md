Event Clock
===================================

#### Introduction:
Create timed event callbacks.

#### Example use:
```javascript
var Clock = require('event-clock');

Clock.on('12:00:00', function() {
    // executes every day at 12:00:00
});
```

Alternatively, a [Frequency](https://github.com/smhg/date-frequency-js) can be passed:
```javascript
var Frequency = require('date-frequency');

Clock.on(new Frequency('F1D/WT12H0M0S'), function() {
    // executes Mondays at 12:00:00
});
```

#### Development:
Run tests:
```bash
$ npm test
```
