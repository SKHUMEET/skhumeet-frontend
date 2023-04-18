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
  position: relative;
`;

const HamburgerIcon = styled.div<SidebarProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 7vh;

  padding-top: 10px;
  margin-right: 5px;
  top: 0;
  right: 0;
  cursor: pointer;
  position: fixed;

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

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    //중간사이즈는 right 10% 줘야함
    right: 10%;
  }
`;

const Sidebar = styled.div<SidebarProps>`
  position: fixed;
  transition: all 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  top: 6vh;
  height: 80%;
  ${({ isOpen }) =>
    !isOpen
      ? css`
          width: 0;
          right: -100vw;
        `
      : css`
          right: 0;
          z-index: 1;

          @media screen and (max-width: ${({ theme }) =>
              theme.breakpoints.large}) {
            //small~large
            width: 40vw;
          }

          @media screen and (max-width: ${({ theme }) =>
              theme.breakpoints.small}) {
            //~small
            //최소사이즈일 때
            width: 100vw;
          }
        `}

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.large}) {
    // 전체화면일 때
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    margin-left: 10px;
    width: 10vw;
    top: 10vh;
    z-index: 1; // overlay 보다 앞에 나오게 하기 위해
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
  transition: all 0.5s ease-in-out;
  ${({ isOpen }) =>
    !isOpen
      ? css`
          width: 0;
        `
      : css`
          bottom: 0;
          top: 0;
          right: 0;

          box-shadow: -6px 0px 4px 0px rgba(0, 0, 0, 0.1);
          border-left: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px;

          cursor: pointer;

          backdrop-filter: blur(25px);
          transition: 0.5s;
        `}

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.large}) {
    //small~large
    width: 40vw;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.small}) {
    //~small
    //최소사이즈일 때
    width: 100vw;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.large}) {
    //~large
    width: 10vw;
    left: 83vw;
    height: 80%;
    top: 10vh;
    margin-left: 10px;

    background: ${({ theme }) => theme.color.background};
    box-shadow: 0px 0px 5px -1.5px ${({ theme }) => theme.color.main};
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    backdrop-filter: blur(25px);
    transition: 0.5s;
  }
`;
