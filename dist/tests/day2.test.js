import { expect, test } from "vitest";
import { day2_part1, day2_part2 } from "../day2.js";
test("Day2_part1, file day2_test.txt:", async () => {
    expect(await day2_part1("day2_test")).toBe(8);
});
test("Day2_part1, file day2.txt:", async () => {
    expect(await day2_part1("day2")).toBe(2348);
});
test("Day2_part2, file day2_test2.txt:", async () => {
    expect(await day2_part2("day2_test2")).toBe(2286);
});
//# sourceMappingURL=day2.test.js.map