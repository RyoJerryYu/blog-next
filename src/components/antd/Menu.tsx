import { MenuProps } from "antd";
import { dynamicLoading } from "../Loading/dynamic-loading";

const MenuDyn = dynamicLoading(async () => (await import("antd")).Menu);

export function Menu(props: MenuProps) {
  return <MenuDyn {...props} />;
}
