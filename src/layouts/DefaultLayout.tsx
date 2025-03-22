import {
  GitHubIcon,
  IconItem,
  PixivIcon,
  TwitterIcon,
} from "@/components/svgs";
import { KeyboardArrowRight } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Menu,
  MenuItem,
  PopoverOrigin,
  Slide,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import clsx from "clsx";
import Link from "next/link";
import React, { JSX, useState } from "react";
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
  children?: ClickableItem[];
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
      <props.Icon className="h-6 w-6 fill-gray-300 hover:fill-white transition-all ease-in-out mx-1 md:mx-2" />
    </Link>
  );
}

type DropdownState = {
  anchorEl: HTMLElement | null;
  isOpen: boolean;
  openMenu: (event: React.MouseEvent<HTMLElement>) => void;
  closeMenu: () => void;
};

function useDropdownState() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return { anchorEl, isOpen, openMenu, closeMenu };
}

type DropdownMenuProps = {
  id: string;
  items: ClickableItem[];
  anchorOrigin: PopoverOrigin;
  transformOrigin: PopoverOrigin;
  dropdownState: DropdownState;
};
function DropdownMenu(props: DropdownMenuProps) {
  return (
    <Menu
      id={props.id}
      anchorEl={props.dropdownState.anchorEl}
      anchorOrigin={props.anchorOrigin}
      transformOrigin={props.transformOrigin}
      open={props.dropdownState.isOpen}
      onClose={props.dropdownState.closeMenu}
      disableAutoFocusItem
      disableRestoreFocus
    >
      {props.items.map((item) => (
        <MenuItem key={item.text} onClick={props.dropdownState.closeMenu}>
          <Link href={item.href} className={style.dropdownitem}>
            {item.text}
          </Link>
        </MenuItem>
      ))}
    </Menu>
  );
}

function DropdownLink(props: ClickableMenu) {
  const dropdownState = useDropdownState();

  return (
    <>
      <Box onClick={dropdownState.openMenu} className={style.textlink}>
        {props.text}
        <KeyboardArrowRight
          className={clsx(dropdownState.isOpen && "rotate-90")}
        />
      </Box>
      <DropdownMenu
        id={`${props.text}-menu`}
        items={props.children ?? []}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        dropdownState={dropdownState}
      />
    </>
  );
}

function MenuBar(props: { items: ClickableMenu[] }) {
  return props.items.map((item) => (
    <div key={item.text} className="relative float-left mx-1 md:mx-2">
      {item.children ? <DropdownLink {...item} /> : <TextLink {...item} />}
    </div>
  ));
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
            <div className="ml-2 w-32 mr-2 md:mr-4">
              <TextLink {...homeItem} />
            </div>

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
    { href: "/ideas", text: "Ideas" },
    { href: "/learn_from_ai", text: "Learn from AI" },
    { href: "/tags", text: "Tags" },
    {
      href: "",
      text: "More",
      children: [
        { href: "/clips", text: "Clips" },
        { href: "/prev", text: "Preview" },
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
