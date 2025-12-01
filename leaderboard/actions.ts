"use server";

import { cacheLife } from "next/cache";
import { Leaderboard } from "@/types/leaderboard";

export async function getLeaderboard() {
    "use cache";
    cacheLife({
        expire: 1000,
        revalidate: 1000,
        stale: 1000,
    });

    if (process.env.AOC_SESSION == null || process.env.AOC_SESSION === "") {
        throw new Error("AOC_SESSION environment variable is not set.");
    }

    const leaderboardJson = await fetch(
        "https://adventofcode.com/2025/leaderboard/private/view/195829.json",
        {
            headers: {
                cookie: `session=${process.env.AOC_SESSION}`,
            },
        },
    );

    return (await leaderboardJson.json()) as Leaderboard;
}
