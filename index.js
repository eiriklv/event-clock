var debug = require('debug')('event-clock');
var moment = require('moment');

function EventClock() {
    this.listeners = {};

    this.registerTimeout = function (time) {
        var self = this,
            t = moment(time, 'HH:mm:ss'),
            now = moment();

        while (!t.isAfter(now)) {
            t.add(1, 'day');
        }

        setTimeout(function () {
            self.listeners[time].forEach(function (cb) {
                cb();
                debug('executed callback at ' + time);
            }, self);

            self.registerTimeout(time);
        }, t.diff(now));
    };
}

EventClock.prototype.on = function (time, callback) {
    this.listeners[time] = this.listeners[time] || [];
    this.listeners[time].push(callback);

    this.registerTimeout(time);

    debug('registered callback at ' + time);

    return this;
};

// alias
EventClock.prototype.at = EventClock.prototype.on;

EventClock.prototype.off = function (time, callback) {
    var idx = (this.listeners[time] || []).indexOf(callback);

    if (idx >= 0) {
        this.listeners[time].splice(idx, 1);
        debug('unregistered callback at ' + time);
    }

    return this;
};

module.exports = new EventClock();
