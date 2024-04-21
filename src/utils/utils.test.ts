import { env } from "process";

export const testNoCI = env.TEST_ENV === "ci" ? test.skip : test;
export const itNoCI = env.TEST_ENV === "ci" ? it.skip : it;
export const describeNoCI = env.TEST_ENV === "ci" ? describe.skip : describe;

testNoCI("should skip", () => {});
