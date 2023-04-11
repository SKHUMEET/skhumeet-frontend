import React from "react";
import styled from "styled-components";
import { Category, Time, Title } from "./ListItem";
import { BsBookmark } from "react-icons/bs";
import { FaRegCommentAlt } from "react-icons/fa";
import { MAIN } from "@/types";
import { useRouter } from "next/router";

const ListCardItem = ({ item }: { item: MAIN }) => {
  return (
    <Container>
      <TitleWrapper>
        <Time>
          마감일: {item.endDate.toString()} | {item.nickname}
        </Time>
        <BsBookmark />
      </TitleWrapper>
      <Title>ListCardItem</Title>
      <Img src="/Test.jpg" alt="" />
      <TitleWrapper>
        <Category>모집 완료</Category>
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
