"use cache";

import { getLeaderboard } from "@/leaderboard/actions";
import { Fragment } from "react";

export default async function Leaderboard() {
    const leaderboard = await getLeaderboard();

    return (
        <div className="font-sans">
            <span className="font-semibold text-2xl">Skoon Leaderboard</span>
            {Object.values(leaderboard.members)
                .sort((a, b) => b.local_score - a.local_score)
                .map((member) => (
                    <div key={member.id} className="flex content-center">
                        <span className="flex-1">
                            {member.name ?? "Anonymous User"}
                        </span>
                        <span className="text-xl">
                            {Array.from({ length: 12 }).map((_, i) => {
                                const day = Object.values(
                                    member.completion_day_level,
                                )[i];
                                if (day == null || Object.keys(day).length === 0) {
                                    return (
                                        <span key={i} className="text-gray-400">
                                            {"**"}
                                        </span>
                                    );
                                } else {
                                    if (Object.keys(day).length === 1) {
                                        return (
                                            <Fragment key={i}>
                                                <span className="text-yellow-500">
                                                    {"*"}
                                                </span>
                                                <span className="text-gray-400">
                                                    {"*"}
                                                </span>
                                            </Fragment>
                                        );
                                    }
                                    return Object.values(day).map((star) => (
                                        <span
                                            key={star.star_index}
                                            className="text-yellow-500"
                                        >
                                            {"*"}
                                        </span>
                                    ));
                                }
                            })}
                        </span>
                        <p className="w-[100px] text-end">
                            {member.local_score} pts
                        </p>
                    </div>
                ))}
        </div>
    );
}
