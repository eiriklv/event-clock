var Frequency = require('./frequency');

function EventClock() {
    this.listeners = {};

    this.registerTimeout = function (frequency) {
        var self = this,
            now = new Date(),
            next = frequency.next(now);

        setTimeout(function () {
            self.listeners[frequency.toString()].forEach(function (cb) {
                cb();
            }, self);

            self.registerTimeout(frequency);
        }, next - now);
    };
}

EventClock.prototype.on = function (frequency, callback) {
    if (typeof frequency === 'string') {
        frequency = new Frequency(frequency);
    }

    if (typeof frequency !== 'object' || !frequency.next) {
        throw 'Invalid frequency';
    }

    var str = frequency.toString();

    this.listeners[str] = this.listeners[str] || [];

    this.listeners[str].push(callback);

    this.registerTimeout(frequency);

    return this;
};

EventClock.prototype.off = function (time, callback) {
    var idx = (this.listeners[time] || []).indexOf(callback);

    if (idx >= 0) {
        this.listeners[time].splice(idx, 1);
    }

    return this;
};

module.exports = new EventClock();
