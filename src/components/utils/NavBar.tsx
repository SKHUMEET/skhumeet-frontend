import React, { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import SidebarModal from "./SideModal";
import { CategoryKorean, Category } from "@/types";

const NavBar = () => {
  const category: Category[] = [
    "hansotbab",
    "eoullim",
    "study",
    "club",
    "contest",
    "departmentEvent",
    "etc",
  ];

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [router]);

  return (
    <Nav>
      <NavWrapper>
        <TopWrapper>
          <LogoWraper>
            <Logo onClick={() => router.push("/")}>로고</Logo>
          </LogoWraper>
        </TopWrapper>
        <SidebarModal handleToggle={toggleMenu} isOpen={isOpen}>
          {category.map((el: Category) => (
            <LinkWrapper
              active={router.pathname.startsWith(`/${el}`)}
              href={`/${el}`}
              key={el}
            >
              {CategoryKorean[el]}
            </LinkWrapper>
          ))}
        </SidebarModal>
      </NavWrapper>
    </Nav>
  );
};

export default NavBar;
const Nav = styled.nav`
  top: 0;
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

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  top: 0;
  width: 100%;
  posision: fixed;
  height: 7vh;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.large}) {
    border-bottom: 2px solid ${({ theme }) => theme.color.main};
  }
`;
const LogoWraper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Logo = styled.a`
  font-weight: bold;
  font-size: 1.5rem;
  text-decoration: none;
  height: 100%;
  :hover {
    color: ${({ theme }) => theme.color.hover};
    box-shadow: 0px 0px 10px 1px ${({ theme }) => theme.color.main};
  }
`;

const LinkWrapper = styled(Link)<{ active: boolean }>`
  display: flex;
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  color: ${(props) => props.theme.color.text};
  margin: 5px;
  ${(props) =>
    props.active &&
    css`
      text-decoration: underline;
      /* color: ${props.theme.color.hover}; */
      text-underline-offset: 8px;
    `};
  :hover {
    color: ${(props) => props.theme.color.hover};
  }
`;
