import React from "react";
import styled from "styled-components";
interface HomeList {
  category: string;
  items: {
    title: string;
    isRecruiting?: boolean;
  }[];
}
const HomeList = ({ category, items }: HomeList) => {
  return (
    <HomeListContainer>
      <HomeListTitle>{category}</HomeListTitle>

      {items.slice(0, 5).map((item, idx) => {
        return (
          <HomeListItem key={idx}>
            <span>{item.title}</span>
            {typeof item.isRecruiting !== "undefined" && item.isRecruiting ? (
              <span>모집중</span>
            ) : (
              <span>모집완료</span>
            )}
          </HomeListItem>
        );
      })}
    </HomeListContainer>
  );
};

export default HomeList;

const HomeListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
`;

const HomeListTitle = styled.div`
  font-weight: bold;
  border-bottom: 1px solid ${({ theme }) => theme.color.text};
  margin: 10px 0;
`;

const HomeListItem = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 25px;
  :hover {
    background-color: ${({ theme }) => theme.color.hover};
  }
`;
