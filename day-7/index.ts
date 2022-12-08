const fs = require("fs");
const { performance } = require("perf_hooks");

const t0 = performance.now();

type FileType = {
    name: string;
    size: number;
};

type Directory = {
    name: string;
    files: FileType[];
    directories: Directory[];
    size: number;
    parent: Directory | null;
};

const root: Directory = {
    name: "/",
    files: [],
    directories: [],
    parent: null,
    size: 0,
};

let position = root;

const rawData = fs.readFileSync("data.txt", "utf-8");
const data = rawData.split("\n");

const processEntries = (data) => {
    data.forEach((element) => {
        const parts = element.split(" ");
        if (parts[0] === "$") {
            switch (parts[1]) {
                case "cd":
                    if (parts[2] === "/") {
                        position = root;
                        break;
                    }

                    if (parts[2] === "..") {
                        if (position.parent) {
                            position = position.parent;
                        }
                        break;
                    }
                    const findDirectory = position.directories.find(
                        (dir) => dir.name === parts[2]
                    );
                    if (!findDirectory) {
                        const newDirectory: Directory = {
                            name: parts[2],
                            files: [],
                            directories: [],
                            parent: position,
                            size: 0,
                        };
                        position.directories.push(newDirectory);
                        position = newDirectory;
                    } else {
                        position = findDirectory;
                    }
                    break;
                case "ls":
                    break;
                default:
            }
        } else {
            if (parts[0] === "dir") {
                position.directories.push({
                    name: parts[1],
                    files: [],
                    directories: [],
                    parent: position,
                    size: 0,
                });
            } else {
                position.files.push({
                    name: parts[1],
                    size: parseInt(parts[0]),
                });
            }
        }
    });
};

let total = 0;
const space = 70_000_000;
const required = 30_000_000;
const folders: Directory[] = [];

const outputTree = (node: Directory, depth: number = 0): void => {
    depth++;
    console.log("   ".repeat(depth), depth, node.name, node.size);
    node.directories.forEach((dir) => {
        outputTree(dir, depth);
    });
    node.files.forEach((file) => {
        console.log("   ".repeat(depth + 1), file.name, file.size);
    });
};

const processTree = (node: Directory): void => {
    node.directories.forEach((dir) => {
        processTree(dir);
    });
    const dirSize = node.directories.reduce(
        (acc, item) => (acc += item.size),
        0
    );
    const fileSize = node.files.reduce((acc, item) => (acc += item.size), 0);
    node.size = dirSize + fileSize;
};

processEntries(data);

processTree(root);
// outputTree(root);

const part1Result = (node: Directory) => {

    if (node.directories.length > 0) {
        node.directories.forEach((dir) => part1Result(dir));
    }
    if (node.size <= 100_000) total += node.size;
};

const spaceRemaining = space - root.size;
const minToDelete = required - spaceRemaining;
console.log("spaceRemaining", spaceRemaining);
console.log("minToDelete", minToDelete);

const part2Result = (node: Directory) => {
    if (node.directories.length > 0) {
        node.directories.forEach((dir) => part2Result(dir));
    }
    if (node.size >= minToDelete)
        folders.push(node);
};

part1Result(root);
part2Result(root);

console.log("part1Result", total);
console.log(
    "part2Result",
    folders.reduce(
        (acc, item) => (acc.size > item.size ? { name: item.name, size: item.size } : acc),
        { name: 'c', size: 9999999999999999 }
    )
);

const t1 = performance.now();

console.log(`Elapsed: ` + (t1 - t0));
