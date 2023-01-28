import components from "@/components";
import "@/styles/globals.css";
import { MDXProvider } from "@mdx-js/react";
import "katex/dist/katex.min.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  );
}
