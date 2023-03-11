import Layout from "@/components/utils/Layout";
import type { AppProps } from "next/app";
import { useState } from "react";
import { lightTheme, darkTheme } from "@/styles/theme";
import ThemeProvider from "@/context/ThemeProvider";
import { GlobalStyle } from "../styles/GlobalStyle";
export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const _toggleSwitch = () =>
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));

  return (
    <ThemeProvider>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
