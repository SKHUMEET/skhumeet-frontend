import React, { ReactNode } from "react";
import styled from "styled-components";

interface ModalContentProps {
  title: ReactNode;
  children: ReactNode;
  onClose: () => void;
}

export const ModalContent = ({
  title,
  children,
  onClose,
}: ModalContentProps) => {
  return (
    <Wrapper>
      <CloseButton>
        <div onClick={onClose}>x</div>
      </CloseButton>

      <HeaderWrapper>
        <div>{title}</div>
      </HeaderWrapper>
      <Content>
        <div>{children}</div>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 480px;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  background-color: #fff;
  overflow: scroll;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  text-align: center;
  font-size: 15pt;
`;

const CloseButton = styled.div`
  width: 100%;
  text-align: right;
  cursor: pointer;
  &:hover,
  &:active {
    color: lightgray;
  }
`;

const Content = styled.div`
  width: 100%;
`;
