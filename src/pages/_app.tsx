import components from "@/components";
import UniversalHead from "@/layouts/UniversalHead";
import "@/styles/globals.scss";
import { MDXProvider } from "@mdx-js/react";
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
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    </>
  );
}
