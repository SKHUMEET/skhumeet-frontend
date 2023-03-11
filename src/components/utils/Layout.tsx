// 레이아웃
import NavBar from "@/components/utils/NavBar";

import React from "react";
import styled from "styled-components";
const Layout = ({ children, onChangeColorMode, isDark }: any) => {
  return (
    <LayoutContainer>
      <LayoutWrapper>
        <NavBar onChangeColorMode={onChangeColorMode} isDark={isDark} />
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </LayoutWrapper>
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.color.backgroundColor};
  color: ${(props) => props.theme.color.textColor};
`;
const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 60vw;
  min-height: 100vh;

  @media screen and (max-width: ${(props) => props.theme.breakpoints.large}) {
    width: 80vw;
  }
  @media screen and (max-width: ${(props) => props.theme.breakpoints.medium}) {
    width: 90vw;
  }
  @media screen and (max-width: ${(props) => props.theme.breakpoints.small}) {
    width: 95vw;
  }
`;

const ChildrenWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
