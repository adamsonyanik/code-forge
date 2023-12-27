import { random, Random } from "./random";
import { describe, expect, test } from "vitest";

export type PuzzleIO = { input: string; part1Solution: number; part2Solution: number };

export abstract class Puzzle {
    protected abstract generatePuzzle(rng: Random): { input: string; part1Solution: number; part2Solution: number };
    abstract solvePart1(input: string): number;
    abstract solvePart2(input: string): number;

    generateInput(seed: string): PuzzleIO {
        return this.generatePuzzle(random(seed));
    }

    test() {
        describe(this.constructor.name.substring(7), () => {
            const generatedPuzzles: PuzzleIO[] = [];
            for (const i of [1, 2, 3, 4]) generatedPuzzles.push(this.generateInput(this.constructor.name + i));

            describe("Part 1", () => {
                for (const [i, puzzle] of generatedPuzzles.entries())
                    test(String(i + 1), () =>
                        expect(this.solvePart1(this.constructor.name + (i + 1))).toBe(puzzle.part1Solution)
                    );
            });

            describe("Part 2", () => {
                for (const [i, puzzle] of generatedPuzzles.entries())
                    test(String(i + 1), () =>
                        expect(this.solvePart2(this.constructor.name + (i + 1))).toBe(puzzle.part2Solution)
                    );
            });
        });
    }
}
