export class Grid {
    constructor(data) {
        this.grid = data;
    }

    get width() {
        return this.grid[0].length;
    }

    get height() {
        return this.grid.length;
    }

    get value() {
        return this.grid;
    }

    row(y) {
        return this.grid[y];
    }

    column(x) {
        return this.grid.map((row) => row[x]);
    }

    cell(x, y) {
        return this.grid[y][x];
    }

    slice(x, y, h, w) {
        const subGrid = [];
        for(let i = y; i < y + h; i++) {
            subGrid.push(this.grid[i].slice(x, x + w));
        }

        return new Grid(subGrid);
    }

    output() {
        this.grid.forEach(row => console.log(row))
    }
}
