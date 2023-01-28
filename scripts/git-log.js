import git from 'isomorphic-git'
import fs from "fs";

const dir = '.'
const filepath = 'source/_posts/2020-01-27-Building-this-blog.md'

const log = async (dir, filepath) => {
    const commits = await git.log({ fs, dir, filepath })
    for (const commit of commits) {
        console.log(commit.commit.committer.timestamp)
        console.log(commit.commit.committer.timezoneOffset)
    }
}

log(dir, filepath)
