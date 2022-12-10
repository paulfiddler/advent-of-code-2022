const fs = require("fs");
const { performance } = require("perf_hooks");
import { Grid } from "../lib/grid";

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const movePoint = (point, direction) => {
    switch (direction) {
        case "R":
            point.x += 1;
            break;
        case "L":
            point.x -= 1;
            break;
        case "U":
            point.y -= 1;
            break;
        case "D":
            point.y += 1;
            break;
    }
    return point;
};

const followPoint = (follow, point) => {
    const distance = Math.max(
        Math.abs(point.x - follow.x),
        Math.abs(point.y - follow.y)
    );
    if (distance > 1) {
        const dx = follow.x - point.x;
        point.x += Math.abs(dx) === 2 ? dx / 2 : dx;
        const dy = follow.y - point.y;
        point.y += Math.abs(dy) === 2 ? dy / 2 : dy;
    }
    return point;
};

const t0 = performance.now();

const rawData = fs.readFileSync("testData2.txt", "utf-8");
const data = rawData.split("\n");

const processEntries = (data) => {
    return data.map((element) => {
        const parts = element.split(" ");
        return {
            direction: parts[0],
            distance: parseInt(parts[1]),
        };
    });
};

const moves = processEntries(data);

const part1 = () => {
    let head: Point = { x: 0, y: 0 };
    let tail: Point = { x: 0, y: 0 };
    const visits = new Set();
    visits.add(`${tail.x}-${tail.y}`);

    for (const move of moves) {
        for (let i = 0; i < move.distance; i++) {
            head = movePoint(head, move.direction);
            tail = followPoint(head, tail);
            visits.add(`${tail.x}-${tail.y}`);
        }
    }

    return visits.size;
};

const part2 = () => {
    const knots = new Array(10).fill(0).map((_) => new Point(0, 0));

    const visits = new Set();
    visits.add(`0-0`);

    for (const move of moves) {
        for (let i = 0; i < move.distance; i++) {
            knots[0] = movePoint(knots[0], move.direction);

            for (let knot = 1; knot < knots.length; knot++) {
                let point = knots[knot];
                point = followPoint(point, knots[knot - 1]);
            }
            const tail = knots[knots.length - 1];
            visits.add(`${tail.x}-${tail.y}`);
        }
        console.log(knots);
    }

    return visits.size;
};

console.log(part2());

const t1 = performance.now();
console.log(`Part 1: ${(t1 - t0).toFixed(2)}ms`);

const t2 = performance.now();
console.log(`Part 2: ${(t2 - t1).toFixed(2)}ms`);
console.log(`Total: ${(t2 - t0).toFixed(2)}ms`);
