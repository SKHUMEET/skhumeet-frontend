import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import ListItem from "@/components/List/ListItem";
import ListCardItem from "@/components/List/ListCardItem";
import { Category } from "@/types";
import Pagination from "../Pagination";
import { useEffect, useState } from "react";

export interface ListProps {
  category: Category;
  list: any[];
  itemStyle?: "list" | "card";
}

export default function ListTable({
  category,
  list,
  itemStyle = "list", //기본이 리스트
}: ListProps) {
  const router = useRouter();

  const handleClickListItem = (id: number) => {
    router.push(`/${category}/${id}`); //디테일페이지
  };

  return (
    <ListContainer>
      {/* <div>
        {totalPage && list ? (
          <ListTable list={list} page={page} category={"hansotbab"} />
        ) : (
          <div>There are no posts</div>
        )}
      </div> */}
      <ListContainer2 itemStyle={itemStyle}>
        {list.map((el, idx) => (
          <ListWrapper
            key={(el.id, el.title, el.nickname, el.modifiedDate)}
            onClick={() => handleClickListItem(el.id)}
            itemStyle={itemStyle}
          >
            {itemStyle === "list" ? (
              <ListItem
                item={el}
                //  북마크,댓글개수,제목,현황,마감일,작성자
              />
            ) : (
              <ListCardItem
                item={el}
                // 북마크,이미지,댓글개수,제목,현황,마감일,작성자, 이미지 없으면 글
              />
            )}
          </ListWrapper>
        ))}
      </ListContainer2>
    </ListContainer>
  );
}

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const ListContainer2 = styled.div<{ itemStyle: "list" | "card" }>`
  ${(props) =>
    props.itemStyle === "list"
      ? css``
      : css`
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        `};

  width: 100%;
`;

export const ListWrapper = styled.div<{ itemStyle: "list" | "card" }>`
  ${(props) =>
    props.itemStyle === "list"
      ? css`
          width: 100%;
        `
      : css`
          /* grid-template-rows: repeat(3fr); */
        `};

  padding-top: 10px;

  border: none;

  align-content: center;
  transition: all 0.3s ease-in-out;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  cursor: default;

  :hover {
    color: ${({ theme }) => theme.color.main};
  }
`;
