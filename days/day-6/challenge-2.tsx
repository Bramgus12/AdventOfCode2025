"use client";

import Challenge from "@/components/challenge";
import { useState } from "react";
import z from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { completeChallenge2 } from "@/days/day-6/actions";

const schema = z.string();

export default function Day6Challenge2() {
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
            title={"Challenge 1"}
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
                                    {`123 328  51 64 \n 45 64  387 23 \n  6 98  215 314\n*   +   *   +  `}
                                </pre>
                            </AlertDescription>
                        </Alert>
                    ) : null,
            }}
            challengeResult={
                challengeResult != null
                    ? `Challenge result: ${challengeResult}`
                    : undefined
            }
            buttonLabel={"Run Challenge 2"}
            buttonDisabled={fileState == null || !fileState.isValid}
            description={
                "Do all the math operations in the file and return the final result. Now in a different way. The numbers are represented vertically instead of horizontally"
            }
            onButtonClick={handleRunChallenge}
            schema={schema}
        />
    );
}
