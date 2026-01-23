import { Box } from "@mui/material";
import { default as RCMenu } from "rc-menu";
// import "rc-menu/assets/index.css";
import { CSSMotionProps } from "rc-motion";
import { ClickableMenu } from "./types";

const collapseNode = () => {
  return { height: 0 };
};
const expandNode = (node: HTMLElement) => {
  return { height: node.scrollHeight };
};

const horizontalMotion: CSSMotionProps = {
  motionName: "rc-menu-open-slide-up",
  motionAppear: true,
  motionEnter: true,
  motionLeave: true,
};

const verticalMotion: CSSMotionProps = {
  motionName: "rc-menu-open-zoom",
  motionAppear: true,
  motionEnter: true,
  motionLeave: true,
};

const inlineMotion: CSSMotionProps = {
  motionName: "rc-menu-collapse",
  motionAppear: true,
  onAppearStart: collapseNode,
  onAppearActive: expandNode,
  onEnterStart: collapseNode,
  onEnterActive: expandNode,
  onLeaveStart: expandNode,
  onLeaveActive: collapseNode,
};

const motionMap: Record<"horizontal" | "inline" | "vertical", CSSMotionProps> =
  {
    horizontal: horizontalMotion,
    inline: inlineMotion,
    vertical: verticalMotion,
  };

export type MenuProps = {
  items: ClickableMenu[];
  renderItem: (item: ClickableMenu) => React.ReactNode;
  mode?: "horizontal" | "vertical" | "inline";
};

export function Menu(props: MenuProps) {
  const { items, renderItem, mode = "horizontal" } = props;

  function itemToComponent(item: ClickableMenu) {
    const renderedItem = renderItem(item);
    if (item.children) {
      return (
        <RCMenu.SubMenu key={item.text} title={renderedItem}>
          {item.children.map((child) => itemToComponent(child))}
        </RCMenu.SubMenu>
      );
    }
    return <RCMenu.Item key={item.text}>{renderedItem}</RCMenu.Item>;
  }

  const menuItems = items.map((item) => itemToComponent(item));
  return (
    <Box
      className="DefaultLayoutMenu"
      sx={{
        backgroundColor: "transparent", // bg-transparent
        minWidth: "100%", // min-w-full
      }}
    >
      <RCMenu
        mode={mode}
        getPopupContainer={(node) => node.parentNode as HTMLElement}
        defaultMotions={motionMap}
      >
        {menuItems}
      </RCMenu>
    </Box>
  );
}
