"use client";

import Challenge from "@/components/challenge";
import { useState } from "react";
import z from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { completeChallenge2 } from "@/days/day-5/actions";

const schema = z.string().refine((value) => {
    const sections = value.split("\n\n");

    if (sections.length !== 2) {
        return false;
    }

    const rangeLines = sections[0].split("\n");
    const idLines = sections[1].split("\n").filter((id) => id.trim().length > 0);

    const rangeRegex = /^\d+-\d+$/;
    const idRegex = /^\d+$/;

    // Validate range lines
    for (const line of rangeLines) {
        if (!rangeRegex.test(line.trim())) {
            return false;
        }
        const [start, end] = line.split("-").map(Number);
        if (start > end) {
            return false;
        }
    }

    // Validate ID lines
    for (const line of idLines) {
        if (!idRegex.test(line.trim())) {
            return false;
        }
    }

    return true;
});

export default function Day5Challenge2() {
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
                                    {`3-5\n10-14\n16-20\n12-18\n\n1\n5\n8\n11\n17\n32`}
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
            description={"Find how many id's are in the provided ranges."}
            onButtonClick={handleRunChallenge}
            schema={schema}
        />
    );
}
