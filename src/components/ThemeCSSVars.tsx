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
  }, [theme]);

  return null;
}

