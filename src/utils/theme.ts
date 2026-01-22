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
export const sky100 = "#e0f2fe"; // rgb(224 242 254)
export const indigo500 = "#6366f1";
export const indigo100 = "#e0e7ff"; // rgb(224 231 255)
export const fuchsia500 = "#d946ef";
export const fuchsia100 = "#fae8ff"; // rgb(250 232 255)
export const pink300 = "#f9a8d4";
export const pink500 = "#ec4899";
export const yellow500 = "#eab308";
export const emerald500 = "#10b981";
export const orange500 = "#f97316";
export const orange100 = "#ffedd5"; // rgb(255 237 213)
export const lime500 = "#84cc16";
export const teal100 = "#ccfbf1"; // rgb(204 251 241)
export const teal500 = "#14b8a6"; // rgb(20 184 166)
export const green100 = "#dcfce7"; // rgb(220 252 231)
export const green500 = "#22c55e"; // rgb(34 197 94)
export const amber100 = "#fef3c7"; // rgb(254 243 199)
export const amber500 = "#f59e0b"; // rgb(245 158 11)
export const red100 = "#fee2e2"; // rgb(254 226 226)
export const red500 = "#ef4444"; // rgb(239 68 68)
export const zinc100 = "#f4f4f5"; // rgb(244 244 245)
export const zinc500 = "#71717a"; // rgb(113 113 122)
export const violet100 = "#ede9fe"; // rgb(237 233 254)
export const violet500 = "#8b5cf6"; // rgb(139 92 246)

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
    callout: {
      sky: { bg: string; title: string };
      teal: { bg: string; title: string };
      green: { bg: string; title: string };
      amber: { bg: string; title: string };
      orange: { bg: string; title: string };
      red: { bg: string; title: string };
      indigo: { bg: string; title: string };
      zinc: { bg: string; title: string };
      fuchsia: { bg: string; title: string };
      violet: { bg: string; title: string };
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
      fgMain: string;
      bgDefault: string;
      fontFamily: string;
      fgLight: string;
      bgFocus2: string;
      codeinlineBg: string;
      codeinlineText: string;
      codeblockTitlebg: string;
      codeblockTitletext: string;
      codeblockBg: string;
      codeblockText: string;
      codeblockHighlightedbg: string;
      codeblockColoredA: string;
      codeblockColoredB: string;
      codeblockColoredC: string;
      codeblockColoredD: string;
      codeblockColoredE: string;
      codeblockColoredF: string;
    };
  }
  interface PaletteOptions {
    header: {
      background: string;
    };
    callout: {
      sky: { bg: string; title: string };
      teal: { bg: string; title: string };
      green: { bg: string; title: string };
      amber: { bg: string; title: string };
      orange: { bg: string; title: string };
      red: { bg: string; title: string };
      indigo: { bg: string; title: string };
      zinc: { bg: string; title: string };
      fuchsia: { bg: string; title: string };
      violet: { bg: string; title: string };
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
      fgMain: string;
      bgDefault: string;
      fontFamily: string;
      fgLight: string;
      bgFocus2: string;
      codeinlineBg: string;
      codeinlineText: string;
      codeblockTitlebg: string;
      codeblockTitletext: string;
      codeblockBg: string;
      codeblockText: string;
      codeblockHighlightedbg: string;
      codeblockColoredA: string;
      codeblockColoredB: string;
      codeblockColoredC: string;
      codeblockColoredD: string;
      codeblockColoredE: string;
      codeblockColoredF: string;
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
    divider: alpha(slate300, 0.5),
    header: {
      background: alpha(slate900, 0.75),
    },
    callout: {
      sky: { bg: sky100, title: sky500 },
      teal: { bg: teal100, title: teal500 },
      green: { bg: green100, title: green500 },
      amber: { bg: amber100, title: amber500 },
      orange: { bg: orange100, title: orange500 },
      red: { bg: red100, title: red500 },
      indigo: { bg: indigo100, title: indigo500 },
      zinc: { bg: zinc100, title: zinc500 },
      fuchsia: { bg: fuchsia100, title: fuchsia500 },
      violet: { bg: violet100, title: violet500 },
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
      fgMain: slate700, // --fg-main (for body text)
      bgDefault: slate50, // --bg-default (for body background)
      fontFamily: [
        "ui-sans-serif",
        "system-ui",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ].join(","), // --font-family
      fgLight: slate500, // --fg-light (for blockquote, etc.)
      bgFocus2: slate200, // --bg-focus2 (for blockquote, etc.)
      codeinlineBg: slate400, // --codeinline-bg
      codeinlineText: slate700, // --codeinline-text
      codeblockTitlebg: alpha(slate900, 0.9), // --codeblock-titlebg (#0f172ae6)
      codeblockTitletext: slate100, // --codeblock-titletext (rgb(241 245 249))
      codeblockBg: alpha(slate900, 0.85), // --codeblock-bg (#0f172ad9)
      codeblockText: slate200, // --codeblock-text (rgb(226 232 240))
      codeblockHighlightedbg: slate500, // --codeblock-highlightedbg
      codeblockColoredA: emerald500, // --codeblock-colored-a
      codeblockColoredB: indigo500, // --codeblock-colored-b
      codeblockColoredC: orange500, // --codeblock-colored-c
      codeblockColoredD: sky500, // --codeblock-colored-d
      codeblockColoredE: fuchsia500, // --codeblock-colored-e
      codeblockColoredF: lime500, // --codeblock-colored-f
    },
  },
  typography: {
    fontFamily: [
      "ui-sans-serif",
      "system-ui",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      '"Noto Color Emoji"',
    ].join(","),
    h1: {
      fontSize: "2.25rem", // text-4xl
      fontWeight: 700,
      lineHeight: 1.5,
    },
    h2: {
      fontSize: "1.875rem", // text-3xl
      fontWeight: 700,
      lineHeight: 1.5,
    },
    h3: {
      fontSize: "1.5rem", // text-2xl
      fontWeight: 700,
      lineHeight: 1.5,
    },
    h4: {
      fontSize: "1.25rem", // text-xl
      fontWeight: 700,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: "1.125rem", // text-lg
      fontWeight: 700,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: "1.125rem", // text-lg
      fontWeight: 700,
      lineHeight: 1.5,
    },
    body1: {
      lineHeight: "1.75rem", // leading-7 = 1.75rem = 28px
    },
  },
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: alpha(slate300, 0.5),
        },
      },
    },
  },
});
