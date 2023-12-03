import { open } from "fs/promises";
const limits = {
    red: 12,
    green: 13,
    blue: 14,
};
const regex = /(\d+)|green|blue|red/g;
async function readAndPopulate(path) {
    let games = [];
    const fileHandle = await open(path);
    let sets = [];
    for await (let line of fileHandle.readLines({ encoding: "utf8" })) {
        sets.push(line.split(":").slice(1)[0].split(";"));
    }
    for (let i = 0; i < sets.length; i++) {
        let temp = {
            ID: i + 1,
            cubeSets: [],
        };
        for (let elem of sets[i]) {
            const res = elem.match(regex);
            let [color1, colorN1, color2, colorN2, color3, colorN3] = res;
            let newGame = {
                [`${colorN1}`]: color1,
                [`${colorN2}`]: color2,
                [`${colorN3}`]: color3,
            };
            temp.cubeSets.push(newGame);
        }
        games.push(temp);
    }
    fileHandle.close();
    return games;
}
export async function day2_part1(filename) {
    let sumOfIDs = 0;
    let games = await readAndPopulate(`/Users/valeriiruchko/Projects/AdventOfCode/inputs/${filename}.txt`);
    let possible = true;
    for (let i = 0; i < games.length; ++i) {
        for (let sets of games[i].cubeSets) {
            if (sets?.red > limits.red ||
                sets?.blue > limits.blue ||
                sets?.green > limits.green) {
                possible = false;
            }
        }
        if (possible) {
            sumOfIDs += games[i].ID;
        }
        else {
            possible = true;
        }
    }
    return sumOfIDs;
}
export async function day2_part2(filename) {
    let games = await readAndPopulate(`/Users/valeriiruchko/Projects/AdventOfCode/inputs/${filename}.txt`);
    let sumOfPowers = 0;
    for (let i = 0; i < games.length; ++i) {
        console.log(`GameID: ${games[i].ID}, sets: `);
        let redMax = 0;
        let greenMax = 0;
        let blueMax = 0;
        for (let set of games[i].cubeSets) {
            redMax = +set.red > +redMax ? set.red : redMax;
            blueMax = +set.blue > +blueMax ? set.blue : blueMax;
            greenMax = +set.green > +greenMax ? set.green : greenMax;
        }
        sumOfPowers += redMax * greenMax * blueMax;
    }
    return sumOfPowers;
}
day2_part2("day2").then((data) => {
    console.log("RES", data);
});
//# sourceMappingURL=day2.js.map