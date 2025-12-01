"use client";

import { Input } from "./ui/input";

type Props = {
    label: string;
    onChange: (file: File | null) => void;
};

export default function FileInput(props: Props) {
    const { label, onChange } = props;

    return (
        <div className="flex flex-col gap-2">
            <span className="font-sans text-md">{label}</span>
            <Input
                className="file:cursor-pointer font-sans file:font-bold"
                type="file"
                onChange={(event) => {
                    const file = event.target.files ? event.target.files[0] : null;
                    onChange(file);
                }}
            />
        </div>
    );
}
