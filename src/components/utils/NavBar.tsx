import React, { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import SidebarModal from "./SideModal";

interface MenuProps {
  isOpen: boolean;
}
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
            active={router.pathname === "/" ? "active" : ""}
            href="/"
          >
            한솥밥
          </LinkWrapper>{" "}
          <LinkWrapper
            active={router.pathname === "/a" ? "active" : ""}
            href="/"
          >
            어울림
          </LinkWrapper>{" "}
          <LinkWrapper
            active={router.pathname === "/b" ? "active" : ""}
            href="/"
          >
            동아리
          </LinkWrapper>{" "}
          <LinkWrapper
            active={router.pathname === "/c" ? "active" : ""}
            href="/"
          >
            기숙사
          </LinkWrapper>{" "}
          <LinkWrapper
            active={router.pathname === "/d" ? "active" : ""}
            href="/"
          >
            학부활동
          </LinkWrapper>
        </SidebarModal>
      </NavWrapper>
    </Nav>
  );
};

export default NavBar;
const Nav = styled.nav`
  display: flex;
  width: 100%;
  align-items: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  height: 7vh;
`;
const NavWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const Logo = styled.a`
  font-weight: bold;
  font-size: 1.5rem;
  text-decoration: none;
  height: 100%;
`;

// const MenuContainer = styled.div<MenuProps>`
//   display: flex;
//   flex-direction: column;
//   transition: all 0.5s ease-in-out;
//   ${({ isOpen, theme }) =>
//     isOpen
//       ? css`
//           position: absolute;
//           width: 30vw;
//           display: flex;
//           flex-direcion: column;
//           background-color: ${theme.color.background};
//           right: 0;
//           top: 6vh;
//         `
//       : css`
//           display: none;
//         `}
// `;

const LinkWrapper = styled(Link)<{ active: string }>`
  display: block;
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  color: ${(props) => props.theme.color.text};
  ${(props) =>
    props.active === "active" &&
    css`
      text-decoration: underline;
      text-decoration-color: grey;
      text-underline-offset: 8px;
    `};
`;
