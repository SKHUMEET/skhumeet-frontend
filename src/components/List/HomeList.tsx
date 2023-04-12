import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { MAIN, ConvertKorean, Category } from "@/types";
import { useRouter } from "next/router";

interface HomeList {
  category: Category;
  items: MAIN[];
}

const HomeList = ({ category, items }: HomeList) => {
  const router = useRouter();
  return (
    <HomeListContainer>
      <HomeListTitle onClick={() => router.push(`/${category}`)}>
        {ConvertKorean[category]}
      </HomeListTitle>
      {items.length ? (
        items.slice(0, 5).map((item, idx) => {
          return (
            <HomeListItem
              key={idx}
              onClick={() => router.push(`/${category}/${item.id}`)}
            >
              <span>{item.title}</span>
              {/* {typeof item.isRecruiting !== "undefined" && item.isRecruiting ? (
              <div>
                <Category color={theme.color.main}>모집 중</Category>
              </div>
            ) : (
              <div>
                <Category color={theme.color.light}>모집 완료</Category>
              </div>
            )} */}
            </HomeListItem>
          );
        })
      ) : (
        <>아직 게시글이 없습니다.</>
      )}
    </HomeListContainer>
  );
};

export default HomeList;

const HomeListContainer = styled.div`
  display: flex;
  flex-direction: column;

  /* width: 95%; */
  /* margin: 10px; */
  padding: 20px;

  height: 200px;
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
