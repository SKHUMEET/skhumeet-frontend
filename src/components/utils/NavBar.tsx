import React from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";

const NavBar = () => {
  const router = useRouter();

  return (
    <Nav>
      <NavWrapper>
        <LinkWrapper active={router.pathname === "/" ? "active" : ""} href="/">
          Home
        </LinkWrapper>
        <ThemeToggle />
      </NavWrapper>
    </Nav>
  );
};

export default NavBar;
const Nav = styled.nav`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;
const NavWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
const LinkWrapper = styled(Link)<{ active: string }>`
  font-weight: 600;
  font-size: 18px;
  margin: 0 20px 0 20px;
  color: ${(props) => props.theme.color.text};
  ${(props) =>
    props.active === "active" &&
    css`
      text-decoration: underline;
      text-decoration-color: grey;
      text-underline-offset: 8px;
    `};
`;
