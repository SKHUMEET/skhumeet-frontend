import React from "react";
import styled from "styled-components";
import { BsBookmark } from "react-icons/bs";
import { FaRegCommentAlt } from "react-icons/fa";

//  북마크,댓글개수,제목,현황,마감일, 작성자
const ListItem = () => {
  return (
    <Container>
      <TitleWrapper>
        <BsBookmark style={{ marginRight: "5px" }} />
        <div>
          <Category>모집 완료</Category>
          <Title>ListItem</Title>
          <Time>작성일: 2023-04-09 | 이은지</Time>
        </div>
      </TitleWrapper>
      <FaRegCommentAlt />
    </Container>
  );
};

export default ListItem;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding-bottom: 10px;

  border-bottom: 1px solid #d3d3d3;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Category = styled.span`
  width: fit-content;
  padding: 2px 5px;
  margin-bottom: 3px;

  background-color: #68bd3081;
  color: black;
  border-radius: 1rem;

  font-size: 11px;
  text-align: center;
`;

export const Title = styled.div`
  font-weight: 600;
`;

export const Time = styled.span`
  margin-bottom: 10px;

  color: #999999;
  font-size: 11px;
`;
