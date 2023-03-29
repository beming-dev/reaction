import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>반응속도 테스트</title>
        <meta name="description" content="반응속도를 측정해보세요!" />
        <meta name="keywords" content="반응속도, 테스트" />
        <meta name="robots" content="index, follow" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4911380706120456"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
