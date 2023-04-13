import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
@import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);

.notosanskr * { 
 font-family: 'Noto Sans KR', sans-serif;
}

*{
    font-family: 'Noto Sans KR', sans-serif;
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

mark{
  background-color:${({ theme }) => theme.color.light}
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
