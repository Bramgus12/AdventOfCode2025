import { describe, expect, it } from "vitest";
import { completeChallenge1, completeChallenge2 } from "./actions";

describe("completeChallenge1", () => {
    it("Should complete challenge 1 correctly", async () => {
        const challenge1Data = `..@@.@@@@.\n@@@.@.@.@@\n@@@@@.@.@@\n@.@@@@..@.\n@@.@@@@.@@\n.@@@@@@@.@\n.@.@.@.@@@\n@.@@@.@@@@\n.@@@@@@@@.\n@.@.@@@.@.`;
        const result = await completeChallenge1(challenge1Data);

        expect(result).toEqual({
            result: 13,
            map: `..xx.xx@x.\nx@@.@.@.@@\n@@@@@.x.@@\n@.@@@@..@.\nx@.@@@@.@x\n.@@@@@@@.@\n.@.@.@.@@@\nx.@@@.@@@@\n.@@@@@@@@.\nx.x.@@@.x.`,
        });
    });
});

describe("completeChallenge2", () => {
    it("Should complete challenge 2 correctly", async () => {
        const challenge2Data = `..@@.@@@@.\n@@@.@.@.@@\n@@@@@.@.@@\n@.@@@@..@.\n@@.@@@@.@@\n.@@@@@@@.@\n.@.@.@.@@@\n@.@@@.@@@@\n.@@@@@@@@.\n@.@.@@@.@.`;
        const result = await completeChallenge2(challenge2Data);

        expect(result).toEqual({
            result: 43,
            map: `..........\n..........\n..........\n....@@....\n...@@@@...\n...@@@@@..\n...@.@.@@.\n...@@.@@@.\n...@@@@@..\n....@@@...`,
        });
    });
});
