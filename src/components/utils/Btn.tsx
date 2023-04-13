import React, { ReactNode, ButtonHTMLAttributes } from "react";
import styled, { css } from "styled-components";

type BtnProps = {
  children: ReactNode;
  onClick: () => void;
  color?: string;
  disabled?: boolean;
  css?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Btn({
  children,
  onClick,
  color,
  disabled,
  css: extraCss,
  ...props
}: BtnProps) {
  return (
    <>
      <SubmitBtn onClick={onClick} color={color} disabled={disabled} {...props}>
        {children}
      </SubmitBtn>
    </>
  );
}

const SubmitBtn = styled.button<{ color?: string }>`
  width: 5rem;
  /* margin-top: 1rem; */
  margin-left: 5px;
  padding: 2px 5px;

  background-color: ${({ theme, color }) => color ?? theme.color.main};
  color: white;
  border: 1px solid ${({ theme, color }) => color ?? theme.color.main};
  border-radius: 3px;

  text-align: center;

  &:hover:not(:disabled) {
    background-color: white;
    color: ${({ theme, color }) => color ?? theme.color.main};
  }
`;
