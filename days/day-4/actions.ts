"use server";

function parseMap(fileContent: string): Array<Array<"@" | ".">> {
    return fileContent
        .trim()
        .split("\n")
        .map((line) => line.split("")) as Array<Array<"@" | ".">>;
}

function getMarkedMap(map: Array<Array<"@" | ".">>): {
    newMap: Array<Array<"x" | "@" | ".">>;
    markedPositions: number;
} {
    const newMap = map.reduce<Array<Array<"x" | "@" | ".">>>(
        (acc, row, rowIndex) => {
            const newRow = row.reduce<Array<"x" | "@" | ".">>(
                (rowAcc, cell, colIndex) => {
                    if (cell === "@") {
                        // Check adjacent cells
                        const adjacentCells = [
                            [rowIndex - 1, colIndex], // Up
                            [rowIndex + 1, colIndex], // Down
                            [rowIndex, colIndex - 1], // Left
                            [rowIndex, colIndex + 1], // Right
                            [rowIndex - 1, colIndex - 1], // Up-Left
                            [rowIndex - 1, colIndex + 1], // Up-Right
                            [rowIndex + 1, colIndex - 1], // Down-Left
                            [rowIndex + 1, colIndex + 1], // Down-Right
                        ];
                        const hasAdjacentAtSymbol = adjacentCells.map(([r, c]) => {
                            return (
                                r >= 0 &&
                                r < map.length &&
                                c >= 0 &&
                                c < row.length &&
                                map[r][c] === "@"
                            );
                        });
                        if (hasAdjacentAtSymbol.filter(Boolean).length >= 4) {
                            return [...rowAcc, "@"];
                        }
                        return [...rowAcc, "x"];
                    }
                    return [...rowAcc, cell];
                },
                [],
            );
            return [...acc, newRow];
        },
        [],
    );

    const markedPositions = newMap.reduce((sum, row) => {
        return (
            sum +
            row.reduce((rowSum, cell) => {
                return rowSum + (cell === "x" ? 1 : 0);
            }, 0)
        );
    }, 0);

    return { newMap, markedPositions };
}

function filterOutMarkedPositions(
    map: Array<Array<"x" | "@" | ".">>,
): Array<Array<"@" | ".">> {
    return map.map((row) => row.map((cell) => (cell === "x" ? "." : cell))) as Array<
        Array<"@" | ".">
    >;
}

export async function completeChallenge1(
    fileContent: string,
): Promise<{ result: number; map: string }> {
    const map = parseMap(fileContent);

    const result = getMarkedMap(map);

    const resultMapString = result.newMap.map((row) => row.join("")).join("\n");

    return { result: result.markedPositions, map: resultMapString };
}

export async function completeChallenge2(
    fileContent: string,
): Promise<{ map: string; result: number }> {
    let currentMap = parseMap(fileContent);
    let totalMarked = 0;

    while (true) {
        const result = getMarkedMap(currentMap);
        totalMarked += result.markedPositions;

        if (result.markedPositions === 0) {
            const finalMap = filterOutMarkedPositions(result.newMap);
            const finalMapString = finalMap.map((row) => row.join("")).join("\n");
            return { result: totalMarked, map: finalMapString };
        }

        currentMap = filterOutMarkedPositions(result.newMap);
    }
}
