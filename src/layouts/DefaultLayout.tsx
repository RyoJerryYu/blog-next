import {
  GitHubIcon,
  IconItem,
  PixivIcon,
  TwitterIcon,
} from "@/components/svgs";
import { AppBar, Box, Slide, Toolbar, useScrollTrigger } from "@mui/material";
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
type DefaultHeaderProps = {
  homeItem: ClickableItem;
  menuItems: ClickableItem[];
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
        <AppBar>
          <Toolbar>
            {/* icon */}
            <div className="ml-2 w-32 mr-2 md:mr-4">
              <Link href={homeItem.href} className={style.textlink}>
                {homeItem.text}
              </Link>
            </div>

            {/* NavBar */}
            <Box sx={{ display: "flex" }}>
              {menuItems.map((item) => (
                <div
                  key={item.text}
                  className="relative float-left mx-1 md:mx-2"
                >
                  <Link href={item.href} className={style.textlink}>
                    {item.text}
                  </Link>
                </div>
              ))}
            </Box>

            <Box sx={{ flexGrow: 1, display: "flex" }}></Box>

            {/* headerRight */}
            <Box sx={{ display: "flex" }}>
              {iconItems.map((item) => (
                <Link href={item.href} title={item.text} key={item.text}>
                  <item.Icon className="h-6 w-6 fill-gray-300 hover:fill-white transition-all ease-in-out mx-1 md:mx-2" />
                </Link>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
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
  const menuItems: ClickableItem[] = [
    { href: "/articles", text: "Articles" },
    { href: "/ideas", text: "Ideas" },
    { href: "/learn_from_ai", text: "Learn from AI" },
    { href: "/tags", text: "Tags" },
    { href: "/clips", text: "Clips" },
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
