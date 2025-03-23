import { Menu } from "@/components/antd/Menu";
import {
  GitHubIcon,
  IconItem,
  PixivIcon,
  TwitterIcon,
} from "@/components/svgs";
import { KeyboardArrowDown } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import { AppBar, Box, Slide, Toolbar, useScrollTrigger } from "@mui/material";
import { ItemType } from "antd/es/menu/interface";
import Link from "next/link";
import React, { JSX } from "react";
import style from "./DefaultLayout.module.scss";
import MainWidth from "./MainWidth";

function HideOnScroll(props: { children: React.ReactElement<unknown, any> }) {
  const { children } = props;
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

type ClickableItem = {
  href: string;
  text: string;
};
type ClickableIcon = ClickableItem & { Icon: (props: IconItem) => JSX.Element };
type ClickableMenu = ClickableItem & {
  children?: ClickableMenu[];
};

////////
// Header Components
////////

function TextLink(props: ClickableItem) {
  return (
    <Link href={props.href} className={style.textlink}>
      {props.text}
    </Link>
  );
}

function IconLink(props: ClickableIcon) {
  return (
    <Link href={props.href} title={props.text} key={props.text}>
      <props.Icon className="h-6 w-6 fill-gray-300 hover:fill-white mx-1 sm:mx-2" />
    </Link>
  );
}

const clickableMenuToMenuItem = (
  menu: ClickableMenu,
  layer: number
): ItemType => {
  const toLabel = (children: React.ReactElement) => {
    if (menu.href) {
      return (
        <Link href={menu.href} className={style.textlink}>
          {children}
        </Link>
      );
    }
    return <span className={style.textlink}>{children}</span>;
  };
  if (menu.children) {
    const children =
      layer === 0 ? (
        <>
          {menu.text}
          <KeyboardArrowDown />
        </>
      ) : (
        <>{menu.text}</> // for dropdown menu, antd already has the arrow icon
      );
    return {
      key: menu.text,
      label: toLabel(children),
      children: menu.children.map((child) =>
        clickableMenuToMenuItem(child, layer + 1)
      ),
    };
  }
  return {
    key: menu.text,
    label: <TextLink {...menu} />,
  };
};

function MenuBar(props: { items: ClickableMenu[] }) {
  return (
    <Menu
      mode="horizontal"
      className="bg-transparent"
      theme="dark"
      items={props.items.map((item) => clickableMenuToMenuItem(item, 0))}
    />
  );
}

type DefaultHeaderProps = {
  homeItem: ClickableItem;
  menuItems: ClickableMenu[];
  iconItems: ClickableIcon[];
};
const DefaultHeader: React.FC<DefaultHeaderProps> = ({
  menuItems,
  homeItem,
  iconItems,
}: DefaultHeaderProps) => {
  return (
    <>
      <HideOnScroll>
        <AppBar sx={{ bgcolor: "header.background" }}>
          <Toolbar>
            {/* home */}
            <Box
              className="ml-2 w-24 mr-4"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <TextLink {...homeItem} />
            </Box>
            <Box
              className="ml-2 mr-4"
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <Link href={homeItem.href} title={homeItem.text}>
                <HomeIcon className="h-6 w-6 text-gray-300 hover:text-white" />
              </Link>
            </Box>

            {/* menu */}
            <Box sx={{ display: "flex" }}>
              <MenuBar items={menuItems} />
            </Box>

            <Box sx={{ flexGrow: 1, display: "flex" }}></Box>

            {/* icon */}
            <Box sx={{ display: "flex" }}>
              {iconItems.map((item) => (
                <IconLink key={item.text} {...item} />
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </>
  );
};

type DefaultFooterProps = {
  iconItems: (ClickableItem & { Icon: (props: IconItem) => JSX.Element })[];
};

const DefaultFooter: React.FC<DefaultFooterProps> = (
  props: DefaultFooterProps
) => {
  return (
    <footer className={style.footer}>
      <MainWidth>
        <div className="flex flex-row justify-center items-center">
          <div className={style.footerLeft}>
            {"© 2023 Ryo Jerry Yu. All rights reserved."}
          </div>
          <div className={style.footerRight}>
            {props.iconItems.map((item) => (
              <Link href={item.href} title={item.text} key={item.text}>
                <item.Icon className="h-6 w-6 fill-gray-300 hover:fill-white transition-all ease-in-out mx-1 md:mx-2" />
              </Link>
            ))}
          </div>
        </div>
      </MainWidth>
    </footer>
  );
};

type DefaultLayoutProps = {
  children: React.ReactNode;
} & (
  | {
      withFullScreen: true;
    }
  | {
      withFullScreen?: false;
      left?: React.ReactNode;
      right?: React.ReactNode;
    }
);
const DefaultLayout: React.FC<DefaultLayoutProps> = (props) => {
  const homeItem: ClickableItem = { href: "/", text: "Ryo's Blog" };
  const menuItems: ClickableMenu[] = [
    { href: "/articles", text: "Articles" },
    { href: "/learn_from_ai", text: "Learn from AI" },
    { href: "/tags", text: "Tags" },
    {
      href: "",
      text: "More",
      children: [
        { href: "/ideas", text: "Ideas" },
        { href: "/clips", text: "Clips" },
        { href: "/prev", text: "Preview" },
        { href: "/testwiki", text: "Test Wiki" },
        {
          href: "",
          text: "Other",
          children: [
            { href: "/about", text: "About" },
            { href: "/contact", text: "Contact" },
            { href: "/privacy", text: "Privacy" },
            { href: "/terms", text: "Terms" },
          ],
        },
      ],
    },
  ];
  const iconItems: ClickableIcon[] = [
    {
      href: "https://twitter.com/ryo_okami",
      text: "Twitter",
      Icon: TwitterIcon,
    },
    {
      href: "https://github.com/RyoJerryYu",
      text: "GitHub",
      Icon: GitHubIcon,
    },
    {
      href: "https://www.pixiv.net/users/9159893",
      text: "Pixiv",
      Icon: PixivIcon,
    },
  ];
  // const rightItem: ClickableItem = { to: "/about", text: "About Me" };
  return (
    <>
      <DefaultHeader
        menuItems={menuItems}
        homeItem={homeItem}
        iconItems={iconItems}
      />

      {/* outside header */}
      {props.withFullScreen ? (
        props.children
      ) : (
        <>
          {/* <div className={style.headerBg}></div> */}
          <Toolbar />
          <MainWidth left={props.left} right={props.right}>
            <div className={style.contentHeight}>{props.children}</div>
          </MainWidth>
        </>
      )}

      <DefaultFooter iconItems={iconItems} />
    </>
  );
};

export default DefaultLayout;
