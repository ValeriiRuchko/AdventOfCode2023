import { expect, test } from "vitest";
import { day1 } from "../day1.js";
test("Day1, file test2.txt:", async () => {
    expect(await day1("day1_test2")).toBe(281);
});
test("Day1, file test.txt:", async () => {
    expect(await day1("day1_test")).toBe(175);
});
//# sourceMappingURL=day1.test.js.map