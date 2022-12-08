const fs = require("fs");
const { performance } = require("perf_hooks");
import { Grid } from "../lib/grid";

const t0 = performance.now();

const rawData = fs.readFileSync("data.txt", "utf-8");
const data = rawData.split("\n");

const processEntries = (data) => {
    return data.map((element) => {
        const parts = element.split("");
        const newParts = parts.map((part) => parseInt(part));
        return newParts;
    });
};

const trees: Grid = new Grid(processEntries(data));

const isVisible = (x, y) => {
    const tree = trees.cell(x, y);
    const left = trees.slice(0, y, 1, x).row(0);
    const right = trees.slice(x + 1, y, 1, trees.width - x - 1).row(0);
    const top = trees.slice(x, 0, y, 1).column(0);
    const bottom = trees.slice(x, y + 1, trees.height - y - 1, 1).column(0);

    return (
        !left.some((t) => t >= tree) ||
        !right.some((t) => t >= tree) ||
        !top.some((t) => t >= tree) ||
        !bottom.some((t) => t >= tree)
    );
};

let count = 0;
const edgeTreeCount = trees.width * 2 + (trees.height - 2) * 2;

for (let y = 1; y < trees.height - 1; y++) {
    for (let x = 1; x < trees.width - 1; x++) {
        if (isVisible(x, y)) count += 1;
    }
}

console.log("Part 1 result", count + edgeTreeCount);

const t1 = performance.now();
console.log(`Part 1: ${(t1 - t0).toFixed(2)}ms`);

const getScenicScore = (x, y) => {
    const tree = trees.cell(x, y);
    const left = trees.row(y).slice(0, x);
    const right = trees.row(y).slice(x + 1, trees.width);
    const top = trees.slice(x, 0, y, 1).column(0);
    const bottom = trees.slice(x, y + 1, trees.height - y - 1, 1).column(0);

    const leftSSValue = left.findLastIndex((t) => t >= tree);
    const rightSSValue = right.findIndex((t) => t >= tree);
    const topSSValue = top.findLastIndex((t) => t >= tree);
    const bottomSSValue = bottom.findIndex((t) => t >= tree);

    const leftSS = leftSSValue < 0 ? left.length : x - leftSSValue;
    const rightSS = rightSSValue < 0 ? right.length : rightSSValue + 1;
    const topSS = topSSValue < 0 ? top.length : y - topSSValue;
    const bottomSS = bottomSSValue < 0 ? bottom.length : bottomSSValue + 1;

    return leftSS * rightSS * topSS * bottomSS;
};

let maxSS = 0;

for (let y = 0; y < trees.width; y++) {
    for (let x = 0; x < trees.height; x++) {
        const ss = getScenicScore(x, y);
        if (ss > maxSS) maxSS = ss;
    }
}

console.log("part 2 result", maxSS);

const t2 = performance.now();

console.log(`Part 2: ${(t2 - t1).toFixed(2)}ms`);
console.log(`Total: ${(t2 - t0).toFixed(2)}ms`);
