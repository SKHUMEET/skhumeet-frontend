import React from "react";
import styled from "styled-components";
import { MAIN, Status, formDate } from "@/types";
import { GrView } from "react-icons/gr";
import StatusBtn from "../utils/StatusBtn";
//  북마크,댓글개수,제목,현황,마감일, 작성자

//todo: view 수 말고 댓글수로 보이기
const ListItem = ({ item }: { item: MAIN }) => {
  return (
    <Container>
      <TitleWrapper>
        <div>
          <Title>{item.title}</Title>
          <Time>
            마감일 {formDate(item.endDate)} &nbsp; &#183; &nbsp; {item.member}
          </Time>
        </div>
      </TitleWrapper>
      <CommentWrapper>
        <StatusBtn
          onClick={() => {}}
          status={item.status.toLowerCase() as Status}
        />
        <ViewContainer>
          <ViewIcon />
          <span style={{ marginLeft: "5px" }}>{item.view}</span>
        </ViewContainer>
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

  padding-bottom: 1rem;

  border-bottom: 1px solid #d3d3d3;

  transition: 0.2s;

  :hover {
    transform: translateY(-3px);
  }
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
`;

export const Time = styled.span`
  color: #999999;
  font-size: 11px;
`;

const CommentWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ViewContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.hover};
`;

const ViewIcon = styled(GrView)`
  margin-left: 1rem;
  > path {
    stroke: ${({ theme }) => theme.color.hover};
  }
`;
