"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Props = Readonly<{
    children: ReactNode;
}>;

export default function DayLayout(props: Props) {
    const pathname = usePathname();
    const { children } = props;

    const dayNumber = pathname.replace("/days/day-", "");

    return (
        <div className="px-10 py-8 flex gap-4 flex-col h-full w-full">
            <span className="text-3xl font-sans font-bold">
                {`Day ${dayNumber}`} -{" "}
                <Link
                    target="_blank"
                    href={`https://adventofcode.com/2025/day/${dayNumber}`}
                    className="underline text-green-600"
                >
                    Link to puzzle
                </Link>
            </span>
            <div className="flex-1">{children}</div>
        </div>
    );
}
