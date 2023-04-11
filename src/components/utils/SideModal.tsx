import styled, { css } from "styled-components";

type SidebarProps = {
  isOpen: boolean;
};

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
    <Container>
      <HamburgerIcon isOpen={isOpen} onClick={handleToggle} />
      <Sidebar isOpen={isOpen}>{children}</Sidebar>
      <Overlay isOpen={isOpen} onClick={handleToggle}></Overlay>
    </Container>
  );
}

const Container = styled.div`
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.small}) {
    height: 8vh;
    background-color: white;
    margin-top: 0.7rem;
    padding-left: 1rem;
  }
`;

const HamburgerIcon = styled.div<SidebarProps>`
  display: flex;
  align-items: center;

  width: 30px;
  height: 7vh;
  margin-right: 10px;

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
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  position: fixed;
  top: 6vh;
  right: 10vw;
  width: 30vw;
  height: 80%;
  padding: 1rem;

  background-color: transparent;
  color: ${({ theme }) => theme.color.text};

  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(350%)")};
  transition: transform 0.3s ease-out;
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
    left: 83vw;
    align-content: flex-start;
    align-items: center;
    transform: translateX(0);
    height: 80%;
    justify-content: space-evenly;
  }
`;

const Overlay = styled.div<SidebarProps>`
  position: fixed;

  z-index: ${({ isOpen }) => (isOpen ? "2" : "-1")};
  transition: 0.5s;
  ${({ isOpen }) =>
    isOpen &&
    css`
      bottom: 0;
      top: 0;
      right: 10vw;
      width: 30vw;

      background: ${({ theme }) => theme.color.background};
      box-shadow: -6px 0px 4px 0px rgba(0, 0, 0, 0.1);
      border-left: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 10px;

      cursor: pointer;

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
    left: 83vw;
    height: 80%;
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
