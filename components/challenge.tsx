"use client";

import FileInput from "@/components/file-input";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { fail, Result, succeed } from "@/utils/Result";
import { ValidationError } from "@/utils/Error";
import z from "zod";

type Props = {
    onFileChange: (content: string | null, isValid: boolean) => void;
    title: string;
    description: string;
    slots?: {
        alert?: ReactNode;
    };
    onButtonClick: () => void;
    buttonLabel?: string;
    isLoading?: boolean;
    buttonDisabled?: boolean;
    challengeResult?: string;
    schema: z.ZodString;
};

async function checkFileContent(
    file: File | null,
    schema: z.ZodString,
): Promise<Result<string, ValidationError>> {
    if (file == null) {
        return fail(new ValidationError("No file provided"));
    }
    const fileContent = await file.text();

    const result = schema.safeParse(fileContent);

    if (!result.success) {
        return fail(new ValidationError(result.error.message));
    }

    return succeed(result.data);
}

export default function Challenge(props: Props) {
    const {
        onFileChange,
        buttonDisabled,
        buttonLabel,
        challengeResult,
        onButtonClick,
        description,
        title,
        slots,
        isLoading,
        schema,
    } = props;

    async function handleFileChange(file: File | null) {
        if (file == null) {
            onFileChange(null, false);
            return;
        }
        const parseResult = await checkFileContent(file, schema);
        if (parseResult._tag === "Failure") {
            onFileChange(null, false);
            return;
        }
        onFileChange(parseResult.data, true);
    }

    return (
        <>
            <span className="font-sans text-xl font-semibold">{title}</span>
            <span className="font-sans">{description}</span>
            <FileInput label="Upload File" onChange={handleFileChange} />
            {slots?.alert != null ? slots.alert : null}
            <div className="flex justify-end">
                <Button
                    disabled={buttonDisabled || isLoading}
                    onClick={onButtonClick}
                >
                    {isLoading ? <Loader2 className="animate-spin" /> : null}
                    {buttonLabel}
                </Button>
            </div>
            {challengeResult != null ? (
                <span className="font-sans dark:text-yellow-200 text-yellow-700">
                    {challengeResult}
                </span>
            ) : null}
        </>
    );
}
