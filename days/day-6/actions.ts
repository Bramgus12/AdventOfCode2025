"use server";

function parseFileContentForChallenge1(
    fileContent: string,
): Array<{ operation: "multiply" | "add"; values: Array<number> }> {
    const lines = fileContent.split("\n").filter((line) => line.trim().length > 0);
    const mappedLinesAndValues = lines.map((line, index) => {
        const values = line
            .split(" ")
            .filter((value) => value.trim().length > 0)
            .map((value) => value.trim());
        if (index === lines.length - 1) {
            return values;
        }
        return values.map(Number);
    });

    return mappedLinesAndValues[0].map((_, index) => {
        const operation = mappedLinesAndValues[mappedLinesAndValues.length - 1][
            index
        ] as "*" | "+";
        const values = mappedLinesAndValues
            .map((line) => (typeof line[index] === "number" ? line[index] : null))
            .filter((value) => value != null);
        return {
            operation: operation === "*" ? ("multiply" as const) : ("add" as const),
            values: values,
        };
    });
}

export async function completeChallenge1(fileContent: string): Promise<number> {
    const parsedFile = parseFileContentForChallenge1(fileContent);

    return parsedFile.reduce((acc, curr) => {
        if (curr.operation === "add") {
            return acc + curr.values.reduce((a, b) => a + b, 0);
        }
        return acc + curr.values.reduce((a, b) => a * b, 1);
    }, 0);
}

function parseOperations(input: string): Array<{
    operator: string;
    maxNumberLength: number;
    position: number;
}> {
    const regex = /([+*]) ( *)/g;
    const operations: Array<{
        operator: string;
        maxNumberLength: number;
        position: number;
    }> = [];
    let match: RegExpExecArray | null;

    while ((match = regex.exec(input)) != null) {
        operations.push({
            operator: match[1],
            maxNumberLength: match[2].length + 1,
            position: match.index,
        });
    }

    operations[operations.length - 1].maxNumberLength =
        operations[operations.length - 1].maxNumberLength + 1;

    return operations;
}

function parseFileContentForChallenge2(
    fileContent: string,
): Array<{ operation: "multiply" | "add"; values: Array<number> }> {
    const lines = fileContent.split("\n").filter((line) => line.trim().length > 0);
    const operations = parseOperations(lines[lines.length - 1]);

    const mappedLinesAndValues = lines
        .filter((_, index) => index !== lines.length - 1)
        .map((line) => {
            return operations.map((op) => {
                return line
                    .slice(op.position, op.position + op.maxNumberLength)
                    .split("");
            });
        });

    return operations.map((op, index) => {
        const numbers = mappedLinesAndValues.reduce<Array<Array<string>>>(
            (acc, curr) => {
                acc.push(curr[index]);
                return acc;
            },
            [],
        );

        const result = numbers[0].map((_, arrIndex) => {
            return Number(
                numbers.reduce((str, curr) => str + curr[arrIndex], "").trim(),
            );
        });

        return {
            operation:
                op.operator === "*" ? ("multiply" as const) : ("add" as const),
            values: result,
        };
    });
}

export async function completeChallenge2(fileContent: string): Promise<number> {
    const parsedFile = parseFileContentForChallenge2(fileContent);

    return parsedFile.reduce((acc, curr) => {
        if (curr.operation === "add") {
            return acc + curr.values.reduce((a, b) => a + b, 0);
        }
        return acc + curr.values.reduce((a, b) => a * b, 1);
    }, 0);
}
