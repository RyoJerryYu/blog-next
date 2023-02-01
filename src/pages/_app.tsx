import components from "@/components";
import UniversalHead from "@/layouts/UniversalHead";
import "@/styles/globals.scss";
import { MDXProvider } from "@mdx-js/react";
import { Montserrat } from "@next/font/google";
import "katex/dist/katex.min.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <UniversalHead />
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    </>
  );
}
