import { open } from "fs/promises";

let sumOfCalibration = 0;
let lines: string[] = [];
// have to handle cases like oneight

const regex = /[1-9]|one|two|three|four|five|six|seven|eight|nine/g;
const replaceable =
  /twone|threeight|oneight|fiveight|sevenine|eightwo|eighthree|nineight/g;

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

async function readAndPopulate(path: string) {
  const fileHandle = await open(path);

  for await (let line of fileHandle.readLines({ encoding: "utf8" })) {
    lines.push(line);
  }

  fileHandle.close();
}

export async function day1(filename: string): Promise<number> {
  await readAndPopulate(
    `/Users/valeriiruchko/Projects/AdventOfCode/inputs/${filename}.txt`,
  );

  console.log(lines.length);

  for (let i = 0; i < lines.length; i++) {
    let first = "",
      last = "";
    // let firstSet = false;

    let line = lines[i];

    let replaced = line.replace(replaceable, (match): string => {
      let toReplace = match.match(regex)!;
      let replacement = "";
      replacement = toReplace + toReplace[0][toReplace[0].length - 1];
      // console.log("AAAAAAA", toReplace, " -- ", match, " -- ", replacement);
      let res = replacement + match.slice(toReplace[0].length);
      return res;
    });
    // console.log("FUCK @#", replaced);
    let matched = replaced.match(regex)!;
    console.log("Line", line);
    console.log("Matched: ", matched);

    if (matched[0] !== null && matched[0].length === 1) {
      first = matched[0];
    } else {
      first = stringToNum.get(matched[0]);
    }

    if (
      matched[matched?.length - 1] !== null &&
      matched[matched?.length - 1].length === 1
    ) {
      last = matched[matched?.length - 1];
    } else {
      last = stringToNum.get(matched[matched?.length - 1]);
    }

    console.log("First: ", first, "Last: ", last);

    // console.log(
    //   "First and last of matched: ",
    //   matched[0],
    //   "---",
    //   matched[matched?.length - 1],
    // );
    // console.log("What we add to arr", first, last);

    // ----- solution for first part of the challenge
    // for (let i = 0; i < line?.length; i++) {
    //   if (line.charCodeAt(i) >= 48 && line.charCodeAt(i) <= 57) {
    //     if (!firstSet) {
    //       first = line[i];
    //       firstSet = true;
    //     }
    //     last = line[i];
    //   }
    // }
    // ---------

    let added = parseInt(`${first}${last}`);
    console.log("Added", added);
    sumOfCalibration += added;
  }

  console.log("SUUUUM", sumOfCalibration);
  console.log(lines.length);

  return sumOfCalibration;
}

// console.log(day1("day1"));
