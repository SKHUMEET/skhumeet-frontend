import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'NanumSquareNeo-Variable';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

*{
  /* font-family: 'Noto Sans KR', sans-serif; */
  /* font-family: 'Nanum Gothic', sans-serif; */
  font-family: 'NanumSquareNeo-Variable';
  padding:0;
  margin:0;
  box-sizing:border-box
}

body{
  background: ${({ theme }) => theme.color.background};
  color:${({ theme }) => theme.color.text};
}

::selection {
  background-color: ${({ theme }) => theme.color.main};
}
/* html::-webkit-scrollbar {
  width: 1rem;
}
html::-webkit-scrollbar-track {
  background: ${({ theme }) => theme.color.background};
}
html::-webkit-scrollbar-thumb {
  background:${({ theme }) => theme.color.main}
  
} */
`;
