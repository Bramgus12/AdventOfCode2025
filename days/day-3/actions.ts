"use server";

function getBatteryPacks(fileContent: string): Array<Array<number>> {
    return fileContent
        .trim()
        .split("\n")
        .map((block) => block.split("").map((numStr) => Number(numStr)));
}

function getLargestCombinationForChallenge1(batteryPack: Array<number>): number {
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

function findNextNumber(
    allNumbers: Array<number>,
    lastNumberIndex: number,
    numbersStillNeeded: number,
): { index: number; value: number } {
    let currentHighest = -1;
    let currentHighestIndex = -1;

    const slicedArray = allNumbers.slice(
        lastNumberIndex + 1,
        allNumbers.length - numbersStillNeeded,
    );

    slicedArray.forEach((num, index) => {
        if (num > currentHighest) {
            currentHighest = num;
            currentHighestIndex = index + lastNumberIndex + 1;
        }
    });

    return { index: currentHighestIndex, value: currentHighest };
}

function getLargestCombinationForChallenge2(batteryPack: Array<number>): number {
    const largestNumber = batteryPack.reduce<{
        lastNumberIndex: number;
        result: string;
    }>(
        (acc, _, index) => {
            console.log(acc);

            if (acc.result.length >= 12) {
                return acc;
            }

            if (index === 0) {
                const firstNumberData = findNextNumber(batteryPack, -1, 11);
                return {
                    lastNumberIndex: firstNumberData.index,
                    result: `${firstNumberData.value}`,
                };
            } else {
                const nextNumberData = findNextNumber(
                    batteryPack,
                    acc.lastNumberIndex,
                    12 - (acc.result.length + 1),
                );
                return {
                    lastNumberIndex: nextNumberData.index,
                    result: `${acc.result}${nextNumberData.value}`,
                };
            }
        },
        { lastNumberIndex: -1, result: "" },
    );

    console.log(largestNumber);

    return Number(largestNumber.result);
}

export async function completeChallenge1(fileContent: string): Promise<number> {
    const batteryPacks = getBatteryPacks(fileContent);

    return batteryPacks.reduce((acc, pack) => {
        const largestCombination = getLargestCombinationForChallenge1(pack);
        return acc + largestCombination;
    }, 0);
}

export async function completeChallenge2(fileContent: string): Promise<number> {
    const batteryPacks = getBatteryPacks(fileContent);

    return batteryPacks.reduce((acc, pack) => {
        const largestCombination = getLargestCombinationForChallenge2(pack);
        return acc + largestCombination;
    }, 0);
}
