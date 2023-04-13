import React, { ReactNode } from "react";
import styled from "styled-components";
import NavBar from "@/components/utils/NavBar";

interface LayoutProps {
  children: ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <LayoutWrapper>
        <NavBar />
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </LayoutWrapper>
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.color.background};
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
    width: 100vw;
  }
`;

const ChildrenWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;
