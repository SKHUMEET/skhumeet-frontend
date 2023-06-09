import React, { ReactNode, MouseEvent } from "react";
import styled from "styled-components";
import { ModalPortalWrap } from "./ModalPortal";

interface ModalProps {
  children: ReactNode;
  show: boolean;
  onClose: () => void;
  backdropColor?: string;
}

export const Modal = ({
  show,
  children,
  onClose,
  backdropColor,
}: ModalProps) => {
  const onClickBackDrop = (e: MouseEvent<HTMLDivElement>) => {
    const { target } = e;
    if ((target as HTMLElement).id !== "modal-backdrop") {
      return;
    }
    onClose();
  };

  if (!show) {
    return null;
  }

  return (
    <ModalPortalWrap>
      <BackDrop
        id="modal-backdrop"
        onClick={onClickBackDrop}
        backdropColor={backdropColor}
      >
        {children}
      </BackDrop>
    </ModalPortalWrap>
  );
};

const BackDrop = styled.div<{ backdropColor?: string }>`
  width: 100vw;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${({ backdropColor }) =>
    backdropColor ?? "rgba(0, 0, 0, 0.4)"};
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
`;
