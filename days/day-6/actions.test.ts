import { expect, it, describe } from "vitest";
import { completeChallenge1, completeChallenge2 } from "@/days/day-6/actions";

describe("completeChallenge1", () => {
    it("should return the correct result for the sample input", async () => {
        const input = `123 328  51 64 \n 45 64  387 23 \n  6 98  215 314\n*   +   *   +  `;

        const result = await completeChallenge1(input);

        expect(result).toBe(4277556);
    });
});

describe("completeChallenge2", () => {
    it("should return the correct result for the sample input", async () => {
        const input = `123 328  51 64 \n 45 64  387 23 \n  6 98  215 314\n*   +   *   +  `;

        const result = await completeChallenge2(input);

        expect(result).toBe(3263827);
    });
});
