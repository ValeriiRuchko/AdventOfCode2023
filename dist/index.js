"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
let sumOfCalibration = 0;
let lines = [];
const regex = /[1-9]|one|two|three|four|five|six|seven|eight|nine/g;
let stringToNum = new Map();
stringToNum.set("one", 1);
stringToNum.set("two", 2);
stringToNum.set("three", 3);
stringToNum.set("four", 4);
stringToNum.set("five", 5);
stringToNum.set("six", 6);
stringToNum.set("seven", 7);
stringToNum.set("eight", 8);
stringToNum.set("nine", 9);
async function readAndPopulate(path) {
    const fileHandle = await (0, promises_1.open)(path);
    for await (let line of fileHandle.readLines({ encoding: "utf8" })) {
        lines.push(line);
    }
    fileHandle.close();
}
readAndPopulate("/Users/valeriiruchko/Projects/AdventOfCode/inputs/test2.txt").then(() => {
    console.log(lines.length);
    for (let i = 0; i < lines.length; i++) {
        let first = "";
        let last = "";
        let line = lines[i];
        let matched = line.match(regex);
        console.log("Line", line);
        console.log("Matched: ", matched);
        if (matched[0] !== null && matched[0].length === 1) {
            first = matched[0];
        }
        else {
            first = stringToNum.get(matched[0]);
        }
        if (matched[matched?.length - 1] !== null &&
            matched[matched?.length - 1].length === 1) {
            last = matched[matched?.length - 1];
        }
        else {
            last = stringToNum.get(matched[matched?.length - 1]);
        }
        console.log("First: ", first, "Last: ", last);
        let added = parseInt(`${first}${last}`);
        console.log("Added", added);
        sumOfCalibration += added;
    }
    console.log("SUUUUM", sumOfCalibration);
    console.log(lines.length);
});
//# sourceMappingURL=index.js.map