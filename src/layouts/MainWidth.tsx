import clsx from "clsx";

export type MainWidthProps = {
  children: React.ReactNode;
  className?: string;
};

export default function MainWidth(props: MainWidthProps) {
  return (
    <div className={clsx("max-w-2xl mx-auto p-2", props.className)}>
      {props.children}
    </div>
  );
}
