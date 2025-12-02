import { describe, expect, it } from "vitest";
import { completeChallenge1, completeChallenge2 } from "@/days/day-2/actions";

describe("completeChallenge1", () => {
    it("should have have the right output", async () => {
        const fileContent = "10-99,22-88";
        const result = await completeChallenge1(fileContent);

        expect(result).toEqual(
            11 +
                22 +
                33 +
                44 +
                55 +
                66 +
                77 +
                88 +
                99 +
                22 +
                33 +
                44 +
                55 +
                66 +
                77 +
                88,
        );
    });
});

describe("completeChallenge2", () => {
    it("should have have the right output", async () => {
        const fileContent = "1032-2599";
        const result = await completeChallenge2(fileContent);
        expect(result).toEqual(27270);
    });
});
