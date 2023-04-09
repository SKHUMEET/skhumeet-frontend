import React, { useState } from "react";
import Layout from "@/components/utils/Layout";
import type { AppProps } from "next/app";
import { lightTheme, darkTheme } from "@/styles/theme";
import ThemeProvider from "@/context/ThemeProvider";
import { GlobalStyle } from "../styles/GlobalStyle";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Head from "next/head";
export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <Head>
        <script
          src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js"
          async
        />
      </Head>

      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <GlobalStyle />
          <Layout>
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
            </Hydrate>
          </Layout>
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
