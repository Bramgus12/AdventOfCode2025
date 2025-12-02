"use client";

import Challenge from "@/components/challenge";
import { useState } from "react";
import z from "zod";
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { completeChallenge2 } from "@/days/day-2/actions";

const schema = z
    .string()
    .regex(/^\d+-\d+(?:,\d+-\d+)*,?(?:\r?\n)?$/, { error: "Invalid file format" });

export default function Day2Challenge2() {
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
            onFileChange={(content, isValid) => {
                if (!isValid || content == null) {
                    setFileState({ isValid: false });
                    return;
                }
                setFileState({ isValid: true, content });
            }}
            title="Challenge 2"
            description="Find repeating numbers inside of ID's, to find the invalid ID's. An invalid ID is one that has two increasing numbers in it. Like 123123 or 12121212. All the invalid numbers together is the answer."
            onButtonClick={handleRunChallenge}
            buttonDisabled={fileState == null || !fileState.isValid}
            challengeResult={
                challengeResult != null ? `Result is: ${challengeResult}` : undefined
            }
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
                                    {`12-34,56-78,90-12,34-56,78-90,2222239-3333323`}
                                </pre>
                            </AlertDescription>
                        </Alert>
                    ) : null,
            }}
            buttonLabel="Run Challenge 2"
            isLoading={isLoading}
            schema={schema}
        />
    );
}
