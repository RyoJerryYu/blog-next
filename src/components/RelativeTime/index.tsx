import dayjs from "dayjs";

type RelativeTimeProps = {
  children: string;
};

export default function RelativeTime({ children }: RelativeTimeProps) {
  const jsTime = dayjs(children);
  return <time dateTime={jsTime.toJSON()}>{jsTime.format("YYYY-MM-DD")}</time>;
}
