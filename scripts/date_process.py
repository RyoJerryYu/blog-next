from git import Repo
import frontmatter
import os
import re
from datetime import datetime


def search_md_file(path: str):
  '''get all markdown like file (.md, .mdx) path in given path
  '''
  pattern = re.compile(r'\.md.?$')
  files = []
  for root, _, filenames in os.walk(path):
    for filename in filenames:
      if pattern.search(filename):
        files.append(os.path.join(root, filename))
  return files


def get_date_from_git(repo: Repo, path: str):
  '''get the first and last commit date of given file
  '''
  dates = [
      commit.committed_datetime for commit in repo.iter_commits(paths=path)
  ]

  dates.sort(reverse=True)
  assert len(dates) > 0
  return (dates[0], dates[-1])  # (updated_at, created_at)


def get_date_from_matter(file: str) -> datetime | None:
  '''get the created_at from front matter for migration
  '''
  with open(file, 'r', encoding='utf-8') as f:
    matter = frontmatter.load(f)
    return matter.get('date', None)


def save_date_to_front_matter(
    file: str,
    created_at: datetime,
    updated_at: datetime,
):
  '''save the created_at to front matter for migration
  '''
  with open(file, 'r+', encoding='utf-8') as f:
    matter = frontmatter.load(f)
    matter['created_at'] = created_at
    matter['updated_at'] = updated_at
    res = frontmatter.dumps(matter, encoding='utf-8')
    f.write(res)


def main(repo: Repo, path: str):
  files = search_md_file(path)
  for file in files:
    created_at, updated_at = get_date_from_git(repo, file)
    matter_created_at = get_date_from_matter(file)
    if matter_created_at is not None:
      created_at = matter_created_at
    print(f'{file}: {created_at} {updated_at}')
    save_date_to_front_matter(file, created_at, updated_at)


if __name__ == '__main__':
  # res = get_file_date(Repo('.'), 'source/_posts/2021-01-11-Sort-algorithm.md')
  # res = search_md_file('source/_posts')
  # res = parse_front_matter('source/_posts/2021-01-11-Sort-algorithm.md')
  # print(res)

  main(Repo('.'), 'source/_posts')
