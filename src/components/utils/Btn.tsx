import React, { ReactNode } from "react";
import styled from "styled-components";

export default function Btn({
  children,
  onClick,
  color,
}: {
  children: ReactNode;
  onClick: () => void;
  color?: string;
}) {
  return (
    <>
      <SubmitBtn onClick={onClick} color={color}>
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

  :hover {
    background-color: white;
    color: ${({ theme, color }) => color ?? theme.color.main};
  }
`;
