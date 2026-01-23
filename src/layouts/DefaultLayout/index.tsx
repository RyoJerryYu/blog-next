import { GitHubIcon, PixivIcon, TwitterIcon } from "@/components/svgs";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Slide,
  Toolbar,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
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
    <Link
      href={props.href}
      title={props.text}
      key={props.text}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Box
        component={props.Icon}
        sx={{
          width: "1.5rem", // h-6 w-6
          height: "1.5rem",
          fill: "#d1d5db", // fill-gray-300
          marginLeft: { xs: "0.25rem", sm: "0.5rem" }, // mx-1 sm:mx-2
          marginRight: { xs: "0.25rem", sm: "0.5rem" },
          transitionProperty:
            "color, background-color, border-color, text-decoration-color, fill, stroke", // transition-colors
          transitionDuration: "0.2s", // duration-200
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)", // default Tailwind timing
          "&:hover": {
            fill: "#ffffff", // hover:fill-white
          },
        }}
      />
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
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <HideOnScroll>
        <AppBar sx={{ bgcolor: "header.background" }}>
          <Toolbar>
            {/* home */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                marginLeft: "0.5rem", // ml-2
                width: "6rem", // w-24
                marginRight: "1rem", // mr-4
              }}
            >
              <TextLink {...homeItem} />
            </Box>

            {/* menu - desktop */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flex: 1,
                flexGrow: 1,
              }}
            >
              <MenuBar items={menuItems} />
            </Box>

            {/* menu button - mobile */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                flex: 1,
                flexGrow: 1,
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{
                  color: "#d1d5db", // text-gray-300
                  transitionProperty:
                    "color, background-color, border-color, text-decoration-color, fill, stroke", // transition-colors
                  transitionDuration: "0.2s", // duration-200
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)", // default Tailwind timing
                  "&:hover": {
                    color: "#ffffff", // hover:text-white
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
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

      {/* Drawer for mobile menu */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
            backgroundColor: "rgba(17, 24, 39, 0.95)", // bg-gray-900 bg-opacity-95
            color: "#f1f5f9", // text-slate-100
          },
        }}
      >
        <Box
          sx={{
            padding: "1rem",
            paddingTop: "4rem", // Add top padding for AppBar
          }}
        >
          <Menu
            items={menuItems}
            mode="inline"
            renderItem={(item) =>
              item.href ? (
                <Link
                  href={item.href}
                  className={style.textlink}
                  onClick={handleDrawerClose}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {item.text}
                </Link>
              ) : (
                <span className={style.textlink}>{item.text}</span>
              )
            }
          />
        </Box>
      </Drawer>
    </>
  );
};

type DefaultFooterProps = {
  iconItems: ClickableIcon[];
};

const DefaultFooter: React.FC<DefaultFooterProps> = (
  props: DefaultFooterProps
) => {
  const theme = useTheme();
  return (
    <Box
      component="footer"
      sx={{
        bottom: 0,
        width: "100%",
        zIndex: 50,
        backgroundColor: "rgba(17, 24, 39, 0.9)", // bg-gray-900 bg-opacity-90
        transitionProperty:
          "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter, backdrop-filter", // transition
        transitionDuration: "0.15s", // default Tailwind transition duration
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)", // default Tailwind timing
        height: "4rem", // $footer-height
        color: "#f1f5f9", // text-slate-100
        fontSize: "0.875rem", // text-sm
        fontFamily: theme.typography.fontFamily, // font-sans
        fontWeight: 400, // font-normal
        lineHeight: "1.25rem", // leading-5 (text-sm line-height)
        display: "flex",
        alignItems: "center",
      }}
    >
      <MainWidth>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box sx={{ marginLeft: "0.5rem" }}>
            {"© 2023 Ryo Jerry Yu. All rights reserved."}
          </Box>
          <Box
            sx={{
              marginLeft: "auto",
              marginRight: "0.5rem",
              display: "flex",
              flexDirection: "row",
              gap: "1rem", // gap-4
              alignItems: "center",
              justifyContent: "center",
              float: "right", // float-right
            }}
          >
            {props.iconItems.map((item) => (
              <Link
                href={item.href}
                title={item.text}
                key={item.text}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Box
                  component={item.Icon}
                  sx={{
                    width: "1.5rem", // h-6 w-6
                    height: "1.5rem",
                    fill: "#94a3b8", // fill-slate-400
                    marginLeft: { xs: "0.25rem", md: "0.5rem" }, // mx-1 md:mx-2
                    marginRight: { xs: "0.25rem", md: "0.5rem" },
                    transitionProperty: "all", // transition-all
                    transitionDuration: "0.3s", // duration-300
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)", // ease-in-out (Tailwind default)
                    "&:hover": {
                      fill: "#f1f5f9", // hover:fill-slate-100
                    },
                  }}
                />
              </Link>
            ))}
          </Box>
        </Box>
      </MainWidth>
    </Box>
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
