Object.defineProperty(Array.prototype, "min", {
    value: function () {
        return this.reduce(
            (acc, item) => (acc > item ? item : acc),
            999999999999
        );
    },
});

Object.defineProperty(Array.prototype, "max", {
    value: function () {
        return this.reduce(
            (acc, item) => (acc < item ? item : acc),
            -999999999
        );
    },
});

Object.defineProperty(Array.prototype, "sum", {
    value: function () {
        return this.reduce((acc, item) => acc + item, 0);
    },
});

Object.defineProperty(Array.prototype, "windowed", {
    value: function (size, callback) {
        const resultArray = [];
        for (let i = 0; i + size <= this.length; i++) {
            const window = this.slice(i, i + size);
            resultArray.push(callback ? callback(window, i) : window);
        }
        return resultArray;
    },
});

Object.defineProperty(Array.prototype, "toSet", {
    value: function () {
        return new Set(this);
    },
});

Object.defineProperty(Array.prototype, "containsOnlyUnique", {
    value: function () {
        return this.toSet().size === this.length;
    },
});

