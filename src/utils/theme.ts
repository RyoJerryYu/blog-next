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
export const yellow500 = "#eab308";
export const emerald500 = "#10b981";
export const orange500 = "#f97316";
export const lime500 = "#84cc16";

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
      titletext: string;
      titlebg: string;
      highlightedbg: string;
      colored: {
        a: string;
        b: string;
        c: string;
        d: string;
        e: string;
        f: string;
      };
    };
    codeinline: {
      bg: string;
      text: string;
    };
    fg: {
      main: string;
      light: string;
    };
    bg: {
      focus: string;
      focus2: string;
    };
    border: {
      main: string;
      focus: string;
    };
    cssVars: {
      hover: string;
      line: string;
      link: string;
      yellow500: string;
      pink500: string;
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
      titletext: string;
      titlebg: string;
      highlightedbg: string;
      colored: {
        a: string;
        b: string;
        c: string;
        d: string;
        e: string;
        f: string;
      };
    };
    codeinline: {
      bg: string;
      text: string;
    };
    fg: {
      main: string;
      light: string;
    };
    bg: {
      focus: string;
      focus2: string;
    };
    border: {
      main: string;
      focus: string;
    };
    cssVars: {
      hover: string;
      line: string;
      link: string;
      yellow500: string;
      pink500: string;
    };
  }
}

export const muiTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: slate700,
    },
    text: {
      primary: slate700, // fg.DEFAULT
      secondary: slate500, // fg.light
    },
    background: {
      default: slate50, // bg.DEFAULT
      paper: slate100, // bg.focus
    },
    divider: slate400, // border.DEFAULT
    header: {
      background: alpha(slate900, 0.75),
    },
    codeblock: {
      darkBg: alpha(codeblock[900], 0.9),
      bg: alpha(codeblock[800], 0.9),
      text: alpha(codeblock[500], 0.9),
      selectedText: alpha(codeblock[300], 0.9),
      titletext: slate100, // codeblock.titletext
      titlebg: slate900, // codeblock.titlebg
      highlightedbg: slate500, // codeblock.highlightedbg
      colored: {
        a: emerald500, // emerald[500]
        b: indigo500, // indigo[500]
        c: orange500, // orange[500]
        d: sky500, // sky[500]
        e: fuchsia500, // fuchsia[500]
        f: lime500, // lime[500]
      },
    },
    codeinline: {
      bg: slate400, // codeinline.DEFAULT
      text: slate700, // codeinline.text
    },
    fg: {
      main: slate700, // fg.DEFAULT
      light: slate500, // fg.light
    },
    bg: {
      focus: slate100, // bg.focus
      focus2: slate200, // bg.focus2
    },
    border: {
      main: slate400, // border.DEFAULT
      focus: slate500, // border.focus
    },
    cssVars: {
      hover: "#edebef", // --hover
      line: "#8a829955", // --line (with alpha)
      link: pink500, // --link
      yellow500: yellow500, // --yellow-500 (for highlight-word)
      pink500: pink500, // --pink-500 (for tag-word)
    },
  },
  typography: {
    fontFamily: [
      "ui-sans-serif",
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      '"Noto Sans"',
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      '"Noto Color Emoji"',
    ].join(","),
    h1: {
      fontSize: "2.25rem", // text-4xl
      fontWeight: "bold",
      lineHeight: "normal", // leading-normal
    },
    h2: {
      fontSize: "1.875rem", // text-3xl
      fontWeight: "bold",
      lineHeight: "normal",
    },
    h3: {
      fontSize: "1.5rem", // text-2xl
      fontWeight: "bold",
      lineHeight: "normal",
    },
    h4: {
      fontSize: "1.25rem", // text-xl
      fontWeight: "bold",
      lineHeight: "normal",
    },
    h5: {
      fontSize: "1.125rem", // text-lg
      fontWeight: "bold",
      lineHeight: "normal",
    },
    h6: {
      fontSize: "1.125rem", // text-lg
      fontWeight: "bold",
      lineHeight: "normal",
    },
    body1: {
      lineHeight: 1.75, // leading-7 = 1.75rem = 28px
    },
  },
});
