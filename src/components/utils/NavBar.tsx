import React, { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import SidebarModal from "./SideModal";

const NavBar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <Nav>
      <NavWrapper>
        <Logo>로고</Logo>
        <SidebarModal handleToggle={toggleMenu} isOpen={isOpen}>
          <LinkWrapper
            active={router.pathname === "/hansotbab" ? "active" : ""}
            href="/hansotbab"
          >
            한솥밥
          </LinkWrapper>{" "}
          <LinkWrapper
            active={router.pathname === "/eoullim" ? "active" : ""}
            href="/eoullim"
          >
            어울림
          </LinkWrapper>{" "}
        </SidebarModal>
      </NavWrapper>
    </Nav>
  );
};

export default NavBar;
const Nav = styled.nav`
  top: 0;
  display: sticky;
  width: 100%;
  align-items: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  height: 7vh;
  position: sticky;
  background: ${({ theme }) => theme.color.background};
`;
const NavWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.a`
  font-weight: bold;
  font-size: 1.5rem;
  text-decoration: none;
  height: 100%;
`;

const LinkWrapper = styled(Link)<{ active: string }>`
  display: flex;
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  color: ${(props) => props.theme.color.text};
  margin: 5px;
  ${(props) =>
    props.active === "active" &&
    css`
      /* text-decoration: underline; */
      color: ${props.theme.color.hover};
      /* text-underline-offset: 8px; */
    `};
  :hover {
    color: ${(props) => props.theme.color.hover};
  }
`;
