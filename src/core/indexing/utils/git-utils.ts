import dayjs from "dayjs";
import { ReadCommitResult } from "isomorphic-git";

export function dayJsFromCommit(commit: ReadCommitResult): dayjs.Dayjs {
  return dayjs(commit.commit.committer.timestamp * 1000);
}

function timeStrFromDayJs(dayjs: dayjs.Dayjs): string {
  return dayjs.toJSON();
}

export function timeStrFromCommit(commit: ReadCommitResult): string {
  return timeStrFromDayJs(dayJsFromCommit(commit));
}

function dayJsToUnix(dayjs: dayjs.Dayjs): number {
  return dayjs.unix();
}

export function timeStrToUnix(timeStr: string | null): number {
  return dayJsToUnix(dayjs(timeStr));
}
