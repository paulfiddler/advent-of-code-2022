const fs = require("fs");
const { performance } = require("perf_hooks");

const t0 = performance.now();

const rawData = fs.readFileSync("data.txt", "utf-8");
const data = rawData.split("\n");

const processEntries = (data) => {
    return data.map((element) => {
        const parts = element.split(" ");
        return {
            command: parts[0],
            value: parts[1] ? parseInt(parts[1]) : null,
        };
    });
};

const inputCommands = processEntries(data);

const commands = {
    addx: {
        cycles: 2,
        func: (value) => (x += value),
    },
    noop: {
        cycles: 1,
        func: (value) => {},
    },
};

let x = 1;
let clock = 0;

const output = [];

inputCommands.forEach((command, index) => {
  const { cycles, func } = commands[command.command];
  for (let i = 0; i < cycles; i++) {
    output.push({
      clock,
      x,
      command
    });
    clock += 1;
  }
  func(command.value);
});

const part1 = [20, 60, 100, 140, 180, 220].reduce((acc, item) => {
    const ss = item * output[item - 1].x;
    return (acc += ss);
}, 0);

console.log(part1);

const t1 = performance.now();
console.log(`Part 1: ${(t1 - t0).toFixed(2)}ms`);

let crt = "";

for(let i = 0; i < 240; i++) {
  if(output[i].x === (i % 40) || output[i].x - 1 === (i % 40) || output[i].x + 1 === (i % 40)) {
    crt += '#';
  } else {
    crt += '.';
  }
}

const drawLine = () => {
  const pixels = crt.slice(0, 40);
  crt = crt.slice(40);
  console.log(pixels);
}

drawLine();
drawLine();
drawLine();
drawLine();
drawLine();
drawLine();



const t2 = performance.now();
console.log(`Part 2: ${(t2 - t1).toFixed(2)}ms`);
console.log(`Total: ${(t2 - t0).toFixed(2)}ms`);
