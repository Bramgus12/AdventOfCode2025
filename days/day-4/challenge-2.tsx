"use client";

import Challenge from "@/components/challenge";
import { useState } from "react";
import { completeChallenge2 } from "@/days/day-4/actions";
import z from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

const schema = z
    .string()
    .regex(/^[@.\n]+$/, {
        error: "Pattern can only contain @, ., and newline characters",
    })
    .refine(
        (value) => {
            const lines = value.split("\n");

            // Allow empty line at the end
            if (lines[lines.length - 1] === "") {
                lines.pop();
            }

            // Must have at least one line
            if (lines.length === 0) return false;

            const expectedLength = lines[0].length;

            // Check that expectedLength is greater than 0
            if (expectedLength === 0) return false;

            // Every line must be the same length
            return lines.every((line) => line.length === expectedLength);
        },
        {
            message: "All rows must be the same length",
        },
    );

export default function Day4Challenge2() {
    const [fileState, setFileState] = useState<
        { isValid: false } | { isValid: true; content: string } | null
    >(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [challengeResult, setChallengeResult] = useState<{
        result: number;
        map: string;
    } | null>(null);

    async function handleRunChallenge() {
        setIsLoading(true);
        if (fileState == null || !fileState.isValid) {
            console.error("Cannot run challenge: file is invalid");
            return;
        }

        const result = await completeChallenge2(fileState.content);

        setIsLoading(false);
        setChallengeResult(result);
    }

    return (
        <>
            <Challenge
                onFileChange={(fileContent, isValid) => {
                    if (!isValid || fileContent == null) {
                        setFileState({ isValid: false });
                        return;
                    }
                    setFileState({ isValid: true, content: fileContent });
                }}
                title={"Challenge 2"}
                isLoading={isLoading}
                slots={{
                    alert:
                        fileState?.isValid === false ? (
                            <Alert variant="destructive">
                                <AlertCircleIcon />
                                <AlertTitle className="font-sans">
                                    File does not have the right value.
                                </AlertTitle>
                                <AlertDescription className="font-sans">
                                    File needs to have content that looks like this:
                                    <pre className="mt-2 rounded bg-muted p-2 font-mono text-sm w-full">
                                        {`..@@.@@@@.\n@@@.@.@.@@\n@@@@@.@.@@\n@.@@@@..@.\n@@.@@@@.@@\n.@@@@@@@.@\n.@.@.@.@@@\n@.@@@.@@@@\n.@@@@@@@@.\n@.@.@@@.@.`}
                                    </pre>
                                </AlertDescription>
                            </Alert>
                        ) : null,
                }}
                challengeResult={
                    challengeResult != null
                        ? `Challenge result: ${challengeResult.result}`
                        : undefined
                }
                buttonLabel={"Run Challenge 2"}
                buttonDisabled={fileState == null || !fileState.isValid}
                description={
                    "Do the same as challenge 1, after the rolls are found, remove those rolls and keep repeating the process until no new rolls can be found. Return the final map and the total number of removed rolls."
                }
                onButtonClick={handleRunChallenge}
                schema={schema}
            />
            {challengeResult == null ? null : (
                <Alert variant="default">
                    <AlertCircleIcon />
                    <AlertTitle className="font-sans">
                        Challenge completed with this map as a result:
                    </AlertTitle>
                    <AlertDescription className="font-sans">
                        <pre className="mt-2 rounded bg-muted p-2 font-mono text-sm w-full overflow-x-auto">
                            {challengeResult.map}
                        </pre>
                    </AlertDescription>
                </Alert>
            )}
        </>
    );
}
