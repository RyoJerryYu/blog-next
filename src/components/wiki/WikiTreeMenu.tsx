import { WikiTreeNode } from "@/core/indexing/index-building/wiki-tree-index-builder/types";
import { ItemType } from "antd/es/menu/interface";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "../antd/Menu";

export type WikiTreeMenuProps = {
  trees: WikiTreeNode[];
  currentSlugs: string[];
};

export function WikiTreeMenu(props: WikiTreeMenuProps) {
  const wikiTreeNodeToKey = (tree: WikiTreeNode) => {
    return tree.slugs.length > 0 ? tree.slugs[tree.slugs.length - 1] : "root";
  };
  const wikiTreeNodeToMenuItem = (
    tree: WikiTreeNode,
    layer: number
  ): ItemType => {
    const itemFields = {
      key: wikiTreeNodeToKey(tree),
      label: (
        <Link href={tree.pagePath} title={tree.title}>
          {tree.title}
        </Link>
      ),
      title: tree.title,
    };
    const item: ItemType =
      tree.children.length > 0
        ? {
            ...itemFields,
            type: "submenu",
            children: tree.children.map((child) =>
              wikiTreeNodeToMenuItem(child, layer + 1)
            ),
          }
        : {
            ...itemFields,
            type: "item",
          };
    return item;
  };
  const items = props.trees.map((tree) => wikiTreeNodeToMenuItem(tree, 0));
  const rootKeys = props.trees.map((tree) => wikiTreeNodeToKey(tree));

  const { currentSlugs } = props;
  const [openKeys, setOpenKeys] = useState<string[]>([
    ...rootKeys,
    ...currentSlugs,
  ]);
  useEffect(() => {
    setOpenKeys([...rootKeys, ...currentSlugs]);
  }, [currentSlugs]);

  return (
    <Menu
      mode="inline"
      items={items}
      openKeys={openKeys}
      onOpenChange={setOpenKeys}
      selectedKeys={currentSlugs.length > 0 ? currentSlugs : ["root"]}
    />
  );
}
