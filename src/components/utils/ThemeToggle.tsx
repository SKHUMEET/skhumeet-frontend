import React, { useContext } from "react";
import styled from "styled-components";
import { CustomThemeContext } from "@/context/ThemeProvider";

function ThemeToggle() {
  const { theme, onChangeTheme } = useContext(CustomThemeContext);
  return (
    <ToggleWrapper onClick={onChangeTheme}>
      {theme === "light" ? "🌞" : "🌕"}
    </ToggleWrapper>
  );
}

export default ThemeToggle;

const ToggleWrapper = styled.button`
  background-color: ${({ theme }) => theme.color.background};
  border: 1px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 46px;
  height: 30px;
  border-radius: 30px;
  box-shadow: 0px 0.5px 2px grey;
`;
