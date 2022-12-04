const fs = require("fs");
const { performance } = require("perf_hooks");

const t0 = performance.now();

const rawData = fs.readFileSync("testData.txt", "utf-8");
const data = rawData.split("\n");

const processEntries = (data) => {
    return data.map((element) => {
      const parts = element.split(" ");
      return {
        a: parts[0],
      };
    });
  };


const t1 = performance.now();

console.log(processEntries(data))
console.log(`Elapsed: ` + (t1 - t0));