import { alpha, createTheme } from "@mui/material/styles";

export const white = "#ffffff";
export const black = "#000000";

export const slate50 = "#f8fafc";
export const slate100 = "#f1f5f9";
export const slate200 = "#e2e8f0";
export const slate300 = "#cbd5e1";
export const slate400 = "#94a3b8";
export const slate500 = "#64748b";
export const slate600 = "#475569";
export const slate700 = "#334155";
export const slate800 = "#1e293b";
export const slate900 = "#0f172a";

export const gray300 = "#d1d5db";
export const gray900 = "#111827";
export const sky500 = "#0ea5e9";
export const indigo500 = "#6366f1";
export const fuchsia500 = "#d946ef";
export const pink300 = "#f9a8d4";
export const pink500 = "#ec4899";

export const codeblock = {
  900: "#0f172a",
  800: "#30374c",
  700: "#4f556c",
  600: "#626880",
  500: "#8a90a9",
  400: "#aab0cb",
  300: "#ced4f0",
  200: "#dfe5ff",
  100: "#e9f0ff",
  50: "#f1f7ff",
};

export const codeblockSecondary = {
  900: "#2a220f",
  800: "#4d432f",
  700: "#6d624d",
  600: "#827660",
  500: "#ac9f88",
  400: "#cbbea6",
  300: "#eee1c8",
  200: "#fceed5",
  100: "#fff4db",
  50: "#fff9e0",
};

declare module "@mui/material/styles" {
  interface Palette {
    header: {
      background: string;
    };
    codeblock: {
      darkBg: string;
      bg: string;
      text: string;
      selectedText: string;
    };
  }
  interface PaletteOptions {
    header: {
      background: string;
    };
    codeblock: {
      darkBg: string;
      bg: string;
      text: string;
      selectedText: string;
    };
  }
}

export const muiTheme = createTheme({
  palette: {
    header: {
      background: alpha(slate900, 0.75),
    },
    codeblock: {
      darkBg: alpha(codeblock[900], 0.9),
      bg: alpha(codeblock[800], 0.9),
      text: alpha(codeblock[500], 0.9),
      selectedText: alpha(codeblock[300], 0.9),
    },
  },
});
