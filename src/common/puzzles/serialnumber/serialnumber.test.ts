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
    for (let index = 0; index < 5; index++) {
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
    const input: { s: number[]; o: number[] }[] = JSON.parse(readFileSync(__dirname + "/overlap.json", "utf-8"));

    const onlyOne1 = input.filter((v) => v.o[1] - v.s[1] < 2);
    const inputs = Puzzle_SerialNumber.shuffle(
        onlyOne1.map((v) => {
            const n = v.s
                .map((n, i) => n * i)
                .reduce((a, b) => a + b)
                .toString(16);
            let s = "~0";
            for (let i = 0; i < 16; i++) {
                s += i
                    .toString(16)
                    .repeat(
                        Math.min(v.s[i], v.o[i]) - (n[0] == i.toString(16) ? 1 : 0) - (n[1] == i.toString(16) ? 1 : 0)
                    );
            }

            return n[0] + Puzzle_SerialNumber.shuffle(s.split("")).join("") + n[1];
        })
    ).map((l, i) => i + 1 + ": " + l);
    writeFileSync(__dirname + "/input.txt", inputs.join("\n"));
});

// part one, one number is scratched off, should add all digits up to the product of first and last digit
// 10e7
// part two, zeros are treated as also scratched off, multiply all digits up to the exponent of first and last digit
// c162
export class Puzzle_SerialNumber extends Puzzle {
    static maxFirstDigit = 15;
    static maxLastDigit = 13;
    generatePuzzle(rng: Random): PuzzleIO {
        return { input: readFileSync(__dirname + "/input.txt", "utf-8"), part1Solution: 5127, part2Solution: 46969 };
    }

    // add up all scratched digits
    solvePart1(input: string): number {
        const scratched = [];
        for (let i of input.split("\n")) {
            const serial = i.split(": ")[1];
            const sum = parseInt(serial[0] + serial.at(-1)!, 16);
            scratched.push(
                sum -
                    serial
                        .split("")
                        .filter((c) => c != "~")
                        .map((n) => parseInt(n, 16))
                        .reduce((a, b) => a + b)
            );
        }
        return scratched.reduce((a, b) => a + b);
    }

    // how many parts could contain a 3
    solvePart2(input: string): number {
        const scratched = [];
        for (let i = 0; i < input.split("\n").length; i++) {
            const line = input.split("\n")[i].split(": ")[1];
            const exp = Math.pow(parseInt(line[0], 16), parseInt(line.at(-1)!, 16));
            const rest =
                exp /
                line
                    .split("")
                    .filter((c) => c != "~" && c != "0")
                    .map((n) => parseInt(n, 16))
                    .reduce((a, b) => a * b, 1);
            scratched.push((rest % 3 == 0 && rest < 0xf * 3) || line.includes("3") ? i + 1 : 0);
        }
        return scratched.reduce((a, b) => a + b);
    }

    static checkSerialNumberSum(serial: string) {
        const digits = serial.split("").map((c) => parseInt(c, 16));
        return digits.reduce((a, b) => a + b) == parseInt(serial[0] + serial.at(-1)!, 16);
    }

    static checkSerialNumberMul(serial: string) {
        const digits = serial.split("").map((c) => parseInt(c, 16));
        return digits.reduce((a, b) => a * b, 1) == Math.pow(digits[0], digits.at(-1)!);
    }

    static shuffle<T>(a: T[]) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
}
