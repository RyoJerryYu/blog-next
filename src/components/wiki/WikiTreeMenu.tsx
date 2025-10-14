"use client";
import { WikiTreeNode } from "@/core/indexing/index-building/wiki-tree-index-builder/types";
import clsx from "clsx";
import Link from "next/link";
import { default as Menu } from "rc-menu";
// import "rc-menu/assets/index.css";
import { ItemType } from "rc-menu/lib/interface";
import { CSSMotionProps } from "rc-motion";
import { useEffect, useMemo, useState } from "react";

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

export type WikiTreeMenuProps = {
  trees: WikiTreeNode[];
  currentSlugs: string[];
};

const wikiTreeNodeToKey = (tree: WikiTreeNode) => {
  return tree.slugs.length > 0 ? tree.slugs.join("/") : "root";
};

const wikiTreeNodeToMenuItem = (tree: WikiTreeNode): ItemType => {
  const toLabel = (children: React.ReactElement) => {
    if (tree.pagePath) {
      return (
        <Link href={tree.pagePath} title={tree.title}>
          {children}
        </Link>
      );
    }
    return <span>{children}</span>;
  };
  const itemFields = {
    key: wikiTreeNodeToKey(tree),
    label: toLabel(<>{tree.title}</>),
    title: tree.title,
  };
  const item: ItemType =
    tree.children.length > 0
      ? {
          ...itemFields,
          type: "submenu",
          children: tree.children.map((child) => wikiTreeNodeToMenuItem(child)),
        }
      : {
          ...itemFields,
          type: "item",
        };
  return item;
};

const slugsToParentKeys = (slugs: string[]) => {
  const parentKeys = [];
  for (let i = 0; i < slugs.length; i++) {
    parentKeys.push(slugs.slice(0, i + 1).join("/"));
  }
  return parentKeys;
};

export function WikiTreeMenu(props: WikiTreeMenuProps) {
  const { currentSlugs, trees } = props;

  const [openKeys, setOpenKeys] = useState<string[]>([
    ...trees.map((tree) => wikiTreeNodeToKey(tree)),
    currentSlugs.join("/"),
  ]);
  useEffect(() => {
    const rootKeys = trees.map((tree) => wikiTreeNodeToKey(tree));
    setOpenKeys([...rootKeys, ...slugsToParentKeys(currentSlugs)]);
  }, [trees, currentSlugs]);

  const items = useMemo(
    () => trees.map((tree) => wikiTreeNodeToMenuItem(tree)),
    [trees]
  );

  return (
    <div className={clsx("w-full h-full", "WikiTreeMenu")}>
      <Menu
        mode="inline"
        inlineIndent={10}
        items={items}
        openKeys={openKeys}
        onOpenChange={setOpenKeys}
        selectedKeys={
          currentSlugs.length > 0 ? [currentSlugs.join("/")] : ["root"]
        }
        defaultMotions={motionMap}
      />
    </div>
  );
}
