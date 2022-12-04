const fs = require("fs");
const { performance } = require("perf_hooks");

const t0 = performance.now();

const rawData = fs.readFileSync("data.txt", "utf-8");
const data = rawData.split("\n");

const processEntries = (data) => {
    return data.map((element) => {
        const parts = element.split(/[,-]+/);
        return {
            elf1: {
                start: parseInt(parts[0]),
                end: parseInt(parts[1]),
            },
            elf2: {
                start: parseInt(parts[2]),
                end: parseInt(parts[3]),
            },
        };
    });
};

const containsRange = (range1, range2) => {
    if (range1.start >= range2.start && range1.end <= range2.end) return true;
    if (range2.start >= range1.start && range2.end <= range1.end) return true;
    return false;
};

const rangesOverlap = (range1, range2) => {
    return range1.start <= range2.end && range2.start <= range1.end;
};

const assignments = processEntries(data);

const resultPart1 = assignments.reduce((acc, assignment) => {
    if (containsRange(assignment.elf1, assignment.elf2)) acc += 1;
    return acc;
}, 0);

const resultPart2 = assignments.reduce((acc, assignment) => {
    if (rangesOverlap(assignment.elf1, assignment.elf2)) acc += 1;
    return acc;
}, 0);

const t1 = performance.now();

console.log("part 1:", resultPart1);
console.log("part 2:", resultPart2);

console.log(`Elapsed: ` + (t1 - t0));
