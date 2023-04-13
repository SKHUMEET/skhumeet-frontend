import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";

import { Category, ConvertKorean, MAIN, Status } from "@/types";
import { GrView } from "react-icons/gr";
import StatusBtn from "../utils/StatusBtn";
//  북마크,댓글개수,제목,현황,마감일, 작성자
const ListItem = ({ item }: { item: MAIN }) => {
  const theme = useContext(ThemeContext);
  console.log(item);

  return (
    <Container>
      <TitleWrapper>
        <div>
          {/* <State color={theme.color.light}>
            {ConvertKorean[item.status.toLowerCase() as Category]}
          </State> */}
          <StatusBtn
            onClick={() => {}}
            status={item.status.toLowerCase() as Status}
          />
          <Title>{item.title}</Title>
          <Time>마감일: {item.endDate.split("T")[0]}</Time>
        </div>
      </TitleWrapper>
      <CommentWrapper>
        <GrView />
        <span style={{ marginLeft: "5px" }}>{item.view}</span>
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

  padding-bottom: 10px;

  border-bottom: 1px solid #d3d3d3;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const State = styled.span<{ color?: string }>`
  width: fit-content;
  padding: 2px 5px;

  background-color: ${({ color, theme }) => color ?? theme.color.main};
  border-radius: 5px;

  font-size: 11px;
  text-align: center;
`;

export const Title = styled.div`
  margin: 5px 0;

  font-weight: 600;

  transition: 0.3s;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  :hover {
    color: ${({ theme }) => theme.color.main};
  }
`;

export const Time = styled.span`
  color: #999999;
  font-size: 11px;
`;

const CommentWrapper = styled.div`
  display: flex;
  align-items: center;
`;
