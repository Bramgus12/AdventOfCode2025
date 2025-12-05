"use server";

type Range = {
    min: number;
    max: number;
};

function checkRangeChallenge1(range: Range): Array<number> {
    let results: Array<number> = [];
    for (let i = range.min; i <= range.max; i++) {
        if (i.toString().length % 2 !== 0) {
            continue;
        }
        const numberArray = i.toString().split("");
        const number1 = Number(
            numberArray.slice(0, numberArray.length / 2).join(""),
        );
        const number2 = Number(numberArray.slice(numberArray.length / 2).join(""));
        if (Number(number1) === Number(number2)) {
            results.push(i);
        }
    }

    return results;
}

function checkRangeChallenge2(range: Range): Array<number> {
    let results: Array<number> = [];
    for (let i = range.min; i <= range.max; i++) {
        const str = i.toString();
        const len = str.length;

        let isRepeated = false;
        for (let seqLen = 1; seqLen <= Math.floor(len / 2); seqLen++) {
            if (len % seqLen !== 0) continue;

            const pattern = str.slice(0, seqLen);
            const repetitions = len / seqLen;

            // Check if pattern itself is not made of smaller repeated sequences
            let patternIsRepeated = false;
            for (let pLen = 1; pLen <= Math.floor(seqLen / 2); pLen++) {
                if (seqLen % pLen === 0) {
                    const subPattern = pattern.slice(0, pLen);
                    if (subPattern.repeat(seqLen / pLen) === pattern) {
                        patternIsRepeated = true;
                        break;
                    }
                }
            }

            if (
                !patternIsRepeated &&
                repetitions >= 2 &&
                pattern.repeat(repetitions) === str
            ) {
                isRepeated = true;
                break;
            }
        }

        if (isRepeated) {
            results.push(i);
        }
    }
    return results;
}

function getRanges(fileContent: string): Array<Range> {
    return fileContent
        .trim()
        .split(",")
        .map((rangeStr) => {
            const [min, max] = rangeStr.split("-").map((s) => Number(s));
            return { min, max };
        });
}

export async function completeChallenge1(fileContent: string): Promise<number> {
    const ranges = getRanges(fileContent);

    return ranges.reduce((acc, range) => {
        const numbers = checkRangeChallenge1(range);
        const rangeResult = numbers.reduce(
            (aggregate, number) => number + aggregate,
            0,
        );
        return acc + rangeResult;
    }, 0);
}

export async function completeChallenge2(fileContent: string): Promise<number> {
    const ranges = getRanges(fileContent);

    return ranges.reduce((acc, range) => {
        const numbers = checkRangeChallenge2(range);
        const rangeResult = numbers.reduce(
            (aggregate, number) => number + aggregate,
            0,
        );
        return acc + rangeResult;
    }, 0);
}
