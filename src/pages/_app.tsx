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
export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
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
  );
}
