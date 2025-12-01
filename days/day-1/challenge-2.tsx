"use client";

import FileInput from "@/components/file-input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { completeSecondChallenge } from "./actions";
import z from "zod";
import { fail, Result, succeed } from "@/utils/Result";
import { ValidationError } from "@/utils/Error";

const fileContentSchema = z
    .string()
    .regex(/^(?:[RL]\d+\n)*[RL]\d+\n?$/, "Invalid file format");

async function checkFileContent(
    file: File | null,
): Promise<Result<string, ValidationError>> {
    if (file == null) {
        return fail(new ValidationError("No file provided"));
    }
    const fileContent = await file.text();

    const result = fileContentSchema.safeParse(fileContent);

    if (!result.success) {
        return fail(new ValidationError(result.error.message));
    }

    return succeed(result.data);
}

export default function Challenge2() {
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

        const result = await completeSecondChallenge(fileState.fileContent);

        setChallengeResult(result);
        setIsLoading(false);
    }

    return (
        <>
            <span className="font-sans text-xl font-semibold">Challenge 2</span>
            <span className="font-sans">
                Same as challenge 1, but now count how many times we visit position
                0.
            </span>
            <FileInput
                label="Upload File"
                onChange={async (file) => {
                    console.log(file);
                    const fileResult = await checkFileContent(file);
                    if (fileResult._tag === "Failure") {
                        setFileState({ isValid: false });
                        return;
                    }
                    setFileState({ fileContent: fileResult.data, isValid: true });
                }}
            />
            {fileState?.isValid === false ? (
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
            ) : null}
            <div className="flex justify-end">
                <Button
                    disabled={fileState == null || !fileState.isValid || isLoading}
                    onClick={handleRunChallenge}
                >
                    {isLoading ? <Loader2 className="animate-spin" /> : null}
                    Run Challenge 2
                </Button>
            </div>
            {challengeResult != null ? (
                <span className="font-sans dark:text-yellow-200 text-yellow-700">
                    Challenge 1 Result: {challengeResult}
                </span>
            ) : null}
        </>
    );
}
