import styled, { css } from "styled-components";

type SidebarProps = {
  isOpen: boolean;
};

const HamburgerIcon = styled.div<SidebarProps>`
  width: 30px;
  margin-right: 10px;
  height: 7vh;
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

  ${({ isOpen, theme }) =>
    isOpen
      ? css`
          z-index: 3;
          &::before {
            transform: rotate(45deg);
          }
          &::after {
            box-shadow: 0 0 0 ${theme.color.text};
            transform: rotate(-45deg);
          }
        `
      : css`
          &::before {
            transform: translateY(-8px);
          }
          &::after {
            box-shadow: 0 -8px 0 ${theme.color.text};
            transform: translateY(8px);
          }
        `}

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.large}) {
    display: none;
  }
`;

const Sidebar = styled.div<SidebarProps>`
  position: fixed;
  top: 6vh;
  right: 10vw;
  width: 20vw;
  padding: 1rem;
  background-color: transparent;
  color: ${({ theme }) => theme.color.text};
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(350%)")};
  transition: transform 0.3s ease-out;
  display: flex;
  flex-direction: column;
  z-index: ${({ isOpen }) => (isOpen ? "3" : "-1")};
  transition: 0.5s ease-in-out;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    right: 0vw;
    width: 40vw;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.small}) {
    width: 100vw;
  }
  /* 전체화면일 때 */
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.large}) {
    margin-left: 10px;
    width: 10vw;
    top: 10vh;
    z-index: 1;
    left: 80vw;
    align-content: flex-start;
    transform: translateX(0);
  }
`;

const Overlay = styled.div<SidebarProps>`
  position: fixed;
  bottom: 0;
  top: 0;
  right: 10vw;
  width: 20vw;
  z-index: ${({ isOpen }) => (isOpen ? "2" : "-1")};
  transition: 0.5s;

  ${({ isOpen }) =>
    isOpen &&
    css`
      cursor: pointer;
      background: ${({ theme }) => theme.color.background};
      box-shadow: -6px 0px 4px 0px rgba(0, 0, 0, 0.1);
      border-left: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 10px;
      backdrop-filter: blur(25px);
      transition: 0.5s;
    `}

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    right: 0vw;
    width: 40vw;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.small}) {
    width: 100vw;
  }
  /* 전체화면일 때 */
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.large}) {
    width: 10vw;
    left: 80vw;
    height: 20vh;
    top: 10vh;
    margin-left: 10px;
    background: ${({ theme }) => theme.color.background};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    backdrop-filter: blur(25px);
    transition: 0.5s;
  }
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
      <Overlay isOpen={isOpen} onClick={handleToggle}></Overlay>
    </>
  );
}
