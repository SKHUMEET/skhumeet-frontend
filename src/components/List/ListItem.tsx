import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { Category, ConvertKorean, MAIN } from "@/types";
import { GrView } from "react-icons/gr";
//  북마크,댓글개수,제목,현황,마감일, 작성자
const ListItem = ({ item }: { item: MAIN }) => {
  const theme = useContext(ThemeContext);
  console.log(item);
  return (
    <Container>
      <TitleWrapper>
        <div>
          <Status color={theme.color.light}>
            {ConvertKorean[item.status.toLowerCase() as Category]}
          </Status>
          <Title>{item.title}</Title>
          <Time>마감일: {item.endDate.split("T")[0]}</Time>
        </div>
      </TitleWrapper>
      <CommentWrapper>
        <GrView />
        {item.view}
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

export const Status = styled.span<{ color?: string }>`
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
