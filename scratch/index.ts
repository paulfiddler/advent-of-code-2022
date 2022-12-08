Array.prototype.windowed = function (size, callback) {
    const resultArray = [];
    for (let i = 0; i + size <= this.length; i++) {
        const window = this.slice(i, i + size);
        resultArray.push(callback(window, i));
    }
    return resultArray;
};

Array.prototype.sum = function () {
    return this.reduce((acc, item) => acc + item, 0);
};

Array.prototype.max = function () {
    return this.reduce((acc, item) => acc < item ? item : acc, -999999999);
};

Array.prototype.min = function () {
    return this.reduce((acc, item) => acc > item ? item : acc, 999999999999);
};

const x = [1, 2, 3, 4, 5];

x.windowed(2, (window, index) => console.log(window.sum()));
x.windowed(2, (window, index) => console.log(window.max()));
x.windowed(2, (window, index) => console.log(window.min()));
