import React, { ReactNode } from "react";
import styled from "styled-components";

export default function Btn({children,onClick}:{children:ReactNode,onClick:()=>void}) {
  return (
    <>
      <SubmitBtn onClick={onClick}>{children}</SubmitBtn>
    </>
  );
}

const SubmitBtn = styled.button`
  width: 5rem;
  margin-top: 1rem;
  padding: 2px 5px;

  background-color: ${({ theme }) => theme.color.main};
  
  color: white;
  border: 1px solid ${({ theme }) => theme.color.main};
  border-radius: 3px;

  text-align: center;

  :hover {
    background-color: white;
    color: ${({ theme }) => theme.color.main};
  }
`;
