var Frequency = require('./frequency');

function EventClock() {
    this.listeners = {};

    this.registerTimeout = function (frequency) {
        var self = this,
            now = new Date(),
            next = frequency.next(now);

        self.listeners[frequency.toString()].timeout = setTimeout(function () {
            self.listeners[frequency.toString()].callbacks.forEach(function (cb) {
                cb();
            }, self);

            self.registerTimeout(frequency);
        }, next - now);
    };

    this.parseInput = function (frequency) {
        if (typeof frequency === 'string') {
            frequency = new Frequency(frequency);
        }

        if (typeof frequency !== 'object' || !frequency.next) {
            throw 'Invalid frequency';
        }

        return frequency;
    };
}

EventClock.prototype.on = function (frequency, callback) {
    frequency = this.parseInput(frequency);

    var str =  frequency.toString(),
        listener = this.listeners[str];

    listener = listener || {
        callbacks: []
    };

    listener.callbacks.push(callback);

    this.listeners[str] = listener;

    this.registerTimeout(frequency);

    return this;
};

EventClock.prototype.off = function (frequency, callback) {
    frequency = this.parseInput(frequency);

    var str = frequency.toString(),
        listener = this.listeners[str];

    if (listener) {
        if (callback) {
            var idx = (listener.callbacks || []).indexOf(callback);

            if (idx >= 0) {
                listener.callbacks.splice(idx, 1);
            }
        } else {
            listener.callbacks = [];
        }

        if (listener.callbacks.length === 0) {
            clearTimeout(listener.timeout);
        }

        this.listeners[str] = listener;
    }

    return this;
};

module.exports = new EventClock();
