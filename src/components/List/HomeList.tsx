import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { MAIN, ConvertKorean, Category, Status } from "@/types";
import { useRouter } from "next/router";
import { State } from "./ListItem";
import StatusBtn from "../utils/StatusBtn";

interface HomeList {
  category: Category;
  items: MAIN[];
}

const HomeList = ({ category, items }: HomeList) => {
  const theme = useContext(ThemeContext);
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
              <Title>{item.title}</Title>
              {/* <State
                style={{ padding: "0 5px" }}
                color={theme.color.light}
                onClick={() => router.push(`/${category}`)}
              > */}
              <StatusBtn
                onClick={() => {}}
                status={item.status.toLowerCase() as Status}
              />
              {/* </State> */}
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
  padding: 10px 20px;

  height: 200px;
  border-radius: 5px;
  /* box-shadow: 2px 3px 5px #b9b9b9; */
  box-shadow: 0px 0px 5px -1.5px ${({ theme }) => theme.color.main};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const HomeListTitle = styled.div`
  margin: 10px 0;
  padding-bottom: 10px;

  border-bottom: 1.5px solid ${({ theme }) => theme.color.light};

  font-weight: bold;
`;

const HomeListItem = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 5px 0;

  line-height: 25px;

  cursor: default;
  transition: 0.2s;

  :hover {
    transform: translateY(-3px);
  }
`;

const Title = styled.div`
  width: 80%;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
