import clsx from "clsx";
import { default as RCMenu } from "rc-menu";
// import "rc-menu/assets/index.css";
import { ClickableMenu } from "./types";

export type MenuProps = {
  items: ClickableMenu[];
  renderItem: (item: ClickableMenu) => React.ReactNode;
};

export function Menu(props: MenuProps) {
  const { items, renderItem } = props;

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
    <div className={clsx("DefaultLayoutMenu", "bg-transparent min-w-full")}>
      <RCMenu
        mode="horizontal"
        getPopupContainer={(node) => node.parentNode as HTMLElement}
      >
        {menuItems}
      </RCMenu>
    </div>
  );
}
