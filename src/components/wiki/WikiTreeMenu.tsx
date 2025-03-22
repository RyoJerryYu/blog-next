"use client";
import { WikiTreeNode } from "@/core/indexing/index-building/wiki-tree-index-builder/types";
import { useContainerDimensions } from "@/hooks/use-container-dimensions";
import { ItemType } from "antd/es/menu/interface";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu } from "../antd/Menu";

export type WikiTreeMenuProps = {
  trees: WikiTreeNode[];
  currentSlugs: string[];
};

export function WikiTreeMenu(props: WikiTreeMenuProps) {
  const { currentSlugs, trees } = props;
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

  const [openKeys, setOpenKeys] = useState<string[]>([
    ...trees.map((tree) => wikiTreeNodeToKey(tree)),
    ...currentSlugs,
  ]);
  useEffect(() => {
    const rootKeys = trees.map((tree) => wikiTreeNodeToKey(tree));
    setOpenKeys([...rootKeys, ...currentSlugs]);
  }, [trees, currentSlugs]);

  const thisRef = useRef<HTMLDivElement>(null);
  const { width, height } = useContainerDimensions(thisRef);

  const items = trees.map((tree) => wikiTreeNodeToMenuItem(tree, 0));

  return (
    <div className="w-full h-full" ref={thisRef}>
      {width > 10 ? (
        <Menu
          className="bg-transparent"
          mode="inline"
          inlineIndent={10}
          items={items}
          openKeys={openKeys}
          onOpenChange={setOpenKeys}
          selectedKeys={currentSlugs.length > 0 ? currentSlugs : ["root"]}
        />
      ) : null}
    </div>
  );
}
