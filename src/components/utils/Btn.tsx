import React, { ReactNode, ButtonHTMLAttributes } from "react";
import styled from "styled-components";

type BtnProps = {
  children: ReactNode;
  onClick: () => void;
  color?: string;
  disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Btn({
  children,
  onClick,
  color,
  disabled,
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

export const SubmitBtn = styled.button<{ color?: string }>`
  width: 5rem;
  /* margin-top: 1rem; */
  margin-left: 5px;
  padding: 2px 5px;

  background-color: ${({ theme, color }) => color ?? theme.color.main};
  color: ${({ theme }) => theme.color.background};
  border: 1px solid ${({ theme, color }) => color ?? theme.color.main};
  border-radius: 3px;

  text-align: center;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.color.background};
    color: ${({ theme, color }) => color ?? theme.color.main};
  }
`;
