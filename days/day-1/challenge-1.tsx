"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";
import { completeFirstChallenge } from "./actions";
import z from "zod";
import Challenge from "@/components/challenge";

const fileContentSchema = z
    .string()
    .regex(/^(?:[RL]\d+\n)*[RL]\d+\n?$/, "Invalid file format");

export default function Challenge1() {
    const [fileState, setFileState] = useState<
        | {
              fileContent: string;
              isValid: true;
          }
        | { isValid: false }
        | null
    >(null);

    const [challengeResult, setChallengeResult] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function handleRunChallenge() {
        if (fileState == null || !fileState.isValid) {
            console.error("Cannot run challenge: file is invalid");
            return;
        }

        setIsLoading(true);

        const result = await completeFirstChallenge(fileState.fileContent);

        setChallengeResult(result);
        setIsLoading(false);
    }

    return (
        <>
            <Challenge
                onFileChange={(content, isValid) => {
                    if (content == null || !isValid) {
                        setFileState({ isValid: false });
                        return;
                    }
                    setFileState({ fileContent: content, isValid: true });
                }}
                title="Challenge 1"
                description={`Starting at location 50 on a circular track of 100 positions (0-99),
                follow the movement instructions in the uploaded file. Each
                instruction indicates a turn direction (L for left, R for right) and
                the number of steps to move. Count how many times you land on
                position 0 after executing all instructions.`}
                onButtonClick={handleRunChallenge}
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
                                        {`R75\nL30\nR83\nL12\nR49\nL71\n`}
                                    </pre>
                                </AlertDescription>
                            </Alert>
                        ) : null,
                }}
                schema={fileContentSchema}
                isLoading={isLoading}
                buttonDisabled={fileState == null || !fileState.isValid}
                buttonLabel="Run Challenge 1"
                challengeResult={
                    challengeResult != null
                        ? `Challenge 1 Result: ${challengeResult}`
                        : undefined
                }
            />
        </>
    );
}
