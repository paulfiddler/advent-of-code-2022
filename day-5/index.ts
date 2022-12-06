const fs = require("fs");
const { performance } = require("perf_hooks");

const t0 = performance.now();

const stackCount = 9;

const rawData = fs.readFileSync("data.txt", "utf-8");
const data = rawData.split("\n");

const stacks: string[][] = [[], [], [], [], [], [],  [], [], [] ];
const moves = [];

const processEntries = (data) => {
    data.forEach((element, index) => {
        if (index < 8) {
            for (let i = 0; i < element.length; i += 4) {
                const crate = element.slice(i, i + 4);
                if (crate.trim().length > 0) {
                    stacks[i / 4].push(crate.trim());
                }
            }
        }

        if (index >= 10) {
            const parts = element.match(/\d+/g);
            moves.push({ crates: parts[0], from: parts[1], to: parts[2] });
        }
    });
};

const getTops = () => {
    stacks.forEach((stack) => {
        console.log(stack.at(0));
    });
};

const t1 = performance.now();

processEntries(data);

console.log(stacks.length);
console.log(moves);

// moves.forEach((move, index) => {
//   console.log("stacks - before", stacks);
//   for(let i = 0; i < move.crates ; i++) {
//     const crate = stacks[move.from-1].shift();
//     console.log('crate', crate)
//     stacks[move.to-1].unshift(crate);
//   }
//   console.log("stacks - after", stacks);
// })

const part2 = (stacks, moves) => {
  moves.forEach((move, index) => {
      console.log("stacks - before", stacks);
      const crates = stacks[move.from - 1].splice(0, move.crates);
      console.log("crate", crates);
      stacks[move.to - 1] = [...crates, ...stacks[move.to - 1], ];
  
      console.log("stacks - after", stacks);
  });
}

part2(stacks, moves);

getTops();

console.log(`Elapsed: ` + (t1 - t0));
