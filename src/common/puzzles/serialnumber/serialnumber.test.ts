import { Puzzle, PuzzleIO } from "../puzzle";
import { Random } from "../random";
import { describe, expect, test } from "vitest";

describe("Puzzle", () => new Puzzle_SerialNumber().test());

test("exponent smaller than max safe integer", () => {
    for (let i = 1; i <= Puzzle_SerialNumber.maxFirstDigit; i++)
        for (let j = 1; j <= Puzzle_SerialNumber.maxLastDigit; j++)
            expect(Math.pow(i, j)).toBeLessThan(Number.MAX_SAFE_INTEGER);
});

test("small example", () => {
    const min = 0x100000;
    const max = 0x1000000;
    const allNumbers: string[] = new Array(max).fill("");
    for (let i = 0; i < allNumbers.length; i++) allNumbers[i] = i.toString(16);
    const numbers = allNumbers.slice(min).filter((n) => {
        for (let i = 1; i < n.length - 2; i++) if (n[i] >= n[i + 1]) return false;
        return true;
    });

    //console.log(numbers);

    //const sumNumbers = numbers.filter((n) => Puzzle_SerialNumber.checkSerialNumberSum(n));
    //const sumNumbersWithOne0 = sumNumbers.filter((n) => n.split("").filter((c) => c == "0").length == 1);

    //const mulNumbers = numbers.filter((n) => Puzzle_SerialNumber.checkSerialNumberMul(n));

    //console.log(sumNumbersWithOne0);
    //console.log(mulNumbers);
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

    static checkSerialNumberSum(serial: string) {
        const digits = serial.split("").map((c) => parseInt(c, 16));
        return digits.reduce((a, b) => a + b) == parseInt(serial[0] + serial.at(-1)!, 16);
    }

    static checkSerialNumberMul(serial: string) {
        const digits = serial.split("").map((c) => parseInt(c, 16));
        return digits.reduce((a, b) => a * b, 1) == Math.pow(digits[0], digits.at(-1)!);
    }
}
