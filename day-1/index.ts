// @ts-ignore 
import * as fs from 'fs';
// @ts-ignore 
import { performance } from "perf_hooks";

const t0 = performance.now();

const rawData = fs.readFileSync("data.txt", "utf-8");
const data = rawData.split("\n");

const totals: number[] = [];
let subTotal = 0;

data.forEach((entry) => {
  if(entry) {
    subTotal += parseInt(entry)
  } else {
    totals.push(subTotal);
    subTotal = 0;
  }
  totals.push(subTotal);
})

const sorted = totals.sort((a, b) => b - a);

console.log('max', sorted[0])

// Part 2

console.log('max3', sorted[0] + sorted[1] + sorted[2])

const t1 = performance.now();

console.log(`Elapsed: ` + (t1 - t0));