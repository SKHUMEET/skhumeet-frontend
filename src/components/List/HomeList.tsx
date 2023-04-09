import React from "react";
import styled from "styled-components";
import { Category } from "./ListItem";

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
              <div>
                <Category style={{ backgroundColor: "#69b030" }}>
                  모집 중
                </Category>
              </div>
            ) : (
              <div>
                <Category>모집 완료</Category>
              </div>
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

  border-radius: 5px;
  box-shadow: 2px 3px 5px #b9b9b9;
`;

const HomeListTitle = styled.div`
  margin: 10px 0;
  padding-bottom: 10px;

  border-bottom: 1.5px solid #68bd3081;

  font-weight: bold;
`;

const HomeListItem = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 25px;

  :hover {
    background-color: ${({ theme }) => theme.color.hover};
  }
`;
