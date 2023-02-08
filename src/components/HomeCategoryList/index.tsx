import clsx from "clsx";
import Link from "next/link";
import style from "./HomeCategoryList.module.scss";

export type HomeCategoryItem = {
  title: string;
  href: string;
  charUrl?: string;
  BgComponent: React.FC<{ className?: string }>;
};
export type HomeCategoryListProps = {
  items: HomeCategoryItem[];
};
export default function HomeCategoryList(props: HomeCategoryListProps) {
  const { items } = props;
  return (
    <ul className={style.list}>
      {items.map((item) => (
        <li
          key={item.title}
          className={clsx(
            style.listItem,
            "group",
            "before:bg-black before:bg-opacity-50 hover:before:bg-opacity-20"
          )}
        >
          <div
            className={clsx(
              "group-hover:scale-110",
              style.bg,
              style.hoverAnimation
            )}
          >
            <item.BgComponent className=" min-w-full min-h-full" />
          </div>
          <Link
            href={item.href}
            className={clsx(
              "text-slate-300 group-hover:text-slate-100",
              style.hoverAnimation
            )}
          >
            <p>{item.title}</p>
          </Link>
          <div
            className={clsx(
              style.border,
              "border-4 opacity-0 group-hover:opacity-90",
              style.hoverAnimation
            )}
          ></div>
          {item.charUrl && (
            <img
              className={clsx(
                "opacity-100 group-hover:opacity-100 group-hover:translate-x-32",
                style.charactor,
                style.hoverAnimation
              )}
              src={item.charUrl}
              alt="some text"
            />
          )}
        </li>
      ))}
    </ul>
  );
}
