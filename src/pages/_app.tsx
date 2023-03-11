import Layout from "@/components/utils/Layout";
import type { AppProps } from "next/app";
import { useState } from "react";
import { lightTheme, darkTheme } from "@/styles/theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/GlobalStyle";
export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const _toggleSwitch = () =>
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Layout onChangeColorMode={_toggleSwitch} theme={theme}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
