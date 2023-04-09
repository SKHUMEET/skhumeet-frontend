import React from "react";
import styled from "styled-components";

export default function Btn() {
  return (
    <>
      <SubmitBtn>작성하기</SubmitBtn>
    </>
  );
}

const SubmitBtn = styled.button`
  width: 5rem;
  padding: 5px;

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
