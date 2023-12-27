import { Puzzle, PuzzleIO } from "../puzzle";
import { Random } from "../random";
import { describe, expect, test } from "vitest";

describe("Puzzle", () => new Puzzle_SerialNumber().test());

test("exponent smaller than max safe integer", () => {
    for (let i = 1; i <= Puzzle_SerialNumber.maxFirstDigit; i++)
        for (let j = 1; j <= Puzzle_SerialNumber.maxLastDigit; j++)
            expect(Math.pow(i, j)).toBeLessThan(Number.MAX_SAFE_INTEGER);
});

// part one, one number is scratched off, should add all digits up to the product of first and last digit
// part two, zeros are treated as also scratched off, multiply all digits up to the exponent of first and last digit
// 2891~4af
export class Puzzle_SerialNumber extends Puzzle {
    static maxFirstDigit = 15;
    static maxLastDigit = 13;
    generatePuzzle(rng: Random): PuzzleIO {
        return { input: "", part1Solution: 0, part2Solution: 0 };
    }

    solvePart1(input: string): number {
        return 0;
    }

    solvePart2(input: string): number {
        return 0;
    }
}
