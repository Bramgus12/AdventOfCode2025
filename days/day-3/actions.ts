"use server";

function getBatteryPacks(fileContent: string): Array<Array<number>> {
    return fileContent
        .trim()
        .split("\n")
        .map((block) => block.split("").map((numStr) => Number(numStr)));
}

function getLargestCombination(batteryPack: Array<number>): number {
    let currentHighestCombination = 0;
    batteryPack.forEach((firstBattery, index) => {
        batteryPack.slice(index + 1).forEach((secondBattery) => {
            const combination = Number(`${firstBattery}${secondBattery}`);
            if (combination > currentHighestCombination) {
                currentHighestCombination = combination;
            }
        });
    });
    return currentHighestCombination;
}

export async function completeChallenge1(fileContent: string): Promise<number> {
    const batteryPacks = getBatteryPacks(fileContent);

    return batteryPacks.reduce((acc, pack) => {
        const largestCombination = getLargestCombination(pack);
        return acc + largestCombination;
    }, 0);
}
