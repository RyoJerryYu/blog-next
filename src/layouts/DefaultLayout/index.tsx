import { GitHubIcon, PixivIcon, TwitterIcon } from "@/components/svgs";
import HomeIcon from "@mui/icons-material/Home";
import { AppBar, Box, Slide, Toolbar, useScrollTrigger } from "@mui/material";
import Link from "next/link";
import React from "react";
import style from "./DefaultLayout.module.scss";
import MainWidth from "./MainWidth";
import { Menu } from "./Menu";
import { ClickableIcon, ClickableItem, ClickableMenu } from "./types";

function HideOnScroll(props: { children: React.ReactElement<unknown, any> }) {
  const { children } = props;
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

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

function MenuBar(props: { items: ClickableMenu[] }) {
  return (
    <Menu
      items={props.items}
      renderItem={(item) =>
        item.href ? (
          <TextLink {...item} />
        ) : (
          <span className={style.textlink}>{item.text}</span>
        )
      }
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
              className="ml-2 mr-2"
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <Link href={homeItem.href} title={homeItem.text}>
                <HomeIcon className="h-6 w-6 text-gray-300 hover:text-white" />
              </Link>
            </Box>

            {/* menu */}
            <Box sx={{ display: "flex", flex: 1, flexGrow: 1 }}>
              <MenuBar items={menuItems} />
            </Box>

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
  iconItems: ClickableIcon[];
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
        { href: "/ygowiki", text: "YGO Wiki" },
        { href: "/jessiecode-wiki", text: "Jessie Code Wiki" },
        // { href: "/prev", text: "Preview" },
        // { href: "/testwiki", text: "Test Wiki" },
        // {
        //   href: "",
        //   text: "Other",
        //   children: [
        //     { href: "/about", text: "About" },
        //     { href: "/contact", text: "Contact" },
        //     { href: "/privacy", text: "Privacy" },
        //     { href: "/terms", text: "Terms" },
        //   ],
        // },
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
