import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import SidebarModal from "./SideModal";
import { ConvertKorean, Category } from "@/types";
import ToggleUser from "@/components/utils/ToggleUser";

const NavBar = () => {
  const category: Category[] = [
    "hansotbab",
    "eoullim",
    "study",
    "club",
    "contest",
    "department_event",
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
          <LogoWrapper>
            <Logo onClick={() => router.push("/")}>
              <LogoImg src="/Logo.svg" />
            </Logo>
          </LogoWrapper>
          <NavUser>
            <ToggleUser />
          </NavUser>
        </TopWrapper>
        <SidebarModal handleToggle={toggleMenu} isOpen={isOpen}>
          {category.map((el: Category) => (
            <LinkWrapper
              active={router.pathname.startsWith(`/${el}`)}
              href={`/${el}`}
              key={el}
            >
              {ConvertKorean[el]}
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
  align-items: center;

  position: sticky;
  width: 100%;
  height: 10vh;

  background: ${({ theme }) => theme.color.background};

  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  top: 0;
  width: calc(100%);
  background-color: white;
  width: 100%;
  height: 100%;

  padding: 0;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.large}) {
    padding-right: 0;

    box-shadow: 0px 7px 2px -7px ${({ theme }) => theme.color.hover};
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    padding-right: 40px;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: white;
`;

const Logo = styled.a`
  font-weight: bold;
  font-size: 1.5rem;
  text-decoration: none;

  :hover {
    /* box-shadow: 0px 0px 10px 1px ${({ theme }) => theme.color.main}; */
  }
`;

const LogoImg = styled.img`
  width: 80px;
`;

const NavUser = styled.div`
  display: flex;

  position: relative;
  width: 15%;
  height: 100%;

  text-align: end;
`;

const LinkWrapper = styled(Link)<{ active: boolean }>`
  display: flex;

  font-weight: 600;
  font-size: 18px;
  text-decoration: none;

  color: ${(props) => props.theme.color.text};

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
