"use client";

import { useState } from "react";
import { completeChallenge1 } from "@/days/day-3/actions";
import Challenge from "@/components/challenge";
import z from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
const schema = z
    .string()
    .regex(/^(?:[0-9]+(?:,[0-9]+)*\r?\n?)+$/, { error: "Invalid file format" });

export default function Day3Challenge1() {
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

        const result = await completeChallenge1(fileState.content);

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
            title={"Challenge 1"}
            description={
                "We get a list of batteriepacks, where every batterypack is on a new line and contains multiple batteries in it. We have to find the largest combination of two batteries inside of the pack and return them all together."
            }
            isLoading={isLoading}
            challengeResult={
                challengeResult != null ? `Result is: ${challengeResult}` : undefined
            }
            buttonLabel={"Run Challenge 1"}
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
