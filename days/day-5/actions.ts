"use server";

function parseInput(fileContent: string): {
    ranges: Array<[number, number]>;
    ids: Array<number>;
} {
    const [rangesSection, idsSection] = fileContent.trim().split("\n\n");

    const ranges = rangesSection.split("\n").map((line) => {
        const [start, end] = line.split("-").map(Number);
        return [start, end] as [number, number];
    });

    const ids = idsSection.split("\n").map(Number);

    return { ranges, ids };
}

function isIdInARange(id: number, ranges: Array<[number, number]>): boolean {
    return ranges.some(([start, end]) => id >= start && id <= end);
}

export async function completeChallenge1(fileContent: string): Promise<number> {
    const { ranges, ids } = parseInput(fileContent);

    return ids.reduce((count, id) => {
        if (isIdInARange(id, ranges)) {
            return count + 1;
        }
        return count;
    }, 0);
}
// This is better code, but does not work as the Set cannot be that big.
//
// export async function completeChallenge2(fileContent: string): Promise<number> {
//     const { ranges } = parseInput(fileContent);
//
//     return ranges.reduce((total, [start, end]) => {
//         for (let id = start; id <= end; id++) {
//             total.add(id);
//         }
//         return total;
//     }, new Set<number>()).size;
// }

export async function completeChallenge2(fileContent: string): Promise<number> {
    const { ranges } = parseInput(fileContent);

    const sorted = ranges.sort((a, b) => a[0] - b[0]);

    const merged: Array<[number, number]> = [];
    let [currentStart, currentEnd] = sorted[0];

    for (let i = 1; i < sorted.length; i++) {
        const [start, end] = sorted[i];

        if (start <= currentEnd + 1) {
            currentEnd = Math.max(currentEnd, end);
        } else {
            merged.push([currentStart, currentEnd]);
            currentStart = start;
            currentEnd = end;
        }
    }

    merged.push([currentStart, currentEnd]);

    return merged.reduce((total, [start, end]) => total + (end - start + 1), 0);
}
