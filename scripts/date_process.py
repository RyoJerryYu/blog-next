'''Scripts for process date of markdown file for migration.

Because the markdown files should move to new folder,
and the date of file would be lost.
This script will get the date from git log,
and save it to front matter.
'''

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

  Do not use frontmatter.dump here,
  because it will change the order of front matter,
  and use pointer for datetime format.
  '''

  lines: list[str] = []
  with open(file, 'r+', encoding='utf-8') as f:
    lines = f.readlines()

  assert lines[0].strip() == '---'

  lines.insert(1, f'created_at: {created_at}' + os.linesep)
  lines.insert(2, f'updated_at: {updated_at}' + os.linesep)

  print(''.join(lines))
  with open(file, 'w', encoding='utf-8') as f:
    f.writelines(lines)


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
