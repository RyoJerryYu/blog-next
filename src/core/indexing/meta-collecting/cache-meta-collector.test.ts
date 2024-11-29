import fs from "fs";
import git from "isomorphic-git";

describe("test", () => {
  it("should work", async () => {
    const commits = await git.log({
      fs: fs,
      dir: ".",
      // depth: 1,
      filepath: "public/content/articles/2020-01-27-Building-this-blog.md",
    });

    console.log(commits);
  });
});
