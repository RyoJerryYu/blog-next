import { IconItem } from "@/components/svgs";
import { JSX } from "react";

/**
 * ClickableItem is a clickable item that can be used in the header and footer.
 * Usually be a link to a page.
 */
export type ClickableItem = {
  href: string;
  text: string;
};

/**
 * ClickableIcon is a clickable icon that can be used in the header and footer.
 * Usually be a link to a social media page.
 */
export type ClickableIcon = ClickableItem & {
  Icon: (props: IconItem) => JSX.Element;
};

/**
 * ClickableMenu is a clickable menu that can be used in the header and footer.
 * Usually have children menu items.
 */
export type ClickableMenu = ClickableItem & {
  children?: ClickableMenu[];
};
