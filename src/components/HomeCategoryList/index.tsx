import { Box, Typography } from "@mui/material";
import clsx from "clsx";
import Link from "next/link";
import style from "./HomeCategoryList.module.scss";

export type HomeCategoryItem = {
  title: string;
  href: string;
  charUrl?: string;
  BgComponent: React.FC<{ className?: string }>;
};
export type HomeCategoryListProps = {
  items: HomeCategoryItem[];
};
export default function HomeCategoryList(props: HomeCategoryListProps) {
  const { items } = props;
  return (
    <Box component="ul" className={style.list} sx={{ listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((item) => (
        <Box
          component="li"
          key={item.title}
          className={style.listItem}
          sx={{
            "&:before": {
              backgroundColor: "rgba(0, 0, 0, 0.5)", // before:bg-black before:bg-opacity-50
              transitionProperty: "all",
              transitionDuration: "0.3s",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            },
            "&:hover:before": {
              backgroundColor: "rgba(0, 0, 0, 0.2)", // hover:before:bg-opacity-20
            },
            // group-hover effects: when parent li is hovered, apply styles to children
            "&:hover .group-hover-target": {
              color: "rgb(241, 245, 249)", // group-hover:text-slate-100
            },
            "&:hover .group-hover-bg": {
              transform: "scale(1.1)", // group-hover:scale-110
            },
            "&:hover .group-hover-border": {
              opacity: 0.9, // group-hover:opacity-90
            },
            "&:hover .group-hover-charactor": {
              opacity: 1, // group-hover:opacity-100
              transform: "translateX(8rem)", // group-hover:translate-x-32
            },
          }}
        >
          <Link
            href={item.href}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Box
              className={clsx(style.hoverAnimation, "group-hover-target")}
              sx={{
                color: "rgb(203, 213, 225)", // text-slate-300
                transitionProperty: "all",
                transitionDuration: "0.3s",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <Box
                className={clsx(style.bg, "group-hover-bg")}
                sx={{
                  transitionProperty: "all",
                  transitionDuration: "0.3s",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <Box
                  sx={{
                    minWidth: "100%", // min-w-full
                    minHeight: "100%", // min-h-full
                    "& > *": {
                      minWidth: "100%",
                      minHeight: "100%",
                    },
                  }}
                >
                  <item.BgComponent />
                </Box>
              </Box>
              <Typography
                className={clsx(style.title, "group-hover-target")}
                sx={{
                  fontSize: "1.875rem", // text-3xl
                  lineHeight: "2.25rem", // text-3xl line-height
                  color: "rgb(203, 213, 225)", // text-slate-300
                  transitionProperty: "all",
                  transitionDuration: "0.3s",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {item.title}
              </Typography>
              <Box
                className={clsx(style.border, "group-hover-border")}
                sx={{
                  borderWidth: "4px", // border-4
                  opacity: 0, // opacity-0
                  transitionProperty: "all",
                  transitionDuration: "0.3s",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
              {item.charUrl && (
                <Box
                  component="img"
                  src={item.charUrl}
                  alt="some text"
                  className={clsx(style.charactor, "group-hover-charactor")}
                  sx={{
                    opacity: 1, // opacity-100
                    transitionProperty: "all",
                    transitionDuration: "0.3s",
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
              )}
            </Box>
          </Link>
        </Box>
      ))}
    </Box>
  );
}
