import { GlobalScriptProvider } from "@/hooks/use-global-Script";
import UniversalHead from "@/layouts/UniversalHead";
import "@/styles/DefaultLayout.Menu.scss";
import "@/styles/components/wiki.WikiTreeMenu.scss";
import "@/styles/globals.scss";
import { muiTheme } from "@/utils/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "katex/dist/katex.min.css";
import type { AppProps } from "next/app";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <UniversalHead />
      {/* <!-- Google tag (gtag.js) --> */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-1Y0XYKX8HY"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-1Y0XYKX8HY');`}
      </Script>
      <GlobalScriptProvider>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          {/* ThemeCSSVars 组件已移除，MUI 的 cssVariables: true 会自动处理 CSS 变量 */}
          <Component {...pageProps} />
        </ThemeProvider>
      </GlobalScriptProvider>
    </>
  );
}
