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
