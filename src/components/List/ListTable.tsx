import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import ListItem from "@/components/List/ListItem";
import ListCardItem from "@/components/List/ListCardItem";
import { Category } from "@/types";
import Pagination from "../Pagination";
import { useEffect, useState } from "react";
import axios from "axios";

export interface ListProps {
  category: Category;
  list: any[];
  page: number;
  itemStyle?: "list" | "card";
}

export default function ListTable({
  category,
  list,
  // page,
  itemStyle = "list", //기본이 리스트
}: ListProps) {
  const router = useRouter();

  const handleClickListItem = (id: number) => {
    router.push(``); //디테일페이지
  };

  const [page, setPage] = useState<number>(1);

  const [totalPage, setTotalPage] = useState<number>(0);

  const [totalElements, setTotalElements] = useState<number>(0);

  useEffect(() => {
    axios.get(`/main/category/${category}`).then((data) => {
      console.log(data.data);
      setTotalPage(data.data.totalPage);
      setTotalElements(data.data.totalElemts);
    });
  }, [page]);

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
              //  북마크,댓글개수,제목,현황,마감일,작성자
              />
            ) : (
              <ListCardItem
              // 북마크,이미지,댓글개수,제목,현황,마감일,작성자, 이미지 없으면 글
              />
            )}
          </ListWrapper>
        ))}
      </ListContainer2>
      <Pagination
        totalPages={totalPage}
        currentPage={page}
        onPageChange={setPage}
      ></Pagination>
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

  padding-left: 10px;
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
