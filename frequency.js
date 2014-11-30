var DAY = 24 * 60 * 60 * 1000;

function Frequency (str) {
    var parts = str.split(':');

    if (parts.length > 3 || parts.length < 2) {
        throw 'Invalid time string';
    }

    this.hours = parseInt(parts[0], 10);
    this.minutes = parseInt(parts[1], 10);
    this.seconds = parseInt(parts[2] || '0', 10);
}

Frequency.prototype.next = function (start) {
    var date = new Date(+start);
    date.setHours(this.hours);
    date.setMinutes(this.minutes);
    date.setSeconds(this.seconds);

    if (date <= start) {
        date = new Date(+date + DAY);
    }

    return date;
};

Frequency.prototype.toString = function () {
    return [this.hours, this.minutes, this.seconds].map(function (part) {
            return String(part).length < 2 ? '0' + part : part;
        }).join(':');
};

module.exports = Frequency;
