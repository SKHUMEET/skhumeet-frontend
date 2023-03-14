import { useState } from "react";
import styled from "styled-components";

type SidebarProps = {
  isOpen: boolean;
};

const HamburgerIcon = styled.div<SidebarProps>`
  width: 30px;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  &::before,
  ::after {
    content: "";
    position: absolute;
    width: 30px;
    height: 2px;
    background: ${({ theme }) => theme.color.text};
    transition: 0.5s;
  }

  &::before {
    transform: ${({ isOpen }) =>
      isOpen ? "rotate(45deg)" : "translateY(-8px)"};
  }
  &::after {
    box-shadow: ${({ isOpen, theme }) =>
      isOpen ? `0 0 0 ${theme.color.text}` : `0 -8px 0 ${theme.color.text}`};
    transform: ${({ isOpen }) =>
      isOpen ? "rotate(-45deg)" : "translateY(8px)"};
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.large}) {
    display: none;
  }
`;

const Sidebar = styled.div<SidebarProps>`
  position: fixed;
  top: 6vh;
  right: 0;
  width: 150px;
  padding: 1rem;
  background-color: transparent;
  color: #fff;
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-out;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Overlay = styled.div<SidebarProps>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${({ isOpen }) => (isOpen ? "99" : "-1")};
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  transition: opacity 0.3s ease-out;
  cursor: ${({ isOpen }) => (isOpen ? "pointer" : "default")};
`;

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  handleToggle: () => void;
};

export default function SidebarModal({
  children,
  isOpen,
  handleToggle,
}: Props) {
  return (
    <>
      <HamburgerIcon isOpen={isOpen} onClick={handleToggle} />
      <Sidebar isOpen={isOpen}>{children}</Sidebar>
      <Overlay isOpen={isOpen} onClick={handleToggle} />
    </>
  );
}
