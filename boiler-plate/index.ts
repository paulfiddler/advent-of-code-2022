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


  
  console.log(processEntries(data))

const t1 = performance.now();
console.log(`Part 1: ${(t1 - t0).toFixed(2)}ms`);

const t2 = performance.now();
console.log(`Part 2: ${(t2 - t1).toFixed(2)}ms`);
console.log(`Total: ${(t2 - t0).toFixed(2)}ms`);