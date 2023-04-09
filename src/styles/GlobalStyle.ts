import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
*{
    padding:0;
    margin:0;
    box-sizing:border-box
}

body{
    background: ${({ theme }) => theme.color.background};
    color:${({ theme }) => theme.color.text}
}

::selection {
    background-color: ${({ theme }) => theme.color.main};
  }`;
