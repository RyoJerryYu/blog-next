import {
  GitHubIcon,
  IconItem,
  PixivIcon,
  TwitterIcon,
} from "@/components/svgs";
import clsx from "clsx";
import Link from "next/link";
import style from "./DefaultLayout.module.scss";
import MainWidth from "./MainWidth";

const FooterIcon = ({
  href,
  title,
  Icon,
}: {
  href: string;
  title: string;
  Icon: (props: IconItem) => JSX.Element;
} & IconItem) => {
  return (
    <Link href={href} title={title}>
      <Icon className={clsx(style.footerIcon, "h-8 w-8")} />
    </Link>
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
  rightItem: ClickableItem;
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
        <div className={style.textbox}>
          <Link href={rightItem.to} className={style.textlink}>
            {rightItem.text}
          </Link>
        </div>
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
            <FooterIcon
              href="https://twitter.com/ryo_okami"
              title="Twitter"
              Icon={TwitterIcon}
            />
            <FooterIcon
              href="https://github.com/RyoJerryYu"
              title="GitHub"
              Icon={GitHubIcon}
            />
            <FooterIcon
              href="https://www.pixiv.net/users/9159893"
              title="Pixiv"
              Icon={PixivIcon}
            />
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
    { to: "/tags", text: "Tags" },
  ];
  const rightItem: ClickableItem = { to: "/about", text: "About Me" };
  return (
    <>
      <DefaultHeader items={items} iconItem={iconItem} rightItem={rightItem} />

      {/* outside header */}
      {withFullScreen ? (
        children
      ) : (
        <>
          <div className={style.headerBg}></div>
          <div className={style.contentHeight}>{children}</div>
        </>
      )}

      <DefaultFooter />
    </>
  );
};

export default DefaultLayout;
