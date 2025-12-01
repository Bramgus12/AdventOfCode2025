export type Leaderboard = {
    members: Record<
        string,
        {
            local_score: number;
            last_star_ts: number;
            name: string;
            completion_day_level: Record<
                string,
                Record<
                    string,
                    {
                        star_index: number;
                        get_star_ts: number;
                    }
                >
            >;
            id: number;
            stars: number;
        }
    >;
    day1_ts: number;
    day2_ts?: number;
    day3_ts?: number;
    day4_ts?: number;
    day5_ts?: number;
    day6_ts?: number;
    day7_ts?: number;
    day8_ts?: number;
    day9_ts?: number;
    day10_ts?: number;
    day11_ts?: number;
    day12_ts?: number;
    event: string;
    owner_id: number;
    num_days: number;
};
