var assert = require('assert');
var EventClock = require('..'); // start clock

describe('EventClock', function () {
  it('should be a singleton', function () {
    assert(typeof EventClock === 'object');
    assert(typeof EventClock.at === 'function');
  });

  describe('at()', function () {
    it('should run a function at a specified time', function (done) {
      this.timeout(5000);

      var now = new Date();

      now.setSeconds(now.getSeconds() + 2);

      var time = now.toTimeString().substr(0, 8);

      assert.doesNotThrow(function () {
        EventClock.at(time, function () {
          done();
        });
      });
    });
  });

  after(function () {
    // stop clock
    clearInterval(EventClock.timer);
  });
});
