"use server";

function turnChallenge2(
    currentLocation: number,
    steps: number,
    direction: "left" | "right",
): { newLocation: number; zerosCounted: number } {
    let newLocation = currentLocation;
    let zerosCounted = 0;
    if (direction === "left") {
        for (let i = 0; i < steps; i++) {
            newLocation--;
            if (newLocation < 0) {
                newLocation = 99;
            }
            if (newLocation === 0) {
                zerosCounted++;
            }
        }
        return { newLocation, zerosCounted };
    }
    for (let i = 0; i < steps; i++) {
        newLocation++;
        if (newLocation > 99) {
            newLocation = 0;
        }
        if (newLocation === 0) {
            zerosCounted++;
        }
    }
    return { newLocation, zerosCounted };
}

function turnChallenge1(
    currentLocation: number,
    steps: number,
    direction: "left" | "right",
): number {
    let newLocation = currentLocation;
    if (direction === "left") {
        for (let i = 0; i < steps; i++) {
            newLocation--;
            if (newLocation < 0) {
                newLocation = 99;
            }
        }
        return newLocation;
    }
    for (let i = 0; i < steps; i++) {
        newLocation++;
        if (newLocation > 99) {
            newLocation = 0;
        }
    }
    return newLocation;
}

type Instruction = {
    direction: "left" | "right";
    value: number;
};

function parseFileContent(fileContent: string): Instruction[] {
    return fileContent
        .split("\n")
        .filter((line) => line.length > 0)
        .map((line) => {
            const direction =
                line.charAt(0) === "L" ? ("left" as const) : ("right" as const);
            const value = parseInt(line.slice(1), 10);
            return { direction, value };
        });
}

export async function completeFirstChallenge(fileContent: string): Promise<number> {
    "use cache";
    const instructions = parseFileContent(fileContent);

    const result = instructions.reduce<{
        currentLocation: number;
        zerosCount: number;
    }>(
        (acc, instruction) => {
            const newLocation = turnChallenge1(
                acc.currentLocation,
                instruction.value,
                instruction.direction,
            );

            if (newLocation === 0) {
                return {
                    currentLocation: newLocation,
                    zerosCount: acc.zerosCount + 1,
                };
            }

            return { currentLocation: newLocation, zerosCount: acc.zerosCount };
        },
        { currentLocation: 50, zerosCount: 0 },
    );

    return result.zerosCount;
}

export async function completeSecondChallenge(fileContent: string): Promise<number> {
    "use cache";
    const instructions = parseFileContent(fileContent);

    const result = instructions.reduce<{
        currentLocation: number;
        zerosCount: number;
    }>(
        (acc, instruction) => {
            const { newLocation, zerosCounted } = turnChallenge2(
                acc.currentLocation,
                instruction.value,
                instruction.direction,
            );
            return {
                currentLocation: newLocation,
                zerosCount: acc.zerosCount + zerosCounted,
            };
        },
        { currentLocation: 50, zerosCount: 0 },
    );

    return result.zerosCount;
}
