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

    setCell(x, y, value) {
        this.grid[y][x] = value;
        return;
    }

    setCells(x, y, h, w, value) {
        for(let i = x; i < x + h; i++) {
            for(let j = y; j < y + w; j++) {
                this.grid[j][i] = value;
            }
        }
        return;
    }

    slice(x, y, h, w) {
        const subGrid = [];
        for(let i = y; i < y + h; i++) {
            subGrid.push(this.grid[i].slice(x, x + w));
        }

        return new Grid(subGrid);
    }

    count(q) {
        return this.grid.reduce((acc, row) => {
            acc += row.reduce((acc2, cell) => {
                if(cell === q) acc2 += 1;
                    return acc2;
            }, 0)
            return acc;
        }, 0);
    }

    output() {
        this.grid.forEach(row => console.log(row))
    }
}
