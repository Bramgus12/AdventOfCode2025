"use client";

import { useState } from "react";
import { completeChallenge2 } from "@/days/day-3/actions";
import Challenge from "@/components/challenge";
import z from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
const schema = z
    .string()
    .regex(/^(?:[0-9]+(?:,[0-9]+)*\r?\n?)+$/, { error: "Invalid file format" });

export default function Day3Challenge2() {
    const [fileState, setFileState] = useState<
        { isValid: false } | { isValid: true; content: string } | null
    >(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [challengeResult, setChallengeResult] = useState<number | null>(null);

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
        <Challenge
            onFileChange={(fileContent, isValid) => {
                if (!isValid || fileContent == null) {
                    setFileState({ isValid: false });
                    return;
                }
                setFileState({ isValid: true, content: fileContent });
            }}
            title={"Challenge 2"}
            description={
                "We now need to do the same as in challenge 1, but this time we have to create the largest number with 12 batteries in the pack instead of 2."
            }
            isLoading={isLoading}
            challengeResult={
                challengeResult != null ? `Result is: ${challengeResult}` : undefined
            }
            buttonLabel={"Run Challenge 2"}
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
                                    {`70237403918491\n82736487236487\n12345678909876\n`}
                                </pre>
                            </AlertDescription>
                        </Alert>
                    ) : null,
            }}
            onButtonClick={handleRunChallenge}
            schema={schema}
        />
    );
}
