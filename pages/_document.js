import { poppins } from "../components/ClientPortal/ClientPortal";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className={poppins.className}>
      <Head />
      <body >
        <Main />
        <div id="loading-modal" />
        <NextScript />
      </body>
    </Html>
  );
}