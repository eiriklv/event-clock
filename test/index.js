var EventClock = require('..'),
  Frequency = require('date-frequency'),
  assert = require('assert');

describe('EventClock', function () {
  describe('#()', function () {
    it('should return an object with .on method', function () {
      assert(typeof EventClock === 'object');
      assert(typeof EventClock.on === 'function');
    });
  });

  describe('on()', function () {
    it('should run a function at a specified time', function (done) {
      this.timeout(5000);

      var now = new Date();

      now.setSeconds(now.getSeconds() + 2);

      assert.doesNotThrow(function () {
        EventClock.on(now.toTimeString().substr(0, 8), function () {
          done();
        });
      });
    });

    it('should accept an object with a next method', function () {
      var str = 'FT0H0M0S', // each day at midnight
        frequency = new Frequency(str);

      EventClock.on(frequency, function () {});
      assert(EventClock.listeners[str].callbacks.length === 1);
    });
  });

  describe('off()', function () {
    it('should stop running a function set with on', function (done) {
      this.timeout(5000);

      var now = new Date(),
        time,
        cb;

      now.setSeconds(now.getSeconds() + 2);

      time = now.toTimeString().substr(0, 8);

      cb = function () {
        EventClock.off(time, cb);
        assert(EventClock.listeners[time].callbacks.length === 0);
        done();
      };

      EventClock.on(time, cb);
    });
  });
});
