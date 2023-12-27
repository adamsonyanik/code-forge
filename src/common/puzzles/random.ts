import seedrandom from "seedrandom";

export type Random = {
    float: () => number;
    double: () => number;
    int: () => number;
    quick: () => number;
};

export const random = (seed: string): Random => {
    const rng = seedrandom(seed);

    return {
        float: () => rng(),
        double: () => rng.double(),
        int: () => rng.int32(),
        quick: () => rng.quick()
    };
};
