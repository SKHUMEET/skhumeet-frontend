import Layout from "@/components/utils/Layout";
import type { AppProps } from "next/app";
import { useState } from "react";
import { lightTheme, darkTheme } from "@/styles/theme";
import { ThemeProvider } from "styled-components";
export default function App({ Component, pageProps }: AppProps) {
  const [isDark, setIsDark] = useState(false);
  const _toggleSwitch = () => setIsDark(!isDark);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Layout onChangeColorMode={_toggleSwitch} isDark={isDark}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
