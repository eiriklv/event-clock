var assert = require('assert');
var EventClock = require('..'); // start clock

describe('EventClock', function () {
  it('should be a singleton', function () {
    assert(typeof EventClock === 'object');
    assert(typeof EventClock.at === 'function');
  });

  describe('tick()', function () {
    it('should emit current time', function (done) {
      var native = EventClock.emitter.emit;

      // add spy
      EventClock.emitter.emit = function (something) {
        assert(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/.test(something));

        native.bind(EventClock)();

        // restore
        EventClock.emitter.emit = native;

        done();
      };

      EventClock.tick();
    });
  });

  describe('parseInput()', function () {
    it('should parse time strings', function () {
      assert(EventClock.parseInput('abc') === null);
      assert(EventClock.parseInput('12') === null);
      assert(EventClock.parseInput('12:30') === '12:30:00');
      assert(EventClock.parseInput('12:30:30') === '12:30:30');
    });
  });

  describe('on()', function () {
    it('should run a function at a specified time', function (done) {
      this.timeout(5000);

      var now = new Date();

      now.setSeconds(now.getSeconds() + 2);

      var time = now.toTimeString().substr(0, 8);

      assert.doesNotThrow(function () {
        EventClock.on(time, done);
      });
    });
  });

  describe('off()', function () {
    it('should remove a previously registered function', function () {
      var cb = function () { };
      var time = '12:00:00';

      EventClock.on(time, cb);
      EventClock.off(time, cb);
    });
  });

  after(function () {
    // stop clock
    clearInterval(EventClock.timer);
  });
});
