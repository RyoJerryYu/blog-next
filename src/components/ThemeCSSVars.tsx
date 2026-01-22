import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";

/**
 * 将 MUI theme 中的 CSS 变量值注入到 :root
 * 这样 globals.scss 中的 CSS 变量就可以从 theme 获取值了
 */
export default function ThemeCSSVars() {
  const theme = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--hover", theme.palette.cssVars.hover);
    root.style.setProperty("--line", theme.palette.cssVars.line);
    root.style.setProperty("--link", theme.palette.cssVars.link);
    root.style.setProperty("--yellow-500", theme.palette.cssVars.yellow500);
    root.style.setProperty("--pink-500", theme.palette.cssVars.pink500);
    root.style.setProperty("--fg-main", theme.palette.cssVars.fgMain);
    root.style.setProperty("--bg-default", theme.palette.cssVars.bgDefault);
    root.style.setProperty("--font-family", theme.palette.cssVars.fontFamily);
    root.style.setProperty("--fg-light", theme.palette.cssVars.fgLight);
    root.style.setProperty("--bg-focus2", theme.palette.cssVars.bgFocus2);
    root.style.setProperty("--codeinline-bg", theme.palette.cssVars.codeinlineBg);
    root.style.setProperty("--codeinline-text", theme.palette.cssVars.codeinlineText);
    root.style.setProperty("--codeblock-titlebg", theme.palette.cssVars.codeblockTitlebg);
    root.style.setProperty("--codeblock-titletext", theme.palette.cssVars.codeblockTitletext);
    root.style.setProperty("--codeblock-bg", theme.palette.cssVars.codeblockBg);
    root.style.setProperty("--codeblock-text", theme.palette.cssVars.codeblockText);
    root.style.setProperty("--codeblock-highlightedbg", theme.palette.cssVars.codeblockHighlightedbg);
    root.style.setProperty("--codeblock-colored-a", theme.palette.cssVars.codeblockColoredA);
    root.style.setProperty("--codeblock-colored-b", theme.palette.cssVars.codeblockColoredB);
    root.style.setProperty("--codeblock-colored-c", theme.palette.cssVars.codeblockColoredC);
    root.style.setProperty("--codeblock-colored-d", theme.palette.cssVars.codeblockColoredD);
    root.style.setProperty("--codeblock-colored-e", theme.palette.cssVars.codeblockColoredE);
    root.style.setProperty("--codeblock-colored-f", theme.palette.cssVars.codeblockColoredF);
  }, [theme]);

  return null;
}

