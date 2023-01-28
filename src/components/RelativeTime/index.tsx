import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

type RelativeTimeProps = {
  time: string;
};

export default function RelativeTime({ time }: RelativeTimeProps) {
  const jsTime = dayjs(time);
  return <time dateTime={jsTime.toJSON()}>{jsTime.format("YYYY-MM-DD")}</time>;
}
