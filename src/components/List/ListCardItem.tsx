import React from "react";
import styled from "styled-components";
import { Status, Time, Title } from "./ListItem";

import { FaRegCommentAlt } from "react-icons/fa";
import { MAIN, formDate } from "@/types";

const ListCardItem = ({ item }: { item: MAIN }) => {
  return (
    <Container>
      <TitleWrapper>
        <Time>마감일: {formDate(item.endDate)}</Time>
      </TitleWrapper>
      <Title>ListCardItem</Title>
      <Img src="/Test.jpg" alt="" />
      <TitleWrapper>
        <Status>모집 완료</Status>
        <FaRegCommentAlt />
      </TitleWrapper>
    </Container>
  );
};

export default ListCardItem;

const Container = styled.div`
  height: 44.5vh;
  margin: 2px 5px;
  padding: 10px 15px;

  border: 1px solid #c3c3c3;
  border-radius: 1rem;
`;

const Img = styled.img`
  width: 100%;
  margin: 20px 0;

  border-radius: 5px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
