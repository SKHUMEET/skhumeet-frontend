import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
body{
    background: ${({ theme }) => theme.color.background};
    color:${({ theme }) => theme.color.text}
}`;
