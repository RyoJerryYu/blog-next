import dayjs from "dayjs";

type RelativeTimeProps = {
  className?: string;
  children: string;
};

export default function RelativeTime({
  className,
  children,
}: RelativeTimeProps) {
  const jsTime = dayjs(children);
  return (
    <div className={className}>
      <time dateTime={jsTime.toJSON()}>{jsTime.format("YYYY-MM-DD")}</time>
    </div>
  );
}
