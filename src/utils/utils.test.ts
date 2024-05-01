import { env } from "process";

export const testNoCI = env.TEST_ENV === "ci" ? test.skip : test;
export const itNoCI = env.TEST_ENV === "ci" ? it.skip : it;
export const describeNoCI = env.TEST_ENV === "ci" ? describe.skip : describe;

testNoCI("should skip", () => {
  expect(true).toBe(false);
});

describe("it should fail", () => {
  it("should fail", () => {
    expect(true).toBe(false);
  });
});
