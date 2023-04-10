import { asset, Head } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/src/server/types.ts";
import Layout from "../components/Layout.tsx";
import { siteName } from "../utils/site.ts";

export default function App({ Component }: AppProps) {
  return (
    <html data-custom="data">
      <Head>
        <title>{siteName}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik+Glitch&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body
        class={`p-3 sm:p-6 text-gray-200 min-h-screen bg-gradient-to-b from-[#294E5F] to-[#A1E765]`}
      >
        <Layout>
          <Component />
        </Layout>
      </body>
    </html>
  );
}
