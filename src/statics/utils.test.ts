import dayjs from "dayjs";
import { Post } from ".";
import { sortPostsByDate } from "./utils";

const postInfoOtherOfDate = {
  meta: {
    created_at: "2020-01-01",
    content: "xxx",
    title: "xxx",
    tags: [],
    abstract: "xxx",
    length: 0,
    license: false,
  },
  slug: "xxx",
  filePath: "xxx",
  mediaDir: "xxx",
  pagePath: "xxx",
};

test("should sorted", () => {
  const postOfDate = (date: string): Post => ({
    ...postInfoOtherOfDate,
    meta: { ...postInfoOtherOfDate.meta, created_at: date, updated_at: date },
  });
  const res = sortPostsByDate([
    postOfDate("2020-01-03"),
    postOfDate("2020-01-02"),
    postOfDate("2020-01-01"),
    postOfDate("2020-01-04"),
  ]);

  expect(res.length).toBe(4);

  let currentCreatedAt = res[0].meta.created_at;
  for (let i = 1; i < res.length; i++) {
    const createdAt = res[i].meta.created_at;
    expect(dayjs(createdAt).unix()).toBeLessThan(
      dayjs(currentCreatedAt).unix()
    );
    currentCreatedAt = createdAt;
  }
});
