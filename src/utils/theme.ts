import { alpha, createTheme } from "@mui/material/styles";
import { ThemeConfig } from "antd";

const white = "#ffffff";
const black = "#000000";

const slate50 = "#f8fafc";
const slate100 = "#f1f5f9";
const slate200 = "#e2e8f0";
const slate300 = "#cbd5e1";
const slate400 = "#94a3b8";
const slate500 = "#64748b";
const slate600 = "#475569";
const slate700 = "#334155";
const slate800 = "#1e293b";
const slate900 = "#0f172a";

const gray900 = "#111827";
const sky500 = "#0ea5e9";
const indigo500 = "#6366f1";
const fuchsia500 = "#d946ef";
const pink300 = "#f9a8d4";
const pink500 = "#ec4899";

declare module "@mui/material/styles" {
  interface Palette {
    header: {
      background: string;
    };
  }
  interface PaletteOptions {
    header: {
      background: string;
    };
  }
}

export const muiTheme = createTheme({
  palette: {
    header: {
      background: alpha(slate900, 0.75),
    },
  },
});

export const antdTheme: ThemeConfig = {
  components: {
    Menu: {
      itemHoverColor: sky500,
      horizontalItemHoverColor: sky500,

      itemSelectedColor: pink500,
      subMenuItemSelectedColor: pink500,
      horizontalItemSelectedColor: pink500,
      itemSelectedBg: alpha(slate900, 0.75),
      horizontalItemSelectedBg: slate700,
    },
  },
};
