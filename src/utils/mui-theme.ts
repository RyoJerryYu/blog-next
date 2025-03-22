import { alpha, createTheme } from "@mui/material/styles";

const gray900 = "#111827";

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

export const theme = createTheme({
  palette: {
    header: {
      background: alpha(gray900, 0.75),
    },
  },
});
