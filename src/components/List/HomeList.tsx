import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { MAIN, ConvertKorean, Category, Status } from "@/types";
import { useRouter } from "next/router";
import StatusBtn from "../utils/StatusBtn";

interface HomeList {
  category: Category;
  items: MAIN[];
}
//todo: 한번에 글 쓰는거 있지 말고 게시판마다 글 쓰게 해서 글 쓸 때 드롭다운 굳이 없어도...
const HomeList = ({ category, items }: HomeList) => {
  const theme = useContext(ThemeContext);
  const router = useRouter();

  return (
    <HomeListContainer>
      <HomeListTitle onClick={() => router.push(`/${category}`)}>
        <p>{ConvertKorean[category]}</p>
      </HomeListTitle>
      {items.length ? (
        items.slice(0, 4).map((item, idx) => {
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
              {/* <div style={{ cursor: "default" }}> */}
              <StatusBtn
                onClick={() => {}}
                status={item.status.toLowerCase() as Status}
              />
              {/* </div> */}
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

  height: 210px;
  padding: 10px 20px;

  border-radius: 5px;

  box-shadow: 0px 0px 5px -1.5px ${({ theme }) => theme.color.main};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: hidden;
`;

const HomeListTitle = styled.div`
  margin: 10px 0;
  padding-bottom: 10px;

  border-bottom: 1.5px solid ${({ theme }) => theme.color.light};

  font-weight: bold;
  cursor: pointer;
  transition: all 0.2 ease-in-out;
  > p:hover {
    transform: translateY(-3px);
  }
`;

const HomeListItem = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 5px 0;

  line-height: 25px;

  transition: all 0.2s ease-in-out;
  cursor: pointer;
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
