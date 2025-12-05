import { expect, describe, it } from "vitest";
import { completeChallenge1, completeChallenge2 } from "@/days/day-5/actions";

describe("completeChallenge1", () => {
    it("should return the correct result for the sample input", async () => {
        const input = `3-5\n10-14\n16-20\n12-18\n\n1\n5\n8\n11\n17\n32`;

        const result = await completeChallenge1(input);

        expect(result).toBe(3);
    });
});

describe("completeChallenge2", () => {
    it("should return the correct result for the sample input", async () => {
        const input = `3-5\n10-14\n16-20\n12-18\n\n1\n5\n8\n11\n17\n32`;

        const result = await completeChallenge2(input);

        expect(result).toBe(14);
    });
});
