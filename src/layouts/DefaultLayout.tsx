import {
  GitHubIcon,
  IconItem,
  PixivIcon,
  TwitterIcon,
} from "@/components/svgs";
import clsx from "clsx";
import Link from "next/link";
import React, { JSX } from "react";
import style from "./DefaultLayout.module.scss";
import MainWidth from "./MainWidth";

type ExternalIconsProps = {
  className?: string;
};
const ExternalIcons = (props: ExternalIconsProps) => {
  const iconMetas: {
    href: string;
    title: string;
    Icon: (props: IconItem) => JSX.Element;
  }[] = [
    {
      href: "https://twitter.com/ryo_okami",
      title: "Twitter",
      Icon: TwitterIcon,
    },
    {
      href: "https://github.com/RyoJerryYu",
      title: "GitHub",
      Icon: GitHubIcon,
    },
    {
      href: "https://www.pixiv.net/users/9159893",
      title: "Pixiv",
      Icon: PixivIcon,
    },
  ];

  return (
    <div className=" flex flex-row gap-8 items-center justify-center">
      {iconMetas.map((meta) => {
        return (
          <Link href={meta.href} title={meta.title} key={meta.title}>
            <meta.Icon className={props.className} />
          </Link>
        );
      })}
    </div>
  );
};

type ClickableItem = {
  to: string;
  text: string;
};
type NavBarProps = {
  className?: string;
  focusOn?: string;
  items: ClickableItem[];
};
const NavBar: React.FC<NavBarProps> = ({ className, items }) => {
  return (
    <div className={className}>
      {items.map((item) => (
        <div key={item.text} className={style.navBarItem}>
          <Link href={item.to} className={style.textlink}>
            {item.text}
          </Link>
        </div>
      ))}
    </div>
  );
};

type DefaultHeaderProps = {
  iconItem: ClickableItem;
  items: ClickableItem[];
  rightItem?: ClickableItem;
};
const DefaultHeader: React.FC<DefaultHeaderProps> = ({
  items,
  iconItem,
  rightItem,
}: DefaultHeaderProps) => {
  return (
    <header className={style.header}>
      {/* icon */}
      <div className={style.icon}>
        <div className={style.textbox}>
          <Link href={iconItem.to} className={style.textlink}>
            {iconItem.text}
          </Link>
        </div>
      </div>

      {/* NavBar */}
      <NavBar className={style.navBar} items={items} />

      {/* headerRight */}
      <div className={style.headerRight}>
        <ExternalIcons className=" h-6 w-6 fill-gray-300 hover:fill-white transition-all ease-in-out" />
        {rightItem && (
          <div className={style.textbox}>
            <Link href={rightItem.to} className={style.textlink}>
              {rightItem.text}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

type DefaultFooterProps = {};

const DefaultFooter: React.FC<DefaultFooterProps> = (
  props: DefaultFooterProps
) => {
  return (
    <footer className={style.footer}>
      <MainWidth className="w-full">
        <div className="flex flex-row justify-center items-center">
          <div className={style.footerLeft}>
            {"© 2023 Ryo Jerry Yu. All rights reserved."}
          </div>
          <div className={style.footerRight}>
            <ExternalIcons className={clsx(style.footerIcon, "h-8 w-8")} />
          </div>
        </div>
      </MainWidth>
    </footer>
  );
};

type DefaultLayoutProps = {
  children: React.ReactNode;
  withFullScreen?: boolean;
};
const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
  withFullScreen,
}) => {
  const iconItem: ClickableItem = { to: "/", text: "Ryo's Blog" };
  const items: ClickableItem[] = [
    { to: "/articles", text: "Articles" },
    { to: "/ideas", text: "Ideas" },
    { to: "/learn_from_ai", text: "Learn from AI" },
    { to: "/tags", text: "Tags" },
    { to: "/prev", text: "Prev" },
    { to: "/clips", text: "Clips" },
  ];
  // const rightItem: ClickableItem = { to: "/about", text: "About Me" };
  return (
    <>
      <DefaultHeader items={items} iconItem={iconItem} />

      {/* outside header */}
      {withFullScreen ? (
        children
      ) : (
        <>
          <div className={style.headerBg}></div>
          <MainWidth>
            <div className={style.contentHeight}>{children}</div>
          </MainWidth>
        </>
      )}

      <DefaultFooter />
    </>
  );
};

export default DefaultLayout;
