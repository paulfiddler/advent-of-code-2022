const fs = require("fs");
const { performance } = require("perf_hooks");

type RuckSack = {
    a: string;
    b: string;
}

const priorityListInput =
    " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const priorityList = priorityListInput.split("");

const t0 = performance.now();

const rawData = fs.readFileSync("data.txt", "utf-8");
const data = rawData.split("\n");

const processEntries = (data: string[]): RuckSack[] => {
    return data.map((element) => {
        return {
            a: element.substr(0, element.length / 2),
            b: element.substr(element.length / 2, element.length / 2),
        };
    });
};

const ruckSacks = processEntries(data);

const getCommonLetter = (word1: string, word2: string) => {
    const splitWord = word2.split("");
    for (let i = 0; i < word1.length; i++) {
        if (splitWord.includes(word1.charAt(i))) return word1.charAt(i);
    }
};

const getCommonLetterInGroup = (group: RuckSack[]): string | undefined => {
    for (let i = 0; i < priorityList.length; i++) {
        if (
            (group[0].a.includes(priorityList[i]) ||
                group[0].b.includes(priorityList[i])) &&
            (group[1].a.includes(priorityList[i]) ||
                group[1].b.includes(priorityList[i])) &&
            (group[2].a.includes(priorityList[i]) ||
                group[2].b.includes(priorityList[i]))
        ) {
            return priorityList[i];
        }
    }
};

const items = ruckSacks.map((rucksack) =>
    getCommonLetter(rucksack.a, rucksack.b)
);

const result = items.reduce((acc, item) => {
    const value = priorityList.findIndex((listItem) => listItem === item);
    return acc + value;
}, 0);


const chunkArray = <T>(array: Array<T>, chunkSize: number = 3): Array<Array<T>> => {
    let chunks = [];
    
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }

    console.log('chunks', chunks)
    return chunks;
}

const chunks = chunkArray<RuckSack>(ruckSacks, 3);

const result2 = chunks.reduce((acc, item) => {
    const value = priorityList.findIndex(
        (listItem) => listItem === getCommonLetterInGroup(item)
    );
    return acc + value;
}, 0);

const t1 = performance.now();

console.log(result);
console.log(result2);
console.log(`Elapsed: ` + (t1 - t0));
