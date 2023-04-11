import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { BsBookmark } from "react-icons/bs";
import { FaRegCommentAlt } from "react-icons/fa";
import { MAIN } from "@/types";
import { useRouter } from "next/router";

//  북마크,댓글개수,제목,현황,마감일, 작성자
const ListItem = ({ item }: { item: MAIN }) => {
  const theme = useContext(ThemeContext);

  return (
    <Container>
      <TitleWrapper>
        <BsBookmark style={{ marginRight: "5px" }} />
        <div>
          <Category color={theme.color.light}>모집 완료</Category>
          <Title>{item.title}</Title>
          <Time>
            마감일: {item.endDate.toLocaleString()} | {item.nickname}
          </Time>
        </div>
      </TitleWrapper>
      <CommentWrapper>
        <FaRegCommentAlt /> 0
      </CommentWrapper>
    </Container>
  );
};

export default ListItem;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-right: 1rem;
  padding-bottom: 10px;
  padding-right: 1rem;
  padding-left: 1rem;

  border-bottom: 1px solid #d3d3d3;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Category = styled.span<{ color?: string }>`
  width: fit-content;
  padding: 2px 5px;
  margin-bottom: 3px;

  background-color: ${({ color, theme }) => color ?? theme.color.main};
  border-radius: 5px;

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

const CommentWrapper = styled.div``;
