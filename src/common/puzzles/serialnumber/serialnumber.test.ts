import { Puzzle, PuzzleIO } from "../puzzle";
import { Random } from "../random";
import { describe, expect, test } from "vitest";
import * as fs from "fs";
import { readFileSync } from "fs";
import { writeFileSync } from "node:fs";

describe("Puzzle", () => new Puzzle_SerialNumber().test());

test("exponent smaller than max safe integer", () => {
    for (let i = 1; i <= Puzzle_SerialNumber.maxFirstDigit; i++)
        for (let j = 1; j <= Puzzle_SerialNumber.maxLastDigit; j++)
            expect(Math.pow(i, j)).toBeLessThan(Number.MAX_SAFE_INTEGER);
});

test("generate sum and mul", () => {
    function getOverlapForLength(length: number, i: number, j: number) {
        function addDigit(start: number, end: number, sum: number, digits: number[], array: number[][][]) {
            const reduce = digits.reduce((a, b) => a + b);
            if (reduce > sum) return;
            if (digits.length < length) {
                for (let i = digits.length > 2 ? digits.at(-1)! : 1; i < 0x10; i++)
                    addDigit(start, end, sum, [...digits, i], array);
            } else {
                if (reduce == sum) {
                    const c: number[] = new Array(16).fill(0);
                    for (let i = 0; i < digits.length; i++) c[digits[i]]++;
                    array[0].push(c);
                }
            }
        }

        function addDigitMul(start: number, end: number, exp: number, digits: number[], array: number[][][]) {
            const reduce = digits.reduce((a, b) => a * b, 1);
            if (reduce > exp) return;
            if (digits.length < length) {
                for (let i = digits.length > 2 ? digits.at(-1)! : 1; i < 0x10; i++)
                    addDigitMul(start, end, exp, [...digits, i], array);
            } else {
                if (reduce == exp) {
                    const c: number[] = new Array(16).fill(0);
                    for (let i = 0; i < digits.length; i++) c[digits[i]]++;
                    array[1].push(c);
                }
            }
        }

        const overlap = [];
        const array: number[][][] = [[], []];
        addDigit(i, j, i * 0x10 + j, [i, j, 0], array);
        addDigitMul(i, j, Math.pow(i, j), [i, j], array);

        for (let x = 0; x < array[0].length; x++) {
            const overlapExp = array[1].filter((o) => {
                let overlap = 0;
                for (let i = 0; i < array[0][x].length; i++) {
                    overlap += Math.abs(array[0][x][i] - o[i]);
                }
                return overlap <= 4;
            });
            if (overlapExp.length > 0)
                overlap.push({
                    s: array[0][x].map((i) => i.toString(16)).join(""),
                    o: overlapExp.map((n) => n.map((i) => i.toString(16)).join(""))
                });
        }
        return overlap;
    }
    for (let index = 0; index < 100; index++) {
        fs.appendFileSync(__dirname + "/overlap.json", index + "\n");
        for (let i = 1; i < Puzzle_SerialNumber.maxFirstDigit; i++) {
            for (let j = 0; j < Puzzle_SerialNumber.maxLastDigit; j++) {
                const overlap = getOverlapForLength(index, i, j);
                if (overlap.length > 0)
                    fs.appendFileSync(
                        __dirname + "/overlap.json",
                        index + ", " + i + ", " + j + ": " + JSON.stringify(overlap, null, 4) + "\n"
                    );
            }
        }
    }
});

test("transform inputs", () => {
    const input: { s: number[]; o: number[][] }[] = JSON.parse(readFileSync(__dirname + "/overlap.json", "utf-8"));

    const inputs = input.flat();
    writeFileSync(__dirname + "/overlap2.json", JSON.stringify(inputs, null, 4));
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
