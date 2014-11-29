var EventClock = require('..'),
  assert = require('assert');

describe('EventClock', function () {
  describe('#()', function () {
    it('should return an object with .at method', function () {
      assert(typeof EventClock === 'object');
      assert(typeof EventClock.at === 'function');
    });
  });

  describe('at()', function () {
    it('should run a function at a specified time', function (done) {
      this.timeout(5000);

      var now = new Date();

      now.setSeconds(now.getSeconds() + 2);

      assert.doesNotThrow(function () {
        EventClock.at(now.toTimeString().substr(0, 8), function () {
          done();
        });
      });
    });
  });
});
