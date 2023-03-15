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
  width: 30vw;
  padding: 1rem;
  background-color: transparent;
  color: ${({ theme }) => theme.color.text};
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(150%)")};
  transition: transform 0.3s ease-out;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-wrap: wrap;
  align-content: flex-end;
  z-index: ${({ isOpen }) => (isOpen ? "3" : "-1")};
  transition: 0.5s ease-in-out;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    right: 0vw;
  }
`;

const Overlay = styled.div<SidebarProps>`
  position: fixed;
  bottom: 0;
  top: 0;
  right: 10vw;
  width: 30vw;
  background: ${({ theme }) => theme.color.background};
  z-index: ${({ isOpen }) => (isOpen ? "2" : "-1")};
  opacity: ${({ isOpen }) => (isOpen ? "0.5" : "0")};
  transition: opacity 0.3s ease-out;
  cursor: ${({ isOpen }) => (isOpen ? "pointer" : "default")};
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    right: 0vw;
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
      <Overlay isOpen={isOpen} onClick={handleToggle} />
    </>
  );
}
