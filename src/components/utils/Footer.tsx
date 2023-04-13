import styled from "styled-components";

export default function Footer() {
  return (
    <Container>
      <p>박지영, 이한길, 이지윤, 이은지</p>
      <p>Copyright © 2023 SKHUMEET. All rights reserved.</p>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  bottom: 0;
  margin-top: 1rem;
  padding: 1rem 0;

  color: ${({ theme }) => theme.color.hover};
  border-top: 1px solid ${({ theme }) => theme.color.light};
  /* box-shadow: 0px -1px 2px ${({ theme }) => theme.color.hover}; */

  font-size: 13px;
  line-height: 170%;
`;
