import { expect, it, describe } from "vitest";
import { completeChallenge2 } from "./actions";

describe("completeChallenge2", () => {
    it("Should complete challenge 2 correctly", async () => {
        const challenge2Data = `987654321111111\n811111111111119\n234234234234278\n818181911112111`;
        const result = await completeChallenge2(challenge2Data);

        expect(result).toBe(3121910778619);
    });
});
