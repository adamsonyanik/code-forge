import {Puzzle, PuzzleIO} from "../puzzle";
import {Random} from "../random";
import {describe, expect, test} from "vitest";

describe("Puzzle", () => new Puzzle_SerialNumber().test());

test("exponent smaller than max safe integer", () => {
    for (let i = 1; i <= Puzzle_SerialNumber.maxFirstDigit; i++)
        for (let j = 1; j <= Puzzle_SerialNumber.maxLastDigit; j++)
            expect(Math.pow(i, j)).toBeLessThan(Number.MAX_SAFE_INTEGER);
});

test("small example", () => {
    const sums = [];
    const expos = [];
    function addDigit(start: number, end: number, sum: number, digits: number[]){
        if (digits.length < 9){
            for (let i = digits.length > 2 ? digits.at(-1)! : 1; i < 16; i++) addDigit(start, end, sum, [...digits, i]);
        } else {
            const reduce = digits.reduce((a,b) => a+b);
            if (reduce == sum) {
                sums.push(digits.map(n => n.toString(16)).join(""));
            }
        }
    }
    function addDigitMul(start: number, end: number, exp: number, digits: number[]){
        if (digits.length < 9){
            for (let i = digits.length > 2 ? digits.at(-1)! : 1; i < 16; i++) addDigitMul(start, end, exp, [...digits, i]);
        } else {
            const reduce = digits.reduce((a,b) => a*b, 1);
            if (reduce == exp) {
                expos.push(digits.map(n => n.toString(16)).join(""));
            }
        }
    }
    for (let i = 0; i < 0xf; i++) {
        for (let j = 0; j < 0xf; j++) {
            //addDigit(i, j, i * 16 + j, [i,j]);
            addDigitMul(i, j, Math.pow(i,j), [i,j]);
        }
    }

    console.log(expos);
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
